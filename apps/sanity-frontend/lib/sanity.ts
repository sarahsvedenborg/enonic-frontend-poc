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
    mainImage?: any
}
