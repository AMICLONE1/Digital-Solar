# PowerNetPro Design System Documentation

## Overview

The PowerNetPro Design System provides a comprehensive set of design tokens, components, and guidelines to ensure consistency and quality across the application.

## Design Tokens

### Colors

#### Primary Colors
- **Forest Green** (`#1B5E20`): Primary brand color
- **Gold** (`#D4AF37`): Accent color for CTAs
- **Charcoal** (`#1A1A1A`): Text and dark backgrounds
- **Offwhite** (`#F5F5F5`): Light backgrounds

#### Semantic Colors
- **Success** (`#10B981`): Success states
- **Error** (`#EF4444`): Error states
- **Warning** (`#F59E0B`): Warning states
- **Info** (`#3B82F6`): Informational states

### Typography

#### Font Families
- **Headings**: Playfair Display, DM Serif Display (serif)
- **Body**: Inter (sans-serif)
- **Monospace**: JetBrains Mono

#### Font Sizes
- `xs`: 0.75rem (12px)
- `sm`: 0.875rem (14px)
- `base`: 1rem (16px)
- `lg`: 1.125rem (18px)
- `xl`: 1.25rem (20px)
- `2xl`: 1.5rem (24px)
- `3xl`: 1.875rem (30px)
- `4xl`: 2.25rem (36px)
- `5xl`: 3rem (48px)
- `6xl`: 3.75rem (60px)

### Spacing

Uses a 4px base unit system:
- `1`: 0.25rem (4px)
- `2`: 0.5rem (8px)
- `4`: 1rem (16px)
- `8`: 2rem (32px)
- etc.

### Border Radius

- `sm`: 0.125rem (2px)
- `base`: 0.25rem (4px)
- `md`: 0.375rem (6px)
- `lg`: 0.5rem (8px)
- `xl`: 0.75rem (12px)
- `2xl`: 1rem (16px)
- `full`: 9999px

### Shadows

- `sm`: Subtle shadow
- `base`: Default shadow
- `md`: Medium shadow
- `lg`: Large shadow
- `xl`: Extra large shadow
- `2xl`: Maximum shadow

## Components

### Button

```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="md" isLoading={false}>
  Click Me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`
**Sizes**: `sm`, `md`, `lg`

### Input

```tsx
import { Input } from "@/components/ui";

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error={errors.email}
  helperText="We'll never share your email"
/>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

<Card variant="elevated" padding="md" hover>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

**Variants**: `default`, `elevated`, `outlined`, `glass`
**Padding**: `none`, `sm`, `md`, `lg`

### Modal

```tsx
import { Modal } from "@/components/ui";

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  description="Modal description"
  size="md"
>
  Modal content
</Modal>
```

**Sizes**: `sm`, `md`, `lg`, `xl`, `full`

### Skeleton

```tsx
import { Skeleton, CardSkeleton, DashboardSkeleton } from "@/components/ui";

<Skeleton variant="rectangular" className="h-20 w-full" />
<CardSkeleton />
<DashboardSkeleton />
```

## Usage

### Importing Design Tokens

```tsx
import { designSystem } from "@/lib/design-system";

const primaryColor = designSystem.colors.forest.DEFAULT;
const headingFont = designSystem.typography.fonts.heading;
```

### Using Components

```tsx
import { Button, Input, Card } from "@/components/ui";
```

## Best Practices

1. **Consistency**: Always use design system components instead of custom implementations
2. **Accessibility**: All components follow WCAG 2.1 AA guidelines
3. **Performance**: Components are optimized for performance
4. **Type Safety**: All components are fully typed with TypeScript

## Customization

To customize the design system, modify `lib/design-system.ts` and update Tailwind config accordingly.

---

*Last Updated: January 2026*

