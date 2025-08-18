'use client'
import React from 'react'
import {FetchContentResult, getUrl, I18n} from '@enonic/nextjs-adapter';
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView';
import Link from 'next/link';
import { Buttons as Button, Link as Link2, Card } from 'rk-designsystem'
import styles from './Campaign.module.css'
import DonationForm from './DonationForm'
import DonationBanner from './DonationBanner'
import DirectDonation from './DirectDonation'

const DonatePage = (props: FetchContentResult) => {
     const {displayName, data, parent} = props.data?.get as any;
      const {teaser, bio, info, otherWays} = data;
     console.log("data donate", data)
     const meta = props.meta;   

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
            <div className={`${styles.donationSection} ${styles.containerLarge}`}>
                <DonationForm 
                    title="Du kan hjelpe"
                    description="Bidra til å hjelpe de mest sårbare i land rammet av kriser, krig og konflikt."
                    onDonate={handleDonate}
                />
            </div>

            {/* Donation Efficiency Banner */}
            <div className={`${styles.bannerSection} ${styles.containerMedium}`}>
                <DonationBanner 
                    percentage={90}
                    text="av alle bidrag går til formålet"
                />
            </div>

            {/* Direct Donation Information */}
            <div className={`${styles.directDonationSection} ${styles.containerMedium}`}>
                <DirectDonation 
                    title="Du kan også gi direkte"
                    vippsNumber="2272"
                    accountNumber="8200 06 10190"
                />
            </div>

    
            {/* Info Section with Links */}
            <div className={`${styles.infoSection} ${styles.containerLarge}`}>
                <h2 className={styles.infoTitle}>Les mer om hva det vil si å være</h2>
                
                {info && Array.isArray(info) && info.length > 0 && (
                    <div className={styles.infoLinks}>
                        <ul className={styles.linksList}>
                            {info.map((link: any, index: number) => (
                                <li key={index} className={styles.linkItem}>
                                    <Link2
  data-color="neutral"
  data-size="lg"
  href={getUrl(link.url || link._path, meta)} 
>
{link.displayName || link.title || `Link ${index + 1}`}
</Link2>
                                    
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {(!info || !Array.isArray(info) || info.length === 0) && (
                    <p className={styles.noLinks}>Ingen lenker tilgjengelig for øyeblikket.</p>
                )}
            </div>

                <div className={`${styles.otherWaysSection} ${styles.containerLarge}`}>
                <h2 className={styles.otherWaysTitle}>Andre måter å bidra på</h2>

                   
            {otherWays && Array.isArray(otherWays) && otherWays.length > 0 && (
                    <div className={styles.infoLinks}>
                        <ul className={styles.linksList}>
                            {otherWays.map((link: any, index: number) => (
                                <li key={index} className={styles.linkItem}>
                               
<Card
  asChild
  data-color="brand1"
  style={{
    maxWidth: '300px'
  }}
  variant="tinted"
>
  <a href={getUrl(link.url || link._path, meta)}>
    <h3>
      {link.displayName || link.title || `Link ${index + 1}`}
    </h3>
    <p>
      {link.description || link.teaser || 'Klikk for å lese mer'}
    </p>
  </a>
</Card>
                                     
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className={`${styles.contentSection} ${styles.containerSmall}`}>
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
            <RichTextView className={styles.bio} data={bio} meta={meta}></RichTextView>

           

            {/* <p><Link href={getUrl(`/${parent._path}`, meta)}>{I18n.localize('back')}</Link></p> */}
        </>
    )
}

export default DonatePage;

/* function getTitle(photo: any, displayName: string) {
    return (photo.attachments || [])[0].name || displayName;
} */
