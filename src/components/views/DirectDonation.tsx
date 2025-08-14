'use client'
import React from 'react'
import styles from './DirectDonation.module.css'

interface DirectDonationProps {
  title?: string
  vippsNumber?: string
  accountNumber?: string
}

const DirectDonation: React.FC<DirectDonationProps> = ({
  title = "Du kan også gi direkte",
  vippsNumber = "2272",
  accountNumber = "8200 06 10190"
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      
      <div className={styles.paymentInfo}>
        <div className={styles.paymentColumn}>
          <div className={styles.paymentLabel}>Vipps til</div>
          <div className={styles.paymentValue}>{vippsNumber}</div>
        </div>
        
        <div className={styles.paymentColumn}>
          <div className={styles.paymentLabel}>Kontonummer:</div>
          <div className={styles.paymentValue}>{accountNumber}</div>
        </div>
      </div>
    </div>
  )
}

export default DirectDonation
