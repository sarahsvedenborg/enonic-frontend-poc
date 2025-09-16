import { Heading, Section } from 'ui-lib'
import { Paragraph } from '@digdir/designsystemet-react'
import Link from 'next/link'
import { client } from '../../../../../../lib/sanity'
import { getBranchBySlugQuery, getEventsByBranchQuery } from '../../../../../../lib/queries'
import { notFound } from 'next/navigation'
import BranchHeader from '../../../../../../components/BranchHeader'
import EventCard from '../../../../../../components/EventCard'
import { Event, LocalGroup } from '../../../../../../lib/sanity'
import './page.css'

interface EventsPageProps {
    params: Promise<{
        district: string
        branch: string
    }>
}

export const revalidate = 60

const getData = async (slug: string) => {
    const id = slug.split('-').pop()

    console.log("id", id)

    const [branchData, events] = await Promise.all([
        client.fetch(getBranchBySlugQuery, { id }),
        client.fetch(getEventsByBranchQuery, {
            language: 'no',
            branchId: id
        }),
    ])

    return { branchData, events }
}

export default async function EventsPage({ params }: EventsPageProps) {
    const { district, branch } = await params
    const { branchData, events } = await getData(branch)

    if (!branchData) {
        notFound()
    }

    console.log("events", events)

    const upcomingEvents = events.filter((event: Event) => new Date(event.time) > new Date())
    const pastEvents = events.filter((event: Event) => new Date(event.time) <= new Date())

    return (
        <>
            <BranchHeader
                title={branchData.branchName}
                location={branchData.branchLocation?.municipality}
                image={branchData.mainImage}
                communicationChannels={branchData.communicationChannels}
            />

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
                            {branchData.branchName}
                        </Link>
                        <span className="breadcrumb-separator">›</span>
                        <span className="breadcrumb-current">Arrangementer</span>
                    </nav>
                </Section>
            </Section>

            {/* Events Content */}
            <Section width="xl" padding="lg">
                <Section width="lg" padding="lg">
                    <div className="events-header">
                        <Heading level={1} data-size="xl">
                            Arrangementer
                        </Heading>
                        <Paragraph data-size="lg" className="events-subtitle">
                            Se alle arrangementer fra {branchData.branchName}
                        </Paragraph>
                    </div>

                    {events.length === 0 ? (
                        <div className="no-events">
                            <div className="no-events-icon">📅</div>
                            <Heading level={2} data-size="lg">
                                Ingen arrangementer
                            </Heading>
                            <Paragraph data-size="md">
                                Det er for øyeblikket ingen kommende arrangementer fra {branchData.branchName}.
                                Sjekk tilbake senere for oppdateringer.
                            </Paragraph>
                        </div>
                    ) : (
                        <div className="events-content">
                            {upcomingEvents.length > 0 && (
                                <div className="events-section">
                                    <Heading level={2} data-size="lg" className="events-section-title">
                                        Kommende arrangementer
                                    </Heading>
                                    <div className="events-grid">
                                        {upcomingEvents.map((event: Event) => (
                                            <EventCard
                                                key={event._id}
                                                event={event}
                                                branchSlug={branch}
                                                districtSlug={district}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {pastEvents.length > 0 && (
                                <div className="events-section">
                                    <Heading level={2} data-size="lg" className="events-section-title">
                                        Tidligere arrangementer
                                    </Heading>
                                    <div className="events-grid">
                                        {pastEvents.map((event: Event) => (
                                            <EventCard
                                                key={event._id}
                                                event={event}
                                                branchSlug={branch}
                                                districtSlug={district}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Contact Information */}
                    <div className="contact-section">
                        <Heading level={3} data-size="md">
                            Spørsmål om arrangementer?
                        </Heading>
                        <Paragraph data-size="md">
                            Kontakt {branchData.branchName} for mer informasjon om arrangementer.
                        </Paragraph>
                        <div className="contact-info">
                            {branchData.communicationChannels?.email && (
                                <div className="contact-item">
                                    <span className="contact-label">E-post:</span>
                                    <a
                                        href={`mailto:${branchData.communicationChannels.email}`}
                                        className="contact-link"
                                    >
                                        {branchData.communicationChannels.email}
                                    </a>
                                </div>
                            )}

                            {branchData.communicationChannels?.phone && (
                                <div className="contact-item">
                                    <span className="contact-label">Telefon:</span>
                                    <a
                                        href={`tel:${branchData.communicationChannels.phone}`}
                                        className="contact-link"
                                    >
                                        {branchData.communicationChannels.phone}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </Section>
            </Section>
        </>
    )
}
