'use client'
import React, { useState } from 'react'
import { Section } from 'ui-lib'
import { Buttons as Button, Buttons, Input } from 'rk-designsystem'
import styles from './DonationForm.module.css'
import { FiChevronDown, FiHeart } from 'react-icons/fi'
/* import DonationBanner from '../../../components/views/DonationBanner' */

import { useFeatureFlagEnabled, useFeatureFlagVariantKey } from 'posthog-js/react'

interface DonationFormProps {
  title?: string
  isDefault?: boolean,
  description?: string,
  amounts?: number[],
  vippsNumber?: string,
  accountNumber?: string,
  factBox?: string,
  includeDirectDonation?: boolean,
  onDonate?: (amount: number, frequency: 'monthly' | 'one-time') => void
  negativeMargin?: boolean
}



const handleDonate = (amount: number, frequency: 'monthly' | 'one-time') => {
  console.log(`Donating ${amount} kr ${frequency}`)
  // Here you would integrate with your payment system
}

export const DonationForm: React.FC<DonationFormProps> = ({
  title = "Du kan hjelpe",
  isDefault = false,
  description = "Bidra til å hjelpe de mest sårbare i land rammet av kriser, krig og konflikt.",
  amounts = [100, 300, 500],
  vippsNumber = "2272",
  accountNumber = "8200 06 10190",
  factBox = "Din gave gjør en forskjell. For 300 kroner kan to personer få hvert sitt teppe og mat og vann i en måned.",
  onDonate = (amount: number, frequency: 'monthly' | 'one-time') => { console.log(`Donating ${amount} kr ${frequency}`) },
  includeDirectDonation = false,
  negativeMargin = false,
  ...props
}) => {

  const directDonationTitle = "Du kan også gi direkte"
  const directDonationVippsNumber = "2272"
  const directDonationAccountNumber = "8200 06 10190"

  const [frequency, setFrequency] = useState<'monthly' | 'one-time'>('one-time')
  const [amount, setAmount] = useState<number>(300)
  const [customAmount, setCustomAmount] = useState<string>('')

  const handleDonate = () => {
    const finalAmount = customAmount ? parseInt(customAmount) : amount
    onDonate?.(finalAmount, frequency)
  }

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount)
    setCustomAmount('')
  }

  const flagEnabled = useFeatureFlagVariantKey('my-flag') === 'override';
  if (flagEnabled) {
    console.log('flagEnabled')
  }

  return (
    <Section width="sm" background="white" negativeMargin={negativeMargin}>
      <div className={styles.donationSection}>
        <div className={styles.donationForm}>
          {/* Header Section */}
          <div style={{ maxWidth: 'var(--section-xs)', margin: '0 auto', paddingTop: '0 var(--ds-size-8)' }}>


            <div className={styles.header}>
              <h1 className={styles.title}>{flagEnabled ? 'Gi penger nå' : title}</h1>
              <p className={styles.description}>{description}</p>
            </div>

            {/* Frequency Selection */}
            <div className={styles.section}>
              <label className={styles.label}>{isDefault ? "Velg formål" : "Hvor ofte vil du gi?"}</label>

              {isDefault && <>
                {/*    <React.forwardRef
                htmlFor="input-default"
                id="input-default-label"
              >
                Input Label
              </React.forwardRef> */}
                <Input
                  aria-labelledby="input-default-label"
                  data-size="md"
                  id="input-default"
                  name="default-input"
                  placeholder="Type something..."
                  type="text"
                />
              </>}

              {!isDefault && <div className={styles.buttonGroup}>
                <Buttons
                  variant="secondary"
                  className={` ${frequency === 'monthly' ? styles.selected : ''}`}
                  onClick={() => setFrequency('monthly')}
                  type="button"
                >
                  Gi månedlig
                </Buttons>
                <Buttons
                  variant="primary"
                  className={` ${frequency === 'one-time' ? styles.selected : ''}`}
                  onClick={() => setFrequency('one-time')}
                  type="button"
                >
                  Engangsgave
                </Buttons>
              </div>}
            </div>

            {/* Amount Selection */}
            <div className={styles.section}>
              <label className={styles.label}>Velg beløp</label>
              <div className={styles.buttonGroup}>
                <button
                  className={`${styles.amountButton} ${amount === 100 && !customAmount ? styles.selected : ''}`}
                  onClick={() => handleAmountSelect(amounts[0])}
                  type="button"
                >
                  {amounts[0]}
                </button>
                <button
                  className={`${styles.amountButton} ${amount === 300 && !customAmount ? styles.selected : ''}`}
                  onClick={() => handleAmountSelect(amounts[1])}
                  type="button"
                >
                  {amounts[1]}
                </button>
                <button
                  className={`${styles.amountButton} ${amount === 500 && !customAmount ? styles.selected : ''}`}
                  onClick={() => handleAmountSelect(amounts[2])}
                  type="button"
                >
                  {amounts[2]}
                </button>
              </div>
              <button
                className={styles.customAmountLink}
                onClick={() => setCustomAmount('')}
                type="button"
              >
                Velg eget beløp
                <FiChevronDown />
              </button>
              {customAmount !== '' && (
                <div className={styles.customAmountInput}>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Skriv beløp"
                    className={styles.input}
                  />
                  <span className={styles.currency}>kr</span>
                </div>
              )}
            </div>

            {/* Impact Statement */}
            <div className={styles.impactSection}>
              <div className={styles.impactIcon}><FiHeart /></div>
              <p className={styles.impactText}>
                {factBox}
              </p>
            </div>

            {/* Call to Action */}
            <div className={styles.ctaSection}>
              <Button
                variant="primary"
                size="large"
                onClick={handleDonate}
                className={styles.donateButton}
              >
                Gi med VIPPS
              </Button>

              <button className={styles.otherPaymentLink} type="button">
                Andre betalingsmåter
                <FiChevronDown />

              </button>
            </div>
          </div>
        </div>

        {/*   <div className={styles.bannerSection}>
        <DonationBanner
          percentage={90}
          text="av alle bidrag går til formålet"
        />
      </div> */}

        {includeDirectDonation && (
          <div className={styles.directDonationSection}>

            <div className={styles.container}>
              <h2 className={styles.title}>{directDonationTitle}</h2>

              <div className={styles.paymentInfo}>
                <div className={styles.paymentColumn}>
                  <div className={styles.paymentLabel}>Vipps til</div>
                  <div className={styles.paymentValue}>{directDonationVippsNumber}</div>
                </div>

                <div className={styles.paymentColumn}>
                  <div className={styles.paymentLabel}>Kontonummer:</div>
                  <div className={styles.paymentValue}>{directDonationAccountNumber}</div>
                </div>
              </div>
            </div>

          </div>
        )
        }
      </div>
    </Section>
  )
}

export default DonationForm
