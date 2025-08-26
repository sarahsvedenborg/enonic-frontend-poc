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

const Article = (props: FetchContentResult) => {
    const { displayName, data, parent } = props.data?.get as any;
    if (!data) {
        return <p>{`<Kampanje brødtekst>`}</p>
    }

    const { blocks, preface } = data;

    console.log("blocks", blocks)

    const meta = props.meta;

    const handleDonate = (amount: number, frequency: 'monthly' | 'one-time') => {
        console.log(`Donating ${amount} kr ${frequency}`)
        // Here you would integrate with your payment system
    }

    return (
        <>
            <div style={{ maxWidth: 'var(--section-md)', margin: '0 auto' }}>

                <Heading data-size='lg' >{displayName}</Heading>

                <Paragraph variant="long" data-size='md'>{preface}</Paragraph>

            </div>

            <div className={styles.richTextSection}>
                <div className={styles.richTextSectionInner}>
                    {/* <Paragraph variant="long" data-size='md'>{teaser}</Paragraph> */}
                    {blocks && (
                        <RichTextView className={styles.bio} data={blocks} meta={meta} />
                    )}
                </div>
            </div>
            {/*   <MoneyArrives /> */}

            {/*   <div style={{ width: 'fit-content', maxWidth: 'var(--section-md)', margin: '0 auto', textAlign: 'center' }}>

                <Button variant="primary" data-size='lg'>
                    Gi nå
                </Button>

            </div> */}


        </>
    )
}

export default Article;

/* function getTitle(photo: any, displayName: string) {
    return (photo.attachments || [])[0].name || displayName;
} */
