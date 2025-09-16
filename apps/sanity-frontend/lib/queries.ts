// GROQ queries for fetching campaign data

const bodyQuery = `
  body[]{
    ...,
    _type == "donationForm" => {
      ...,
      "donationForm": @->
    },
    _type == "argument" => {
      ...,
      "argument": @->{
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
    }
  }
`

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
    ${bodyQuery},
    publishedAt,
    language,
    mainImage,
    otherActivities[]->,
    otherSuppert[]->,

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
   ${bodyQuery},
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
    mainImage,
    hideNewsletterSignUp
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
    mainImage,
    hideNewsletterSignUp
  }
`

// Get all news articles by language
export const getAllNewsPerBranchQuery = `
  *[_type == "newsArticle" && language == $lang && branchId->branchId == $id] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    language,
    mainImage,
    hideNewsletterSignUp
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
  *[_type == "localGroup" && branchId == $id][0] {
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
    branchActivities,
    aktiviteter[]{
      activityType,
      title,
      excerpt,
      localCtaHeading,
      image,
      body
    }
  }
`

// Get all local groups by language
export const getAllLocalGroupsQuery = `
  *[_type == "localGroup" && language == $language] | order(branchLocation.county asc, branchName asc) {
    _id,
    title,
    slug,
    branchName,
    branchId,
    branchLocation {
      county,
      municipality
    },
    communicationChannels {
      email,
      phone
    }
  }
`

// Get activity content by activity type
export const getActivityByTypeQuery = `
  *[_type == "activity" && language == $language && activityType == $activityType][0] {
    _id,
    title,
    excerpt,
    localCtaHeading,
    mainImage,
    activityType,
    body,
    publishedAt,
    language,
    slug
  }
`

// Get events by branch
export const getEventsByBranchQuery = `
  *[_type == "event" && language == $language && localBranch->branchId == $branchId] | order(time asc) {
    _id,
    title,
    time,
    location,
    body,
    slug,
    localBranch->{
      _id,
      branchName,
      branchId
    }
  }
`

// Get single event by slug
export const getEventBySlugQuery = `
  *[_type == "event" && language == $language && slug.current == $slug][0] {
    _id,
    title,
    time,
    location,
    body,
    slug,
    localBranch->{
      _id,
      branchName,
      branchId,
      branchLocation,
      communicationChannels
    }
  }
`

// Get all event slugs for static generation
export const getAllEventSlugsQuery = `
  *[_type == "event" && defined(slug.current)][] {
    "slug": slug.current,
    localBranch->{
      branchId
    }
  }
`

// Get main menu by location and language
export const getMainMenuQuery = `
  *[_type == "mainMenu" && menuLocation == $location && language == $language && isActive == true][0] {
    _id,
    title,
    menuItems[]{
      _key,
      label,
      menuType,
      url,
      internalPage,
      "campaign": campaign->{
        _id,
        title,
        slug
      },
      "localGroup": localGroup->{
        _id,
        branchName,
        slug
      },
      "article": article->{
        _id,
        title,
        slug
      },
      "newsArticle": newsArticle->{
        _id,
        title,
        slug
      },
      subItems[]{
        _key,
        label,
        subMenuType,
        url,
        internalPage,
        "campaign": campaign->{
          _id,
          title,
          slug
        },
        "localGroup": localGroup->{
          _id,
          branchName,
          slug
        },
        "article": article->{
          _id,
          title,
          slug
        },
        "newsArticle": newsArticle->{
          _id,
          title,
          slug
        }
      },
      isVisible,
      openInNewTab
    },
    menuItemsSecondary[]{
      _key,
      label,
      menuType,
      url,
      internalPage,
      "campaign": campaign->{
        _id,
        title,
        slug
      },
      "localGroup": localGroup->{
        _id,
        branchName,
        slug
      },
      "article": article->{
        _id,
        title,
        slug
      },
      "newsArticle": newsArticle->{
        _id,
        title,
        slug
      },
      subItems[]{
        _key,
        label,
        subMenuType,
        url,
        internalPage,
        "campaign": campaign->{
          _id,
          title,
          slug
        },
        "localGroup": localGroup->{
          _id,
          branchName,
          slug
        },
        "article": article->{
          _id,
          title,
          slug
        },
        "newsArticle": newsArticle->{
          _id,
          title,
          slug
        }
      },
      isVisible,
      openInNewTab
    },
    menuItemsTertiary[]{
      _key,
      label,
      menuType,
      url,
      internalPage,
      "campaign": campaign->{
        _id,
        title,
        slug
      },
      "localGroup": localGroup->{
        _id,
        branchName,
        slug
      },
      "article": article->{
        _id,
        title,
        slug
      },
      "newsArticle": newsArticle->{
        _id,
        title,
        slug
      },
      subItems[]{
        _key,
        label,
        subMenuType,
        url,
        internalPage,
        "campaign": campaign->{
          _id,
          title,
          slug
        },
        "localGroup": localGroup->{
          _id,
          branchName,
          slug
        },
        "article": article->{
          _id,
          title,
          slug
        },
        "newsArticle": newsArticle->{
          _id,
          title,
          slug
        }
      },
      isVisible,
      openInNewTab
    },
    language,
    menuLocation,
    isActive
  }
`