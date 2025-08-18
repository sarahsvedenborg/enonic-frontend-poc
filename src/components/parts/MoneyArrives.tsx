import React from 'react'
import {APP_NAME, PartData} from '@enonic/nextjs-adapter';
import MoneyArrives from '../views/MoneyArrives';
import styles from '../views/MoneyArrives.module.css'
import { Heading, Link as Link2  } from '@digdir/designsystemet-react';

// fully qualified XP part name:
export const MONEY_ARRIVES_PART_NAME = `${APP_NAME}:money-arrives`;

export interface MoneyArrivesData {
    part: PartData;
    common: any;
}

const MoneyArrivesView = ({part, common}: MoneyArrivesData) => {
     const percentage = part?.config?.causeAmount || 90;
 
 /*    <div>
        <h2>{part?.config?.heading || common?.get?.displayName}</h2>
        <p>{part?.config?.description || "Description"}</p>
        <p>{part?.config?.readMoreLabel || "Les mer"}</p>
        <p>{part?.config?.causeAmount || "90% til formålet"}</p>


    </div> */
      
          /*    <div className={styles.moneyArrivesSection}>
           
            </div>  */
     return     <div className={styles.moneyArrivesSection}>

    <div className={styles.container}>
      <div className={styles.content}>
        {/* Title */}
     {/*    <div className={styles.titleSection}>
          <Heading 
            level={2} 
            className={styles.title}
          >
            {part?.config?.heading || common?.get?.displayName}
          </Heading>
        </div> */}

        {/* Main Content - Two Column Layout */}
        <div className={styles.mainContent}>
          {/* Left Column - Text */}
          <div className={styles.textColumn}>
          <div className={styles.titleSection}>
          <Heading 
            level={2} 
            className={styles.title}
          >
            {part?.config?.heading || common?.get?.displayName}
          </Heading>
        </div>
           {/*  <Typography 
              variant="body-long-lg"
              className={styles.description}
            >
              {description}
            </Typography> */}
            <p>{part?.config?.description || "Description"}</p>
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
               {/*  <Typography 
                  variant="body-short-lg"
                  className={styles.percentageText}
                >
                  {percentage} % går til formålet
                </Typography> */}
                <p>{`${part?.config?.causeAmount || 90} % går til formålet`}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Link */}
        <div className={styles.linkSection}>
          <Link2
            href="/"
            data-color="neutral"
            data-size="lg"
            className={styles.learnMoreLink}
          >
            {part?.config?.readMoreLabel || "Les mer"}
          </Link2>
        </div>
      </div>
    </div>
  
          </div>

};

export default MoneyArrivesView;