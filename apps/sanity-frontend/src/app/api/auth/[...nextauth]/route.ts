import NextAuth from "next-auth";
import OktaProvider from "next-auth/providers/okta";

export const authOptions = {
    providers: [
        OktaProvider({
            clientId: process.env.OKTA_CLIENT_ID,
            clientSecret: process.env.OKTA_CLIENT_SECRET,
            issuer: process.env.OKTA_ISSUER
        })
    ],
    /*   callbacks: {
          async jwt({ token, account, profile }: any) {
              // Persist the OAuth access_token to the token right after signin
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
      }, */
    /*  session: {
         strategy: 'jwt' as const,
     }, */
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
