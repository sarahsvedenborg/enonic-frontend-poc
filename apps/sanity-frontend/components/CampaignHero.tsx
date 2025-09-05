'use client'
import { urlFor } from '../lib/sanity'
import './CampaignHero.css'

interface CampaignHeroProps {
    title: string
    description?: string
    image?: any
    publishedAt?: string
}

export default function CampaignHero({ title, description, image, publishedAt }: CampaignHeroProps) {
    const backgroundImage = image ? urlFor(image).width(1600).height(600).fit('crop').url() : null

    return (
        <section
            className="campaign-hero"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
        >
            {/* Content */}
            <div className="campaign-hero-content">
                <h1 className="campaign-hero-title">
                    {title}
                </h1>

                {description && (
                    <p className="campaign-hero-description">
                        {description}
                    </p>
                )}

                {publishedAt && (
                    <time className="campaign-hero-date">
                        Publisert: {new Date(publishedAt).toLocaleDateString('no-NO')}
                    </time>
                )}
            </div>

            {/* Call to Action Box */}
            {/*   <div className="campaign-cta-box">
                <div className="campaign-cta-card">
                    <h2 className="campaign-cta-title">Gi penger nå</h2>
                    <p className="campaign-cta-description">
                        Bidra til å hjelpe de mest sårbare i land rammet av kriser, krig og konflikt.
                    </p>
                    <div className="campaign-cta-buttons">
                        <button className="campaign-cta-button campaign-cta-button-primary">
                            Doner nå
                        </button>
                        <button className="campaign-cta-button campaign-cta-button-secondary">
                            Les mer
                        </button>
                    </div>
                </div>
            </div> */}
        </section>
    )
}
