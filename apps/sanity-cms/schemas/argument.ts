import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'argument',
    title: 'Argument/God grunn',
    type: 'document',
    fields: [
        defineField({
            name: 'language',
            title: 'Språk',
            type: 'string',
            options: {
                list: [
                    { title: 'Norsk', value: 'no' },
                    { title: 'English', value: 'en' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Tittel',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Ingress',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Bilde',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt tekst',
                    description: 'Viktig for tilgjengelighet og SEO',
                },
            ],
        }),
        defineField({
            name: 'linkLabel',
            title: 'Lenketekst',
            type: 'string',
        }),
        defineField({
            name: 'article',
            title: 'Relatert artikkel',
            type: 'reference',
            to: { type: 'article' },
            description: 'Velg en artikkel som dette argumentet refererer til',
        }),


    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'excerpt',
            media: 'image',
        },
        prepare(selection) {
            const { title, subtitle, media } = selection
            return {
                title: title,
                subtitle: subtitle ? subtitle.substring(0, 100) + '...' : 'Ingen ingress',
                media: media,
            }
        },
    },
    orderings: [
        {
            title: 'Publisert dato (nyeste først)',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
        {
            title: 'Publisert dato (eldste først)',
            name: 'publishedAtAsc',
            by: [{ field: 'publishedAt', direction: 'asc' }],
        },
        {
            title: 'Tittel (A-Å)',
            name: 'titleAsc',
            by: [{ field: 'title', direction: 'asc' }],
        },
    ],
})
