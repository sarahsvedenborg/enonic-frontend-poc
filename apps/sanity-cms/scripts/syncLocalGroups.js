#!/usr/bin/env node

/**
 * Script to sync local groups from Røde Kors API to Sanity
 * Fetches data from https://api-dev.redcross.no/nrx/v1/organizations
 * and creates/updates localGroup documents for each "Lokalforening" branch
 */

import { createClient } from '@sanity/client'
import fetch from 'node-fetch'

// Sanity client configuration
const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID || 'mtewzn7e',
    dataset: process.env.SANITY_DATASET || 'production',
    token: "skLx20vqFGn6V121uyBgUQ83BAl0lA56OZUGQPH8c4bnBLWm6S53SPh5o2iJ4S54p6IphaBAXX7KcGp7irD6fTDUYjfwH0whOpLsjq34Ucq3hCY53WCVsRI5oCRRfnnpK3MTXs7hZYe1wg4mbbXCsWs0tDee7CQpjOufnPNK1xhZGGQKkmTI",
    useCdn: false,
    apiVersion: '2023-05-03',
})

// API endpoint
const API_URL = 'https://api-dev.redcross.no/nrx/v1/organizations'

/**
 * Fetch organizations from the API
 */
async function fetchOrganizations() {
    try {
        console.log('Fetching organizations from API...')
        const response = await fetch(API_URL)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log(`Fetched ${data.data.branches.length} branches from API`)

        return data.data.branches
    } catch (error) {
        console.error('Error fetching organizations:', error)
        throw error
    }
}

/**
 * Filter branches to only include "Lokalforening" type
 */
function filterLocalGroups(branches) {
    const localGroups = branches.filter(branch => branch.branchType === 'Lokalforening')
    console.log(`Found ${localGroups.length} local groups (Lokalforening)`)
    return localGroups
}

/**
 * Transform API data to Sanity document format
 */
function transformBranchToDocument(branch) {
    return {
        _type: 'localGroup',
        branchId: branch.branchId,
        branchNumber: branch.branchNumber,
        organizationNumber: branch.organizationNumber,
        branchType: branch.branchType,
        branchName: branch.branchName,
        branchStatus: branch.branchStatus,
        branchParent: branch.branchParent,
        branchLocation: branch.branchLocation,
        communicationChannels: branch.communicationChannels,
        branchContacts: branch.branchContacts,
        branchActivities: branch.branchActivities,

        // Set default values for required fields
        title: branch.branchName,
        language: 'no', // Default to Norwegian
        isPublished: branch.branchStatus?.isActive || false,
    }
}

/**
 * Get existing local groups from Sanity
 */
async function getExistingLocalGroups() {
    try {
        const query = `*[_type == "localGroup" && defined(branchId)] {
      _id,
      branchId,
      branchName,
      title
    }`

        const existing = await client.fetch(query)
        console.log(`Found ${existing.length} existing local groups in Sanity`)

        return existing
    } catch (error) {
        console.error('Error fetching existing local groups:', error)
        throw error
    }
}

/**
 * Create or update a local group document
 */
async function upsertLocalGroup(branchData, existingGroups) {
    const document = transformBranchToDocument(branchData)
    const existing = existingGroups.find(group => group.branchId === branchData.branchId)

    try {
        if (existing) {
            // Update existing document
            console.log(`Updating existing local group: ${branchData.branchName} (${branchData.branchId})`)

            // Preserve the existing title if it was manually edited
            const existingDoc = await client.getDocument(existing._id)
            if (existingDoc.title !== existingDoc.branchName) {
                document.title = existingDoc.title // Keep manually edited title
            }

            await client
                .patch(existing._id)
                .set(document)
                .commit()

            return { action: 'updated', id: existing._id, name: branchData.branchName }
        } else {
            // Create new document
            console.log(`Creating new local group: ${branchData.branchName} (${branchData.branchId})`)

            const result = await client.create(document)
            return { action: 'created', id: result._id, name: branchData.branchName }
        }
    } catch (error) {
        console.error(`Error upserting local group ${branchData.branchName}:`, error)
        throw error
    }
}

/**
 * Main sync function
 */
async function syncLocalGroups() {
    try {
        console.log('Starting local groups sync...')

        // Fetch data from API
        const branches = await fetchOrganizations()
        const localGroups = filterLocalGroups(branches)

        // Get existing documents from Sanity
        const existingGroups = await getExistingLocalGroups()

        // Process each local group
        const results = {
            created: 0,
            updated: 0,
            errors: 0,
        }

        for (const branch of localGroups) {
            try {
                const result = await upsertLocalGroup(branch, existingGroups)
                results[result.action]++
            } catch (error) {
                console.error(`Failed to process ${branch.branchName}:`, error)
                results.errors++
            }
        }

        console.log('\nSync completed!')
        console.log(`Created: ${results.created}`)
        console.log(`Updated: ${results.updated}`)
        console.log(`Errors: ${results.errors}`)
        console.log(`Total processed: ${localGroups.length}`)

    } catch (error) {
        console.error('Sync failed:', error)
        process.exit(1)
    }
}

// Run the sync if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    syncLocalGroups()
}

export { syncLocalGroups }
