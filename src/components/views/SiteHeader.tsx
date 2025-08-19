"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import styles from './SiteHeader.module.css'
import { Buttons, Link as Link2, Card } from 'rk-designsystem'

export const SiteHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          {/* Left Section - Navigation/Search */}
          <div className={styles.leftSection}>
            <button 
              className={styles.menuButton} 
              aria-label="Meny"
              onClick={toggleMenu}
            >
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

      {/* Sliding Menu Panel */}
      <div className={`${styles.menuPanel} ${isMenuOpen ? styles.menuPanelOpen : ''}`}>
        <div className={styles.menuPanelContent}>
          {/* Close Button */}
          <button className={styles.closeButton} onClick={closeMenu} aria-label="Lukk meny">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Menu Items */}
          <nav className={styles.menuNav}>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <Card
                  asChild
                  data-color="brand1"
                  variant="tinted"
                  className={styles.menuCard}
                >
                  <Link href="/no/gi-penger-og-redd-liv" onClick={closeMenu}>
                    <div className={styles.menuCardContent}>
                      <h3 className={styles.menuCardTitle}>Gi støtte</h3>
                      <p className={styles.menuCardDescription}>
                        Bidra til å hjelpe de som trenger det mest
                      </p>
                    </div>
                  </Link>
                </Card>
              </li>

              <li className={styles.menuItem}>
                <Card
                  asChild
                  data-color="brand1"
                  variant="tinted"
                  className={styles.menuCard}
                >
                  <Link href="/bli-frivillig" onClick={closeMenu}>
                    <div className={styles.menuCardContent}>
                      <h3 className={styles.menuCardTitle}>Bli frivillig</h3>
                      <p className={styles.menuCardDescription}>
                        Bli del av vårt frivillige nettverk
                      </p>
                    </div>
                  </Link>
                </Card>
              </li>

              <li className={styles.menuItem}>
                <Card
                  asChild
                  data-color="brand1"
                  variant="tinted"
                  className={styles.menuCard}
                >
                  <Link href="/no/na-kjemper-barn-og-voksne-for-livet-i-libanon" onClick={closeMenu}>
                    <div className={styles.menuCardContent}>
                      <h3 className={styles.menuCardTitle}>Kampanjer</h3>
                      <p className={styles.menuCardDescription}>
                        Se våre aktuelle kampanjer og initiativ
                      </p>
                    </div>
                  </Link>
                </Card>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div className={styles.menuBackdrop} onClick={closeMenu}></div>
      )}
    </>
  )
}

export default SiteHeader


