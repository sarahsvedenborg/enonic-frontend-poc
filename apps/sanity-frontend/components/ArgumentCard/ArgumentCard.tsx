'use client'
import React from 'react'
import { Heading, Section } from 'ui-lib'
import { Paragraph } from '@digdir/designsystemet-react'
import { Link } from 'rk-designsystem'
import { urlFor } from '../../lib/sanity'
import { Argument } from '../../lib/sanity'
import './ArgumentCard.css'

interface ArgumentCardProps {
    argument: Argument
}

export default function ArgumentCard({ argument }: ArgumentCardProps) {
    const imageUrl = argument.image
        ? urlFor(argument.image).width(300).height(300).fit('crop').url()
        : null

    return (
        <Section width="xl" padding="lg">
            <div className="argument-card">
                <div className="argument-content">
                    {/* Left Column - Text Content */}
                    <div className="argument-text">
                        <Heading level={2} className="argument-title">
                            {argument.title}
                        </Heading>

                        <Paragraph className="argument-excerpt">
                            {argument.excerpt}
                        </Paragraph>

                        {argument.article && (
                            <Link
                                href={`/${argument.article.slug?.current}`}
                                className="argument-link"
                            >
                                <span className="argument-link-icon">→</span>
                                Les mer om økonomien i Røde Kors
                            </Link>
                        )}
                    </div>

                    {/* Right Column - Image */}
                    <div className="argument-image">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
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
            </div>
        </Section>
    )
}
