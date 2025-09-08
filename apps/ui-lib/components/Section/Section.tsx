'use client'
import React from 'react'

interface SectionProps {
    children: React.ReactNode
    width?: 'xs' | 'sm' | 'md' | 'xl' | '2xl' | 'full'
    className?: string
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    background?: 'none' | 'white' | 'gray' | 'tinted'
    margin?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const Section: React.FC<SectionProps> = ({
    children,
    width = 'md',
    className = '',
    padding = 'sm',
    background = 'none',
    margin = 'none'
}) => {
    const widthClass = `section-width-${width}`
    const paddingClass = `section-padding-${padding}`
    const backgroundClass = `section-background-${background}`
    const marginClass = `section-margin-${margin}`

    const combinedClassName = [
        'section',
        widthClass,
        paddingClass,
        backgroundClass,
        marginClass,
        className
    ].filter(Boolean).join(' ')

    return (
        <section className={combinedClassName}>
            {children}
        </section>
    )
}

export { Section }
export default Section
