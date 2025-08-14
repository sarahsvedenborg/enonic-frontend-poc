"use client"
import React from 'react'
import Link from 'next/link'
import styles from './SiteHeader.module.css'
import { Buttons } from 'rk-designsystem'

export const SiteHeader: React.FC = () => {
  return (
    <>

       <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Link href="#">Frivillig logg inn</Link>
          <Link href="#">Korsveien</Link>
        </div>
      </div>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <img src="/images/xp-shield.svg" alt="Røde Kors" width={28} height={34} />
            <span className={styles.brandTitle}>Røde Kors</span>
          </div>
          <nav className={styles.nav} aria-label="Hovednavigasjon">
            <ul className={styles.navList}>
              <li><Link href="#">Tilbudene</Link></li>
              <li><Link href="#">Bli frivillig</Link></li>
              <li><Link href="#">Vårt arbeid</Link></li>
              <li><Link href="#">Om Røde Kors</Link></li>
              <li><Link href="#">Støtt arbeidet</Link></li>
              <li><Link href="#">Kontakt oss</Link></li>
            </ul>
          </nav>
          <div className={styles.actions}>
            <input className={styles.searchInput} placeholder="Søk" aria-label="Søk" />
            <Buttons variant="primary">Gi nå</Buttons>
          </div>
        </div>
      </header>
    </> 
  )
}

export default SiteHeader


