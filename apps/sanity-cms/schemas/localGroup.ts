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
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
            options: {
                list: [
                    { title: 'English', value: 'en' },
                    { title: 'Norwegian', value: 'no' },
                    { title: 'Swedish', value: 'sv' },
                    { title: 'Danish', value: 'da' },
                ],
                layout: 'dropdown',
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
    ],
    preview: {
        select: {
            title: 'title',
            language: 'language',
            media: 'mainImage',
            isPublished: 'isPublished',
        },
        prepare(selection) {
            const { language, isPublished } = selection
            const languageLabels: Record<string, string> = {
                en: '🇺🇸 EN',
                no: '🇳🇴 NO',
                sv: '🇸🇪 SV',
                da: '🇩🇰 DA',
            }
            const languageLabel = languageLabels[language] || language

            return {
                ...selection,
                subtitle: `${languageLabel} - ${isPublished ? 'Published' : 'Draft'}`,
            }
        },
    },
})
