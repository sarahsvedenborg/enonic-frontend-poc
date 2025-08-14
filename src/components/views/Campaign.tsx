'use client'
import React from 'react'
import {FetchContentResult, getUrl, I18n} from '@enonic/nextjs-adapter';
import Link from 'next/link';
import { Buttons as Button } from 'rk-designsystem'
import styles from './Campaign.module.css'
import DonationForm from './DonationForm'

const Campaign = (props: FetchContentResult) => {
     const {displayName, data, parent} = props.data?.get as any;
      const {teaser, bio} = data;
     console.log("data", data)
/*     const meta = props.meta;  */ 

    const handleDonate = (amount: number, frequency: 'monthly' | 'one-time') => {
      console.log(`Donating ${amount} kr ${frequency}`)
      // Here you would integrate with your payment system
    }

    return (
        <>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                {/* Overlay for better text readability */}
                <div className={styles.heroOverlay}></div>
                
                {/* Centered H1 Title */}
                <h1 className={styles.heroTitle}>
                    {displayName}
                </h1>
            </div>

              {/* Donation Form */}
              <div className={styles.donationSection}>
                <DonationForm 
                    title="Du kan hjelpe"
                    description="Bidra til å hjelpe de mest sårbare i land rammet av kriser, krig og konflikt."
                    onDonate={handleDonate}
                />
            </div>

            <div className={styles.contentSection}>
            {/*      <h2 className={styles.contentTitle}>{displayName}</h2> */}
                  <p className={styles.contentText}>{teaser}</p> 
                  <div className={styles.buttonContainer}>
                      <Button variant="primary">
                          Lagre
                      </Button>
                  </div>
             {/*    {
                    photos.map((photo: any, i: number) => (
                        <img key={i}
                             src={getUrl(photo.imageUrl, meta)}
                             title={getTitle(photo, displayName)}
                             alt={getTitle(photo, displayName)}
                             width="500"
                        />
                    ))
                }  */}
            </div>

          

            {/* <p><Link href={getUrl(`/${parent._path}`, meta)}>{I18n.localize('back')}</Link></p> */}
        </>
    )
}

export default Campaign;

/* function getTitle(photo: any, displayName: string) {
    return (photo.attachments || [])[0].name || displayName;
} */
