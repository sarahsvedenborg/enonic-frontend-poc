'use client'
import React from 'react'
import { Paragraph } from '@digdir/designsystemet-react'
import { Heading } from 'ui-lib'
import { Link } from 'rk-designsystem'
import { FiChevronDown, FiMail, FiPhone, FiGlobe } from 'react-icons/fi'
import './BranchHeader.css'
import image from 'next/image'
import { urlFor } from '../../lib/sanity'

interface BranchHeaderProps {
    branchName: string
    image: any,
    branchParent?: {
        branchName: string
        branchType: string
    }
    branchLocation?: {
        municipality: string
        county: string
        postalAddress?: {
            addressLine1: string
            postalCode: string
            postOffice: string
        }
    }
    communicationChannels?: {
        phone?: string
        email?: string
        web?: string
    }
    branchContacts?: Array<{
        role: string
        firstName: string
        lastName: string
    }>
}

export const BranchHeader = ({
    image,
    branchName,
    branchParent,
    branchLocation,
    communicationChannels,
    branchContacts
}: BranchHeaderProps) => {
    const fullAddress = branchLocation?.postalAddress
        ? `${branchLocation.postalAddress.addressLine1}, ${branchLocation.postalAddress.postalCode} ${branchLocation.postalAddress.postOffice}`
        : ''

    const branchImage = image ? urlFor(image).width(200).height(200).fit('crop').url() : ''

    return (
        <div className="branch-header">
            <div className="branch-header-content">
                {/* Left side - Large circular placeholder */}
                <div className="branch-header-left">
                    <div className="branch-image-placeholder">
                        <img src={branchImage} alt={branchName} />
                    </div>
                </div>

                {/* Right side - Content */}
                <div className="branch-header-right">
                    {/* Organization type and name */}
                    <div className="branch-title-section">
                        <Paragraph className="branch-type-label">LOKALFORENING</Paragraph>
                        <Heading level={1} className="branch-name">
                            {branchName}
                        </Heading>
                        {branchParent && (
                            <Paragraph className="branch-parent">
                                En del av <span className="underlined">{branchParent.branchName}</span>
                            </Paragraph>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="contact-section">
                        <div className="contact-header">
                            <Paragraph className="contact-label">Kontakt oss</Paragraph>
                            <FiChevronDown className="contact-chevron" />
                        </div>

                        <div className="contact-details">
                            {communicationChannels?.email && (
                                <div className="contact-item">
                                    <FiMail className="contact-icon" />
                                    <Link href={`mailto:${communicationChannels.email}`} className="contact-link">
                                        {communicationChannels.email}
                                    </Link>
                                </div>
                            )}

                            <div className="contact-item">
                                <Link href="#" className="contact-link underlined">
                                    Kontaktskjema
                                </Link>
                            </div>

                            <div className="contact-item">
                                <Link href="#" className="contact-link underlined">
                                    Roller og ansvar
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    {branchLocation && (
                        <div className="address-section">
                            <Paragraph className="address-label">Adresse</Paragraph>
                            <div className="address-details">
                                <Paragraph className="address-text">{fullAddress}</Paragraph>
                                <Link href="#" className="address-link underlined">
                                    Vis meg veien
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Follow Us Section */}
                    <div className="follow-section">
                        <Paragraph className="follow-label">Følg oss</Paragraph>
                        <div className="social-icons">
                            <Link href="#" className="social-link">
                                <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </Link>
                            <Link href="#" className="social-link">
                                <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom section - Opening hours */}
            {/*   <div className="opening-hours">
                <Paragraph className="opening-hours-text">Åpningstider Røde Kors huset</Paragraph>
            </div> */}
        </div>
    )
}
export default BranchHeader