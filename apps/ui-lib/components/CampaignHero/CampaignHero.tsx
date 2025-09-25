'use client'
import './CampaignHero.css'

interface CampaignHeroProps {
    title: string
    description?: string
    imageURL?: string
}

export const CampaignHero = ({ title, description, imageURL }: CampaignHeroProps) => {


    return (
        <section
            className="campaign-hero"
            style={{
                backgroundImage: imageURL ? `url(${imageURL})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
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
