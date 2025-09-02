# Sanity Frontend

A simple Next.js frontend application ready to be connected to your Sanity CMS.

## Features

- **Next.js 14**: Latest version with App Router
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Full type safety
- **PostCSS**: Custom CSS with PostCSS processing
- **Responsive Design**: Mobile-first approach
- **Simple Layout**: Clean, modern design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── globals.css       # Global styles with PostCSS
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components (if any)
└── lib/                  # Utility functions (if any)
```

## Pages

- **Home** (`/`) - Landing page with feature highlights
- **About** (`/about`) - Information about the application
- **Contact** (`/contact`) - Contact form and information

## Customization

This is a starter template that you can customize:

1. **Update content** in the page components
2. **Modify styling** using custom CSS classes
3. **Add new pages** in the `src/app` directory
4. **Integrate with Sanity** by adding the Sanity client

## Next Steps

To connect this frontend with Sanity CMS:

1. Install Sanity client: `npm install @sanity/client`
2. Configure Sanity connection in `src/lib/sanity.ts`
3. Create content schemas in your Sanity Studio
4. Fetch and display content from Sanity

## Deployment

This application can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any platform that supports Node.js

## License

This project is open source and available under the [MIT License](LICENSE).
