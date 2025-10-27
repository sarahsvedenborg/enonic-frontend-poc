"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { FiLogIn, FiX, FiSearch, FiChevronDown, FiUser, FiLogOut } from "react-icons/fi";
import { MainMenu, MenuItem } from '../../../sanity-frontend/lib/sanity'
import { getMenuItemUrl, shouldOpenInNewTab, isVisible } from '../../../sanity-frontend/lib/menu-utils'


import { Buttons, Link as Link2, Card } from 'rk-designsystem'
import { Paragraph } from '@digdir/designsystemet-react';

interface HeaderProps {
    menuData: MainMenu | null
    frontend: string;
    session?: { user: { name: string, email: string } } | null
    status?: 'loading' | 'authenticated' | 'unauthenticated'
    signIn?: () => void
    signOut?: () => void
    isAuthenticated?: boolean
    isLoading?: boolean
}

export const Header: React.FC<HeaderProps> = ({ menuData, frontend, session, status, signIn, signOut, isAuthenticated, isLoading }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set())

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        if (isMenuOpen) {
            setOpenDropdowns(new Set())
        }
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
        setOpenDropdowns(new Set())
    }

    const toggleDropdown = (itemKey: string) => {
        const newOpenDropdowns = new Set(openDropdowns)
        if (newOpenDropdowns.has(itemKey)) {
            newOpenDropdowns.delete(itemKey)
        } else {
            newOpenDropdowns.add(itemKey)
        }
        setOpenDropdowns(newOpenDropdowns)
    }

    return (
        <>
            <header className="rk-header">
                <div className="rk-header-inner">
                    {/* Left Section - Navigation/Search */}
                    <div className="rk-header-left-section">
                        <button
                            className="rk-header-menu-button"
                            aria-label="Meny"
                            onClick={toggleMenu}
                        >
                            <div className="rk-header-hamburger-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span className="rk-header-menu-text">Meny</span>
                        </button>

                        <button className="rk-header-search-button" aria-label="Søk">
                            <div className="rk-header-search-icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                                    <path d="m10 10 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="rk-header-search-text">Søk</span>
                        </button>
                    </div>

                    {/* Center Section - Logo/Brand */}
                    <div className="rk-header-center-section">
                        <div className="rk-header-brand">
                            <div className="rk-header-logo-container">
                                <Link href="/">
                                    <img src="https://www.rodekors.no/UI/logo_main.svg" alt="Røde Kors" width="200" height="100" />
                                </Link>
                            </div>
                            {/*  <div className="rk-header-brand-text">
                    <span className="rk-header-separator">|</span>
                <span className="rk-header-brand-title">Røde Kors</span>
                <span className="rk-header-separator">|</span>
              </div> */}
                        </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="rk-header-right-section">
                        <Buttons variant="primary">
                            Gi nå
                        </Buttons>
                        {isLoading && frontend === 'sanity' ? (
                            <Buttons variant="tertiary" disabled>
                                <FiUser />
                                Laster...
                            </Buttons>
                        ) : isAuthenticated ? (
                            <div className="rk-header-user-menu">
                                <Buttons variant="tertiary" onClick={signOut}>
                                    <FiLogOut />
                                    Logg ut
                                </Buttons>
                                <span className="rk-header-user-name">
                                    {session?.user?.name || session?.user?.email}
                                </span>
                            </div>
                        ) : (
                            <Buttons variant="tertiary" onClick={signIn}>
                                <FiLogIn />
                                Min side
                            </Buttons>
                        )}
                    </div>
                </div>
            </header>

            {/* Sliding Menu Panel */}
            <div className={`rk-header-menu-panel ${isMenuOpen ? 'rk-header-menu-panel-open' : ''}`}>
                <div className="rk-header-menu-panel-content">
                    {/* Top Actions */}
                    <div className="rk-header-menu-top-actions">
                        <button className="rk-header-menu-close-button" onClick={closeMenu} aria-label="Lukk">
                            <FiX />
                            <span>Lukk</span>
                        </button>
                        <button className="rk-header-menu-search-button" aria-label="Søk">
                            <FiSearch />
                            <span>Søk</span>
                        </button>
                    </div>

                    {/* Menu Sections */}
                    <nav className="rk-header-menu-nav">
                        {/* Primary Menu Items */}
                        {menuData?.menuItems && menuData.menuItems.length > 0 && (
                            <div className="rk-header-menu-section">
                                {menuData.menuItems.filter(isVisible).map((item) => (
                                    <div key={item._key} className="rk-header-menu-item">
                                        {item.menuType === 'dropdown' && item.subItems && item.subItems.length > 0 ? (
                                            <div className={`rk-header-menu-dropdown ${openDropdowns.has(item._key) ? 'open' : ''}`}>
                                                <button
                                                    className="rk-header-menu-dropdown-trigger"
                                                    onClick={() => toggleDropdown(item._key)}
                                                >
                                                    <Paragraph data-size="lg">{item.label}</Paragraph>
                                                    <FiChevronDown />
                                                </button>
                                                <div className="rk-header-menu-dropdown-content">
                                                    {item.subItems.map((subItem) => (
                                                        <Link
                                                            key={subItem._key}
                                                            href={getMenuItemUrl(subItem)}
                                                            className="rk-header-menu-dropdown-item"
                                                            onClick={closeMenu}
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                href={getMenuItemUrl(item)}
                                                className="rk-header-menu-link"
                                                onClick={closeMenu}
                                                target={shouldOpenInNewTab(item) ? '_blank' : undefined}
                                                rel={shouldOpenInNewTab(item) ? 'noopener noreferrer' : undefined}
                                            >
                                                <Paragraph data-size="lg">{item.label}</Paragraph>
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Secondary Menu Items */}
                        {menuData?.menuItemsSecondary && menuData.menuItemsSecondary.length > 0 && (
                            <>
                                <div className="rk-header-menu-divider"></div>
                                <div className="rk-header-menu-section">
                                    {menuData.menuItemsSecondary.filter(isVisible).map((item) => (
                                        <div key={item._key} className="rk-header-menu-item">
                                            {item.menuType === 'dropdown' && item.subItems && item.subItems.length > 0 ? (
                                                <div className={`rk-header-menu-dropdown ${openDropdowns.has(item._key) ? 'open' : ''}`}>
                                                    <button
                                                        className="rk-header-menu-dropdown-trigger"
                                                        onClick={() => toggleDropdown(item._key)}
                                                    >
                                                        <Paragraph data-size="md">{item.label}</Paragraph>
                                                        <FiChevronDown />
                                                    </button>
                                                    <div className="rk-header-menu-dropdown-content">
                                                        {item.subItems.map((subItem) => (
                                                            <Link
                                                                key={subItem._key}
                                                                href={getMenuItemUrl(subItem)}
                                                                className="rk-header-menu-dropdown-item"
                                                                onClick={closeMenu}
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <Link
                                                    href={getMenuItemUrl(item)}
                                                    className="rk-header-menu-link"
                                                    onClick={closeMenu}
                                                    target={shouldOpenInNewTab(item) ? '_blank' : undefined}
                                                    rel={shouldOpenInNewTab(item) ? 'noopener noreferrer' : undefined}
                                                >
                                                    <Paragraph data-size="sm">{item.label}</Paragraph>
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Tertiary Menu Items */}
                        {menuData?.menuItemsTertiary && menuData.menuItemsTertiary.length > 0 && (
                            <>
                                <div className="rk-header-menu-divider"></div>
                                <div className="rk-header-menu-section">
                                    {menuData.menuItemsTertiary.filter(isVisible).map((item) => (
                                        <div key={item._key} className="rk-header-menu-item">
                                            <Link
                                                href={getMenuItemUrl(item)}
                                                className="rk-header-menu-link"
                                                onClick={closeMenu}
                                                target={shouldOpenInNewTab(item) ? '_blank' : undefined}
                                                rel={shouldOpenInNewTab(item) ? 'noopener noreferrer' : undefined}
                                            >
                                                <Paragraph data-size="xs">{item.label}</Paragraph>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </nav>
                </div>
            </div>

            {/* Backdrop */}
            {isMenuOpen && (
                <div className="rk-header-menu-backdrop" onClick={closeMenu}></div>
            )}
        </>
    )
}

export default Header


