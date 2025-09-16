import { EventList as EventList2 } from 'ui-lib'
import { client } from '../../../../../lib/sanity'
import { getBranchBySlugQuery, getEventsByBranchQuery } from '../../../../../lib/queries'

interface EventsPageProps {
    district: string
    branch: string
    title?: string
}

const getData = async (slug: string) => {
    const id = slug.split('-').pop()

    const [branchData, events] = await Promise.all([
        client.fetch(getBranchBySlugQuery, { id }),
        client.fetch(getEventsByBranchQuery, {
            language: 'no',
            branchId: id
        }),
    ])

    return { branchData, events }
}

export default async function EventsPage({ title = 'Arrangementer', district, branch }: EventsPageProps) {

    const { branchData, events } = await getData(branch)

    if (!branchData) {
        return null
    }

    return (
        <div id="arrangementer">
            <EventList2 events={events} title={title} branch={branch} district={district} />
        </div>
    )
}
