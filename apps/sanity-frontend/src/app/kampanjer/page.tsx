import { Heading, Section } from 'ui-lib';
import { client } from '../../../lib/sanity';
import { getAllCampaignsQuery } from '../../../lib/queries';

const getData = async () => {
    const campaigns = await client.fetch(getAllCampaignsQuery);
    return campaigns;
}

export default async function CampaignListPage() {
    const campaigns = await getData();

    return (
        <Section width="md" padding="lg">
            <Heading level={1}>Aktive Kampanjer</Heading>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                {campaigns.map((campaign: any) => (
                    <article key={campaign._id} className="bg-white rounded-lg shadow-md p-6">
                        <a href={`/kampanjer/${campaign.slug.current}`}>
                            <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                                {campaign.title}
                            </h2>
                        </a>
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
