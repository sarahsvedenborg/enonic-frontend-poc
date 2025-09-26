import { Section } from 'ui-lib'
import { Paragraph, Heading } from '@digdir/designsystemet-react'
import Link from 'next/link'
import { client } from '../../../lib/sanity'
import { getAllLocalGroupsQuery } from '../../../lib/queries'
import './page.css'

interface LocalGroup {
    _id: string
    title: string
    slug: {
        current: string
    }
    branchName: string
    branchLocation: {
        county: string
        municipality: string
    }
    communicationChannels: {
        email?: string
        phone?: string
    }
}

const getData = async () => {
    const localGroups = await client.fetch(getAllLocalGroupsQuery, { language: 'no' })
    return { localGroups }
}

export const revalidate = 60

export default async function LokalforeningerPage() {
    const { localGroups } = await getData()

    // Group local groups by county
    const groupedByCounty = localGroups.reduce((acc: Record<string, LocalGroup[]>, group: LocalGroup) => {
        const county = group.branchLocation?.county || 'Ukjent fylke'
        if (!acc[county]) {
            acc[county] = []
        }
        acc[county].push(group)
        return acc
    }, {})

    // Sort counties alphabetically
    const sortedCounties = Object.keys(groupedByCounty).sort()

    return (
        <>
            <Section width="xl" padding="lg">
                <Section width="md" padding="lg">
                    <Heading level={1} data-size="xl">
                        Lokalforeninger
                    </Heading>
                    <Paragraph data-size="lg" className="page-description">
                        Finn din lokale Røde Kors-forening og bli med i det humanitære arbeidet i ditt område.
                    </Paragraph>
                    <Paragraph data-size="lg" className="page-description">
                        <em style={{ backgroundColor: 'peachpuff' }}> Velg Skedsmo i Akershus for å se en med mye innhold </em>
                    </Paragraph>
                </Section>
            </Section>

            <Section width="xl" padding="lg">
                <Section width="lg" padding="lg">
                    {sortedCounties.map((county) => (
                        <div key={county} className="county-section">
                            <Heading level={2} data-size="lg" className="county-title">
                                {county}
                            </Heading>

                            <div className="local-groups-grid">
                                {groupedByCounty[county].map((group) => (
                                    <div key={group._id} className="local-group-card">
                                        <Link
                                            href={`/lokalforeninger/${group.branchLocation?.county?.toLowerCase().replace(/\s+/g, '-')}/${group.branchName?.split(' ').slice(0, -2).join('-')?.toLowerCase().replace(/\s+/g, ' - ').concat(`-${group.branchId}`)}` || './ '}

                                            className="local-group-link"
                                        >
                                            <div className="local-group-content">
                                                <Heading level={3} data-size="sm" className="group-name">
                                                    {group.branchName || group.title} - {group.branchId}
                                                </Heading>

                                                <Paragraph data-size="sm" className="group-location">
                                                    {group.branchLocation?.municipality}
                                                </Paragraph>

                                                {group.communicationChannels?.email && (
                                                    <Paragraph data-size="sm" className="group-contact">
                                                        {group.communicationChannels.email}
                                                    </Paragraph>
                                                )}

                                                {group.communicationChannels?.phone && (
                                                    <Paragraph data-size="sm" className="group-contact">
                                                        {group.communicationChannels.phone}
                                                    </Paragraph>
                                                )}
                                            </div>
                                        </Link >
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </Section>
            </Section >
        </>
    )
}