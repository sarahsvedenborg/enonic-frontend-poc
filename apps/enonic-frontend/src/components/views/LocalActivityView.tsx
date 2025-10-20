'use client'
import React from 'react'
import { FetchContentResult } from '@enonic/nextjs-adapter';
import { Heading, Paragraph } from '@digdir/designsystemet-react'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView';
import styles from './ActivityGlobalDescription.module.css';
import styles2 from './Campaign.module.css';
import { Section } from 'ui-lib';

const LocalActivityView = (props: FetchContentResult) => {
    const { data } = props.data?.get as any;
    const activityData = props.data?.query?.[0];

    const meta = props.meta;

    const { global_activity_name, body: localBody } = data

    const headerPhotoUrl = data?.photo?.imageUrl


    return <>
        <div className={styles2.heroSection} style={headerPhotoUrl ? { backgroundImage: `url(${headerPhotoUrl})` } : {}}>
            <div className={styles2.heroOverlay}></div>
            <Heading data-size="xl" className={styles2.heroTitle}>{global_activity_name}</Heading>
        </div>

        <Section width="md" >

            <div>
                <Paragraph variant="long" data-size='md'><i>Global aktivitetsbeskrivelse kommer </i></Paragraph>
            </div>

            {localBody && (
                <RichTextView className={styles2.bio} data={localBody} meta={meta} />
            )}

        </Section >
    </>

    /*     if (!activityData) {
            return null;
        }
    
        const { displayName, data: activityContent } = activityData;
        const { shortDescription, body } = activityContent; */


    /*     return (
            <div className={styles.container}>
                <div className={styles.contentSection}>
                    <Heading data-size="lg" className={styles.title}>
                        {displayName}
                    </Heading>
                    {shortDescription && (
                        <Paragraph variant="long" data-size='md' className={styles.excerpt}>
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
        ); */
};

export default LocalActivityView;
