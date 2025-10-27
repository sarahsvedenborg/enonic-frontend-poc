# NextAuth with Okta Authentication Setup

This guide explains how to set up authentication in the sanity frontend using NextAuth v4 with Okta as the identity provider.

## Prerequisites

1. An Okta developer account
2. Node.js and npm/yarn installed

## Setup Steps

### 1. Install Dependencies

The latest NextAuth v4 is already installed in package.json:

```json
{
  "dependencies": {
    "next-auth": "^4.24.7"
  }
}
```

### 2. Environment Variables

Create a `.env.local` file in the `apps/sanity-frontend` directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Okta Configuration
OKTA_CLIENT_ID=your-okta-client-id
OKTA_CLIENT_SECRET=your-okta-client-secret
OKTA_ISSUER=https://your-okta-domain.okta.com/oauth2/default
```

### 3. Okta Application Setup

1. Log in to your Okta Developer Console
2. Create a new Web Application
3. Set the following:
   - **Sign-in redirect URIs**: `http://localhost:3000/api/auth/callback/okta`
   - **Sign-out redirect URIs**: `http://localhost:3000`
   - **Initiate login URI**: `http://localhost:3000/api/auth/signin`
4. Copy the Client ID and Client Secret to your environment variables
5. Use your Okta domain for the issuer URL

### 4. Features Implemented

The authentication system includes:

- **Sign-in Button**: "Min side" button in the header that triggers Okta authentication
- **Session Management**: Automatic session handling with NextAuth v4
- **User Dashboard**: Protected `/min-side` page showing user information
- **Sign-out**: Logout functionality that clears the session
- **Loading States**: Proper loading indicators during authentication
- **User Display**: Shows user name/email when logged in

### 5. Usage

1. Click the "Min side" button in the header
2. You'll be redirected to Okta for authentication
3. After successful login, you'll be redirected to `/min-side`
4. The header will show your name and a logout button
5. Click "Logg ut" to sign out

### 6. File Structure

```
apps/sanity-frontend/
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/route.ts  # NextAuth configuration
│   │   ├── providers.tsx                    # SessionProvider wrapper
│   │   ├── layout.tsx                       # App layout with providers
│   │   └── min-side/page.tsx               # User dashboard
│   └── hooks/
│       └── useAuth.ts                       # Authentication hook
└── .env.local                               # Environment variables
```

### 7. Customization

You can customize the user dashboard by editing:
- `apps/sanity-frontend/src/app/min-side/page.tsx` - Main dashboard page
- `apps/ui-lib/components/Header/Header.tsx` - Header authentication UI
- `apps/sanity-frontend/src/app/api/auth/[...nextAuth]/route.ts` - NextAuth configuration

### 8. Troubleshooting

- Make sure all environment variables are set correctly
- Verify Okta application configuration matches the redirect URIs
- Check browser console for any authentication errors
- Ensure NextAuth dependencies are installed

## Security Notes

- Never commit `.env.local` files to version control
- Use strong, unique values for `NEXTAUTH_SECRET`
- Regularly rotate Okta client secrets
- Consider using environment-specific Okta applications for production