import { defineField, defineType } from 'sanity'
import TranslateInput from '../components/TranslateInput'

export default defineType({
    name: 'article',
    title: 'Article',
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
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
            initialValue: 'no',
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
            name: 'branchRelated',
            title: 'Tilhører lokalforening',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'branchId',
            title: 'Tilhørende lokalforening',
            type: 'reference',
            to: [{ type: 'localGroup' }],
            hidden: ({ parent }) => parent?.branchRelated === false,
        }),
        defineField({
            name: 'excerpt',
            title: 'Ingress',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        }),
        defineField({
            name: 'relatedContent',
            title: 'Relatert innhold',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'article' } }],
        }),

    ],
    preview: {
        select: {
            title: 'title',
            language: 'language',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const { language, author } = selection
            const languageLabels: Record<string, string> = {
                en: '🇺🇸 EN',
                no: '🇳🇴 NO',
                sv: '🇸🇪 SV',
                da: '🇩🇰 DA',
            }
            const languageLabel = languageLabels[language] || language

            return {
                ...selection,
                subtitle: `${languageLabel}${author ? ` - by ${author}` : ''}`
            }
        },
    },
})
