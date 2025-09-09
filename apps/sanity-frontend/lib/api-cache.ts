// API Cache utility for Røde Kors organizations
import { unstable_cache } from 'next/cache'

interface BranchActivity {
    globalActivityName: string
    localActivityName: string
}

interface BranchContact {
    role: string
    firstName: string
    lastName: string
    isVolunteer: boolean
    isMember: boolean
    memberNumber: string
}

interface CommunicationChannels {
    phone?: string
    email?: string
    web?: string
}

interface PostalAddress {
    addressLine1: string
    postalCode: string
    postOffice: string
}

interface BranchLocation {
    municipality: string
    county: string
    region?: string
    postalAddress?: PostalAddress
}

interface BranchParent {
    branchId: string
    branchNumber: string
    branchName: string
    branchType: string
}

interface BranchStatus {
    isActive: boolean
    creationDate: string
    isTerminated: boolean
}

export interface ApiBranch {
    branchId: string
    branchNumber: string
    organizationNumber?: string
    branchType: string
    branchName: string
    branchStatus: BranchStatus
    branchParent: BranchParent
    branchLocation: BranchLocation
    communicationChannels: CommunicationChannels
    branchContacts: BranchContact[]
    branchActivities: BranchActivity[]
}

interface ApiResponse {
    data: {
        branches: ApiBranch[]
    }
    metadata: {
        totalCount: number
        timestamp: string
    }
}

// Cache the API response for 1 hour (3600 seconds)
const getCachedOrganizations = unstable_cache(
    async (): Promise<ApiBranch[]> => {
        try {
            console.log('Fetching organizations from API...')
            const response = await fetch('https://api-dev.redcross.no/nrx/v1/organizations', {
                next: { revalidate: 3600 }, // Cache for 1 hour
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'RodeKors-Frontend/1.0'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data: ApiResponse = await response.json()
            console.log(`Fetched ${data.data.branches.length} branches from API`)

            return data.data.branches
        } catch (error) {
            console.error('Error fetching organizations from API:', error)
            throw error
        }
    },
    ['organizations'], // Cache key
    {
        revalidate: 3600, // Revalidate every hour
        tags: ['organizations']
    }
)

// Get a specific branch by ID
export async function getBranchById(branchId: string): Promise<ApiBranch | null> {
    try {
        const branches = await getCachedOrganizations()
        const branch = branches.find(b => b.branchId === branchId)
        return branch || null
    } catch (error) {
        console.error(`Error fetching branch ${branchId}:`, error)
        return null
    }
}

// Get all local groups (Lokalforening)
export async function getAllLocalGroups(): Promise<ApiBranch[]> {
    try {
        const branches = await getCachedOrganizations()
        return branches.filter(branch => branch.branchType === 'Lokalforening')
    } catch (error) {
        console.error('Error fetching local groups:', error)
        return []
    }
}

// Get activities for a specific branch
export async function getBranchActivities(branchId: string): Promise<BranchActivity[]> {
    try {
        const branch = await getBranchById(branchId)
        return branch?.branchActivities || []
    } catch (error) {
        console.error(`Error fetching activities for branch ${branchId}:`, error)
        return []
    }
}

export { getCachedOrganizations }
