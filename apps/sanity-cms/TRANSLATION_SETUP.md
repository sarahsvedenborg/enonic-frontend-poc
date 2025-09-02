# Language Setup Guide

This Sanity CMS is configured with simple language selection for all content types and AI-assisted translation capabilities. Here's how to use the language system:

## Content Types with Language Support

- **Articles** (`article`)
- **Campaigns** (`campaign`) 
- **Local Groups** (`localGroup`)

## Language Field

Each content type includes a **Language** field with these options:
- **English** (en)
- **Norwegian** (no)
- **Swedish** (sv)
- **Danish** (da)

## AI Translation Feature

### Overview
The CMS includes an AI translation feature that allows you to automatically translate documents to other languages while preserving non-text values like images, dates, and metadata.

### How to Use AI Translation

1. **Open a Document**: Edit any article, campaign, or local group document
2. **Find Translation Field**: Look for the "AI Translation" field at the bottom of the form
3. **Select Target Language**: Choose the language you want to translate to
4. **Click Translate**: The system will:
   - Extract all text content from the document
   - Translate text fields using AI
   - Preserve non-text values (images, dates, numbers, etc.)
   - Create a new document in the target language
   - Generate a new slug with language suffix

### What Gets Translated
- **Title**: Document title
- **Description**: Document description
- **Body**: Rich text content (block content)
- **Slug**: Automatically updated with language suffix

### What Gets Preserved
- **Images**: All image references
- **Dates**: Published dates, start/end dates
- **Numbers**: Goals, amounts raised
- **Boolean values**: Active status, published status
- **References**: Any document references

### Translation Quality
Currently using mock translations for demonstration. In production, you can integrate with:
- Google Translate API
- DeepL API
- Azure Translator
- OpenAI GPT for context-aware translations

## Content Organization

The desk structure organizes content by language:

### By Language
- **English Content**: All English articles, campaigns, and local groups
- **Norwegian Content**: All Norwegian articles, campaigns, and local groups
- **Swedish Content**: All Swedish articles, campaigns, and local groups
- **Danish Content**: All Danish articles, campaigns, and local groups

### Overview
- **All Content**: Complete overview of all content regardless of language

## Workflow

### Manual Content Creation
1. **Create Content**: Select the appropriate language when creating new content
2. **Organize by Language**: Use the desk structure to view content by language
3. **Independent Content**: Each language version is independent

### AI-Assisted Translation
1. **Create Source Content**: Create content in one language (e.g., English)
2. **Use AI Translation**: Use the translation feature to create versions in other languages
3. **Review and Edit**: Review the translated content and make any necessary adjustments
4. **Publish**: Publish the translated content

## Environment Variables

Create a `.env` file in the `apps/sanity-cms/` directory:

```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_API_TOKEN=your-api-token
```

**Important**: The `SANITY_API_TOKEN` is required for the AI translation feature to create new documents. You can create a token in your Sanity project settings.

## Querying Content by Language

When querying content from your frontend, filter by language:

```groq
// Get all Norwegian articles
*[_type == "article" && language == "no"] {
  _id,
  title,
  body,
  publishedAt
}

// Get all English campaigns
*[_type == "campaign" && language == "en"] {
  _id,
  title,
  description,
  isActive
}

// Get all Swedish local groups
*[_type == "localGroup" && language == "sv"] {
  _id,
  title,
  description,
  isPublished
}
```

## Visual Indicators

In the CMS, content previews show:
- Language flag (🇺🇸 EN, 🇳🇴 NO, 🇸🇪 SV, 🇩🇰 DA)
- Content status (Published/Draft, Active/Inactive)
- Author information (for articles)

## Best Practices

1. **Consistent Language Selection**: Always set the language field when creating content
2. **Use AI Translation**: Leverage the AI translation feature for efficiency
3. **Review Translations**: Always review and edit AI-translated content
4. **Use Language-Specific Views**: Navigate to the appropriate language section in the desk
5. **Clear Naming**: Use descriptive titles that work for each language
6. **Content Independence**: Treat each language version as separate content

## Setting Up Real Translation APIs

To use real translation services instead of mock translations:

1. **Choose a Service**: Select Google Translate, DeepL, Azure, or OpenAI
2. **Get API Keys**: Obtain API credentials from your chosen service
3. **Update Environment**: Add API keys to your environment variables
4. **Modify Translation Logic**: Update the `translateText` function in `TranslateButton.tsx`
5. **Test**: Verify translations work correctly with your content
