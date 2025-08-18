'use client'
import React from 'react'
import { Heading, Typography, Link as Link2 } from 'rk-designsystem'
import styles from './MoneyArrives.module.css'

interface MoneyArrivesProps {
  title?: string
  description?: string
  percentage?: number
  learnMoreText?: string
  learnMoreUrl?: string
}

const MoneyArrives: React.FC<MoneyArrivesProps> = ({
  title = "Pengene kommer frem",
  description = "Av donasjoner fra faddere, medlemmer, givere og næringslivspartnere går 90 prosent til å gjennomføre hjelpearbeidet som det gis til. Seks prosent går til å skaffe nye midler og fire prosent går til administrasjon.",
  percentage = 90,
  learnMoreText = "Lær mer om hvordan vi bruker pengene",
  learnMoreUrl = "#"
}) => {
  const remainingPercentage = 100 - percentage

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Title */}
        <div className={styles.titleSection}>
          <Heading 
            level={2} 
            size="lg"
            className={styles.title}
          >
            {title}
          </Heading>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className={styles.mainContent}>
          {/* Left Column - Text */}
          <div className={styles.textColumn}>
            <Typography 
              variant="body-long-lg"
              className={styles.description}
            >
              {description}
            </Typography>
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
                <Typography 
                  variant="body-short-lg"
                  className={styles.percentageText}
                >
                  {percentage} % går til formålet
                </Typography>
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
            className={styles.learnMoreLink}
          >
            {learnMoreText}
          </Link2>
        </div>
      </div>
    </div>
  )
}

export default MoneyArrives
