# Custom UI Components

This folder contains custom UI components that extend the digdir/designsystemet with additional styling options and functionality.

## Components

### Text Component

A flexible text component that wraps the digdir/designsystemet Typography component with additional styling options.

#### Props

- `variant`: Typography variant (body-short-xs, body-short-sm, etc.)
- `size`: Shortcut for size (xs, sm, md, lg, xl)
- `color`: Text color (default, subtle, strong, brand)
- `weight`: Font weight (regular, medium, semibold)
- `align`: Text alignment (left, center, right)
- `as`: HTML element to render as (p, span, div)
- `className`: Additional CSS classes

#### Usage

```tsx
import { Text } from '@/ui'

// Basic usage
<Text>Default text</Text>

// With custom styling
<Text 
  variant="body-long-lg"
  color="brand"
  weight="semibold"
  align="center"
>
  Custom styled text
</Text>

// Using size shortcut
<Text size="lg" color="strong">
  Large strong text
</Text>
```

### Heading Component

A flexible heading component that wraps the digdir/designsystemet Heading component with additional styling options.

#### Props

- `level`: Heading level (1-6)
- `size`: Heading size (2xs, xs, sm, md, lg, xl, 2xl)
- `color`: Text color (default, subtle, strong, brand)
- `weight`: Font weight (regular, medium, semibold)
- `align`: Text alignment (left, center, right)
- `as`: HTML element to render as (h1-h6)
- `className`: Additional CSS classes

#### Usage

```tsx
import { Heading } from '@/ui'

// Basic usage
<Heading level={1}>Main heading</Heading>

// With custom styling
<Heading 
  level={2}
  size="xl"
  color="brand"
  weight="semibold"
  align="center"
>
  Custom styled heading
</Heading>

// Override element type
<Heading level={3} as="h1">
  H3 styled as H1
</Heading>
```

## Styling

Both components use CSS modules and support:

- **Color variants**: default, subtle, strong, brand
- **Weight variants**: regular, medium, semibold
- **Alignment**: left, center, right
- **Custom classes**: Add your own CSS classes
- **Responsive design**: Built-in responsive behavior

## Design System Integration

These components are built on top of digdir/designsystemet and use:
- Design system tokens for colors, spacing, and typography
- Consistent API patterns
- TypeScript support
- Accessibility features

## Adding New Components

To add a new UI component:

1. Create the component file (e.g., `Button.tsx`)
2. Create the CSS module file (e.g., `Button.module.css`)
3. Export from `index.ts`
4. Add documentation to this README
5. Add TypeScript types if needed
