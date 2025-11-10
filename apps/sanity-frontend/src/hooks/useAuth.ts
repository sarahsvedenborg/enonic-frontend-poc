

import { useSession, signIn, signOut } from 'next-auth/react'

export function useAuth() {
    const { data: session, status } = useSession()


    const handleSignIn = () => {
        console.log('handleSignIn')
        signIn('okta', { callbackUrl: '/min-side' })
    }

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' })
    }

    return {
        session,
        status,
        signIn: handleSignIn,
        signOut: handleSignOut,
        isAuthenticated: status === 'authenticated',
        isLoading: status === 'loading'
    }
}