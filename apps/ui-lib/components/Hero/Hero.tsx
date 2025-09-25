import { Section } from '../Section/Section'
import { Heading, Paragraph } from '@digdir/designsystemet-react'
import './Hero.css'

interface HeroProps {
    title: string
    description?: string
    imageURL?: string
}

export const Hero = ({ title, description, imageURL }: HeroProps) => {
    if (!imageURL) {
        return (
            <Section width="md">
                <Heading level={1}>{title}</Heading>
                <Paragraph>{description}</Paragraph>
            </Section>
        )
    }


    return (
        <section
            className={imageURL ? 'hero' : ''}
            style={{
                backgroundImage: imageURL ? `url(${imageURL})` : undefined
            }}
        >
            {/* Content */}
            <div className="hero-content">
                <h1 className="hero-title">
                    {title}
                </h1>

                {description && (
                    <p className="hero-description">
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
