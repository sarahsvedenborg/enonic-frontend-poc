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
            description: 'Her kan du velge blant de aktivitetestypene som finnes i CRM',
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
                    'Flyktningguide'
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

            return {
                title,
                subtitle: `${activityType} • ${subtitle ? subtitle.substring(0, 100) + (subtitle.length > 100 ? '...' : '') : ''}`,
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
