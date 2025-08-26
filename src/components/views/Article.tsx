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


    const { shortDescription, body } = data;

    const meta = props.meta;



    return (
        <>
            <div style={{ maxWidth: 'var(--section-md)', margin: '2em auto 0' }}>
                <Heading data-size='lg' >{displayName}</Heading>
                <Paragraph variant="long" data-size='md'>{shortDescription}</Paragraph>
                {body && (
                    <RichTextView className={styles.bio} data={body} meta={meta} />
                )}
            </div>



        </>
    )
}

export default Article;

/* function getTitle(photo: any, displayName: string) {
    return (photo.attachments || [])[0].name || displayName;
} */
