// GROQ queries for fetching campaign data

// Get all campaigns
export const getAllCampaignsQuery = `
  *[_type == "campaign" && language == "no"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    publishedAt,
    language
  }
`

// Get a single campaign by slug
export const getCampaignBySlugQuery = `
  *[_type == "campaign" && language == "no" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    body,
    publishedAt,
    language,
    mainImage,
    // Add other fields you want to fetch
  }
`

// Get campaign slugs for static generation
export const getAllCampaignSlugsQuery = `
  *[_type == "campaign" && defined(slug.current)][] {
    "slug": slug.current
  }
`

// Get permanent campaign by language
export const getPermanentCampaignQuery = `
  *[_type == "permanentCampaign" && language == $language][0] {
    _id,
    title,
    slug,
    description,
    body,
    publishedAt,
    language,
    mainImage,
    showCommerce,
    otherActivities,
    organizationsAndIndustry,
    otherSuppert,
    support,
    donation
  }
`
