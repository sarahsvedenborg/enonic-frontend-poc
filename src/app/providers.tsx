// app/providers.tsx
'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { usePostHog } from 'posthog-js/react'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
            person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
            defaults: '2025-05-24',
            disable_web_experiments: false
        })
        /*
                if (!window?.posthog) {
                    console.warn('PostHog must be added to the window object on this page, for this to work. This is normally done in the loaded callback of your posthog init code.')
                } else {
                    window.posthog.loadToolbar({"action": "ph_authorize", "token": "phc_c9zV8uTO4y9Xt65LmiOmRakKSfWzcb4gJEINy4B1imD", "temporaryToken": "V8jchQSP2JgY1FHevAKtWS25Ij1e7Oo_HmNydOYnPrk", "actionId": null, "experimentId": "64417", "userIntent": "edit-experiment", "toolbarVersion": "toolbar", "apiURL": "https://eu.posthog.com", "dataAttributes": ["data-attr"], "instrument": true, "userEmail": "sarah.svedenborg@redcross.no", "distinctId": "TakfhUe3Hn5Kg2pClRIs32wSmZC5Ygederjlg6oNtjB"})
                }
          */
    }, [])

    return (
        <PHProvider client={posthog}>
            {children}
        </PHProvider>
    )
}
