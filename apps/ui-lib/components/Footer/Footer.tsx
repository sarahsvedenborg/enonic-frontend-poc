"use client"
import React from 'react'
import Link from 'next/link'
import { MainMenu, MenuItem } from '../../../sanity-frontend/lib/sanity'
import { getMenuItemUrl, shouldOpenInNewTab, isVisible } from '../../../sanity-frontend/lib/menu-utils'
import './Footer.css'
import Section from '../Section/Section'

interface FooterProps {
    menuData: MainMenu | null
}

export const Footer: React.FC<FooterProps> = ({ menuData }) => {
    if (!menuData) {
        return null
    }

    return (
        <footer className="rk-footer">
            <Section width="xl" padding="lg">
                <div className="rk-footer-inner">
                    {/* Footer Menu Columns */}
                    {menuData.menuItems && menuData.menuItems.length > 0 && (
                        <div className="rk-footer-columns">
                            {menuData.menuItems.filter(isVisible).map((item) => (
                                <div key={item._key} className="rk-footer-column">
                                    <h3 className="rk-footer-column-title">
                                        {item.menuType === 'dropdown' && item.subItems && item.subItems.length > 0 ? (
                                            <span>{item.label}</span>
                                        ) : (
                                            <Link
                                                href={getMenuItemUrl(item)}
                                                className="rk-footer-column-link"
                                                target={shouldOpenInNewTab(item) ? '_blank' : undefined}
                                                rel={shouldOpenInNewTab(item) ? 'noopener noreferrer' : undefined}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </h3>

                                    {/* Sub-items */}
                                    {item.menuType === 'dropdown' && item.subItems && item.subItems.length > 0 && (
                                        <ul className="rk-footer-submenu">
                                            {item.subItems.map((subItem) => (
                                                <li key={subItem._key} className="rk-footer-submenu-item">
                                                    <Link
                                                        href={getMenuItemUrl(subItem)}
                                                        className="rk-footer-submenu-link"
                                                        target={shouldOpenInNewTab(subItem as any) ? '_blank' : undefined}
                                                        rel={shouldOpenInNewTab(subItem as any) ? 'noopener noreferrer' : undefined}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
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
            </Section>
        </footer>
    )
}

export default Footer
