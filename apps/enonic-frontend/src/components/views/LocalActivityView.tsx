'use client'
import React from 'react'
import { FetchContentResult } from '@enonic/nextjs-adapter';
import { Heading, Paragraph } from '@digdir/designsystemet-react'
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView';
import styles from './ActivityGlobalDescription.module.css';
import styles2 from './Campaign.module.css';
import { Section } from 'ui-lib';
import ActivitySignupForm from 'ui-lib/components/ActivitySignupForm/ActivitySignupForm';

const LocalActivityView = (props: FetchContentResult) => {
    const { data } = props.data?.get as any;
    const allActivities = props.data?.query || [];

    const meta = props.meta;

    const { global_activity_name, body: localBody } = data
    const headerPhotoUrl = data?.photo?.imageUrl

    // Debug: Log all activities and their activityType values

    allActivities.forEach((activity: any, index: number) => {
        console.log(`Activity ${index}:`, {
            displayName: activity.displayName,
            activityType: activity.data?.activityType,
            matches: activity.data?.activityType === global_activity_name
        })
    })

    // Find the activity where activityType matches global_activity_name
    const matchingActivity = allActivities.find((activity: any) =>
        activity.data?.activityType === global_activity_name
    );


    return <>
        <div className={styles2.heroSection} style={headerPhotoUrl ? { backgroundImage: `url(${headerPhotoUrl})` } : {}}>
            <div className={styles2.heroOverlay}></div>
            <Heading data-size="xl" className={styles2.heroTitle}>{global_activity_name}</Heading>
        </div>

        <Section width="md" >
            {matchingActivity && (
                <div>
                    {matchingActivity.data?.shortDescription && (
                        <Paragraph variant="long" data-size='md' className={styles.excerpt}>
                            {matchingActivity.data.shortDescription}
                        </Paragraph>
                    )}
                    {matchingActivity.data?.body && (
                        <RichTextView className={styles.body} data={matchingActivity.data.body} meta={meta} />
                    )}
                </div>
            )}

            {localBody && (
                <RichTextView className={styles2.bio} data={localBody} meta={meta} />
            )}

            <ActivitySignupForm
                title={'Bli med i aktiviteten'}
                description="Skal komme fra enonic description"
                information="Skal komme fra enonic information"
                branchName="Skedsmo"
                activityType={global_activity_name}
                readOnly={true}
            />
        </Section >
    </>

};

export default LocalActivityView;
