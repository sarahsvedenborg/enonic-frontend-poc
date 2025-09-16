import { FiCalendar } from 'react-icons/fi'
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'event',
    title: 'Arrangement',
    type: 'document',
    icon: FiCalendar,
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
            name: 'localBranch',
            title: 'Lokalforening',
            type: 'reference',
            to: [{ type: 'localGroup' }],
        }),
        defineField({
            name: 'title',
            title: 'Tittel',
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
            name: 'time',
            title: 'Tidspunkt',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Sted',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'body',
            title: 'Beskrivelse',
            type: 'blockContent',
        }),




    ],
    preview: {
        select: {
            title: 'title',
            time: 'time',
            location: 'location',
            localBranch: 'localBranch.branchName',
        },
        prepare(selection) {
            const { title, time, location, localBranch } = selection
            const eventDate = time ? new Date(time).toLocaleDateString('no-NO') : 'Ingen dato'
            const eventTime = time ? new Date(time).toLocaleTimeString('no-NO', {
                hour: '2-digit',
                minute: '2-digit'
            }) : ''

            return {
                title,
                subtitle: `${eventDate} ${eventTime} • ${location} • ${localBranch || 'Ukjent lokalforening'}`,
            }
        },
    },
    orderings: [
        {
            title: 'Tidspunkt, Nærmeste',
            name: 'timeAsc',
            by: [{ field: 'time', direction: 'asc' }],
        },
        {
            title: 'Tidspunkt, Lengst frem',
            name: 'timeDesc',
            by: [{ field: 'time', direction: 'desc' }],
        },
        {
            title: 'Publisert dato, Nyeste',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
        {
            title: 'Tittel, A-Å',
            name: 'titleAsc',
            by: [{ field: 'title', direction: 'asc' }],
        },
    ],
})
