import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'activity',
    title: 'Aktivitet',
    type: 'document',
    fields: [
        defineField({
            name: 'language',
            title: 'Språk',
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
                    { title: 'Annet', value: 'annet' },
                ],
                layout: 'dropdown',
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
            name: 'mainImage',
            title: 'Hovedbilde',
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
        }),

        defineField({
            name: 'body',
            title: 'Innhold',
            type: 'blockContent',
        }),

        /*   defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {
                  source: 'title',
                  maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
          }), */
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'excerpt',
            media: 'mainImage',
            activityType: 'activityType',
        },
        prepare(selection) {
            const { title, subtitle, media, activityType } = selection
            const activityTypeTitle = {
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
            }[activityType] || activityType

            return {
                title,
                subtitle: `${activityTypeTitle} • ${subtitle ? subtitle.substring(0, 100) + (subtitle.length > 100 ? '...' : '') : ''}`,
                media,
            }
        },
    },
    orderings: [
        {
            title: 'Publisert dato, Nyeste',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
        {
            title: 'Publisert dato, Eldste',
            name: 'publishedAtAsc',
            by: [{ field: 'publishedAt', direction: 'asc' }],
        },
        {
            title: 'Tittel, A-Å',
            name: 'titleAsc',
            by: [{ field: 'title', direction: 'asc' }],
        },
        {
            title: 'Aktivitetstype, A-Å',
            name: 'activityTypeAsc',
            by: [{ field: 'activityType', direction: 'asc' }],
        },
    ],
})
