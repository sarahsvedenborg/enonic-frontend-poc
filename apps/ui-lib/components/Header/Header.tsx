"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { FiLogIn } from "react-icons/fi";

import { Buttons, Link as Link2, Card } from 'rk-designsystem'

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
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
                        <Buttons variant="tertiary">
                            <FiLogIn />
                            Min side
                        </Buttons>


                    </div>
                </div>
            </header>

            {/* Sliding Menu Panel */}
            <div className={`rk-header-menu-panel ${isMenuOpen ? 'rk-header-menu-panel-open' : ''}`}>
                <div className="rk-header-menu-panel-content">
                    {/* Close Button */}
                    <button className="rk-header-close-button" onClick={closeMenu} aria-label="Lukk meny">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Menu Items */}
                    <nav className="rk-header-menu-nav">
                        <ul className="rk-header-menu-list">
                            <li className="rk-header-menu-item">
                                <Card
                                    asChild
                                    data-color="brand1"
                                    variant="tinted"
                                    className="rk-header-menu-card"
                                >
                                    <Link href="/no/gi-penger-og-redd-liv" onClick={closeMenu}>
                                        <div className="rk-header-menu-card-content">
                                            <h3 className="rk-header-menu-card-title">Gi støtte - Fast giverside</h3>
                                            <p className="rk-header-menu-card-description">
                                                (Innhold i enonic, hardkodet design i frontend)
                                            </p>
                                        </div>
                                    </Link>
                                </Card>
                            </li>
                            <li className="rk-header-menu-item">
                                <Card
                                    asChild
                                    data-color="brand1"
                                    variant="tinted"
                                    className="rk-header-menu-card"
                                >
                                    <Link href="/kampanjer" onClick={closeMenu}>
                                        <div className="rk-header-menu-card-content">
                                            <h3 className="rk-header-menu-card-title">Kampanjer</h3>
                                            <p className="rk-header-menu-card-description">
                                                (Innhold i enonic og mulighet for redaktører å tilpasse siden med andre elementer)
                                            </p>
                                        </div>
                                    </Link>
                                </Card>
                            </li>


                            <li className="rk-header-menu-item">
                                <Card
                                    asChild
                                    data-color="brand1"
                                    variant="tinted"
                                    className="rk-header-menu-card"
                                >
                                    <Link href="/lokallag/rode-kors-ullensaker" onClick={closeMenu}>
                                        <div className="rk-header-menu-card-content">
                                            <h3 className="rk-header-menu-card-title">Lokalforenring</h3>
                                            <p className="rk-header-menu-card-description">
                                                (work in progress)
                                            </p>
                                        </div>
                                    </Link>
                                </Card>
                            </li>
                            {/* 
                <li className="rk-header-menu-item">
                <Card
                  asChild
                  data-color="brand1"
                  variant="tinted"
                        className="rk-header-menu-card"
                >
                  <Link href="/bli-frivillig" onClick={closeMenu}>
                    <div className="rk-header-menu-card-content">
                      <h3 className="rk-header-menu-card-title">Bli frivillig</h3>
                      <p className="rk-header-menu-card-description">
                        Bli del av vårt frivillige nettverk
                      </p>
                    </div>
                  </Link>
                </Card>
              </li> */}


                        </ul>
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


