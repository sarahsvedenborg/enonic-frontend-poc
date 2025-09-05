
import React from 'react'
import { Heading as DSHeading } from '@digdir/designsystemet-react'


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
  children: any;
  className?: string
  color?: 'default' | 'subtle' | 'strong' | 'brand'
  weight?: 'regular' | 'medium' | 'semibold'
  align?: 'left' | 'center' | 'right'
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  size,
  children,
  className = '',
  color = 'default',
  weight = 'regular',
  align = 'left'
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
        return 'heading-colorSubtle'
      case 'strong':
        return 'heading-colorStrong'
      case 'brand':
        return 'heading-colorBrand'
      default:
        return 'heading-colorDefault'
    }
  }

  const getWeightClass = (): string => {
    switch (weight) {
      case 'medium':
        return 'heading-weightMedium'
      case 'semibold':
        return 'heading-weightSemibold'
      default:
        return 'heading-weightRegular'
    }
  }

  const getAlignClass = (): string => {
    switch (align) {
      case 'center':
        return 'heading-alignCenter'
      case 'right':
        return 'heading-alignRight'
      default:
        return 'heading-alignLeft'
    }
  }

  return (
    <DSHeading
      level={level}
      data-size={getHeadingSize()}
      className={`rk-heading ${getColorClass()} ${getWeightClass()} ${getAlignClass()} ${className}`}
    >
      {children}
    </DSHeading>
  )
}

export default Heading
