import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'activity',
    title: 'Aktivitet',
    type: 'document',
    groups: [
        {
            name: 'description',
            title: 'Aktivitetsbeskrivelse',
        },
        {
            name: 'cta',
            title: 'Påmeldingsskjema',
        },
    ],
    fields: [
        defineField({
            name: 'language',
            title: 'Språk',
            type: 'string',
            initialValue: 'no',
            group: 'description',
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
            group: 'description',
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
                    'Flyktningguide',
                    'Våketjenesten'
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required().custom(async (activityType, context) => {
                const { document, getClient } = context
                const client = getClient({ apiVersion: '2023-01-01' })

                if (!activityType || !document?.language) {
                    return true
                }

                // Check if another document with the same activity type and language exists
                const existingDocs = await client.fetch(
                    `*[_type == "activity" && activityType == $activityType && language == $language && _id != $currentId]`,
                    {
                        activityType,
                        language: document.language,
                        currentId: document._id
                    }
                )

                if (existingDocs.length > 1) {
                    return `Det finnes allerede en global beskrivelse av "${activityType}" på ${document.language === 'no' ? 'norsk' : 'engelsk'}. Kun én aktivitetsbeskrivelse per aktivitetstype er tillatt.`
                }

                return true
            }),
        }),
        defineField({
            name: 'title',
            title: 'Tittel',
            type: 'string',
            group: 'description',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Ingress',
            type: 'text',
            rows: 3,
            group: 'description',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Hovedbilde',
            type: 'image',
            group: 'description',
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
            group: 'description',
            type: 'blockContent',
        }),
        defineField({
            name: 'cta',
            title: 'Påmeldingsskjema',
            type: 'object',
            group: ['cta'],
            fields: [
                defineField({
                    name: 'heading',
                    title: 'Overskrift',
                    type: 'string',
                }),
                defineField({
                    name: 'description',
                    title: 'Skjema intro',
                    type: 'string',
                }),
                defineField({
                    name: 'information',
                    title: 'Liten tekst over påmeldingsknapp',
                    type: 'string',
                }),
            ]
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
