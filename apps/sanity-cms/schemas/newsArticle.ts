import { defineField, defineType } from 'sanity'
import TranslateInput from '../components/TranslateInput'

export default defineType({
    name: 'newsArticle',
    title: 'News Article',
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
            name: 'branchId',
            title: 'Tilhørende lokalforening',
            type: 'reference',
            to: [{ type: 'localGroup' }],
            hidden: ({ parent }) => parent?.branchRelated === false,
        }),
        /*  defineField({
             name: 'author',
             title: 'Author',
             type: 'reference',
             to: [{ type: 'author' }],
         }), */
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        /*   defineField({
               name: 'categories',
               title: 'Categories',
               type: 'array',
               of: [{ type: 'reference', to: { type: 'category' } }],
           }), */
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
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
            name: 'hideNewsletterSignup',
            title: 'Hide Newsletter Signup',
            type: 'boolean',
            initialValue: false,
        }),
        /*   defineField({
              name: 'translate',
              title: 'AI Translation',
              type: 'string',
              components: {
                  input: TranslateInput,
              },
              readOnly: true,
          }), */
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
