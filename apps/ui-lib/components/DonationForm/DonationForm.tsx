'use client'
import React, { useState } from 'react'
import { Heading, Paragraph } from '@digdir/designsystemet-react'
import { Section } from 'ui-lib'
import { Buttons as Button, Buttons, Input } from 'rk-designsystem'
import styles from './DonationForm.module.css'
import { FiChevronDown, FiHeart } from 'react-icons/fi'
/* import DonationBanner from '../../../components/views/DonationBanner' */

import { useFeatureFlagEnabled, useFeatureFlagVariantKey } from 'posthog-js/react'

interface DonationFormProps {
  title?: string
  donationFormType?: 'compact' | 'extended'
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
  title,
  donationFormType = 'compact',
  isDefault = false,
  description,
  amounts = [100, 300, 500],
  vippsNumber = "2272",
  accountNumber = "8200 06 10190",
  factBox,
  onDonate = (amount: number, frequency: 'monthly' | 'one-time') => { console.log(`Donating ${amount} kr ${frequency}`) },
  includeDirectDonation = false,
  negativeMargin = false,
  ...props
}) => {


  const directDonationTitle = "Du kan også gi direkte"
  const directDonationVippsNumber = "2272"
  const directDonationAccountNumber = "8200 06 10190"

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
      console.log(`${type} copied to clipboard: ${text}`)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

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
  const DonationSelection = () => {
    return (

      <> < div className={styles.section} >
        <label className={styles.label}>{isDefault ? "Velg formål" : "Hvor ofte vil du gi?"}</label>

        {
          isDefault && <>
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
          </>
        }

        {
          !isDefault && <div className={styles.buttonGroup}>
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
          </div>
        }
      </div >
        {/* Amount Selection */}
        <div className={styles.section}>
          <label className={styles.label}>Velg beløp</label>
          <div className={styles.buttonGroup}>
            {amounts.map((amount, index) => <button
              className={`${styles.amountButton} ${index === amounts.length - 2 && !customAmount ? styles.selected : ''}`}
              onClick={() => handleAmountSelect(amount)}
              type="button"
            >
              {amount}
            </button>)}
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
        </div> </>
    )
  }

  const DonationButton = () => {
    return (
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
    )
  }
  if (donationFormType === 'compact') {
    return (<Section width="sm" negativeMargin={negativeMargin}>
      <div className={styles.donationSection}>
        <div className={styles.donationForm}>
          <DonationSelection />
          <DonationButton />
        </div>
      </div>
    </Section>
    )
  }

  return (
    <Section width="sm" negativeMargin={negativeMargin}>
      <div className={styles.donationSection}>
        <div className={styles.donationForm}>
          {/* Header Section */}
          <div style={{ maxWidth: 'var(--section-xs)', margin: '0 auto', paddingTop: '0 var(--ds-size-8)' }}>


            <div className={styles.header}>
              <h1 className={styles.title}>{flagEnabled ? 'Gi penger nå' : title}</h1>
              <p className={styles.description}>{description}</p>
            </div>


            <DonationSelection />


            {/* Impact Statement */}
            <div className={styles.impactSection}>
              <div className={styles.impactIcon}><FiHeart /></div>
              <p className={styles.impactText}>
                {factBox}
              </p>
            </div>

            <DonationButton />

          </div>
        </div>

        {/*   <div className={styles.bannerSection}>
        <DonationBanner
          percentage={90}
          text="av alle bidrag går til formålet"
        />
      </div> */}

        {includeDirectDonation && (
          <Section width="sm" margin="md">

            <div className={styles.container}>
              <Heading level={2} data-size="xl" >{directDonationTitle}</Heading>

              <div className={styles.paymentInfo}>
                <div className={styles.paymentColumn}>
                  <div className={styles.paymentLabel}>Vipps til</div>
                  <div
                    className={styles.paymentValue}
                    onClick={() => copyToClipboard(directDonationVippsNumber, 'Vipps number')}
                    title="Klikk for å kopiere"
                  >
                    {directDonationVippsNumber}
                  </div>
                </div>

                <div className={styles.paymentColumn}>
                  <div className={styles.paymentLabel}>Kontonummer</div>
                  <div
                    className={styles.paymentValue}
                    onClick={() => copyToClipboard(directDonationAccountNumber, 'Account number')}
                    title="Klikk for å kopiere"
                  >
                    {directDonationAccountNumber}
                  </div>
                </div>
              </div>
            </div>

          </Section>
        )
        }
      </div>
    </Section>
  )
}

export default DonationForm
