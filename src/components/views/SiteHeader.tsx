"use client"
import React from 'react'
import Link from 'next/link'
import styles from './SiteHeader.module.css'
import { Buttons } from 'rk-designsystem'

export const SiteHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* Left Section - Navigation/Search */}
        <div className={styles.leftSection}>
          <button className={styles.menuButton} aria-label="Meny">
            <div className={styles.hamburgerIcon}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className={styles.menuText}>Meny</span>
          </button>
          
          <button className={styles.searchButton} aria-label="Søk">
            <div className={styles.searchIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="m10 10 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className={styles.searchText}>Søk</span>
          </button>
        </div>

        {/* Center Section - Logo/Brand */}
        <div className={styles.centerSection}>
          <div className={styles.brand}>
            <div className={styles.logoContainer}>
           <img src="https://www.rodekors.no/UI/logo_main.svg" alt="Røde Kors" width="200" height="100" />
            </div>
           {/*  <div className={styles.brandText}>
              <span className={styles.separator}>|</span>
              <span className={styles.brandTitle}>Røde Kors</span>
              <span className={styles.separator}>|</span>
            </div> */}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className={styles.rightSection}>
          <Buttons variant="primary" className={styles.donateButton}>
            Gi nå
          </Buttons>
          
          <button className={styles.myPageButton} aria-label="Min side">
            <div className={styles.myPageIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="m6 8 2 2 2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={styles.myPageText}>Min side</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader


