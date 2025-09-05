import { Heading, Section } from 'ui-lib';
import { client } from '../../../../lib/sanity';
import { getCampaignBySlugQuery } from '../../../../lib/queries';
import { notFound } from 'next/navigation';
import PortableText from '../../../../components/PortableText';

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
            <Section width="md" padding="lg">

                <header className="mb-8">
                    <Heading level={1} size="xl">
                        {campaign.title}
                    </Heading>

                    {campaign.description && (
                        <p className="text-lg text-gray-600 mb-4">
                            {campaign.description}
                        </p>
                    )}

                    {campaign.publishedAt && (
                        <time className="text-sm text-gray-500">
                            Publisert: {new Date(campaign.publishedAt).toLocaleDateString('no-NO')}
                        </time>
                    )}
                </header>
            </Section>
            <Section width="xl" background="tinted">
                {campaign.body && (
                    <Section width="md" >
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
