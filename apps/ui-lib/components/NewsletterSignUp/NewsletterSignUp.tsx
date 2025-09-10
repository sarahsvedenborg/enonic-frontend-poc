import { Heading, Paragraph } from "@digdir/designsystemet-react"
import Section from "../Section/Section"

export const NewsletterSignUp = ({ title, description }: { title: string, description: string }) => {
    return (
        < Section width="xl" padding="lg" >
            <Section width="md" padding="lg">
                <div className="newsletter-section">
                    <Heading level={2}>{title}</Heading>
                    <Paragraph>{description}</Paragraph>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Din e-postadresse" className="newsletter-input" />
                        <button className="btn-primary">Abonner</button>
                    </div>
                </div>
            </Section>
        </Section >
    )
}