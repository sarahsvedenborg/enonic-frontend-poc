import { defineField, defineType } from 'sanity'
import TranslateInput from '../components/TranslateInput'

export default defineType({
    name: 'localGroup',
    title: 'Lokallag',
    type: 'document',
    groups: [
        {
            name: 'localGroup',
            title: 'Lokalforening redaktørinnhold',

        },
        {
            name: 'activities',
            title: 'Aktiviteter (lokal tilpasning)',
        },
        {
            name: 'api',
            title: 'Innhold fra API',
        }
    ],
    fields: [
        defineField({
            name: 'branchId',
            title: 'Branch ID',
            type: 'string',
            group: 'api',
            readOnly: true,
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
            group: 'localGroup',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
                slugify: (input, schemaType, context) => {
                    console.log(context, 'slugify');
                    const county = (context.parent as any)?.branchLocation?.county || 'unknown';
                    return county.toLowerCase().replace(/\s+/g, '-') + '/' + input.split(' ')[0].toLowerCase().replace(/\s+/g, '-');
                },
            },
            group: 'localGroup',
            validation: (Rule) => Rule.required(),
            /*      hidden: true, */
        }),
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
            group: 'localGroup',
            options: {
                list: [
                    { title: 'Norsk', value: 'no' },
                    { title: 'Engelsk', value: 'en' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            group: 'localGroup',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            group: 'localGroup',
        }),
        defineField({
            name: 'topArticle2',
            title: 'Fremhevet artikkel',
            type: 'object',
            group: 'localGroup',
            fields: [
                { name: 'image', type: 'image', title: 'Image' },
                { name: 'article', type: 'reference', to: [{ type: 'article' }] },
            ],
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
            group: 'localGroup',
        }),
        defineField({
            name: 'isPublished',
            title: 'Published',
            type: 'boolean',
            initialValue: false,
        }),

        // Local Activity Overrides
        defineField({
            name: 'aktiviteter',
            title: 'Aktiviteter (lokal tilpasning)',
            type: 'array',
            description: 'Utvid global aktivitetsbeskrivelse med lokal informasjon',
            group: ['activities', 'localGroup'],
            of: [{
                type: 'object',
                title: 'Aktivitet',
                fields: [
                    defineField({
                        name: 'activityType',
                        title: 'Aktivitetstype',
                        type: 'string',
                        options: {
                            list: [
                                'Vitnestøtte',
                                'Besøkstjeneste',
                                'Møteplasser',
                                'Administrative oppgaver',
                                'Språkgruppe',
                                'Leksehjelp',
                                'Hjelpekorps',
                                'Besøksvenn med hund',
                                'Øvrige aktiviteter - Røde Kors Ungdom',
                                'Flyktningguide',
                                'Våketjenesten'
                            ],
                            layout: 'dropdown',
                        },
                        validation: (Rule) => Rule.required(),
                    }),
                    /*    defineField({
                           name: 'localCtaHeading',
                           title: 'Lokal CTA heading',
                           type: 'string',
                           description: 'Override the global activity CTA heading for this branch',
                       }),
                       defineField({
                           name: 'title',
                           title: 'Tittel',
                           type: 'string',
                           description: 'Override the global activity title for this branch',
                       }),
                       defineField({
                           name: 'excerpt',
                           title: 'Ingress',
                           type: 'text',
                           rows: 3,
                           description: 'Override the global activity excerpt for this branch',
                       }), */
                    defineField({
                        name: 'image',
                        title: 'Bilde',
                        type: 'image',
                        options: {
                            hotspot: true,
                        },
                        fields: [
                            defineField({
                                name: 'alt',
                                type: 'string',
                                title: 'Alternativ tekst',
                                description: 'Beskrivelse av bildet for tilgjengelighet',
                            }),
                        ],
                        description: 'Override the global activity image for this branch',
                    }),
                    defineField({
                        name: 'body',
                        title: 'Ekstra brødtekst',
                        type: 'blockContent',
                        description: 'Innhold i TILLEGG til global aktivitetsbeskrivelse',
                    }),
                ],
                preview: {
                    select: {
                        title: 'title',
                        activityType: 'activityType',
                        media: 'image',
                    },
                    prepare(selection) {
                        const { title, activityType, media } = selection

                        const activityTypeLabel = activityType

                        return {
                            title: title || activityTypeLabel,
                            subtitle: `Lokal tilpasning: ${activityTypeLabel}`,
                            media,
                        }
                    },
                },
            }],
        }),
        defineField({
            name: 'branchActivities',
            title: 'Branch Activities',
            description: 'Disse aktivitetene kommer fra CRM, i realiteten skal den kun være en forekomst per type aktivitet',
            type: 'array',
            group: ['activities', 'localGroup', 'api'],
            readOnly: true,
            of: [{
                type: 'object',
                fields: [
                    { name: 'globalActivityName', type: 'string' },
                    { name: 'localActivityName', type: 'string' },
                ],
            }],
        }),

        // API Data Fields
        defineField({
            name: 'branchNumber',
            title: 'Branch Number',
            type: 'string',
            group: 'api',
            readOnly: true,
        }),
        defineField({
            name: 'organizationNumber',
            title: 'Organization Number',
            type: 'string',
            readOnly: true,
            group: 'api',
        }),
        defineField({
            name: 'branchType',
            title: 'Branch Type',
            type: 'string',
            readOnly: true,
            group: 'api',
        }),
        defineField({
            name: 'branchName',
            title: 'Branch Name',
            type: 'string',
            group: 'api',
            readOnly: true,
        }),
        defineField({
            name: 'branchStatus',
            title: 'Branch Status',
            type: 'object',
            group: 'api',
            readOnly: true,
            hidden: true,
            fields: [
                { name: 'isActive', type: 'boolean' },
                { name: 'creationDate', type: 'string' },
                { name: 'isTerminated', type: 'boolean' },
            ],
        }),
        defineField({
            name: 'branchParent',
            title: 'Branch Parent',
            type: 'object',
            group: 'api',
            readOnly: true,
            fields: [
                { name: 'branchId', type: 'string' },
                { name: 'branchNumber', type: 'string' },
                { name: 'branchName', type: 'string' },
                { name: 'branchType', type: 'string' },
            ],
        }),
        defineField({
            name: 'branchLocation',
            title: 'Branch Location',
            type: 'object',
            group: 'api',
            readOnly: true,
            fields: [
                { name: 'municipality', type: 'string' },
                { name: 'county', type: 'string' },
                { name: 'region', type: 'string' },
                {
                    name: 'postalAddress',
                    type: 'object',
                    fields: [
                        { name: 'addressLine1', type: 'string' },
                        { name: 'postalCode', type: 'string' },
                        { name: 'postOffice', type: 'string' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'communicationChannels',
            title: 'Communication Channels',
            type: 'object',
            group: 'api',
            readOnly: true,
            fields: [
                { name: 'phone', type: 'string' },
                { name: 'email', type: 'string' },
                { name: 'web', type: 'string' },
            ],
        }),
        defineField({
            name: 'branchContacts',
            title: 'Branch Contacts',
            type: 'array',
            group: 'api',
            readOnly: true,
            of: [{
                type: 'object',
                fields: [
                    { name: 'role', type: 'string' },
                    { name: 'firstName', type: 'string' },
                    { name: 'lastName', type: 'string' },
                    { name: 'isVolunteer', type: 'boolean' },
                    { name: 'isMember', type: 'boolean' },
                    { name: 'memberNumber', type: 'string' },
                ],
            }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            branchName: 'branchName',
            branchId: 'branchId',
            language: 'language',
            media: 'mainImage',
            isPublished: 'isPublished',
        },
        prepare(selection) {
            const { language, isPublished, branchName, branchId, title } = selection
            const languageLabels: Record<string, string> = {
                en: '🇺🇸 EN',
                no: '🇳🇴 NO',
            }
            const languageLabel = languageLabels[language] || language
            const displayTitle = branchName || title || `Branch ${branchId}`

            return {
                ...selection,
                title: displayTitle,
                subtitle: `${languageLabel} - ${isPublished ? 'Published' : 'Draft'}`,
            }
        },
    },
})
