import { defineField, defineType } from 'sanity'

const menuElementFields = [
    {
        type: 'object',
        name: 'menuItem',
        title: 'Menyelement',
        fields: [
            defineField({
                name: 'label',
                title: 'Etikett',
                type: 'string',
                description: 'Tekst som vises i menyen',
                validation: (Rule) => Rule.required(),
            }),
            defineField({
                name: 'menuType',
                title: 'Menytype',
                type: 'string',
                options: {
                    list: [
                        { title: 'Ekstern lenke', value: 'external' },
                        { title: 'Intern side', value: 'internal' },
                        { title: 'Dropdown', value: 'dropdown' },
                        { title: 'Kampanje', value: 'campaign' },
                        { title: 'Lokalforening', value: 'localGroup' },
                        { title: 'Artikkel', value: 'article' },
                        { title: 'Nyhetsartikkel', value: 'newsArticle' },
                    ],
                    layout: 'dropdown',
                },
                validation: (Rule) => Rule.required(),
            }),
            defineField({
                name: 'url',
                title: 'URL',
                type: 'string',
                description: 'For eksterne lenker (f.eks. https://example.com)',
                hidden: ({ parent }) => parent?.menuType !== 'external',
            }),
            defineField({
                name: 'internalPage',
                title: 'Intern side',
                type: 'string',
                description: 'For interne sider (f.eks. /om-oss, /kontakt)',
                hidden: ({ parent }) => parent?.menuType !== 'internal',
            }),
            defineField({
                name: 'campaign',
                title: 'Kampanje',
                type: 'reference',
                to: [{ type: 'campaign' }],
                hidden: ({ parent }) => parent?.menuType !== 'campaign',
            }),
            defineField({
                name: 'localGroup',
                title: 'Lokalforening',
                type: 'reference',
                to: [{ type: 'localGroup' }],
                hidden: ({ parent }) => parent?.menuType !== 'localGroup',
            }),
            defineField({
                name: 'article',
                title: 'Artikkel',
                type: 'reference',
                to: [{ type: 'article' }],
                hidden: ({ parent }) => parent?.menuType !== 'article',
            }),
            defineField({
                name: 'newsArticle',
                title: 'Nyhetsartikkel',
                type: 'reference',
                to: [{ type: 'newsArticle' }],
                hidden: ({ parent }) => parent?.menuType !== 'newsArticle',
            }),
            defineField({
                name: 'subItems',
                title: 'Undermeny',
                type: 'array',
                of: [
                    {
                        type: 'object',
                        name: 'subMenuItem',
                        title: 'Undermenyelement',
                        fields: [
                            defineField({
                                name: 'label',
                                title: 'Etikett',
                                type: 'string',
                                validation: (Rule) => Rule.required(),
                            }),
                            defineField({
                                name: 'subMenuType',
                                title: 'Undermenytype',
                                type: 'string',
                                options: {
                                    list: [
                                        { title: 'Ekstern lenke', value: 'external' },
                                        { title: 'Intern side', value: 'internal' },
                                        { title: 'Kampanje', value: 'campaign' },
                                        { title: 'Lokalforening', value: 'localGroup' },
                                        { title: 'Artikkel', value: 'article' },
                                        { title: 'Nyhetsartikkel', value: 'newsArticle' },
                                    ],
                                    layout: 'dropdown',
                                },
                                validation: (Rule) => Rule.required(),
                            }),
                            defineField({
                                name: 'url',
                                title: 'URL',
                                type: 'string',
                                hidden: ({ parent }) => parent?.subMenuType !== 'external',
                            }),
                            defineField({
                                name: 'internalPage',
                                title: 'Intern side',
                                type: 'string',
                                hidden: ({ parent }) => parent?.subMenuType !== 'internal',
                            }),
                            defineField({
                                name: 'campaign',
                                title: 'Kampanje',
                                type: 'reference',
                                to: [{ type: 'campaign' }],
                                hidden: ({ parent }) => parent?.subMenuType !== 'campaign',
                            }),
                            defineField({
                                name: 'localGroup',
                                title: 'Lokalforening',
                                type: 'reference',
                                to: [{ type: 'localGroup' }],
                                hidden: ({ parent }) => parent?.subMenuType !== 'localGroup',
                            }),
                            defineField({
                                name: 'article',
                                title: 'Artikkel',
                                type: 'reference',
                                to: [{ type: 'article' }],
                                hidden: ({ parent }) => parent?.subMenuType !== 'article',
                            }),
                            defineField({
                                name: 'newsArticle',
                                title: 'Nyhetsartikkel',
                                type: 'reference',
                                to: [{ type: 'newsArticle' }],
                                hidden: ({ parent }) => parent?.subMenuType !== 'newsArticle',
                            }),
                        ],
                        preview: {
                            select: {
                                title: 'label',
                                subtitle: 'subMenuType',
                            },
                            prepare(selection) {
                                const { title, subtitle } = selection
                                return {
                                    title,
                                    subtitle: `Type: ${subtitle}`,
                                }
                            },
                        },
                    },
                ],
                hidden: ({ parent }) => parent?.menuType !== 'dropdown',
            }),
            defineField({
                name: 'isVisible',
                title: 'Synlig',
                type: 'boolean',
                initialValue: true,
                description: 'Skjul eller vis dette menyelementet',
            }),
            defineField({
                name: 'openInNewTab',
                title: 'Åpne i ny fane',
                type: 'boolean',
                initialValue: false,
                description: 'Åpne lenken i en ny fane (kun for eksterne lenker)',
                hidden: ({ parent }) => parent?.menuType !== 'external',
            }),
        ],
        preview: {
            select: {
                title: 'label',
                subtitle: 'menuType',
                hasSubItems: 'subItems',
            },
            prepare(selection) {
                const { title, subtitle, hasSubItems } = selection
                const subItemsText = hasSubItems && hasSubItems.length > 0 ? ` (${hasSubItems.length} undermeny)` : ''
                return {
                    title,
                    subtitle: `Type: ${subtitle}${subItemsText}`,
                }
            },
        },
    },
]

export default defineType({
    name: 'mainMenu',
    title: 'Hovedmeny',
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
            name: 'menuLocation',
            title: 'Menyplassering',
            type: 'string',
            options: {
                list: [
                    { title: 'Hovedmeny (topp)', value: 'header' },
                    { title: 'Footer meny', value: 'footer' },
                    { title: 'Sidebar', value: 'sidebar' },
                    { title: 'Mobil meny', value: 'mobile' },
                ],
                layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Tittel',
            type: 'string',
            description: 'Navn på menyen (f.eks. "Hovedmeny", "Footer meny")',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'menuItems',
            title: 'Menyelementer - primær',
            type: 'array',
            of: menuElementFields,
        }),
        defineField({
            name: 'menuItemsSecondary',
            title: 'Menyelementer - sekundær',
            type: 'array',
            of: menuElementFields,
        }),
        defineField({
            name: 'menuItemsTertiary',
            title: 'Menyelementer - tredje',
            type: 'array',
            of: menuElementFields,
        }),



    ],
    preview: {
        select: {
            title: 'title',
            language: 'language',
            menuLocation: 'menuLocation',
            isActive: 'isActive',
        },
        prepare(selection) {
            const { title, language, menuLocation, isActive } = selection
            const languageLabels: Record<string, string> = {
                en: '🇺🇸 EN',
                no: '🇳🇴 NO',
            }
            const locationLabels: Record<string, string> = {
                header: 'Hovedmeny',
                footer: 'Footer',
                sidebar: 'Sidebar',
                mobile: 'Mobil',
            }
            const languageLabel = languageLabels[language] || language
            const locationLabel = locationLabels[menuLocation] || menuLocation

            return {
                title,
                subtitle: `${languageLabel} - ${locationLabel} - ${isActive ? 'Aktiv' : 'Inaktiv'}`,
            }
        },
    },
    orderings: [
        {
            title: 'Språk, A-Å',
            name: 'languageAsc',
            by: [{ field: 'language', direction: 'asc' }],
        },
        {
            title: 'Menyplassering, A-Å',
            name: 'menuLocationAsc',
            by: [{ field: 'menuLocation', direction: 'asc' }],
        },
        {
            title: 'Tittel, A-Å',
            name: 'titleAsc',
            by: [{ field: 'title', direction: 'asc' }],
        },
    ],
})
