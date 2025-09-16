'use client'
import React from 'react'
import Link from 'next/link'
import { Heading, Section } from 'ui-lib'
import { Paragraph } from '@digdir/designsystemet-react'
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi'
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
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    const formattedTime = eventDate.toLocaleTimeString('no-NO', {
        hour: '2-digit',
        minute: '2-digit'
    })

    const isUpcoming = eventDate > new Date()
    const isToday = eventDate.toDateString() === new Date().toDateString()

    return (
        <Link
            href={`/lokalforeninger/${districtSlug}/${branchSlug}/arrangementer/${event.slug.current}`}
            className="event-card-link"
        >
            <div className={`event-card ${isUpcoming ? 'upcoming' : 'past'} ${isToday ? 'today' : ''}`}>
                <div className="event-card-header">
                    <div className="event-date">
                        <div className="event-day">
                            {eventDate.getDate()}
                        </div>
                        <div className="event-month">
                            {eventDate.toLocaleDateString('no-NO', { month: 'short' })}
                        </div>
                    </div>
                    <div className="event-status">
                        {isToday && <span className="status-badge today">I dag</span>}
                        {isUpcoming && !isToday && <span className="status-badge upcoming">Kommende</span>}
                        {!isUpcoming && <span className="status-badge past">Avsluttet</span>}
                    </div>
                </div>

                <div className="event-card-content">
                    <Heading level={3} data-size="md" className="event-title">
                        {event.title}
                    </Heading>

                    <div className="event-meta">
                        <div className="event-meta-item">
                            <FiClock className="event-meta-icon" />
                            <Paragraph data-size="sm" className="event-meta-text">
                                {formattedDate} kl. {formattedTime}
                            </Paragraph>
                        </div>
                        <div className="event-meta-item">
                            <FiMapPin className="event-meta-icon" />
                            <Paragraph data-size="sm" className="event-meta-text">
                                {event.location}
                            </Paragraph>
                        </div>
                    </div>

                    {event.body && (
                        <div className="event-excerpt">
                            <Paragraph data-size="sm" className="event-description">
                                {/* Show first paragraph of body content */}
                                {event.body[0]?.children?.[0]?.text?.substring(0, 120)}
                                {event.body[0]?.children?.[0]?.text?.length > 120 && '...'}
                            </Paragraph>
                        </div>
                    )}
                </div>

                <div className="event-card-footer">
                    <span className="read-more">Les mer →</span>
                </div>
            </div>
        </Link>
    )
}
