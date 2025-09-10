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
  ...,
    _id,
    title,
    slug,
    description,
    body,
    publishedAt,
    language,
    mainImage,
    showCommerce,
    otherActivities[]->,
    organizationsAndIndustry[]->,
    otherSuppert[]->,
    support[]->,
    "donationForm": donation->,
    arguments[]->,
  }
`

// Get article by slug
export const getArticleBySlugQuery = `
  *[_type in ["article"] && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    language,
    mainImage,
    relatedContent[]->
  }
`

// Get newsarticle by slug
export const getNewsArticleBySlugQuery = `
  *[_type in ["newsArticle"] && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    language,
    mainImage
  }
`

// Get all article slugs for static generation
export const getAllArticleSlugsQuery = `
  *[_type in ["article"] && defined(slug.current)][] {
    "slug": slug.current
  }
`

// Get donation form by language
export const getDonationFormQuery = `
  *[_type == "donationForm" && language == $language][0] {
    _id, 
    _type,
    title,
    language,
    donationFormType,
    heading,
    description,
    amounts,
    fact
  }
`

// Get all news articles by language
export const getAllNewsArticlesQuery = `
  *[_type == "newsArticle" && language == $lang] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    language,
    mainImage
  }
`

// Get all arguments by language
export const getAllArgumentsQuery = `
  *[_type == "arguments" && language == $language] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    image,
    "article": article->{
      _id,
      title,
      slug
    },
    publishedAt,
    language
  }
`

// Get arguments by language with limit
export const getArgumentsQuery = `
  *[_type == "arguments" && language == $language] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    excerpt,
    image,
    "article": article->{
      _id,
      title,
      slug
    },
    publishedAt,
    language
  }
`


// Get branch by slug
export const getBranchBySlugQuery = `
  *[_type == "localGroup" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    description,
    "topArticle": topArticle2{..., "article": article->},
    body,
    publishedAt,
    language,
    mainImage,
    branchId,
    branchName,
    branchType,
    branchParent,
    branchLocation,
    communicationChannels,
    branchContacts,
    branchActivities
  }
`