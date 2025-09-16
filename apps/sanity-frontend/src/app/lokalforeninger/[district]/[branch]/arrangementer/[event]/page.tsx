import { Heading, Section } from 'ui-lib'
import { Paragraph, Button } from '@digdir/designsystemet-react'
import Link from 'next/link'
import { client } from '../../../../../lib/sanity'
import { getEventBySlugQuery } from '../../../../../lib/queries'
import { notFound } from 'next/navigation'
import EventHero from '../../../../../components/EventHero'
import PortableText from '../../../../../components/PortableText'
import { Event } from '../../../../../lib/sanity'
import './page.css'

interface EventPageProps {
    params: Promise<{
        district: string
        branch: string
        event: string
    }>
}

export const revalidate = 60

const getData = async (eventSlug: string) => {
    const event = await client.fetch(getEventBySlugQuery, {
        language: 'no',
        slug: eventSlug
    })

    return { event }
}

export default async function EventPage({ params }: EventPageProps) {
    const { district, branch, event: eventSlug } = await params
    const { event } = await getData(eventSlug)

    if (!event) {
        notFound()
    }

    const eventDate = new Date(event.time)
    const isUpcoming = eventDate > new Date()
    const isToday = eventDate.toDateString() === new Date().toDateString()

    return (
        <>
            <EventHero event={event} />

            {/* Navigation Breadcrumb */}
            <Section width="xl" padding="sm">
                <Section width="md" padding="sm">
                    <nav className="breadcrumb">
                        <Link href="/lokalforeninger" className="breadcrumb-link">
                            Lokalforeninger
                        </Link>
                        <span className="breadcrumb-separator">›</span>
                        <Link
                            href={`/lokalforeninger/${district}/${branch}`}
                            className="breadcrumb-link"
                        >
                            {event.localBranch.branchName}
                        </Link>
                        <span className="breadcrumb-separator">›</span>
                        <Link
                            href={`/lokalforeninger/${district}/${branch}/arrangementer`}
                            className="breadcrumb-link"
                        >
                            Arrangementer
                        </Link>
                        <span className="breadcrumb-separator">›</span>
                        <span className="breadcrumb-current">{event.title}</span>
                    </nav>
                </Section>
            </Section>

            {/* Event Content */}
            <Section width="xl" padding="lg">
                <Section width="lg" padding="lg">
                    <div className="event-content">
                        <div className="event-main">
                            {event.body ? (
                                <PortableText content={event.body} />
                            ) : (
                                <div className="event-description">
                                    <Heading level={2} data-size="lg">
                                        Om arrangementet
                                    </Heading>
                                    <Paragraph data-size="md">
                                        {event.title} arrangeres av {event.localBranch.branchName}
                                        {event.location && ` på ${event.location}`}.
                                    </Paragraph>
                                </div>
                            )}

                            {/* Event Details Card */}
                            <div className="event-details-card">
                                <Heading level={3} data-size="md">
                                    Arrangementsdetaljer
                                </Heading>

                                <div className="event-details-grid">
                                    <div className="event-detail-item">
                                        <div className="event-detail-label">Dato og tid</div>
                                        <div className="event-detail-value">
                                            {eventDate.toLocaleDateString('no-NO', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })} kl. {eventDate.toLocaleTimeString('no-NO', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>

                                    <div className="event-detail-item">
                                        <div className="event-detail-label">Sted</div>
                                        <div className="event-detail-value">{event.location}</div>
                                    </div>

                                    <div className="event-detail-item">
                                        <div className="event-detail-label">Arrangør</div>
                                        <div className="event-detail-value">{event.localBranch.branchName}</div>
                                    </div>

                                    <div className="event-detail-item">
                                        <div className="event-detail-label">Status</div>
                                        <div className="event-detail-value">
                                            {isToday && <span className="status-badge today">I dag</span>}
                                            {isUpcoming && !isToday && <span className="status-badge upcoming">Kommende</span>}
                                            {!isUpcoming && <span className="status-badge past">Avsluttet</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            {event.localBranch.communicationChannels && (
                                <div className="contact-section">
                                    <Heading level={3} data-size="md">
                                        Kontakt arrangør
                                    </Heading>
                                    <Paragraph data-size="md">
                                        Har du spørsmål om dette arrangementet?
                                        Kontakt {event.localBranch.branchName} direkte.
                                    </Paragraph>

                                    <div className="contact-info">
                                        {event.localBranch.communicationChannels.email && (
                                            <div className="contact-item">
                                                <span className="contact-label">E-post:</span>
                                                <a
                                                    href={`mailto:${event.localBranch.communicationChannels.email}`}
                                                    className="contact-link"
                                                >
                                                    {event.localBranch.communicationChannels.email}
                                                </a>
                                            </div>
                                        )}

                                        {event.localBranch.communicationChannels.phone && (
                                            <div className="contact-item">
                                                <span className="contact-label">Telefon:</span>
                                                <a
                                                    href={`tel:${event.localBranch.communicationChannels.phone}`}
                                                    className="contact-link"
                                                >
                                                    {event.localBranch.communicationChannels.phone}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="event-actions">
                            <Button variant="secondary" asChild>
                                <Link href={`/lokalforeninger/${district}/${branch}/arrangementer`}>
                                    ← Tilbake til arrangementer
                                </Link>
                            </Button>

                            <Button variant="primary" asChild>
                                <Link href={`/lokalforeninger/${district}/${branch}`}>
                                    Se lokalforening
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Section>
            </Section>
        </>
    )
}
