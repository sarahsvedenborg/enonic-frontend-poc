'use client'
import React from 'react'
import { FetchContentResult, getUrl, I18n } from '@enonic/nextjs-adapter';
import Link from 'next/link';
import { Heading, Paragraph } from '@digdir/designsystemet-react'
import styles from './LocalHome.module.css'

import RichTextView from '@enonic/nextjs-adapter/views/RichTextView';
import MoneyArrives from '../../ui/Complex/MoneyArrives/MoneyArrives';

const LocalHome = (props: FetchContentResult) => {
    const { displayName, data, parent } = props.data?.get as any;
    const { shortDescription, bio, sourceId, api_activities } = data;

    /*     console.log("api_activities", api_activities) */

    if (sourceId) {
        return <h1>Lokalforening id: {sourceId}</h1>
    }



    const meta = props.meta;

    return (
        <>
            <div className={styles.container}>
                <div className={styles.contentSection}>
                    <Heading data-size="xl" className={styles.title}>{displayName}</Heading>
                    {shortDescription && (
                        <Paragraph variant="long" data-size='md' className={styles.description}>
                            {shortDescription}
                        </Paragraph>
                    )}
                    {/* Contact Information Section */}
                    <div className={styles.contactSection}>
                        <div className={styles.contactContent}>
                            <div className={styles.contactList}>
                                <div className={styles.contactItem}>
                                    <Paragraph data-size="sm" >Adresse:</Paragraph>
                                    <Paragraph data-size='sm'>
                                        Gislevollvegen 19, 2067 JESSHEIM
                                    </Paragraph>
                                </div>

                                <div className={styles.contactItem}>
                                    <Paragraph data-size="sm" >Telefon:</Paragraph>
                                    <Paragraph data-size='sm'>-</Paragraph>
                                </div>

                                <div className={styles.contactItem}>
                                    <Paragraph data-size="sm" >E-post:</Paragraph>
                                    <Link
                                        href="mailto:post@ullensakkerrodekors.no"
                                        className={styles.contactLink}
                                    >
                                        post@ullensakkerrodekors.no
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={styles.richTextSection}>
                    <div className={styles.richTextSectionInner}>
                        {bio && (
                            <RichTextView className={styles.bio} data={bio} meta={meta} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LocalHome;

