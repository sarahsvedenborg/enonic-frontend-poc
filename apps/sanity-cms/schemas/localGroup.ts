import { defineField, defineType } from 'sanity'
import TranslateInput from '../components/TranslateInput'

export default defineType({
    name: 'localGroup',
    title: 'Lokallag',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
                slugify: (input, schemaType, context) => { console.log(context, 'slugify'); return context.parent.branchLocation.county.toLowerCase().replace(/\s+/g, '-') + '/' + input.split(' ')[0].toLowerCase().replace(/\s+/g, '-') },
            },
            validation: (Rule) => Rule.required(),
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
            name: 'description',
            title: 'Description',
            type: 'text',
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
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'translate',
            title: 'AI Translation',
            type: 'string',
            components: {
                input: TranslateInput,
            },
            readOnly: true,
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
