import { Heading, Paragraph, } from '@digdir/designsystemet-react';
import { Section, DonationForm, CampaignHero } from 'ui-lib';
import { client, urlFor } from '../../../../lib/sanity';
import { getCampaignBySlugQuery } from '../../../../lib/queries';
import { notFound } from 'next/navigation';
import PortableText from '../../../../components/PortableText';
// import {CampaignHero} from '../../../../components/CampaignHero';
import Link from 'next/link';


interface CampaignPageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 20;

const getData = async (slug: string) => {
    const campaign = await client.fetch(getCampaignBySlugQuery, { slug });
    return campaign;
}

export default async function CampaignPage({ params }: CampaignPageProps) {
    const { slug } = await params;


    const campaign = await getData(slug);


    if (!campaign) {
        notFound();
    }

    const backgroundImageUrl = campaign.mainImage ? urlFor(campaign.mainImage).width(1600).height(600).fit('crop').url() : null

    return (
        <>
            <CampaignHero
                title={campaign.title}
                description={campaign.description}
                imageURL={backgroundImageUrl}
            />
            <DonationForm
                title={campaign.title}
                description={campaign.description}
                negativeMargin={true}

            />
            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>Du kan også</Heading>
                    {campaign.otherActivities && campaign.otherActivities.length > 0 && (
                        <div className="support-options grid-2">
                            {campaign.otherActivities.map((activity) => (
                                <div key={activity._id} className="support-option card">
                                    <Link href={activity.slug.current || '/'} key={activity._id} className='rk-link'>
                                        <Heading level={3}>{activity.title}</Heading>
                                        <Paragraph>{activity.excerpt}</Paragraph>
                                    </Link>
                                </div>
                            ))}</div>

                    )}
                </Section>
            </Section>

            <Section width="xl">
                {campaign.body && (
                    <Section width="md" padding="lg">
                        <PortableText content={campaign.body} />
                    </Section>
                )}
            </Section>
            {campaign.otherSuppert && <Section width="xl" background="tinted" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>Andre måter du kan støtte på</Heading>
                    <ul className='rk-list'>
                        {campaign.otherSuppert && campaign.otherSuppert.length > 0 && campaign.otherSuppert.map((support) => (
                            <li className='rk-list-item' key={support._id}><Link href={support.slug.current}>{support.title}   <span className="article-link-icon">→</span></Link></li>
                        ))}
                    </ul>
                </Section>
            </Section>}
        </>
    )
}






// Generate static params for all campaign slugs
export async function generateStaticParams() {
    try {
        const slugs = await client.fetch(`
            *[_type == "campaign" && defined(slug.current)][] {
                "slug": slug.current
            }
            `);

        return slugs.map((item: { slug: string }) => ({
            slug: item.slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}
