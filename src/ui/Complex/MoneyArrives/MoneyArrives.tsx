'use client'
import React from 'react'

import { Heading, Link as Link2  } from '@digdir/designsystemet-react';
import styles from './MoneyArrives.module.css'
import Text from '../../Basic/Text/Text'

interface MoneyArrivesProps {
  title?: string
  description?: string
  percentage?: number
  learnMoreText?: string
  learnMoreUrl?: string;
  causeAmount?: number;
}

const MoneyArrives: React.FC<MoneyArrivesProps> = ({
  title = "Pengene kommer frem",
  description = "Av donasjoner fra faddere, medlemmer, givere og næringslivspartnere går 90 prosent til å gjennomføre hjelpearbeidet som det gis til. Seks prosent går til å skaffe nye midler og fire prosent går til administrasjon.",
  causeAmount = 90,
  learnMoreText = "Lær mer om hvordan vi bruker pengene",
  learnMoreUrl = "#"
}) => {
    const percentage = causeAmount || 90;
  const remainingPercentage = 100 - percentage




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
                  strokeDasharray={`${2 * Math.PI * 80 * percentage / 100} ${2 * Math.PI * 80}`}
                  strokeDashoffset={-2 * Math.PI * 80 * 0.25}
                  className={styles.chartSegment}
                  transform="rotate(-90 100 100)"
                />
              </svg>
              
              {/* Percentage Label */}
              <div className={styles.percentageLabel}>
         
                <Text variant='short' size='sm'>{percentage} % går til formålet</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Link */}
        <div className={styles.linkSection}>
          <Link2
            href={learnMoreUrl}
            data-color="neutral"
            data-size="lg"
        
          >
            <p>{learnMoreText}</p>
           {/*   <Text variant="body-short-lg">{learnMoreText}</Text> */}
          </Link2>
        </div>
      </div>
    </div>
    </div>
  )
}

export default MoneyArrives
