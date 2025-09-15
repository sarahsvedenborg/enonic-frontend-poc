import { Heading, Section } from 'ui-lib'
import { Paragraph } from '@digdir/designsystemet-react'
import Link from 'next/link'
import { client } from '../../../../../../../lib/sanity'
import { getBranchBySlugQuery } from '../../../../../../../lib/queries'
import { notFound } from 'next/navigation'
import BranchHeader from '../../../../../../../components/BranchHeader'
import ActivityHero from '../../../../../../../components/ActivityHero'
import { getBranchActivities, ApiBranch } from '../../../../../../../lib/api-cache'
import './page.css'

interface ActivityPageProps {
    params: Promise<{
        district: string
        branch: string
        activity: string
    }>
}

export const revalidate = 60

const getData = async (slug: string, activitySlug: string) => {
    const id = slug.split('-').pop()
    console.log("Branch ID for activity:", id)
    console.log("Activity slug:", activitySlug)

    console.log("Activity slug:", activitySlug)

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

    // Find the specific activity
    const activity = activities.find(act =>
        encodeURIComponent(act.localActivityName) === activitySlug
    )

    return { branchData, activity, allActivities: activities }
}

export default async function ActivityPage({ params }: ActivityPageProps) {
    const { district, branch, activity: activitySlug } = await params
    const { branchData, activity, allActivities } = await getData(branch, activitySlug)

    if (!branchData || !activity) {
        notFound()
    }

    return (
        <>
            {/* Activity Hero */}
            <ActivityHero
                title={activity.localActivityName}
                subtitle={activity.globalActivityName !== activity.localActivityName ?
                    `Kategori: ${activity.globalActivityName}` :
                    `En aktivitet fra ${branchData.branchName}`
                }
                image={branchData.mainImage}
                branchName={branchData.branchName}
                location={branchData.branchLocation?.municipality}
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
                        <Link
                            href={`/lokalforeninger/${district}/${branch}/aktiviteter`}
                            className="breadcrumb-link"
                        >
                            Aktiviteter
                        </Link>
                        <span className="breadcrumb-separator">›</span>
                        <span className="breadcrumb-current">{activity.localActivityName}</span>
                    </nav>
                </Section>
            </Section>

            {/* Activity Content */}
            <Section width="xl" padding="lg">
                <Section width="lg" padding="lg">
                    <div className="activity-content">
                        <div className="activity-main">
                            <Heading level={2} data-size="lg">
                                Om aktiviteten
                            </Heading>
                            <Paragraph data-size="md" className="activity-description">
                                {activity.localActivityName} er en viktig del av vårt humanitære arbeid i {branchData.branchLocation?.municipality}.
                                Denne aktiviteten hjelper oss med å nå ut til de som trenger det mest i vårt lokalsamfunn.
                            </Paragraph>

                            <Heading level={2} data-size="lg">
                                Hvordan kan du delta?
                            </Heading>
                            <Paragraph data-size="md">
                                Vi setter stor pris på frivillige som vil bidra til denne aktiviteten.
                                Kontakt oss for å få mer informasjon om hvordan du kan bli med.
                            </Paragraph>

                            <div className="contact-section">
                                <Heading level={3} data-size="md">
                                    Kontakt oss
                                </Heading>
                                <div className="contact-info">
                                    {branchData.communicationChannels?.email && (
                                        <div className="contact-item">
                                            <span className="contact-label">E-post:</span>
                                            <a
                                                href={`mailto:${branchData.communicationChannels.email}`}
                                                className="contact-link"
                                            >
                                                {branchData.communicationChannels.email}
                                            </a>
                                        </div>
                                    )}

                                    {branchData.communicationChannels?.phone && (
                                        <div className="contact-item">
                                            <span className="contact-label">Telefon:</span>
                                            <a
                                                href={`tel:${branchData.communicationChannels.phone}`}
                                                className="contact-link"
                                            >
                                                {branchData.communicationChannels.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Other Activities Sidebar */}
                        <div className="activity-sidebar">
                            <Heading level={3} data-size="md">
                                Andre aktiviteter
                            </Heading>
                            <div className="other-activities">
                                {allActivities
                                    .filter(act => act.localActivityName !== activity.localActivityName)
                                    .slice(0, 3)
                                    .map((otherActivity, index) => (
                                        <Link
                                            key={index}
                                            href={`/lokalforeninger/${district}/${branch}/aktiviteter/${encodeURIComponent(otherActivity.localActivityName)}`}
                                            className="other-activity-link"
                                        >
                                            <div className="other-activity-card">
                                                <div className="other-activity-icon">
                                                    <span className="icon">🎯</span>
                                                </div>
                                                <div className="other-activity-info">
                                                    <Heading level={4} data-size="sm" className="other-activity-title">
                                                        {otherActivity.localActivityName}
                                                    </Heading>
                                                    {otherActivity.globalActivityName !== otherActivity.localActivityName && (
                                                        <Paragraph data-size="xs" className="other-activity-category">
                                                            {otherActivity.globalActivityName}
                                                        </Paragraph>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>

                            <Link
                                href={`/lokalforeninger/${district}/${branch}/aktiviteter`}
                                className="view-all-link"
                            >
                                Se alle aktiviteter →
                            </Link>
                        </div>
                    </div>
                </Section>
            </Section>
        </>
    )
}
