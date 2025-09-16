'use client'
import React from 'react'
import Link from 'next/link'
import { Heading } from 'ui-lib'
import { Paragraph } from '@digdir/designsystemet-react'
import { FiMapPin } from 'react-icons/fi'
import { Event } from '../lib/sanity'
import './EventCard.css'

interface EventCardProps {
    event: Event
    branchSlug: string
    districtSlug: string
}

export default function EventCard({ event, branchSlug, districtSlug }: EventCardProps) {
    const eventDate = new Date(event.time)
    const formattedDate = eventDate.toLocaleDateString('no-NO', {
        weekday: 'long',
        day: 'numeric',
        month: 'short'
    })
    const formattedTime = eventDate.toLocaleTimeString('no-NO', {
        hour: '2-digit',
        minute: '2-digit'
    })

    return (
        <div key={event._id} className="local-group-card">
            <Link
                href={`/lokalforeninger/${districtSlug}/${branchSlug}/arrangementer/${event.slug.current}`}

                className="local-group-link"
            >
                <div className="local-group-content">
                    <Heading level={3} data-size="md" className="group-name">
                        {event.title}
                    </Heading>

                    <Paragraph data-size="sm" className="group-contact">
                        {formattedDate}
                    </Paragraph>
                    <Paragraph data-size="sm" className="group-contact">
                        {formattedTime}
                    </Paragraph>

                    {event.location && (
                        <Paragraph data-size="sm" className="group-contact">
                            <FiMapPin className="location-icon" /> {event.location}
                        </Paragraph>
                    )}


                </div>
            </Link >
        </div>
    )
}
