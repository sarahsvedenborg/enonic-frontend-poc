import { Heading, Paragraph } from "@digdir/designsystemet-react"
import { Section } from "../Section/Section"
import { DeveloperNote } from "../DeveloperNote/DeveloperNote"

export const Ecommerce = () => {
    return (
        <Section width="xl" background="under-development" padding="lg">
            <Section width="md" padding="lg">
                <Heading level={2}>Kjøp gaver i nettbutikken</Heading>
                <p>Når du kjøper en gave i nettbutikken får du eller de du er glad i noe fint, samtidig som du støtter vårt humanitære arbeid.</p>

                <div className="gift-options grid-3">
                    <div className="gift-option card">
                        <Heading level={3}>Røverkaffe</Heading>
                        <p>Kaffen er brent av innsatte og løslatte deltakere i regi av Nettverk etter soning.</p>
                    </div>

                    <div className="gift-option card">
                        <Heading level={3}>Førstehjelpsskrin</Heading>
                        <p>Førstehjelpsskrin er en viktig del av egenberedskapen, og noe alle bør ha hjemme.</p>
                    </div>

                    <div className="gift-option card">
                        <Heading level={3}>Digitalt gavekort</Heading>
                        <p>Med dette kortet bidrar du til helsehjelp til barn rammet av krig og konflikt.</p>
                    </div>
                </div>
            </Section>
            <DeveloperNote><Paragraph>Kommer automatisk fra nettbutikk</Paragraph></DeveloperNote>
        </Section>
    )
}