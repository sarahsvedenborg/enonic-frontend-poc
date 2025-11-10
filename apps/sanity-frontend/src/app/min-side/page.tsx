'use client'

import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Section, ProfileTabs } from 'ui-lib'
import { Heading, Paragraph } from '@digdir/designsystemet-react'
import { Buttons } from 'rk-designsystem'

type RemoteUserResponse = {
    profile?: {
        fullname?: string
        rodekorsNumber?: string
        rodekorsEmail?: string
        phone?: string
        email?: string
        address?: string
    }
    activities?: {
        activities?: unknown[]
        roles?: unknown[]
        memberships?: unknown[]
    }
    knowledge?: unknown[]
    [key: string]: unknown
}

export default function MinSidePage() {
    const { session, status, isAuthenticated, isLoading } = useAuth()
    const router = useRouter()
    const [userData, setUserData] = useState<RemoteUserResponse | null>(null)
    const [isFetchingUserData, setIsFetchingUserData] = useState(false)
    const [userDataError, setUserDataError] = useState<string | null>(null)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/')
        }
    }, [status, router])

    const userId = useMemo(() => {
        if (!session?.user) {
            return null
        }

        const sessionUser = session.user as Record<string, unknown> & { email?: string | null }

        if (typeof sessionUser.id === 'string' && sessionUser.id.length > 0) {
            return sessionUser.id
        }

        if (typeof sessionUser.sub === 'string' && sessionUser.sub.length > 0) {
            return sessionUser.sub
        }

        if (typeof sessionUser.email === 'string' && sessionUser.email.length > 0) {
            return sessionUser.email
        }

        return null
    }, [session?.user])

    const fetchUserData = async (controller) => {
        try {
            setIsFetchingUserData(true)
            setUserDataError(null)

            const response = await fetch(`/api/min-side/user?userId=${encodeURIComponent(String(userId))}`, {
                headers: {
                    Accept: 'application/json'
                },
                credentials: 'include',
                signal: controller.signal
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            setUserData(data)
        } catch (error) {
            if (controller.signal.aborted) {
                return
            }

            const message = error instanceof Error ? error.message : 'Ukjent feil ved henting av brukerdata'
            console.error('Error fetching user data for Min side:', error)
            setUserDataError(message)
        } finally {
            if (!controller.signal.aborted) {
                setIsFetchingUserData(false)
            }
        }
    }

    const controller = new AbortController()

    useEffect(() => {
        if (!isAuthenticated || !userId) {
            return
        }
        fetchUserData(controller)

        return () => controller.abort()
    }, [isAuthenticated, userId])

    const profile = useMemo(() => {
        const remoteProfile = userData?.profile ?? {}

        return {
            fullname: (remoteProfile.fullname as string | undefined)
                ?? session?.user?.name
                ?? session?.user?.email
                ?? 'Ikke oppgitt',
            rodekorsNumber: (remoteProfile.rodekorsNumber as string | undefined) ?? 'Ikke oppgitt',
            rodekorsEmail: (remoteProfile.rodekorsEmail as string | undefined)
                ?? session?.user?.email
                ?? 'Ikke oppgitt',
            phone: (remoteProfile.phone as string | undefined) ?? 'Ikke oppgitt',
            email: (remoteProfile.email as string | undefined)
                ?? session?.user?.email
                ?? 'Ikke oppgitt',
            address: (remoteProfile.address as string | undefined) ?? 'Ikke oppgitt'
        }
    }, [session?.user?.email, session?.user?.name, userData?.profile])

    const activities = useMemo(() => {
        return {
            activities: Array.isArray(userData?.activities?.activities) ? userData?.activities?.activities : [],
            roles: Array.isArray(userData?.activities?.roles) ? userData?.activities?.roles : [],
            memberships: Array.isArray(userData?.activities?.memberships) ? userData?.activities?.memberships : []
        }
    }, [userData?.activities])

    const knowledge = useMemo(() => {
        return Array.isArray(userData?.knowledge) ? userData?.knowledge : []
    }, [userData?.knowledge])

    if (isLoading) {
        return (
            <Section width="md" padding="lg">
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <Heading level={2}>Laster...</Heading>
                    <Paragraph>Vennligst vent mens vi logger deg inn.</Paragraph>
                </div>
            </Section>
        )
    }

    if (!isAuthenticated) {
        return null
    }


    return (
        <>
            <Section width="md" padding="lg" margin="md">
                <Heading level={1} data-size="lg">Min side</Heading>
            </Section>
            <Section width="md" padding="lg" margin="md">
                <Paragraph><mark>NB! Siden dataverse bare henter fra testbrukere får man ikke se sine egne data på nåværende tidspunkt. Man får derfor se data fra testbrukeren ved navn <strong>Aagje Grong</strong></mark></Paragraph>
            </Section>
            <Section width="md" padding="lg" margin="md">
                {/*             <Buttons onClick={() => fetchUserData(controller)}>Hent brukerdata</Buttons> */}
                {userDataError && (
                    <Paragraph data-size="md" data-color="danger">
                        Klarte ikke å hente brukerdata: {userDataError}
                    </Paragraph>
                )}
                {!userDataError && isFetchingUserData && (
                    <Paragraph data-size="md">
                        Henter brukerdata...
                    </Paragraph>
                )}
                <ProfileTabs profile={profile} activities={activities} knowledge={knowledge} userData={userData} />
            </Section>
        </>
    )
}
