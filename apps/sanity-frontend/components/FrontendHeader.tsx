'use client'

import { Header } from "ui-lib/components/Header/Header"
import { MainMenu } from "../lib/sanity"
import { useAuth } from "../src/hooks/useAuth"
import { useSession } from "next-auth/client"
import { useEffect, useState } from "react"
import { Session } from "next-auth"

export const FrontendHeader = ({ menuData, }: { menuData: MainMenu }) => {

    //  const [session, setSession] = useState<Session | null>(null)
    //  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading')


    /*     const getSession = () => {
            const sessionStatus = useSession()
            if (sessionStatus[0] === undefined) {
                setSession(undefined)
                setStatus('unauthenticated')
            } else {
                setSession(sessionStatus[0])
                setStatus('authenticated')
            }
        }
     */


    /*  useEffect(() => {
 
         getSession()
     }, []) */

    const { session, status, signIn, signOut } = useAuth()

    const handleSignIn = () => {
        console.log("signIn")
        signIn('okta', '/min-side')
    }

    const handleSignOut = () => {
        signOut('/')
    }


    return (
        <>
            <Header menuData={menuData} status='unauthenticated' session={session as { user: { name: string, email: string } }} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />
            Status: {status}
        </>
    )
}

export default FrontendHeader