import { Heading, Section, DonationForm } from 'ui-lib';
import { client } from '../../../lib/sanity';
import { getPermanentCampaignQuery, getDonationFormQuery } from '../../../lib/queries';
import { notFound } from 'next/navigation';
import PortableText from '../../../components/PortableText';
import CampaignHero from '../../../components/CampaignHero';
import './page.css';

const getData = async () => {
    const [campaign] = await Promise.all([
        client.fetch(getPermanentCampaignQuery, { language: 'no' }),

    ]);
    return { campaign };
}

export default async function SupportWorkPage() {
    const { campaign } = await getData();

    if (!campaign) {
        notFound();
    }

    const { donationForm } = campaign;

    return (
        <>
            <CampaignHero
                title={campaign.title}
                description={campaign.description}
                image={campaign.mainImage}
                publishedAt={campaign.publishedAt}
            />

            {/* Donation Form Section */}
            {donationForm && (

                <Section width="xl" padding="lg">
                    <DonationForm
                        title={donationForm.heading || "Du kan hjelpe"}
                        description={donationForm.description || "Bidra til å hjelpe de mest sårbare i land rammet av kriser, krig og konflikt."}
                        amounts={donationForm.amounts || [100, 300, 500]}
                        factBox={donationForm.fact || "Din gave gjør en forskjell. For 300 kroner kan to personer få hvert sitt teppe og mat og vann i en måned."}
                        isDefault={donationForm.donationFormType === 'compact'}
                        includeDirectDonation={true}
                        negativeMargin={true}

                    />
                </Section>

            )}

            <Section width="xl" background="tinted">
                {campaign.body && (
                    <Section width="md" padding="lg">
                        <PortableText content={campaign.body} />
                    </Section>
                )}
            </Section>

            {/* Additional sections based on the Røde Kors support page structure */}
            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>Du kan også</Heading>

                    <div className="support-options grid-2">
                        <div className="support-option card">
                            <Heading level={3}>Bli fast giver</Heading>
                            <p>Da hjelper du barn og voksne i Norge og ute i verden. Du støtter med en fast sum i måneden.</p>
                        </div>

                        <div className="support-option card">
                            <Heading level={3}>Bli medlem i din lokalforening</Heading>
                            <p>Da hjelper du barn og voksne i ditt nærmiljø. Du betaler årskontingent og får medlemsfordeler.</p>
                        </div>
                    </div>
                </Section>
            </Section>

            {campaign.showCommerce && (
                <Section width="xl" background="tinted" padding="lg">
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
                </Section>
            )}

            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>For bedrifter og næringsliv</Heading>
                    <ul>
                        <li>Bedriftssamarbeid</li>
                        <li>Støttespiller og donasjoner</li>
                    </ul>
                </Section>
            </Section>

            <Section width="xl" background="tinted" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>Andre måter du kan støtte på</Heading>
                    <ul>
                        <li>Start en Spleis</li>
                        <li>Gi en større gave</li>
                        <li>Gi bort tøy</li>
                        <li>Testamentere en gave</li>
                        <li>Gi en minnegave</li>
                        <li>Delta i pantelotteriet</li>
                    </ul>
                </Section>
            </Section>

            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>Kundeservice medlemmer og givere</Heading>
                    <p>Få hjelp her!</p>
                </Section>
            </Section>

            <Section width="xl" background="tinted" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>Mer enn 90 prosent går til formålet</Heading>
                    <p>Av alle donasjoner fra medlemmer, givere, faddere og næringslivspartnere går over 90 prosent til de som trenger det mest. De siste årene har fem prosent gått til å skaffe nye midler og to prosent til administrasjon.</p>
                </Section>
            </Section>

            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>Skattefradrag for gaver</Heading>
                    <p>Gaver gitt gjennom året på totalt 500 kr og opp til 25 000 kr, kan trekkes fra på selvangivelsen.</p>
                </Section>
            </Section>
        </>
    )
}
