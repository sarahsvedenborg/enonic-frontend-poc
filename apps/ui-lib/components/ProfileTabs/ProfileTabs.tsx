'use client'

import { Tabs } from "rk-designsystem"
import { ProfileDetailsTab } from "./ProfileDetailsTab"
import { ProfileActivityTab } from "./ProfileActivityTab"
import { ProfileKnowledgeTab } from "./ProfileKnowledge"

interface ProfileTabsProps {
    profile: { fullname: string, rodekorsNumber: string, rodekorsEmail: string, phone: string, email: string, address: string }
    activities: any
    knowledge: any
}

export const ProfileTabs = ({ profile, activities, knowledge }: ProfileTabsProps) => {

    return (
        <Tabs
            data-color="neutral"
            data-size="md"
            defaultValue="profile"
            onChange={function IW() { }}
        >
            <Tabs.List>
                <Tabs.Tab value="profile">
                    Profil
                </Tabs.Tab>
                <Tabs.Tab value="activity">
                    Engasjement
                </Tabs.Tab>
                <Tabs.Tab value="knowledge">
                    Kompetanse
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="profile">
                <ProfileDetailsTab profile={profile} />
            </Tabs.Panel>
            <Tabs.Panel value="activity">
                <ProfileActivityTab activities={activities} />
            </Tabs.Panel>
            <Tabs.Panel value="knowledge">
                <ProfileKnowledgeTab knowledge={knowledge} />
            </Tabs.Panel>
        </Tabs>
    )
}

export default ProfileTabs