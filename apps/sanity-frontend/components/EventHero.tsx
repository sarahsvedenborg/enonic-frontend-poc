'use client'
import React from 'react'
import { Heading, Section } from 'ui-lib'
import { Paragraph } from '@digdir/designsystemet-react'
import { FiCalendar, FiMapPin, FiClock, FiUsers } from 'react-icons/fi'
import { Event } from '../lib/sanity'
import './EventHero.css'

interface EventHeroProps {
    event: Event
}

export default function EventHero({ event }: EventHeroProps) {
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
        <section className="event-hero">
            <div className="event-hero-background">
                <div className="event-hero-overlay"></div>
            </div>

            <div className="event-hero-content">
                <div className="event-hero-header">
                    <div className="event-badge">
                        <FiCalendar className="event-badge-icon" />
                        <Paragraph className="event-badge-text">Arrangement</Paragraph>
                    </div>

                    <div className="event-status">
                        {isToday && <span className="status-badge today">I dag</span>}
                        {isUpcoming && !isToday && <span className="status-badge upcoming">Kommende</span>}
                        {!isUpcoming && <span className="status-badge past">Avsluttet</span>}
                    </div>
                </div>

                <Heading level={1} className="event-hero-title">
                    {event.title}
                </Heading>

                <div className="event-hero-meta">
                    <div className="event-meta-item">
                        <FiClock className="event-meta-icon" />
                        <div className="event-meta-content">
                            <Paragraph className="event-meta-label">Dato og tid</Paragraph>
                            <Paragraph className="event-meta-value">
                                {formattedDate} kl. {formattedTime}
                            </Paragraph>
                        </div>
                    </div>

                    <div className="event-meta-item">
                        <FiMapPin className="event-meta-icon" />
                        <div className="event-meta-content">
                            <Paragraph className="event-meta-label">Sted</Paragraph>
                            <Paragraph className="event-meta-value">{event.location}</Paragraph>
                        </div>
                    </div>

                    <div className="event-meta-item">
                        <FiUsers className="event-meta-icon" />
                        <div className="event-meta-content">
                            <Paragraph className="event-meta-label">Arrangør</Paragraph>
                            <Paragraph className="event-meta-value">
                                {event.localBranch.branchName}
                            </Paragraph>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
