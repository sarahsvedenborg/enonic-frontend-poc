'use client'

import { useAuth } from '../../../hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Heading, Section } from 'ui-lib'
import { Paragraph } from '@digdir/designsystemet-react'

export default function MinSidePage() {
    const { session, status, isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/')
        }
    }, [status, router])

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
        <Section width="md" padding="lg">
            <Heading level={1}>Min side</Heading>
            <Paragraph data-size="lg">
                Velkommen, {session?.user?.name || session?.user?.email}!
            </Paragraph>

            <div style={{ marginTop: '2rem' }}>
                <Heading level={2}>Din profil</Heading>
                <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <Paragraph><strong>Navn:</strong> {session?.user?.name || 'Ikke oppgitt'}</Paragraph>
                    <Paragraph><strong>E-post:</strong> {session?.user?.email || 'Ikke oppgitt'}</Paragraph>
                    <Paragraph><strong>Bilde:</strong> {session?.user?.image ? '✓' : 'Ikke oppgitt'}</Paragraph>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <Heading level={2}>Mine aktiviteter</Heading>
                <Paragraph>Her kan du se dine registrerte aktiviteter og tilbud.</Paragraph>
                <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <Paragraph>Ingen aktiviteter registrert ennå.</Paragraph>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <Heading level={2}>Mine donasjoner</Heading>
                <Paragraph>Oversikt over dine donasjoner til Røde Kors.</Paragraph>
                <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <Paragraph>Ingen donasjoner registrert ennå.</Paragraph>
                </div>
            </div>
        </Section>
    )
}