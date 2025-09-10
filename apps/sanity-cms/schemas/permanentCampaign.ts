import { defineField, defineType } from 'sanity'
import TranslateInput from '../components/TranslateInput'

export default defineType({
    name: 'permanentCampaign',
    title: 'Permanent Campaign',
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
        /*  defineField({
             name: 'description',
             title: 'Description',
             type: 'text',
             rows: 5
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
              name: 'startDate',
              title: 'Start Date',
              type: 'datetime',
          }),
          defineField({
              name: 'endDate',
              title: 'End Date',
              type: 'datetime',
          }), */

        defineField({
            name: 'donation',
            title: 'Giverskjema',
            type: 'reference',
            to: [{ type: 'donationForm' }]
        }),
        defineField({
            name: 'showCommerce',
            title: 'Vis produkter fra nettbutikk',
            type: 'boolean',
            initialValue: true,
        }),

        defineField({
            name: 'body',
            title: 'Campaign Body',
            type: 'blockContent',
        }),
        defineField({
            name: 'otherActivities',
            title: 'Andre aktive måter å støtte på',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'article' } }],
        }),
        defineField({
            name: 'organizationsAndIndustry',
            title: 'Informasjon til bedrifter og næringsliv',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'article' } }],
        }),
        defineField({
            name: 'otherSuppert',
            title: 'Andre måter å støtte på',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'article' } }],
        }),
        defineField({
            name: 'support',
            title: 'Kundeservice',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'article' } }],
        }),
        defineField({
            name: 'arguments',
            title: 'Argumenter',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'argument' } }],
        }),

    ],
    preview: {
        select: {
            title: 'title',
            language: 'language',
            media: 'mainImage',
            isActive: 'isActive',
        },
        prepare(selection) {
            const { language, isActive } = selection
            const languageLabels: Record<string, string> = {
                en: '🇺🇸 EN',
                no: '🇳🇴 NO',
                sv: '🇸🇪 SV',
                da: '🇩🇰 DA',
            }
            const languageLabel = languageLabels[language] || language

            return {
                ...selection,
                subtitle: `${languageLabel} - ${isActive ? 'Active' : 'Inactive'}`,
            }
        },
    },
})
