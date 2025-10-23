'use client'
import React from 'react'

import { Heading, Link as Link2, Paragraph } from '@digdir/designsystemet-react';
import styles from './MoneyArrives.module.css'
import Text from '../../Basic/Text/Text'
import { Section } from 'ui-lib/components/Section/Section';

interface MoneyArrivesProps {
  title?: string
  description?: string
  learnMoreText?: string
  learnMoreUrl?: string;
  causeAmount?: number;
  imageUrl?: string;
}

const MoneyArrives: React.FC<MoneyArrivesProps> = ({
  title,
  description,
  causeAmount = 90,
  learnMoreText,
  learnMoreUrl,
  imageUrl
}) => {
  const percentage = causeAmount || 90;

  const remainingPercentage = 100 - percentage

  return (
    <Section width="md" padding="none" margin="sm" background={imageUrl ? 'none' : 'light'}>
      <div className={`${styles.moneyArrivesSection}`}>


        <div className={styles.mainContent}>

          <div className={styles.textColumn}>
            <Heading level={2} className={styles.title}>{title}</Heading>
            <Text variant="long">{description}</Text>

          </div>

          {/* Right Column - Image or Donut Chart */}
          <div className={styles.chartColumn}>
            {imageUrl ? (
              <div className={styles.imageContainer}>
                <img
                  src={imageUrl}
                  alt={title || "Money arrives"}
                  className={styles.moneyArrivesImage}
                />
              </div>
            ) :/*  (
                <div className={styles.chartContainer}>
                  <svg
                    className={styles.donutChart}
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                  >
                
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#e5e5e5"
                strokeWidth="20"
                className={styles.chartBackground}
              />

       
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#d52b1e"
                strokeWidth="20"
                strokeDasharray={`${2 * Math.PI * 80 * percentage / 100} ${2 * Math.PI * 80}`}
                className={styles.chartSegment}
                transform="rotate(-20 100 100)"
              />
            </svg>

         
              <div className={styles.percentageLabel}>
                <Text variant='short' size='sm'>{percentage} % går til formålet</Text>
              </div>
            </div>
              ) */ null}
          </div>

        </div>
        {/* Bottom Link */}

        <div className={styles.linkSection}>
          <Link2
            href={learnMoreUrl}
            data-color="neutral"
            data-size="lg"

          >
            <Paragraph variant="default" data-size='md'>{learnMoreText}</Paragraph>
          </Link2>
        </div>

      </div >
    </Section>
  )
}

export default MoneyArrives
