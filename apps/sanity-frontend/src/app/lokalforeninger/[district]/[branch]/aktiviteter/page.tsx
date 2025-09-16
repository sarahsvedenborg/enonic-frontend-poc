import { Heading, Section } from 'ui-lib'
import { Paragraph } from '@digdir/designsystemet-react'
import Link from 'next/link'
import { client } from '../../../../../../lib/sanity'
import { getBranchBySlugQuery } from '../../../../../../lib/queries'
import { notFound } from 'next/navigation'
import BranchHeader from '../../../../../../components/BranchHeader'
import { getBranchActivities, ApiBranch } from '../../../../../../lib/api-cache'
import './page.css'

interface BranchActivitiesPageProps {
    params: Promise<{ district: string, branch: string }>
}

export const revalidate = 60

const getData = async (slug: string) => {
    const id = slug.split('-').pop()
    console.log("Branch ID for activities:", id)

    const [branchData] = await Promise.all([
        client.fetch(getBranchBySlugQuery, { id }),
    ])

    // Fetch activities from API
    let activities: ApiBranch['branchActivities'] = []
    if (branchData?.branchId) {
        try {
            activities = await getBranchActivities(branchData.branchId)
        } catch (error) {
            console.error('Error fetching API activities:', error)
            // Fallback to Sanity activities if API fails
            activities = branchData.branchActivities || []
        }
    } else {
        // Fallback to Sanity activities if no branchId
        activities = branchData?.branchActivities || []
    }

    return { branchData, activities }
}

export default async function BranchActivitiesPage({ params }: BranchActivitiesPageProps) {
    const { district, branch } = await params
    const { branchData, activities } = await getData(branch)

    if (!branchData) {
        notFound()
    }

    return (
        <>
            {/* Branch Header */}
            <BranchHeader
                image={branchData.mainImage}
                branchName={branchData.branchName}
                branchParent={branchData.branchParent}
                branchLocation={branchData.branchLocation}
                communicationChannels={branchData.communicationChannels}
                branchContacts={branchData.branchContacts}
            />

            {/* Navigation Breadcrumb */}
            <Section width="xl" padding="sm">
                <Section width="md" padding="sm">
                    <nav className="breadcrumb">
                        <Link href="/lokalforeninger" className="breadcrumb-link">
                            Lokalforeninger
                        </Link>
                        <span className="breadcrumb-separator">›</span>
                        <Link
                            href={`/lokalforeninger/${district}/${branch}`}
                            className="breadcrumb-link"
                        >
                            {branchData.branchName}
                        </Link>
                        <span className="breadcrumb-separator">›</span>
                        <span className="breadcrumb-current">Aktiviteter</span>
                    </nav>
                </Section>
            </Section>

            {/* Page Header */}
            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={1} data-size="xxl">
                        Våre aktiviteter og tilbud
                    </Heading>
                    <Paragraph data-size="lg" className="page-description">
                        Utforsk alle aktivitetene og tjenestene som tilbys av {branchData.branchName}.
                    </Paragraph>
                </Section>
            </Section>

            {/* Activities List */}
            <Section width="xl" padding="lg">
                <Section width="lg" padding="lg">
                    {activities.length > 0 ? (
                        <div className="activities-container">
                            <div className="activities-grid">
                                {activities.map((activity, index) => (
                                    <div key={`activity-${index}`} className="activity-card">
                                        <Link
                                            href={`/lokalforeninger/${district}/${branch}/aktiviteter/${encodeURIComponent(activity.localActivityName)}`}
                                            className="activity-link"
                                        >
                                            <div className="activity-content">
                                                <div className="activity-icon">
                                                    <span className="icon">🎯</span>
                                                </div>

                                                <div className="activity-info">
                                                    <Heading level={3} data-size="md" className="activity-title">
                                                        {activity.localActivityName}
                                                    </Heading>

                                                    {activity.globalActivityName !== activity.localActivityName && (
                                                        <Paragraph data-size="sm" className="activity-category">
                                                            Kategori: {activity.globalActivityName}
                                                        </Paragraph>
                                                    )}

                                                    <Paragraph data-size="sm" className="activity-description">
                                                        Klikk for å lese mer om denne aktiviteten og hvordan du kan delta.
                                                    </Paragraph>
                                                </div>

                                                <div className="activity-arrow">
                                                    <span className="arrow">→</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            <div className="activities-source">
                                <Paragraph className="source-text">
                                    Aktivitetsdata hentet fra Røde Kors API
                                </Paragraph>
                            </div>
                        </div>
                    ) : (
                        <div className="no-activities">
                            <Heading level={2} data-size="lg">
                                Ingen aktiviteter registrert
                            </Heading>
                            <Paragraph data-size="md">
                                Det er ingen aktiviteter registrert for denne lokalforeningen ennå.
                                Kontakt oss for å få mer informasjon om tilgjengelige aktiviteter.
                            </Paragraph>
                        </div>
                    )}
                </Section>
            </Section>
        </>
    )
}
