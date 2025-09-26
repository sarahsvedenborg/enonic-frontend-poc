import { Heading, Paragraph } from '@digdir/designsystemet-react';
import { Section } from 'ui-lib';
import { client } from '../../../lib/sanity';
import { getAllCampaignsQuery } from '../../../lib/queries';

const getData = async () => {
    const campaigns = await client.fetch(getAllCampaignsQuery);
    return campaigns;
}

export const revalidate = 60;

export default async function CampaignListPage() {
    const campaigns = await getData();

    return (
        <Section width="md" padding="lg">
            <Heading level={1} data-size="xl">Aktive Kampanjer</Heading>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                {campaigns.map((campaign: any) => (
                    <article key={campaign._id} className="bg-white rounded-lg shadow-md p-6">
                        <Section padding='none' margin='sm'>
                            <a href={`/kampanjer/${campaign.slug.current}`}>
                                <Paragraph data-size='xl'>{campaign.title}</Paragraph>
                            </a>
                        </Section>
                        {campaign.description && (
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                {campaign.description}
                            </p>
                        )}
                        {campaign.publishedAt && (
                            <time className="text-sm text-gray-500">
                                {new Date(campaign.publishedAt).toLocaleDateString('no-NO')}
                            </time>
                        )}
                    </article>
                ))}
            </div>
        </Section>
    )
}
