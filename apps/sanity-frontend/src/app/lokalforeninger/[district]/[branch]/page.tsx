
import { Paragraph } from '@digdir/designsystemet-react';
import { Buttons } from 'rk-designsystem';
import { Heading, Section } from 'ui-lib';
import { client, urlFor } from '../../../../../lib/sanity';
import { getBranchBySlugQuery } from '../../../../../lib/queries';
import { notFound } from 'next/navigation';
import PortableText from '../../../../../components/PortableText';
import BranchHeader from '../../../../../components/BranchHeader';
import { getBranchActivities, ApiBranch } from '../../../../../lib/api-cache';
import './page.css';


interface BranchPageProps {
    params: Promise<{ district: string, branch: string }>;
}
export const revalidate = 60;

const getData = async (slug: string) => {
    const [branchData, apiActivities] = await Promise.all([
        client.fetch(getBranchBySlugQuery, { slug }),
        // We'll get the branchId from the Sanity data and then fetch API activities
        Promise.resolve([]) // Placeholder for now
    ]);

    // If we have branch data with branchId, fetch the API activities
    let activities = [];
    if (branchData?.branchId) {
        try {
            activities = await getBranchActivities(branchData.branchId);
        } catch (error) {
            console.error('Error fetching API activities:', error);
            // Fallback to Sanity activities if API fails
            activities = branchData.branchActivities || [];
        }
    } else {
        // Fallback to Sanity activities if no branchId
        activities = branchData?.branchActivities || [];
    }

    return {
        branchData,
        apiActivities: activities
    };
}

export default async function BranchPage({ params }: BranchPageProps) {
    const { district, branch } = await params;

    const { branchData, apiActivities } = await getData(`${district}/${branch}`);

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
            <hr />
            Her kommer meny
            <hr />
            {/* Main Content */}
            < Section width="sm" >
                <Heading level={2}>
                    Velkommen til {branchData.branchName || branchData.title}!
                </Heading>
            </Section >

            {/* Action Buttons */}
            < Section width="sm" >
                <div className="action-buttons">
                    <button className="action-button action-button-primary">
                        Bli Medlem
                    </button>
                    <button className="action-button action-button-secondary">
                        Bli Medlem
                    </button>
                    <button className="action-button action-button-secondary">
                        Støtt vårt arbeid
                    </button>
                </div>
            </Section >
            <Section width="sm">
                <Paragraph data-size='xl'>
                    Her kommer fremhevet artikkel
                </Paragraph>
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

            {/* Branch Activities from API */}
            {
                apiActivities && apiActivities.length > 0 && (
                    <Section width="xl" background="tinted" padding="lg">
                        <Section width="md" padding="lg">
                            <Heading level={2}>Hva skjer?</Heading>
                            <div className="activities-list">
                                {apiActivities.map((activity, index) => (
                                    <div key={`${activity.localActivityName}-${index}`} className="activity-item">
                                        <Heading level={3}>{activity.localActivityName}</Heading>
                                        {activity.globalActivityName !== activity.localActivityName && (
                                            <p className="activity-description">
                                                <strong>Kategori:</strong> {activity.globalActivityName}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="activities-source">
                                <Paragraph className="source-text">
                                    Aktivitetsdata hentet fra Røde Kors API
                                </Paragraph>
                            </div>
                        </Section>
                    </Section>
                )
            }

            {/* Fallback: Branch Activities from Sanity */}
            {
                (!apiActivities || apiActivities.length === 0) && branchData.branchActivities && branchData.branchActivities.length > 0 && (
                    <Section width="xl" background="tinted" padding="lg">
                        <Section width="md" padding="lg">
                            <Heading level={2}>Våre aktiviteter</Heading>
                            <div className="activities-list">
                                {branchData.branchActivities.map((activity: any, index: number) => (
                                    <div key={`sanity-${index}`} className="activity-item">
                                        <Heading level={3}>{activity.localActivityName}</Heading>
                                        {activity.globalActivityName !== activity.localActivityName && (
                                            <p className="activity-description">
                                                <strong>Kategori:</strong> {activity.globalActivityName}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="activities-source">
                                <Paragraph className="source-text">
                                    Aktivitetsdata fra Sanity CMS
                                </Paragraph>
                            </div>
                        </Section>
                    </Section>
                )
            }

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