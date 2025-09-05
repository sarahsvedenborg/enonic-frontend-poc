import { type SchemaTypeDefinition } from 'sanity'
import article from './article'
import blockContent from './blockContent'
import campaign from './campaign'
import localGroup from './localGroup'
import donationForm from './donationForm'

export const schemaTypes: SchemaTypeDefinition[] = [
    article,
    blockContent,
    campaign,
    localGroup,

    // objects
    donationForm,
]
