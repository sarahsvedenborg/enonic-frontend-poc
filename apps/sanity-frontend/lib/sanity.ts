import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mtewzn7e',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    useCdn: process.env.NODE_ENV === 'production',
    apiVersion: '2023-05-03',
    token: process.env.SANITY_API_TOKEN, // Only needed for write operations
})

// Image URL builder for Sanity images
const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// Types for our campaign documents
export interface Campaign {
    _id: string
    _type: 'campaign'
    title: string
    slug: {
        current: string
    }
    description?: string
    body?: any[]
    publishedAt?: string
    language?: string
    mainImage?: any
    // Add other fields as needed based on your Sanity schema
}

// Types for permanent campaign documents
export interface PermanentCampaign {
    _id: string
    _type: 'permanentCampaign'
    title: string
    slug: {
        current: string
    }
    description?: string
    body?: any[]
    publishedAt?: string
    language?: string
    mainImage?: any
    showCommerce?: boolean
    otherActivities?: any[]
    organizationsAndIndustry?: any[]
    otherSuppert?: any[]
    support?: any[]
    donation?: any
}

// Types for article documents
export interface Article {
    _id: string
    _type: 'article' | 'newsArticle'
    title: string
    slug: {
        current: string
    }
    excerpt?: string
    body?: any[]
    publishedAt?: string
    language?: string
    mainImage?: any,
    relatedContent?: any[]
}

// Types for donation form documents
export interface DonationForm {
    _id: string
    _type: 'donationForm'
    title?: string
    language?: string
    donationFormType?: 'compact' | 'extended'
    heading?: string
    description?: string
    amounts?: number[]
    fact?: string
}

// Types for arguments documents
export interface Arguments {
    _id: string
    _type: 'arguments'
    title: string
    excerpt: string
    image?: any
    article?: {
        _id: string
        title: string
        slug: {
            current: string
        }
    }
    language?: string
    publishedAt?: string
}

// Types for activity documents
export interface Activity {
    _id: string
    _type: 'activity'
    title: string
    excerpt: string
    localCtaHeading?: string
    mainImage?: any
    activityType: string
    body?: any[]
    publishedAt?: string
    language?: string
    slug: {
        current: string
    },
    cta?: {
        heading?: string
        description?: string
        information?: string
    }
}

// Types for local activity overrides
export interface LocalActivityOverride {
    activityType: string
    title?: string
    excerpt?: string
    localCtaHeading?: string
    image?: any
    body?: any[]
}

// Types for local group documents
export interface LocalGroup {
    _id: string
    _type: 'localGroup'
    title: string
    slug: {
        current: string
    }
    description?: string
    mainImage?: any
    body?: any[]
    publishedAt?: string
    language?: string
    branchId?: string
    branchName?: string
    branchType?: string
    branchParent?: any
    branchLocation?: any
    communicationChannels?: any
    branchContacts?: any[]
    branchActivities?: any[]
    aktiviteter?: LocalActivityOverride[]
}

// Types for event documents
export interface Event {
    _id: string
    _type: 'event'
    title: string
    body?: any[]
    time: string
    location: string
    localBranch: {
        _id: string
        branchName?: string
        branchId?: string
    }
    language?: string
    publishedAt?: string
    slug: {
        current: string
    }
}

// Types for menu documents
export interface MenuItem {
    subMenuType?: 'external' | 'internal' | 'campaign' | 'localGroup' | 'article' | 'newsArticle'
    _key: string
    label: string
    menuType: 'external' | 'internal' | 'dropdown' | 'campaign' | 'localGroup' | 'article' | 'newsArticle'
    url?: string
    internalPage?: string
    campaign?: {
        _id: string
        title: string
        slug: {
            current: string
        }
    }
    localGroup?: {
        _id: string
        branchName?: string
        slug: {
            current: string
        }
    }
    article?: {
        _id: string
        title: string
        slug: {
            current: string
        }
    }
    newsArticle?: {
        _id: string
        title: string
        slug: {
            current: string
        }
    }
    subItems?: SubMenuItem[]
    isVisible?: boolean
    openInNewTab?: boolean
}

export interface SubMenuItem {
    menuType?: 'external' | 'internal' | 'campaign' | 'localGroup' | 'article' | 'newsArticle'
    _key: string
    label: string
    subMenuType: 'external' | 'internal' | 'campaign' | 'localGroup' | 'article' | 'newsArticle'
    url?: string
    internalPage?: string
    campaign?: {
        _id: string
        title: string
        slug: {
            current: string
        }
    }
    localGroup?: {
        _id: string
        branchName?: string
        slug: {
            current: string
        }
    }
    article?: {
        _id: string
        title: string
        slug: {
            current: string
        }
    }
    newsArticle?: {
        _id: string
        title: string
        slug: {
            current: string
        }
    }
}

export interface MainMenu {
    _id: string
    _type: 'mainMenu'
    title: string
    menuItems: MenuItem[]
    menuItemsSecondary: MenuItem[]
    menuItemsTertiary: MenuItem[]
    language?: string
    menuLocation: 'header' | 'footer' | 'sidebar' | 'mobile'
    isActive?: boolean
}
