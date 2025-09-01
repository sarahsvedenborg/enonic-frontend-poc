import { defineField, defineType } from 'sanity'

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
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            isPublished: 'isPublished',
        },
        prepare(selection) {
            const { isPublished } = selection
            return {
                ...selection,
                subtitle: isPublished ? 'Published' : 'Draft',
            }
        },
    },
})
