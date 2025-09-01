# Enonic + Sanity Monorepo

This monorepo contains two main projects:
- **Enonic Frontend**: A Next.js application built with Enonic XP
- **Sanity CMS**: A headless CMS for content management

## Project Structure

```
enonic2/
├── apps/
│   ├── enonic-frontend/     # Next.js + Enonic XP frontend
│   └── sanity-cms/          # Sanity Studio CMS
├── package.json             # Root workspace configuration
└── README.md               # This file
```

## Prerequisites

- Node.js 18+ 
- Yarn package manager
- Enonic XP development environment (for the frontend)
- Sanity account (for the CMS)

## Getting Started

### 1. Install Dependencies

```bash
# Install root dependencies
yarn install

# Install dependencies for both projects
yarn workspace enonic-frontend install
yarn workspace sanity-cms install
```

### 2. Configure Sanity CMS

1. Navigate to the Sanity project:
   ```bash
   cd apps/sanity-cms
   ```

2. Initialize Sanity (if not already done):
   ```bash
   yarn sanity init
   ```

3. Update the `sanity.config.ts` file with your actual project ID:
   ```typescript
   projectId: 'your-actual-project-id', // Replace with your Sanity project ID
   ```

### 3. Configure Enonic Frontend

1. Ensure your Enonic XP development environment is set up
2. Update any environment variables or configuration as needed

## Available Scripts

### Root Level (Monorepo)

```bash
# Run both projects in development mode
yarn dev

# Run only Enonic frontend
yarn dev:enonic

# Run only Sanity CMS
yarn dev:sanity

# Build both projects
yarn build

# Build only Enonic frontend
yarn build:enonic

# Build only Sanity CMS
yarn build:sanity

# Lint both projects
yarn lint

# Clean all node_modules and build artifacts
yarn clean
```

### Enonic Frontend

```bash
cd apps/enonic-frontend

# Development server
yarn dev

# Production build
yarn build

# Start production server
yarn start

# Lint code
yarn lint
```

### Sanity CMS

```bash
cd apps/sanity-cms

# Development server
yarn dev

# Build for production
yarn build

# Deploy to Sanity
yarn deploy

# Deploy GraphQL API
yarn deploy-graphql

# Lint code
yarn lint
```

## Development Workflow

1. **Start both services**: `yarn dev`
   - Enonic frontend will run on `http://localhost:3000`
   - Sanity Studio will run on `http://localhost:3333`

2. **Content Management**: Use Sanity Studio to create and manage content

3. **Frontend Development**: Work on the Enonic frontend to consume and display content

## Integration

To integrate Sanity content with your Enonic frontend:

1. Install Sanity client in the Enonic frontend:
   ```bash
   cd apps/enonic-frontend
   yarn add @sanity/client
   ```

2. Create a Sanity client configuration
3. Fetch content from Sanity in your Enonic components
4. Use the content in your Enonic XP content types

## Environment Variables

### Sanity CMS
Create a `.env` file in `apps/sanity-cms/`:
```
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

### Enonic Frontend
Create a `.env.local` file in `apps/enonic-frontend/`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test both projects
4. Submit a pull request

## License

Apache-2.0
