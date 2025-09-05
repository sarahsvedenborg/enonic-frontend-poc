# Section Component

A flexible section component with predefined width options based on the Enonic frontend design system.

## Usage

```tsx
import { Section } from 'ui-lib';

// Basic usage
<Section>
  <h1>My Content</h1>
</Section>

// With width and padding
<Section width="xl" padding="lg">
  <h1>Wide section with large padding</h1>
</Section>

// With background and margin
<Section width="md" background="gray" margin="xl">
  <p>Content with gray background and extra margin</p>
</Section>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to render inside the section |
| `width` | `'xs' \| 'sm' \| 'md' \| 'xl' \| '2xl' \| 'full'` | `'md'` | Maximum width of the section |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Internal padding |
| `background` | `'none' \| 'white' \| 'gray' \| 'tinted'` | `'none'` | Background color |
| `margin` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Top and bottom margin |
| `className` | `string` | `''` | Additional CSS classes |

## Width Options

Based on the Enonic frontend design system:

- `xs`: 400px max-width
- `sm`: 600px max-width  
- `md`: 900px max-width
- `xl`: 1200px max-width
- `2xl`: 1400px max-width
- `full`: 100% width (no max-width)

## Examples

### Hero Section
```tsx
<Section width="2xl" padding="xl" background="tinted">
  <h1>Hero Title</h1>
  <p>Hero description</p>
</Section>
```

### Content Section
```tsx
<Section width="md" padding="lg">
  <h2>Article Title</h2>
  <p>Article content...</p>
</Section>
```

### Full Width Section
```tsx
<Section width="full" background="gray" padding="md">
  <p>Full width content with gray background</p>
</Section>
```

## Responsive Behavior

The component automatically adjusts padding and margins on mobile devices (max-width: 768px) to ensure proper spacing and readability.
