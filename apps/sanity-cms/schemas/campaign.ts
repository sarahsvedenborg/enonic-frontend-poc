import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'campaign',
    title: 'Campaign',
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
            name: 'startDate',
            title: 'Start Date',
            type: 'datetime',
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'datetime',
        }),
        defineField({
            name: 'goal',
            title: 'Fundraising Goal',
            type: 'number',
        }),
        defineField({
            name: 'raised',
            title: 'Amount Raised',
            type: 'number',
        }),
        defineField({
            name: 'body',
            title: 'Campaign Body',
            type: 'blockContent',
        }),
        defineField({
            name: 'isActive',
            title: 'Active Campaign',
            type: 'boolean',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            isActive: 'isActive',
        },
        prepare(selection) {
            const { isActive } = selection
            return {
                ...selection,
                subtitle: isActive ? 'Active Campaign' : 'Inactive Campaign',
            }
        },
    },
})
