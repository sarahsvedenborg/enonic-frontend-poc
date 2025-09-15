import { defineField, defineType } from 'sanity'
import TranslateInput from '../components/TranslateInput'

export default defineType({
    name: 'localGroup',
    title: 'Lokallag',
    type: 'document',
    groups: [
        {
            name: 'localGroup',
            title: 'Lokalforening',

        },
        {
            name: 'activities',
            title: 'Aktiviteter (lokal tilpasning)',
        }
    ],
    fields: [
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
            validation: (Rule) => Rule.required(),
            hidden: true,
        }),
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
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
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'topArticle2',
            title: 'Fremhevet artikkel',
            type: 'object',
            fields: [
                { name: 'image', type: 'image', title: 'Image' },
                { name: 'article', type: 'reference', to: [{ type: 'article' }] },
            ],
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
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
            description: 'Erstatt global aktivitetsbeskrivelse med lokal informasjon',
            group: 'activities',
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
                                { title: 'Vitnestøtte', value: 'vitnestotte' },
                                { title: 'Besøkstjeneste', value: 'besokstjeneste' },
                                { title: 'Møteplass', value: 'motepass' },
                                { title: 'Førstehjelp', value: 'forstehjelp' },
                                { title: 'Katastrofehjelp', value: 'katastrofehjelp' },
                                { title: 'Sosialt arbeid', value: 'sosialt-arbeid' },
                                { title: 'Ungdomsarbeid', value: 'ungdomsarbeid' },
                                { title: 'Eldreomsorg', value: 'eldreomsorg' },
                                { title: 'Flyktninghjelp', value: 'flyktninghjelp' },
                                { title: 'Blodgivning', value: 'blodgivning' },
                            ],
                            layout: 'dropdown',
                        },
                        validation: (Rule) => Rule.required(),
                    }),
                    defineField({
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
                    }),
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
                        title: 'Innhold',
                        type: 'blockContent',
                        description: 'Override the global activity content for this branch',
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
                        const activityTypeLabels: Record<string, string> = {
                            vitnestotte: 'Vitnestøtte',
                            besokstjeneste: 'Besøkstjeneste',
                            motepass: 'Møteplass',
                            forstehjelp: 'Førstehjelp',
                            katastrofehjelp: 'Katastrofehjelp',
                            'sosialt-arbeid': 'Sosialt arbeid',
                            ungdomsarbeid: 'Ungdomsarbeid',
                            eldreomsorg: 'Eldreomsorg',
                            flyktninghjelp: 'Flyktninghjelp',
                            blodgivning: 'Blodgivning',
                            annet: 'Annet',
                        }
                        const activityTypeLabel = activityTypeLabels[activityType] || activityType

                        return {
                            title: title || activityTypeLabel,
                            subtitle: `Lokal tilpasning: ${activityTypeLabel}`,
                            media,
                        }
                    },
                },
            }],
        }),

        // API Data Fields
        defineField({
            name: 'branchId',
            title: 'Branch ID',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'branchNumber',
            title: 'Branch Number',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'organizationNumber',
            title: 'Organization Number',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'branchType',
            title: 'Branch Type',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'branchName',
            title: 'Branch Name (Editable)',
            type: 'string',
            description: 'This field can be edited locally while other API data remains read-only',
        }),
        defineField({
            name: 'branchStatus',
            title: 'Branch Status',
            type: 'object',
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
        defineField({
            name: 'branchActivities',
            title: 'Branch Activities',
            type: 'array',
            readOnly: true,
            of: [{
                type: 'object',
                fields: [
                    { name: 'globalActivityName', type: 'string' },
                    { name: 'localActivityName', type: 'string' },
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
                sv: '🇸🇪 SV',
                da: '🇩🇰 DA',
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
