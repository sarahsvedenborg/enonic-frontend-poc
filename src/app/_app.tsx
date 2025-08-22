// app/layout.tsx

import './globals.css'
import { PostHogProvider } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <PostHogProvider>
                    {children}
                </PostHogProvider>
            </body>
        </html>
    )
}

/*
// Basic flag implementation
import { useFeatureFlagEnabled } from 'posthog-js/react'

function App() {
    const flagEnabled = useFeatureFlagEnabled('my-flag')

    if (flagEnabled) {
        // do something
    }
}

//Configure node
import { PostHog } from 'posthog-node'

const client = new PostHog(
    'phc_c9zV8uTO4y9Xt65LmiOmRakKSfWzcb4gJEINy4B1imD',
    {
        host: 'https://eu.i.posthog.com'
    }
)
// Basic flag implementation
const isMyFlagEnabledForUser = await client.isFeatureEnabled('my-flag', 'user distinct id')

if (isMyFlagEnabledForUser) {
    // Do something differently for this user
}
*/
