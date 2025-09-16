import { Section } from 'ui-lib'
import { Paragraph, Heading } from '@digdir/designsystemet-react'
import EventCard from './EventCard'

export interface Event {
    _id: string
    _type: 'event'
    title: string
    body?: any[]
    time: string
    location: string
    localBranch: {
        _id: string
        branchName?: string
        branchId?: string
    }
    language?: string
    publishedAt?: string
    slug: {
        current: string
    }
}

interface EventsPageProps {
    events: Event[];
    title?: string
    branch: string
    district: string
}





export const EventList = ({ title = 'Arrangementer', events, branch, district }: EventsPageProps) => {


    const upcomingEvents = events.filter((event: Event) => new Date(event.time) > new Date())
    const pastEvents = events.filter((event: Event) => new Date(event.time) <= new Date())

    return (

        <Section width="xl" background="tinted" padding="lg">
            <Section width="lg" padding="lg">
                <Heading level={2} data-size="xl" style={{ marginBottom: '2rem' }}>
                    {title}
                </Heading>
                {events.length === 0 ? (
                    <div className="no-events">
                        <div className="no-events-icon">📅</div>
                        <Heading level={2} data-size="lg">
                            Ingen arrangementer
                        </Heading>
                        <Paragraph data-size="md">
                            Det er for øyeblikket ingen kommende arrangementer fra denne lokalforeningen.
                            Sjekk tilbake senere for oppdateringer.
                        </Paragraph>
                    </div>
                ) : (
                    <div className="events-content">
                        {upcomingEvents.length > 0 && (
                            <div className="events-section">

                                <div className="local-groups-grid">
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
                    </div>
                )}
            </Section>
        </Section>

    )
}

export default EventList
