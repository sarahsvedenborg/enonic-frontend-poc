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
    const { shortDescription, body } = data;


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

                </div>

                <div className={styles.richTextSection}>
                    <div className={styles.richTextSectionInner}>
                        {body && (
                            <RichTextView className={styles.body} data={body} meta={meta} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LocalHome;

