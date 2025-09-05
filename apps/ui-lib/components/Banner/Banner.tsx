'use client'
import React from 'react'

interface BannerProps {
    site: string
    login: string
}

const Banner: React.FC<BannerProps> = ({ site, login }) => {
    return (
        <div className="banner">
            <div className="banner-content">
                <span className="banner-text">
                    Innhold hentet fra: <strong>{site}</strong>
                </span>
                <a
                    href={login}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="banner-link"
                >
                    Gå til CMS →
                </a>
            </div>
        </div>
    )
}

export { Banner }
export default Banner
