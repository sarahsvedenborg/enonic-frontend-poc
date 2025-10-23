'use client'
import React from 'react'
import { FetchContentResult, getUrl, I18n } from '@enonic/nextjs-adapter';
import Link from 'next/link';
import { Buttons as Button } from 'rk-designsystem'
import styles from './Campaign.module.css'
import DonationForm from '../../ui/Complex/DonationForm/DonationForm'
import DonationBanner from './DonationBanner'
import DirectDonation from './DirectDonation'
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView';
import MoneyArrives from '../../ui/Complex/MoneyArrives/MoneyArrives';
import { ArgumentsList } from './ArgumentsList';

const Campaign = (props: FetchContentResult) => {
    const { displayName, data, parent } = props.data?.get as any;
    if (!data) {
        return <p>{`<Kampanje brødtekst>`}</p>
    }

    const { body } = data;

    const meta = props.meta;

    const handleDonate = (amount: number, frequency: 'monthly' | 'one-time') => {
        console.log(`Donating ${amount} kr ${frequency}`)
        // Here you would integrate with your payment system
    }

    return (
        <>


            {/*   <DonationForm
                title="Du kan hjelpe"
                description="Bidra til å hjelpe de mest sårbare i land rammet av kriser, krig og konflikt."
                onDonate={handleDonate}
            /> */}


            {/* Donation Efficiency Banner */}
            {/*  <div className={styles.bannerSection}>
                <DonationBanner
                    percentage={90}
                    text="av alle bidrag går til formålet"
                />
            </div> */}

            {/* Direct Donation Information */}
            {/*   <div className={styles.directDonationSection}>
                <DirectDonation
                    title="Du kan også gi direkte"
                    vippsNumber="2272"
                    accountNumber="8200 06 10190"
                />
            </div> */}
            <div className={styles.richTextSection}>
                <div className={styles.richTextSectionInner}>
                    {/* <Paragraph variant="long" data-size='md'>{teaser}</Paragraph> */}
                    {body && (
                        <RichTextView className={styles.bio} data={body} meta={meta} />
                    )}
                </div>
            </div>
            {data.arguments && <ArgumentsList items={data.arguments} meta={meta} />}
            {/*   <MoneyArrives /> */}

            {/*   <div style={{ width: 'fit-content', maxWidth: 'var(--section-md)', margin: '0 auto', textAlign: 'center' }}>

                <Button variant="primary" data-size='lg'>
                    Gi nå
                </Button>

            </div> */}
            {/* <p><Link href={getUrl(`/${parent._path}`, meta)}>{I18n.localize('back')}</Link></p> */}
        </>
    )
}

export default Campaign;

/* function getTitle(photo: any, displayName: string) {
    return (photo.attachments || [])[0].name || displayName;
} */
