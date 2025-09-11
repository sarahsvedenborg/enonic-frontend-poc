import { Paragraph } from '@digdir/designsystemet-react';
import { Heading, Section, DonationForm, DeveloperNote, Ecommerce, CardList } from 'ui-lib';
import { client } from '../../../lib/sanity';
import { getPermanentCampaignQuery, getDonationFormQuery } from '../../../lib/queries';
import { notFound } from 'next/navigation';
import PortableText from '../../../components/PortableText';
import CampaignHero from '../../../components/CampaignHero';
import './page.css';
import Link from 'next/link';
import ArgumentCard from '../../../components/ArgumentCard';
import ArticleCard from '../../../components/ArticleCard';

const getData = async () => {
    const [campaign] = await Promise.all([
        client.fetch(getPermanentCampaignQuery, { language: 'no' }),

    ]);
    return { campaign };
}

export const revalidate = 60;

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
                        donationFormType={donationForm.donationFormType}
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

            <Section width="xl" >
                {campaign.body && (
                    <Section width="md" padding="lg">
                        <PortableText content={campaign.body} />
                    </Section>
                )}
            </Section>

            {/* Additional sections based on the Røde Kors support page structure */}
            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">

                    <CardList title="Du kan også" titleLevel={2} items={campaign.otherActivities} />

                </Section>
            </Section>

            {campaign.showCommerce && (
                <Ecommerce />
            )}

            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>For bedrifter og næringsliv</Heading>
                    <ul className='rk-list'>
                        {campaign.organizationsAndIndustry && campaign.organizationsAndIndustry.length > 0 && campaign.organizationsAndIndustry.map((industry) => (
                            <li className='rk-list-item' key={industry._id}><Link href={industry.slug.current}>{industry.title}  <span className="article-link-icon">→</span></Link></li>
                        ))}
                    </ul>
                </Section>
            </Section>

            <Section width="xl" background="tinted" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>Andre måter du kan støtte på</Heading>
                    <ul className='rk-list'>
                        {campaign.otherSuppert && campaign.otherSuppert.length > 0 && campaign.otherSuppert.map((support) => (
                            <li className='rk-list-item' key={support._id}><Link href={support.slug.current}>{support.title}   <span className="article-link-icon">→</span></Link></li>
                        ))}
                    </ul>
                </Section>
            </Section>

            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    {/*   {campaign.arguments && campaign.arguments.length > 0 && campaign.arguments.map((argument) => (
                        <ArgumentCard argument={argument} key={argument._id} />
                    ))} */}
                    {campaign.arguments && campaign.arguments.length > 0 && campaign.arguments.map((argument) => (
                        <ArticleCard topArticle={{ image: argument.image, article: argument }} key={argument._id} />
                    ))}
                </Section>
            </Section>


            {/* <Section width="xl" background="tinted" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>Mer enn 90 prosent går til formålet</Heading>
                    <p>Av alle donasjoner fra medlemmer, givere, faddere og næringslivspartnere går over 90 prosent til de som trenger det mest. De siste årene har fem prosent gått til å skaffe nye midler og to prosent til administrasjon.</p>
                </Section>
            </Section> */}

            {/*     <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>Skattefradrag for gaver</Heading>
                    <p>Gaver gitt gjennom året på totalt 500 kr og opp til 25 000 kr, kan trekkes fra på selvangivelsen.</p>
                </Section>
            </Section> */}
        </>
    )
}
