'use client'
import { urlFor } from '../lib/sanity'
import './ActivityHero.css'

interface ActivityHeroProps {
    title: string
    subtitle?: string
    image?: any
    branchName?: string
    location?: string
}

export default function ActivityHero({ title, subtitle, image, branchName, location }: ActivityHeroProps) {
    const backgroundImage = image ? urlFor(image).width(1600).height(600).fit('crop').url() : null

    return (
        <section
            className="activity-hero"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
            }}
        >
            {/* Overlay */}
            <div className="activity-hero-overlay"></div>

            {/* Content */}
            <div className="activity-hero-content">
                <div className="activity-hero-badge">

                    <span className="activity-label">Aktivitet</span>
                </div>

                <h1 className="activity-hero-title">
                    {title}
                </h1>

                {subtitle && (
                    <p className="activity-hero-subtitle">
                        {subtitle}
                    </p>
                )}

                {/*    {(branchName || location) && (
                    <div className="activity-hero-meta">
                        {branchName && (
                            <span className="activity-meta-item">
                                {branchName}
                            </span>
                        )}
                        {location && (
                            <span className="activity-meta-item">
                                🏘️ {location}
                            </span>
                        )}
                    </div>
                )} */}
            </div>
        </section>
    )
}
