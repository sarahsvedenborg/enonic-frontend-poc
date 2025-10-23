'use client'
import React from 'react'
import { Heading, Section } from 'ui-lib'
import { Paragraph } from '@digdir/designsystemet-react'
import { Link } from 'rk-designsystem'

import './ArgumentCard.css'

interface ArgumentCardProps {
    argument: {
        title?: string;
        excerpt?: string;
        href?: string;
        imageUrl?: string;
        linkLabel?: string

    }
}

export const ArgumentCard = ({ argument }: ArgumentCardProps) => {
    return (
        <Section width="xl" padding="lg">
            <p>{argument.title}</p>
            <div className="argument-card">
                <div className="argument-content">
                    {argument.href && (
                        <Link
                            href={`/${argument.href}`}
                            className="argument-link"
                        >
                            <span className="argument-link-icon">→</span>
                            Les mer om økonomien i Røde Kors
                        </Link>
                    )}
                </div>

                {/* Right Column - Image */}
                <div className="argument-image">
                    {argument.imageUrl ? (
                        <img
                            src={argument.imageUrl}
                            alt={argument.title}
                            className="argument-image-content"
                        />
                    ) : (
                        <div className="argument-image-placeholder">
                            <div className="placeholder-circle">
                                <div className="placeholder-inner-circle"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Section >
    )
}

export default ArgumentCard;
