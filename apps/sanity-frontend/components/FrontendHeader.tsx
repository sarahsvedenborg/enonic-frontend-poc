'use client'

import { Header } from "ui-lib/components/Header/Header"
import { useAuth } from "../src/hooks/useAuth"

export const FrontendHeader = ({ menuData }) => {

    const { session, status, signIn, signOut, isAuthenticated, isLoading } = useAuth()

    return <Header menuData={menuData} frontend="sanity" session={session as { user: { name: string, email: string } } | null} status={status} signIn={signIn} signOut={signOut} isAuthenticated={isAuthenticated} isLoading={isLoading} />

}

export default FrontendHeader