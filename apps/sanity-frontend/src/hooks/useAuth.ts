import { useSession } from 'next-auth/client'


/* interface Session {
    user?: {
        name?: string | null
        email?: string | null
        image?: string | null
    }
    accessToken?: string
    idToken?: string
}
 */
export function useAuth() {
    // Use NextAuth's useSession hook directly - no need for custom state management

    const [session, loading] = useSession()

    console.log('session', session)
    console.log('loading', loading)

    // Determine status based on session and loading state
    const status = loading ? 'loading' : (session?.user ? 'authenticated' : 'unauthenticated')

    const signIn = async (provider: string = 'okta', callbackUrl: string = '/') => {
        try {
            const { signIn: nextAuthSignIn } = await import('next-auth/client')
            await nextAuthSignIn(provider, { callbackUrl })
        } catch (error) {
            console.error('Error signing in:', error)
        }
    }

    const signOut = async (callbackUrl: string = '/') => {
        try {
            const { signOut: nextAuthSignOut } = await import('next-auth/client')
            await nextAuthSignOut({ callbackUrl })
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return {
        session,
        status,
        signIn,
        signOut
    }
}