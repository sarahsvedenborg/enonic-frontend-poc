import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
    name: 'default',
    title: 'Enonic Sanity CMS',

    projectId: process.env.SANITY_PROJECT_ID || 'mtewzn7e', // Replace with your actual project ID
    dataset: 'production',

    plugins: [deskTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },

    basePath: '/studio',
})
