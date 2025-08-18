'use client'
import React from 'react'
import { Heading as DSHeading } from '@digdir/designsystemet-react'
import styles from './Heading.module.css'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

type HeadingSize = 
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'

interface HeadingProps {
  level: HeadingLevel
  size?: HeadingSize
  children: React.ReactNode
  className?: string
  color?: 'default' | 'subtle' | 'strong' | 'brand'
  weight?: 'regular' | 'medium' | 'semibold'
  align?: 'left' | 'center' | 'right'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Heading: React.FC<HeadingProps> = ({
  level,
  size,
  children,
  className = '',
  color = 'default',
  weight = 'regular',
  align = 'left',
  as
}) => {
  const getHeadingSize = (): HeadingSize => {
    if (size) {
      return size
    }
    
    // Default size mapping based on level
    switch (level) {
      case 1:
        return '2xl'
      case 2:
        return 'xl'
      case 3:
        return 'lg'
      case 4:
        return 'md'
      case 5:
        return 'sm'
      case 6:
        return 'xs'
      default:
        return 'md'
    }
  }

  const getColorClass = (): string => {
    switch (color) {
      case 'subtle':
        return styles.colorSubtle
      case 'strong':
        return styles.colorStrong
      case 'brand':
        return styles.colorBrand
      default:
        return styles.colorDefault
    }
  }

  const getWeightClass = (): string => {
    switch (weight) {
      case 'medium':
        return styles.weightMedium
      case 'semibold':
        return styles.weightSemibold
      default:
        return styles.weightRegular
    }
  }

  const getAlignClass = (): string => {
    switch (align) {
      case 'center':
        return styles.alignCenter
      case 'right':
        return styles.alignRight
      default:
        return styles.alignLeft
    }
  }

  return (
    <DSHeading
      level={level}
      size={getHeadingSize()}
      as={as}
      className={`${getColorClass()} ${getWeightClass()} ${getAlignClass()} ${className}`}
    >
      {children}
    </DSHeading>
  )
}

export default Heading
