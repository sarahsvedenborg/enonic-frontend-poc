'use client'
import React from 'react'
import { FetchContentResult, getUrl, I18n } from '@enonic/nextjs-adapter';
import Link from 'next/link';
import { Heading } from '@digdir/designsystemet-react'
import styles from './LocalHome.module.css'



const DistrictHome = (props: FetchContentResult) => {
    const { displayName, data, parent } = props.data?.get as any;



    const meta = props.meta;

    return (
        <>
            <div className={styles.container}>
                <div className={styles.contentSection}>
                    <Heading data-size="xl" className={styles.title}>{displayName}</Heading>


                </div>

            </div>
        </>
    )
}

export default DistrictHome;

