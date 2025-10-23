'use client'
import React from 'react'

import { Heading, Link as Link2, Paragraph } from '@digdir/designsystemet-react';
import styles from './MoneyArrives.module.css'
import Text from '../../Basic/Text/Text'

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


  console.log("stroke", `${2 * Math.PI * 80 * percentage / 100} ${2 * Math.PI * 80}`)

  return (
    <div className={styles.moneyArrivesSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Title */}
          <div className={styles.titleSection}>
            <Heading
              level={2}

              className={styles.title}
            >
              {title}
            </Heading>
          </div>


          <div className={styles.mainContent}>

            <div className={styles.textColumn}>

              <Text variant="long">{description}</Text>

            </div>

            {/* Right Column - Donut Chart */}
            <div className={styles.chartColumn}>
              <div className={styles.chartContainer}>
                <svg
                  className={styles.donutChart}
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                >
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="20"
                    className={styles.chartBackground}
                  />

                  {/* Main percentage segment */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#d52b1e"
                    strokeWidth="20"
                    /*  strokeDasharray={251} */
                    strokeDasharray={`${2 * Math.PI * 80 * percentage / 100} ${2 * Math.PI * 80}`}
                    /*      strokeDashoffset={-2 * Math.PI * 80 * 0.25} */
                    className={styles.chartSegment}
                    transform="rotate(-20 100 100)"
                  />
                </svg>

                {/* Percentage Label */}
                <div className={styles.percentageLabel}>

                  <Text variant='short' size='sm'>{percentage} % går til formålet</Text>
                </div>
              </div>
            </div>
          </div>
          <p>image: {imageUrl}</p>
          {/* Bottom Link */}
          <div className={styles.linkSection}>
            <Link2
              href={learnMoreUrl}
              data-color="neutral"
              data-size="lg"

            >
              {/*   <p>{learnMoreText}</p> */}
              <Paragraph variant="default" data-size='md'>{learnMoreText}</Paragraph>
            </Link2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoneyArrives
