import { Paragraph } from '@digdir/designsystemet-react';
import { Heading, Section } from 'ui-lib';
import { client, urlFor } from '../../../../../lib/sanity';
import { getBranchBySlugQuery } from '../../../../../lib/queries';
import { notFound } from 'next/navigation';
import PortableText from '../../../../../components/PortableText';
import BranchHeader from '../../../../../components/BranchHeader';
import './page.css';


interface BranchPageProps {
    params: Promise<{ district: string, branch: string }>;
}
export const revalidate = 60;
const getData = async (slug: string) => {
    const news = await client.fetch(getBranchBySlugQuery, { slug });
    return news;
}

export default async function BranchPage({ params }: BranchPageProps) {
    const { district, branch } = await params;


    const branchData = await getData(`${district}/${branch}`);


    if (!branchData) {
        notFound();
    }

    return (
        <>
            {/* Branch Header */}
            <BranchHeader
                branchName={branchData.branchName || branchData.title}
                branchParent={branchData.branchParent}
                branchLocation={branchData.branchLocation}
                communicationChannels={branchData.communicationChannels}
                branchContacts={branchData.branchContacts}
                image={branchData.mainImage}
            />

            {/* Main Content */}
            <Section width="sm">
                <Heading level={2}>
                    Om {branchData.branchName || branchData.title}
                </Heading>
            </Section>
            <Section width="sm">
                <Paragraph data-size='xl'>
                    {branchData.excerpt}
                </Paragraph>
            </Section>





            {/* Main Content */}
            < Section width="xl" padding="lg" >
                <Section width="md" padding="lg">
                    {branchData.body && (
                        <div className="news-content">
                            <PortableText content={branchData.body} />
                        </div>
                    )}
                </Section>
            </Section >

            {/* Branch Activities */}
            {branchData.branchActivities && branchData.branchActivities.length > 0 && (
                <Section width="xl" background="tinted" padding="lg">
                    <Section width="md" padding="lg">
                        <Heading level={2}>Våre aktiviteter</Heading>
                        <div className="activities-list">
                            {branchData.branchActivities.map((activity: any, index: number) => (
                                <div key={index} className="activity-item">
                                    <Heading level={3}>{activity.localActivityName}</Heading>
                                    {activity.globalActivityName !== activity.localActivityName && (
                                        <p className="activity-description">{activity.globalActivityName}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Section>
                </Section>
            )}

            {/* Contact Information */}
            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={2}>Kontaktinformasjon</Heading>
                    <div className="contact-info">
                        {branchData.communicationChannels?.phone && (
                            <div className="contact-item">
                                <strong>Telefon:</strong> {branchData.communicationChannels.phone}
                            </div>
                        )}
                        {branchData.communicationChannels?.email && (
                            <div className="contact-item">
                                <strong>E-post:</strong> {branchData.communicationChannels.email}
                            </div>
                        )}
                        {branchData.communicationChannels?.web && (
                            <div className="contact-item">
                                <strong>Nettside:</strong> <a href={branchData.communicationChannels.web} target="_blank" rel="noopener noreferrer">{branchData.communicationChannels.web}</a>
                            </div>
                        )}
                    </div>
                </Section>
            </Section>
        </>
    );






    // Generate static params for all newsArticle slugs
    async function generateStaticParams() {
        try {
            const slugs = await client.fetch(`
            *[_type == "newsArticle" && defined(slug.current)][] {
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
}