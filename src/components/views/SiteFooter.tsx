import React from 'react'
import Link from 'next/link'
import styles from './SiteFooter.module.css'

const SiteFooter: React.FC = () => {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.grid}>
          <div>
            <img src="/images/xp-shield.svg" alt="Røde Kors" width={32} height={38} />
            <p style={{ marginTop: '0.5rem' }}>Mer enn 90 prosent går til formålet.</p>
          </div>
          <div>
            <h3>Snarveier</h3>
            <ul>
              <li><Link href="#">English pages</Link></li>
              <li><Link href="#">Presse</Link></li>
              <li><Link href="#">Jobb i Røde Kors</Link></li>
              <li><Link href="#">Varsling</Link></li>
            </ul>
          </div>
          <div>
            <h3>Kontakt</h3>
            <ul>
              <li>Sentralbord: +47 22 05 40 00</li>
              <li>E‑post: post@redcross.no</li>
              <li>Org.nr: 864 139 442</li>
            </ul>
          </div>
          <div>
            <h3>Følg oss</h3>
            <ul>
              <li><Link href="#">Facebook</Link></li>
              <li><Link href="#">LinkedIn</Link></li>
              <li><Link href="#">Instagram</Link></li>
              <li><Link href="#">YouTube</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.links}>
            <Link href="#">Personvern</Link>
            <Link href="#">Regler for innkjøp</Link>
          </div>
          <div>© {year} Røde Kors</div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter


