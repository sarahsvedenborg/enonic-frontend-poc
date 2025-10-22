'use client'
import React from 'react'
import { FetchContentResult, getUrl, I18n } from '@enonic/nextjs-adapter';
import RichTextView from '@enonic/nextjs-adapter/views/RichTextView';
import Link from 'next/link';
import { Buttons as Button, Link as Link2, Card } from 'rk-designsystem'
import styles from './Campaign.module.css'
import DonationForm from '../../ui/Complex/DonationForm/DonationForm'
import DonationBanner from './DonationBanner'
import DirectDonation from './DirectDonation'
import { FaAngleRight, FaArrowRightLong } from 'react-icons/fa6';
import MoneyArrives from '../../ui/Complex/MoneyArrives/MoneyArrives';

const DonatePage = (props: FetchContentResult) => {
    const { displayName, data, parent } = props.data?.get as any;
    const { bio, info, otherWays, photos, donationForm } = data;

    const meta = props.meta;

    const headerPhotoUrl = photos?.imageUrl

    const handleDonate = (amount: number, frequency: 'monthly' | 'one-time') => {
        console.log(`Donating ${amount} kr ${frequency}`)
        // Here you would integrate with your payment system
    }

    return (
        <>
            {/* Hero Section */}
            <div className={styles.heroSection} style={headerPhotoUrl ? { backgroundImage: `url(${headerPhotoUrl})` } : {}}>
                {/* Overlay for better text readability */}
                <div className={styles.heroOverlay}></div>

                {/* Centered H1 Title */}
                <h1 className={styles.heroTitle}>
                    {displayName}<br />
                    <span style={{ fontSize: '0.5em', textTransform: 'uppercase' }}>(Fast giverside)</span>
                </h1>

            </div>

            {/* Donation Form */}
            {donationForm?.data &&
                <div className={`${styles.donationSection} ${styles.containerLarge}`}>
                    <DonationForm
                        title={donationForm?.data?.heading || "Du kan hjelpe"}
                        description={donationForm?.data?.description || "Bidra til å hjelpe de mest sårbare i land rammet av kriser, krig og konflikt."}
                        amounts={donationForm ? [donationForm.data?.amount1, donationForm.data?.amount2, donationForm.data?.amount3] : undefined}
                        factBox={donationForm?.data?.fact}
                        vippsNumber={donationForm?.data?.vippsNumber}
                        accountNumber={donationForm?.data?.accountNumber}
                        onDonate={handleDonate}
                        isDefault={true}
                    />
                </div>}

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
                    vippsNumber={donationForm?.vippsNumber || "2272"}
                    accountNumber={donationForm?.accountNumber || "8200 06 10190"}
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
                                        {link._name || link.title || `Link ${index + 1}`}<FaAngleRight />
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
                <h2 className={styles.otherWaysTitle}>Andre måter å støtte oss på</h2>


                {otherWays && Array.isArray(otherWays) && otherWays.length > 0 && (
                    <div className={styles.infoLinks}>
                        <ul className={styles.linksList}>
                            {otherWays.map((link: any, index: number) => (
                                <li key={index} className={styles.linkItem}>

                                    <Card
                                        asChild
                                        data-color="brand1"
                                        /*  style={{
                                           maxWidth: '300px'
                                         }} */
                                        variant="tinted"
                                    >
                                        <a href={getUrl(link.url || link._path, meta)}>
                                            <h3>
                                                {link._name || link.title || `Link ${index + 1}`} <FaArrowRightLong />
                                            </h3>
                                            <div className={styles.cardContent}>
                                                {/* <p>
        {link.description || link.teaser || 'Klikk for å lese mer'}
      </p> */}
                                                {/*  <svg 
        className={styles.arrowIcon} 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none"
      >
        <path 
          d="M5 12h14M12 5l7 7-7 7" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg> */}
                                            </div>
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
                {/*    <p className={styles.contentText}>{teaser}</p> */}
                {/*   <div className={styles.buttonContainer}>
                      <Button variant="primary">
                          Lagre
                      </Button>
                  </div> */}
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
            <div className={styles.richTextSection}>
                <div className={styles.richTextSectionInner}>
                    {bio && (
                        <RichTextView className={styles.bio} data={bio} meta={meta}></RichTextView>
                    )}
                </div>
            </div>
            <MoneyArrives />



            {/* <p><Link href={getUrl(`/${parent._path}`, meta)}>{I18n.localize('back')}</Link></p> */}
        </>
    )
}

export default DonatePage;

/* function getTitle(photo: any, displayName: string) {
    return (photo.attachments || [])[0].name || displayName;
} */
