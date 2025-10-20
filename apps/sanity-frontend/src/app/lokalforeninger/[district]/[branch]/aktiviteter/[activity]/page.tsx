import { Heading, Section, ActivitySignupForm } from 'ui-lib'
import { Paragraph } from '@digdir/designsystemet-react'
import Link from 'next/link'
import { client } from '../../../../../../../lib/sanity'
import { getBranchBySlugQuery, getActivityByTypeQuery } from '../../../../../../../lib/queries'
import { notFound } from 'next/navigation'
import ActivityHero from '../../../../../../../components/ActivityHero'
import { getBranchActivities, ApiBranch } from '../../../../../../../lib/api-cache'
import { mapApiActivityTypeToSanity } from '../../../../../../../lib/activity-mapping'
import { Activity, LocalActivityOverride } from '../../../../../../../lib/sanity'
import PortableText from '../../../../../../../components/PortableText'

import './page.css'

interface ActivityPageProps {
    params: Promise<{
        district: string
        branch: string
        activity: string
    }>
}

export const revalidate = 20;

const getData = async (slug: string, activitySlug: string) => {
    const id = slug.split('-').pop()


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

    // Check for local activity overrides first
    let localActivityOverride: LocalActivityOverride | null = null
    let sanityActivity: Activity | null = null



    if (activity?.globalActivityName && branchData?.aktiviteter) {
        /*   const sanityActivityType = mapApiActivityTypeToSanity(activity.globalActivityName) */
        const sanityActivityType = activity.globalActivityName


        // Look for local override first
        localActivityOverride = branchData.aktiviteter.find(
            (override: LocalActivityOverride) => override.activityType === sanityActivityType
        ) || null


        try {
            sanityActivity = await client.fetch(getActivityByTypeQuery, {
                language: 'no',
                activityType: sanityActivityType
            })
        } catch (error) {
            console.error('Error fetching Sanity activity content:', error)
        }

    }

    return { branchData, activity, allActivities: activities, sanityActivity, localActivityOverride }
}

export default async function ActivityPage({ params }: ActivityPageProps) {
    const { district, branch, activity: activitySlug } = await params
    const { branchData, activity, sanityActivity, localActivityOverride } = await getData(branch, activitySlug)

    if (!branchData || !activity) {
        notFound()
    }


    const activityContent = {
        title: sanityActivity?.title || activity.localActivityName,
        excerpt: sanityActivity?.excerpt,
        image: localActivityOverride?.image || sanityActivity?.mainImage,
        body: sanityActivity?.body,
    }


    return (
        <>
            {/* Activity Hero */}
            <ActivityHero
                title={activityContent.title}
                subtitle={activityContent.excerpt}
                image={activityContent.image}
                branchName={branchData.branchName}
                location={branchData.branchLocation?.municipality}
            />

            {/* Navigation Breadcrumb */}
            <Section width="xl" margin="none">
                <Section width="md" margin="none">
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
                            href={`/lokalforeninger/${district}/${branch}#aktiviteter`}
                            className="breadcrumb-link"
                        >
                            Aktiviteter
                        </Link>
                        <span className="breadcrumb-separator">›</span>
                        <span className="breadcrumb-current">{activity.localActivityName}</span>
                    </nav>
                </Section>
            </Section>

            <Section width="lg">
                <Section width="md" >
                    <div className="activity-content">
                        <div className="activity-main">
                            {activityContent.body ? (
                                <>
                                    <PortableText content={activityContent.body} />
                                    <PortableText content={localActivityOverride?.body} />
                                </>
                            ) : (
                                <Paragraph data-size="md">
                                    Det finnes ingen informasjon om den aktuelle aktiviteten. kontakt din lokalforening for mer informasjon.
                                </Paragraph>
                            )}

                            {/* Activity Signup Form */}
                            <ActivitySignupForm
                                title={`${sanityActivity?.cta?.heading || 'Bli med i aktiviteten'}`}
                                description={sanityActivity?.cta?.description}
                                information={sanityActivity?.cta?.information}
                                branchName={branchData.branchName}
                                activityType={activity.globalActivityName}
                                readOnly={true}
                            />

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
                        {/*   <div className="activity-sidebar">
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
                        </div> */}
                    </div>
                </Section>
            </Section>
        </>
    )
}
