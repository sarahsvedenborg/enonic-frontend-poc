import { defineField } from "sanity";

export default defineField({
    name: 'donationForm',
    title: 'Giverskjema',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Tittel på giverskjema (brukes i sanity)',
            type: 'string',
        }),
        defineField({
            name: 'donationFormType',
            title: 'Kompakt eller stort skjema',
            type: 'string',
            options: {
                list: [{ title: 'Kun beløpsbokser', value: 'compact' }, { title: 'Utfyllende informasjon', value: 'extended' }],
                layout: 'radio',
                direction: 'horizontal',
            },
        }),
        defineField({
            name: 'heading',
            title: 'Overskrift på giverskjema',
            type: 'string',
            hidden: ({ parent }) => parent?.donationFormType === 'compact',
        }),
        defineField({
            name: 'description',
            title: 'Beskrivelse',
            type: 'text',
            rows: 5,
            hidden: ({ parent }) => parent?.donationFormType === 'compact',
        }),
        defineField({
            name: 'amounts',
            title: 'Beløp',
            type: 'array',
            of: [{ type: 'number' }],
        }),
        defineField({
            name: 'fact',
            title: 'Fakta',
            type: 'string',
            hidden: ({ parent }) => parent?.donationFormType === 'compact',
        }),
        /*   defineField({
              name: 'factIcon',
              title: 'Ikon for faktaboks',
              type: 'image',
              hidden: ({ parent }) => parent?.donationFormType === 'compact',
          }), */
    ],
    preview: {
        select: {
            title: 'title',
            donationFormType: 'donationFormType',
        },
        prepare(selection) {
            const { title, donationFormType } = selection
            return { title: title, subtitle: donationFormType === 'compact' ? 'Kun beløpsbokser' : 'Utfyllende informasjon' }
        }
    }
})