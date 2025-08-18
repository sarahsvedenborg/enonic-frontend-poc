'use client'
import React, { useState } from 'react'
import { Buttons as Button, Buttons } from 'rk-designsystem'
import styles from './DonationForm.module.css'
import { FiChevronDown, FiHeart } from 'react-icons/fi'

interface DonationFormProps {
  title?: string
  description?: string
  onDonate?: (amount: number, frequency: 'monthly' | 'one-time') => void
}

const DonationForm: React.FC<DonationFormProps> = ({
  title = "Du kan hjelpe",
  description = "Bidra til å hjelpe de mest sårbare i land rammet av kriser, krig og konflikt.",
  onDonate
}) => {
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

  return (
    <div className={styles.donationForm}>
      {/* Header Section */}
      <div style={{maxWidth: 'var(--section-xs)', margin: '0 auto', paddingTop: '0 var(--ds-size-8)'}}>

     
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>

      {/* Frequency Selection */}
      <div className={styles.section}>
        <label className={styles.label}>Hvor ofte vil du gi?</label>
        
        <div className={styles.buttonGroup}>
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
      </div>

      {/* Amount Selection */}
      <div className={styles.section}>
        <label className={styles.label}>Velg beløp</label>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.amountButton} ${amount === 100 && !customAmount ? styles.selected : ''}`}
            onClick={() => handleAmountSelect(100)}
            type="button"
          >
            100
          </button>
          <button
            className={`${styles.amountButton} ${amount === 300 && !customAmount ? styles.selected : ''}`}
            onClick={() => handleAmountSelect(300)}
            type="button"
          >
            300
          </button>
          <button
            className={`${styles.amountButton} ${amount === 500 && !customAmount ? styles.selected : ''}`}
            onClick={() => handleAmountSelect(500)}
            type="button"
          >
            500
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
          Din gave gjør en forskjell. For {customAmount || amount} kroner kan to personer få hvert sitt teppe og mat og vann i en måned.
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
  )
}

export default DonationForm
