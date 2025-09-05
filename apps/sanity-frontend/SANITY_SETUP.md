# Sanity Setup Instructions

## Environment Variables

Create a `.env.local` file in the `apps/sanity-frontend` directory with the following variables:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token

# Optional: For write operations
SANITY_WRITE_TOKEN=your-write-token
```

## Getting Your Sanity Credentials

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to the "API" tab
4. Copy your Project ID and Dataset name
5. Create an API token if you need write access

## Campaign Schema

Make sure your Sanity project has a `campaign` document type with at least these fields:

- `title` (string)
- `slug` (slug)
- `description` (text, optional)
- `content` (array, optional)
- `publishedAt` (datetime, optional)
- `language` (string, optional)

## Testing

1. Install dependencies: `yarn install`
2. Set up your environment variables
3. Run the development server: `yarn dev`
4. Visit `/kampanjer` to see the campaign list
5. Visit `/kampanjer/[slug]` to see individual campaigns
