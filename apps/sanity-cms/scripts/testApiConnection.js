#!/usr/bin/env node

/**
 * Test script to verify connection to Røde Kors API
 */

import fetch from 'node-fetch'

const API_URL = 'https://api-dev.redcross.no/nrx/v1/organizations'

async function testApiConnection() {
    try {
        console.log('Testing connection to Røde Kors API...')
        console.log(`URL: ${API_URL}`)

        const response = await fetch(API_URL)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        console.log('\n✅ API Connection successful!')
        console.log(`Total branches: ${data.data.branches.length}`)

        // Count local groups
        const localGroups = data.data.branches.filter(branch => branch.branchType === 'Lokalforening')
        console.log(`Local groups (Lokalforening): ${localGroups.length}`)

        // Show sample data
        if (localGroups.length > 0) {
            console.log('\n📋 Sample local group data:')
            const sample = localGroups[0]
            console.log(`- Name: ${sample.branchName}`)
            console.log(`- ID: ${sample.branchId}`)
            console.log(`- Municipality: ${sample.branchLocation?.municipality}`)
            console.log(`- County: ${sample.branchLocation?.county}`)
            console.log(`- Active: ${sample.branchStatus?.isActive}`)
            console.log(`- Phone: ${sample.communicationChannels?.phone || 'N/A'}`)
            console.log(`- Email: ${sample.communicationChannels?.email || 'N/A'}`)
            console.log(`- Activities: ${sample.branchActivities?.length || 0}`)
        }

        console.log('\n🚀 Ready to sync! Run: yarn sync-local-groups')

    } catch (error) {
        console.error('❌ API Connection failed:', error.message)
        process.exit(1)
    }
}

testApiConnection()
