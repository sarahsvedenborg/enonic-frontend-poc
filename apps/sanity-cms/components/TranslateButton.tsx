import React, { useState } from 'react'
import { Button, Card, Stack, Text, Box, Spinner } from '@sanity/ui'
import { TranslateIcon } from '@sanity/icons'
import { createClient } from '@sanity/client'

interface TranslateButtonProps {
    value?: any
    onChange: (patch: any) => void
    document: any
    type: any
}

// Create Sanity client for document operations
const client = createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'mtewzn7e',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
    apiVersion: '2023-05-03',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN, // You'll need to set this up
})

const TranslateButton: React.FC<TranslateButtonProps> = ({ onChange, document, type }) => {
    const [isTranslating, setIsTranslating] = useState(false)
    const [targetLanguage, setTargetLanguage] = useState('')

    const languages = [
        { title: 'Norwegian', value: 'no' },
        { title: 'Swedish', value: 'sv' },
        { title: 'Danish', value: 'da' },
    ]

    // Filter out current language
    const availableLanguages = languages.filter(lang => lang.value !== document?.language)

    const extractTextFields = (obj: any): Record<string, string> => {
        const textFields: Record<string, string> = {}

        const processField = (value: any, fieldName: string) => {
            if (typeof value === 'string' && value.trim()) {
                textFields[fieldName] = value
            } else if (Array.isArray(value)) {
                // Handle block content arrays
                if (value.length > 0 && value[0]._type === 'block') {
                    const textContent = value
                        .filter((block: any) => block._type === 'block')
                        .map((block: any) =>
                            block.children
                                ?.map((child: any) => child.text)
                                .join(' ')
                        )
                        .join('\n')
                        .trim()

                    if (textContent) {
                        textFields[fieldName] = textContent
                    }
                }
            }
        }

        // Process common text fields
        if (obj.title) processField(obj.title, 'title')
        if (obj.description) processField(obj.description, 'description')
        if (obj.body) processField(obj.body, 'body')

        return textFields
    }

    const translateText = async (text: string, targetLang: string): Promise<string> => {
        // This is a mock translation - in production you'd use a real translation API
        // For now, we'll simulate translation with a simple transformation

        const mockTranslations: Record<string, Record<string, string>> = {
            'no': {
                'Hello': 'Hallo',
                'Welcome': 'Velkommen',
                'Article': 'Artikkel',
                'Campaign': 'Kampanje',
                'Local Group': 'Lokallag',
                'Published': 'Publisert',
                'Draft': 'Kladd',
                'Active': 'Aktiv',
                'Inactive': 'Inaktiv',
                'Start Date': 'Startdato',
                'End Date': 'Sluttdato',
                'Fundraising Goal': 'Innsamlingsmål',
                'Amount Raised': 'Innsamlet beløp',
                'Campaign Body': 'Kampanjetekst',
                'Active Campaign': 'Aktiv kampanje',
                'Main image': 'Hovedbilde',
                'Description': 'Beskrivelse',
                'Body': 'Tekst',
            },
            'sv': {
                'Hello': 'Hej',
                'Welcome': 'Välkommen',
                'Article': 'Artikel',
                'Campaign': 'Kampanj',
                'Local Group': 'Lokalgrupp',
                'Published': 'Publicerad',
                'Draft': 'Utkast',
                'Active': 'Aktiv',
                'Inactive': 'Inaktiv',
                'Start Date': 'Startdatum',
                'End Date': 'Slutdatum',
                'Fundraising Goal': 'Insamlingsmål',
                'Amount Raised': 'Insamlat belopp',
                'Campaign Body': 'Kampanjtext',
                'Active Campaign': 'Aktiv kampanj',
                'Main image': 'Huvudbild',
                'Description': 'Beskrivning',
                'Body': 'Text',
            },
            'da': {
                'Hello': 'Hej',
                'Welcome': 'Velkommen',
                'Article': 'Artikel',
                'Campaign': 'Kampagne',
                'Local Group': 'Lokalgruppe',
                'Published': 'Publiceret',
                'Draft': 'Kladder',
                'Active': 'Aktiv',
                'Inactive': 'Inaktiv',
                'Start Date': 'Startdato',
                'End Date': 'Slutdato',
                'Fundraising Goal': 'Indsamlingsmål',
                'Amount Raised': 'Indsamlet beløb',
                'Campaign Body': 'Kampagnetekst',
                'Active Campaign': 'Aktiv kampagne',
                'Main image': 'Hovedbillede',
                'Description': 'Beskrivelse',
                'Body': 'Tekst',
            }
        }

        // Simple mock translation - replace common words
        let translatedText = text
        const translations = mockTranslations[targetLang] || {}

        Object.entries(translations).forEach(([english, translated]) => {
            const regex = new RegExp(`\\b${english}\\b`, 'gi')
            translatedText = translatedText.replace(regex, translated)
        })

        // Add a small delay to simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        return translatedText
    }

    const createTranslatedDocument = async (translatedData: any) => {
        try {
            // Create the new document
            const result = await client.create(translatedData)
            console.log('Created translated document:', result)
            return result
        } catch (error) {
            console.error('Failed to create translated document:', error)
            throw error
        }
    }

    const handleTranslate = async () => {
        if (!targetLanguage || !document) return

        setIsTranslating(true)

        try {
            // Extract text fields from current document
            const textFields = extractTextFields(document)

            // Translate each text field
            const translatedFields: Record<string, any> = {}

            for (const [fieldName, text] of Object.entries(textFields)) {
                const translatedText = await translateText(text, targetLanguage)

                if (fieldName === 'body') {
                    // Handle block content translation
                    translatedFields.body = document.body.map((block: any) => {
                        if (block._type === 'block') {
                            return {
                                ...block,
                                children: block.children?.map((child: any) => ({
                                    ...child,
                                    text: translateText(child.text, targetLanguage)
                                }))
                            }
                        }
                        return block
                    })
                } else {
                    translatedFields[fieldName] = translatedText
                }
            }

            // Create new document with translated content
            const newDocument = {
                _type: document._type,
                language: targetLanguage,
                ...translatedFields,
                // Preserve non-text fields
                mainImage: document.mainImage,
                slug: document.slug ? {
                    ...document.slug,
                    current: `${document.slug.current}-${targetLanguage}`
                } : undefined,
                publishedAt: document.publishedAt,
                isActive: document.isActive,
                isPublished: document.isPublished,
                startDate: document.startDate,
                endDate: document.endDate,
                goal: document.goal,
                raised: document.raised,
            }

            // Create the translated document
            const result = await createTranslatedDocument(newDocument)

            // Show success message and redirect to the new document
            alert(`Translation to ${targetLanguage} completed! New document created.`)

            // In a real implementation, you might want to redirect to the new document
            // window.location.href = `/studio/desk/${document._type};${result._id}`

        } catch (error) {
            console.error('Translation failed:', error)
            alert('Translation failed. Please try again.')
        } finally {
            setIsTranslating(false)
            setTargetLanguage('')
        }
    }

    if (!document?.language) {
        return (
            <Card padding={3} radius={2} shadow={1}>
                <Text>Please set a language for this document first.</Text>
            </Card>
        )
    }

    return (
        <Card padding={3} radius={2} shadow={1}>
            <Stack space={3}>
                <Text size={2} weight="semibold">
                    <TranslateIcon /> AI Translation
                </Text>

                <Text size={1} muted>
                    Translate this document to another language using AI assistance.
                </Text>

                <Box>
                    <select
                        value={targetLanguage}
                        onChange={(e) => setTargetLanguage(e.target.value)}
                        disabled={isTranslating}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <option value="">Select target language...</option>
                        {availableLanguages.map(lang => (
                            <option key={lang.value} value={lang.value}>
                                {lang.title}
                            </option>
                        ))}
                    </select>
                </Box>

                <Button
                    mode="default"
                    onClick={handleTranslate}
                    disabled={!targetLanguage || isTranslating}
                    icon={isTranslating ? Spinner : TranslateIcon}
                    text={isTranslating ? 'Translating...' : 'Translate Document'}
                />

                {isTranslating && (
                    <Text size={1} muted>
                        Translating content to {targetLanguage}...
                    </Text>
                )}
            </Stack>
        </Card>
    )
}

export default TranslateButton
