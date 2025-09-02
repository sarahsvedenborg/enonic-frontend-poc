import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { deskStructure } from './deskStructure'
import { assist } from '@sanity/assist'


export default defineConfig({
    name: 'default',
    title: 'Røde Kors',

    projectId: process.env.SANITY_PROJECT_ID || 'mtewzn7e', // Replace with your actual project ID
    dataset: 'production',

    plugins: [
        deskTool({
            structure: deskStructure,
        }),
        visionTool(),
        assist({
            translate: {
                // Style guide for the translation agent. Max 2000 chars.
                styleguide: 'Be extremely formal and precise. Mimick Spock from Star Trek.',
                document: {
                    // The name of the field that holds the current language
                    // in the form of a language code e.g. 'en', 'fr', 'nb_NO'.
                    // Required
                    languageField: 'language',
                    // Optional extra filter for document types.
                    // If not set, translation is enabled for all documents
                    // that has a field with the name defined above.
                    documentTypes: ['article'],
                }
            }
        })
        /*       translationPlugin(), */
    ],

    schema: {
        types: schemaTypes,
    },

    basePath: '/studio',
})
