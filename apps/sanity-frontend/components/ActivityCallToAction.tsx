'use client'
import React from 'react'
import { Heading, Section } from 'ui-lib'
import { Paragraph } from '@digdir/designsystemet-react'
import { Link } from 'rk-designsystem'
import { FiMapPin, FiClock } from 'react-icons/fi'
import './ActivityCallToAction.css'

interface ActivityCallToActionProps {
    branchName: string
    location?: string
    schedule?: string
    nearbyLocationsText?: string
    ctaButtonText?: string
    ctaButtonHref?: string
}

export default function ActivityCallToAction({
    branchName,
    location,
    schedule,
    nearbyLocationsText = "Andre steder du kan bli besøksvenn i nærheten",
    ctaButtonText = "Bli besøksvenn",
    ctaButtonHref = "#"
}: ActivityCallToActionProps) {
    return (
        <Section width="xl" padding="lg">
            <Section width="lg" padding="lg">
                <div className="activity-cta">
                    <div className="activity-cta-content">
                        {/* Left side - Information blocks */}
                        <div className="activity-cta-info">
                            {/* Organization block */}
                            <div className="info-block">
                                <Paragraph data-size="sm" className="info-label">
                                    I regi av
                                </Paragraph>
                                <Link href="#" className="info-link">
                                    {branchName}
                                </Link>
                            </div>

                            {/* When and where block */}
                            <div className="info-block">
                                <Heading level={3} data-size="md" className="info-title">
                                    Når og hvor?
                                </Heading>
                                <div className="info-details">
                                    {location && (
                                        <div className="info-detail-item">
                                            <FiMapPin className="info-icon" />
                                            <Paragraph data-size="sm" className="info-text">
                                                {location}
                                            </Paragraph>
                                        </div>
                                    )}
                                    {schedule && (
                                        <div className="info-detail-item">
                                            <FiClock className="info-icon" />
                                            <Paragraph data-size="sm" className="info-text">
                                                {schedule}
                                            </Paragraph>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Nearby locations block */}
                            <div className="info-block">
                                <Link href="#" className="info-link">
                                    {nearbyLocationsText}
                                </Link>
                            </div>
                        </div>

                        {/* Right side - CTA button */}
                        <div className="activity-cta-button-container">
                            <Link href={ctaButtonHref} className="activity-cta-button">
                                {ctaButtonText}
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>
        </Section>
    )
}
