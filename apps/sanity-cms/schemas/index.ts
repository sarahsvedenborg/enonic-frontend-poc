import { type SchemaTypeDefinition } from 'sanity'
import article from './article'
import newsArticle from './newsArticle'
import blockContent from './blockContent'
import campaign from './campaign'
import permanentCampaign from './permanentCampaign'
import localGroup from './localGroup'
import donationForm from './donationForm'
import argument from './argument'
import activity from './activity'
import event from './event'
import mainMenu from './mainMenu'

export const schemaTypes: SchemaTypeDefinition[] = [
    article,
    newsArticle,
    blockContent,
    campaign,
    permanentCampaign,
    localGroup,
    argument,
    activity,
    event,
    mainMenu,

    // objects
    donationForm,
]
