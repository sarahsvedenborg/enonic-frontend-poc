import { MenuItem, SubMenuItem } from './sanity'

export function getMenuItemUrl(item: MenuItem | SubMenuItem): string {
    switch (item.menuType || item.subMenuType) {
        case 'external':
            return item.url || '#'
        case 'internal':
            return item.internalPage || '#'
        case 'campaign':
            return item.campaign ? `/kampanjer/${item.campaign.slug.current}` : '#'
        case 'localGroup':
            return item.localGroup ? `/lokalforeninger/${item.localGroup.slug.current}` : '#'
        case 'article':
            return item.article ? `/artikler/${item.article.slug.current}` : '#'
        case 'newsArticle':
            return item.newsArticle ? `/aktuelt/${item.newsArticle.slug.current}` : '#'
        default:
            return '#'
    }
}

export function shouldOpenInNewTab(item: MenuItem): boolean {
    return item.menuType === 'external' && item.openInNewTab === true
}

export function isVisible(item: MenuItem): boolean {
    return item.isVisible !== false
}
