// app/api/auth/[...nextauth]/route.js (or .ts)
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const authOptions = {
    providers: [
        Providers.Okta({
            clientId: process.env.OKTA_CLIENT_ID,
            clientSecret: process.env.OKTA_CLIENT_SECRET,
            domain: process.env.OKTA_DOMAIN,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }: any) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.idToken = account.id_token
            }
            return token
        },
        async session({ session, token }: any) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken
            session.idToken = token.idToken
            return session
        },
    },
    pages: {
        signIn: '/api/auth/signin',
        error: '/api/auth/error',
    },
    session: {
        jwt: true,
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };