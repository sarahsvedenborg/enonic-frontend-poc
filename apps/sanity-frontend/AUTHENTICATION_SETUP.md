# Authentication Setup with NextAuth and Okta

This guide explains how to set up authentication in the sanity frontend using NextAuth with Okta as the identity provider.

## Prerequisites

1. An Okta developer account
2. Node.js and npm/yarn installed

## Setup Steps

### 1. Install Dependencies

First, install the required dependencies:

```bash
# In the sanity-frontend directory
npm install next-auth@3.29.0

# In the ui-lib directory  
npm install next-auth@3.29.0
```

**Note**: This project uses NextAuth v3.29.0 with a custom authentication approach:
- Uses a custom `useAuth` hook that uses NextAuth v3's `getSession` function
- Avoids TypeScript issues with NextAuth v3 by using dynamic imports
- Uses `Providers.Okta` from `next-auth/providers` for the Okta provider configuration
- Uses `domain` instead of `issuer` for Okta configuration in v3
- Uses NextAuth v3's built-in `signIn` and `signOut` functions

### 2. Environment Variables

Create a `.env.local` file in the `apps/sanity-frontend` directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Okta Configuration
OKTA_CLIENT_ID=your-okta-client-id
OKTA_CLIENT_SECRET=your-okta-client-secret
OKTA_DOMAIN=your-okta-domain.okta.com
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
- **Session Management**: Automatic session handling with NextAuth
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

### 6. Customization

You can customize the user dashboard by editing:
- `apps/sanity-frontend/src/app/min-side/page.tsx` - Main dashboard page
- `apps/ui-lib/components/Header/Header.tsx` - Header authentication UI
- `apps/sanity-frontend/src/app/api/auth/[...nextAuth]/route.ts` - NextAuth configuration

### 7. Troubleshooting

- Make sure all environment variables are set correctly
- Verify Okta application configuration matches the redirect URIs
- Check browser console for any authentication errors
- Ensure NextAuth dependencies are installed in both projects

## Security Notes

- Never commit `.env.local` files to version control
- Use strong, unique values for `NEXTAUTH_SECRET`
- Regularly rotate Okta client secrets
- Consider using environment-specific Okta applications for production
