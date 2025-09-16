"use client"
import React from 'react'
import Link from 'next/link'
import { MainMenu, MenuItem } from '../../../sanity-frontend/lib/sanity'
import { getMenuItemUrl, shouldOpenInNewTab, isVisible } from '../../../sanity-frontend/lib/menu-utils'
import './Footer.css'

interface FooterProps {
    menuData: MainMenu | null
}

export const Footer: React.FC<FooterProps> = ({ menuData }) => {
    console.log('menuData', menuData)
    if (!menuData) {
        return null
    }

    return (
        <footer className="rk-footer">
            <div className="rk-footer-inner">
                {/* Footer Menu */}
                {menuData.menuItems && menuData.menuItems.length > 0 && (
                    <nav className="rk-footer-nav">
                        <ul className="rk-footer-menu-list">
                            {menuData.menuItems.filter(isVisible).map((item) => (
                                <li key={item._key} className="rk-footer-menu-item">
                                    <Link
                                        href={getMenuItemUrl(item)}
                                        className="rk-footer-menu-link"
                                        target={shouldOpenInNewTab(item) ? '_blank' : undefined}
                                        rel={shouldOpenInNewTab(item) ? 'noopener noreferrer' : undefined}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}


                {/* Footer Bottom */}
                <div className="rk-footer-bottom">
                    <div className="rk-footer-brand">
                        <Link href="/" className="rk-footer-logo">
                            <img
                                src="https://www.rodekors.no/UI/logo_main.svg"
                                alt="Røde Kors"
                                width="120"
                                height="60"
                            />
                        </Link>
                    </div>
                    <div className="rk-footer-copyright">
                        <p>&copy; {new Date().getFullYear()} Røde Kors Norge. Alle rettigheter forbeholdt.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
