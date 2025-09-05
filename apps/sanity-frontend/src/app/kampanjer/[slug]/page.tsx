import { Heading, Section, DonationForm } from 'ui-lib';
import { client } from '../../../../lib/sanity';
import { getCampaignBySlugQuery } from '../../../../lib/queries';
import { notFound } from 'next/navigation';
import PortableText from '../../../../components/PortableText';
import CampaignHero from '../../../../components/CampaignHero';


interface CampaignPageProps {
    params: Promise<{ slug: string }>;
}

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

    return (
        <>
            <CampaignHero
                title={campaign.title}
                description={campaign.description}
                image={campaign.mainImage}
                publishedAt={campaign.publishedAt}
            />
            <DonationForm
                title={campaign.title}
                description={campaign.description}
            /*  image={campaign.mainImage} */

            />

            <Section width="xl" background="tinted">
                {campaign.body && (
                    <Section width="md" padding="lg">
                        <PortableText content={campaign.body} />
                    </Section>
                )}
            </Section>
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
