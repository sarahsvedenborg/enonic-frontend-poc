// Test function to verify API connection
import { getCachedOrganizations, getBranchById } from './api-cache'

export async function testApiConnection() {
    try {
        console.log('Testing API connection...')

        // Test fetching all organizations
        const branches = await getCachedOrganizations()
        console.log(`✅ Successfully fetched ${branches.length} branches from API`)

        // Test fetching a specific branch (using the first one as example)
        if (branches.length > 0) {
            const firstBranch = branches[0]
            const specificBranch = await getBranchById(firstBranch.branchId)

            if (specificBranch) {
                console.log(`✅ Successfully fetched specific branch: ${specificBranch.branchName}`)
                console.log(`   Activities: ${specificBranch.branchActivities.length}`)
                console.log(`   Contacts: ${specificBranch.branchContacts.length}`)
            } else {
                console.log('❌ Failed to fetch specific branch')
            }
        }

        return {
            success: true,
            totalBranches: branches.length,
            localGroups: branches.filter(b => b.branchType === 'Lokalforening').length
        }
    } catch (error) {
        console.error('❌ API connection test failed:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}
