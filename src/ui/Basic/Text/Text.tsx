'use client'
import React from 'react'
 import { Paragraph } from '@digdir/designsystemet-react'
import styles from './Text.module.css'

type TextVariant = 
  | 'long'
  | 'short' 
  | 'default'


type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface TextProps {
  variant?: TextVariant
  size?: TextSize
  children: React.ReactNode
  className?: string
  as?: 'p' | 'span' | 'div'
  color?: 'default' | 'subtle' | 'strong' | 'brand'
  weight?: 'regular' | 'medium' | 'semibold'
  align?: 'left' | 'center' | 'right'
}

const Text: React.FC<TextProps> = ({
  variant = 'default',
  size,
  children,
  className = '',
  as = 'p',
  color = 'default',
  weight = 'regular',
  align = 'left'
}) => {
  const getTypographyVariant = (): string => {
    if (size) {
      return `body-short-${size}` as TextVariant
    }
    return variant
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
    <Paragraph
      variant={variant}
      data-size={size}
      className={`${getColorClass()} ${getWeightClass()} ${getAlignClass()} ${className}`}
    >
      {children}
    </Paragraph>
  )
}

export default Text
