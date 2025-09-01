'use client'
import React from 'react'
import styles from './DonationBanner.module.css'

interface DonationBannerProps {
  percentage?: number
  text?: string
}

const DonationBanner: React.FC<DonationBannerProps> = ({
  percentage = 90,
  text = "av alle bidrag går til formålet"
}) => {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <span className={styles.percentage}>{percentage}%</span>
        <span className={styles.text}>{text}</span>
      </div>
    </div>
  )
}

export default DonationBanner
