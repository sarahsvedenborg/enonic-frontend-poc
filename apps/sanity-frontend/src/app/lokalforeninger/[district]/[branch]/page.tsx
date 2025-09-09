
import { Paragraph } from '@digdir/designsystemet-react';
import { Buttons } from 'rk-designsystem';
import { Heading, Section } from 'ui-lib';
import { client, urlFor } from '../../../../../lib/sanity';
import { getBranchBySlugQuery } from '../../../../../lib/queries';
import { notFound } from 'next/navigation';
import PortableText from '../../../../../components/PortableText';
import BranchHeader from '../../../../../components/BranchHeader';
import ArticleCard from '../../../../../components/ArticleCard';
import { getBranchActivities, ApiBranch } from '../../../../../lib/api-cache';
import './page.css';


interface BranchPageProps {
    params: Promise<{ district: string, branch: string }>;
}
export const revalidate = 60;

const getData = async (slug: string) => {
    const [branchData] = await Promise.all([
        client.fetch(getBranchBySlugQuery, { slug }),
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

    console.log("branchData", branchData)

    return (
        <>

            <BranchHeader
                branchName={branchData.branchName || branchData.title}
                branchParent={branchData.branchParent}
                branchLocation={branchData.branchLocation}
                communicationChannels={branchData.communicationChannels}
                branchContacts={branchData.branchContacts}
                image={branchData.mainImage}
            />

            <Section width="xl">
                <nav className="branch-navigation">
                    <a href="#aktiviteter" className="nav-item">Våre aktiviteter og tilbud</a>
                    <a href="#tjenester" className="nav-item">Våre tjenester</a>
                    <a href="#aktiviteter" className="nav-item">Hva skjer?</a>
                    <a href="#nyheter" className="nav-item">Aktuelt</a>
                    <a href="#om-oss" className="nav-item">Om oss</a>
                </nav>
            </Section>

            < Section width="sm" >
                <Heading level={2}>
                    Velkommen til {branchData.branchName || branchData.title}!
                </Heading>
                <Paragraph data-size='xl' >{branchData.description}</Paragraph>
            </Section >


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


            {
                branchData.topArticle && (
                    <Section width="xl">
                        <ArticleCard topArticle={branchData.topArticle} />
                    </Section>
                )
            }
            <Section width="sm">
                <Paragraph data-size='xl'>
                    {branchData.excerpt}
                </Paragraph>
            </Section>






            < Section width="xl" padding="lg" >
                <Section width="md" padding="lg">
                    {branchData.body && (
                        <div className="news-content">
                            <PortableText content={branchData.body} />
                        </div>
                    )}
                </Section>
            </Section >


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
            <Section width="md" background="tinted" margin="lg" padding="lg">

                <Heading level={2}>Aktuelt</Heading>
                <Paragraph data-size='md'>Her kan man enten:
                    <ul>
                        <li>La redaktører manuelt søke opp nyheter (enten knyttet til lokalforening eller ikke)</li>
                        <li>Automatisk utlisting av nyheter knyttet til lokalforening</li>
                    </ul>
                </Paragraph>
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