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
