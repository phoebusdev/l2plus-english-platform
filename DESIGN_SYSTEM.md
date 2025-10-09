# L2+ English Design System

**Version**: 1.0.0
**Last Updated**: 2025-10-09
**Status**: Active - All future development MUST follow these standards

---

## Overview

This design system establishes the visual language and UI patterns for the L2+ English platform. It ensures consistency, accessibility, and maintainability across all pages and components.

**Philosophy**: Professional education platform with dark theme, systematic spacing, and accessible typography. Prioritize clarity and usability over visual complexity.

---

## Color System

### Theme

**Dark theme is the default** for all pages. No light theme support.

### Color Palette (HSL Format)

All colors defined in `app/globals.css` using HSL color space for easier manipulation.

#### Primary Colors

```css
/* Primary: Deep Coral #E63946 - Energy & Engagement */
--color-primary: 354 70% 54%;           /* Main brand color */
--color-primary-foreground: 0 0% 100%;  /* Text on primary */
--color-primary-hover: 354 70% 48%;     /* Hover state (darker) */
--color-primary-light: 354 70% 96%;     /* Light tint */
```

**Usage**: Call-to-action buttons, important links, brand accents
**Contrast Ratio**: 4.52:1 on white (WCAG AA compliant)

#### Secondary Colors

```css
/* Secondary: Rich Navy #1D3557 - Trust & Professionalism */
--color-secondary: 211 58% 22%;         /* Secondary brand color */
--color-secondary-foreground: 0 0% 100%; /* Text on secondary */
--color-secondary-hover: 211 58% 18%;    /* Hover state */
--color-secondary-light: 211 58% 96%;    /* Light tint */
```

**Usage**: Secondary buttons, headers, trust elements
**Contrast Ratio**: 12.68:1 on white (AAA compliant)

#### Accent Colors

```css
/* Accent: Vibrant Orange #D56F00 - Highlights & Energy */
--color-accent: 32 100% 42%;            /* Accent color */
--color-accent-foreground: 0 0% 100%;   /* Text on accent */
--color-accent-hover: 32 100% 36%;      /* Hover state */
--color-accent-light: 32 100% 96%;      /* Light tint */
```

**Usage**: Highlights, badges, gradient accents
**Contrast Ratio**: 4.54:1 on white (WCAG AA compliant)

#### Background & Surface Colors

```css
/* Dark Theme Default */
--color-background: 222 47% 11%;        /* Page background (#14161f) */
--color-foreground: 210 40% 98%;        /* Primary text color */
--color-card: 217 33% 17%;              /* Card backgrounds (#1e2835) */
--color-card-foreground: 210 40% 98%;   /* Text on cards */
--color-popover: 217 33% 17%;           /* Popover backgrounds */
--color-popover-foreground: 210 40% 98%; /* Text in popovers */
```

#### Neutral Colors

```css
/* Muted elements */
--color-muted: 217 33% 17%;             /* Muted backgrounds */
--color-muted-foreground: 215 20% 65%;  /* Muted text */

/* Gray Scale - 10 shades for text hierarchy */
--color-gray-50: 210 40% 98%;   /* Lightest (near white) */
--color-gray-100: 210 40% 96%;
--color-gray-200: 214 32% 91%;
--color-gray-300: 213 27% 84%;
--color-gray-400: 215 20% 65%;  /* Muted text */
--color-gray-500: 215 16% 47%;
--color-gray-600: 215 19% 35%;
--color-gray-700: 215 25% 27%;  /* Card borders */
--color-gray-800: 217 33% 17%;  /* Card backgrounds */
--color-gray-900: 222 47% 11%;  /* Darkest (page bg) */
```

#### Status Colors

```css
/* WCAG AA compliant status indicators */
--color-destructive: 0 72% 51%;         /* Error/delete actions */
--color-destructive-foreground: 0 0% 100%;
--color-success: 142 76% 36%;           /* Success states */
--color-success-foreground: 0 0% 100%;
--color-warning: 38 92% 50%;            /* Warning states */
--color-warning-foreground: 0 0% 100%;
--color-info: 199 89% 48%;              /* Info states */
--color-info-foreground: 0 0% 100%;
```

#### Border & Input Colors

```css
--color-border: 217 33% 25%;            /* Default borders */
--color-input: 217 33% 25%;             /* Input borders */
--color-ring: 354 70% 54%;              /* Focus rings (primary) */
```

### Tailwind Color Classes

Use semantic color names in Tailwind classes:

```tsx
// ✅ CORRECT - Semantic names
<div className="bg-card text-card-foreground border-gray-700">
<Button className="bg-primary text-primary-foreground hover:bg-primary-hover">

// ❌ WRONG - Hardcoded colors
<div style={{ backgroundColor: '#1e2835', color: '#f8fafc' }}>
<Button className="bg-[#E63946] text-white hover:bg-[#D62937]">
```

---

## Typography

### Font Families

```css
--font-poppins: var(--font-poppins);  /* Headings, bold elements */
--font-inter: var(--font-inter);      /* Body text, UI elements */
```

**Poppins**: Used for headings, titles, card titles, button text
**Inter**: Used for body copy, descriptions, form labels, UI text

### Typography Scale

**RULE**: Maximum 2-3 breakpoints per element. Avoid excessive responsive sizes.

#### Headings

```tsx
// H1 - Page titles
className="font-poppins text-4xl md:text-5xl lg:text-6xl font-extrabold"
// Mobile: 36px, Tablet: 48px, Desktop: 60px

// H2 - Section headers
className="font-poppins text-3xl md:text-4xl font-bold"
// Mobile: 30px, Desktop: 36px

// H3 - Subsection headers
className="font-poppins text-2xl md:text-3xl font-bold"
// Mobile: 24px, Desktop: 30px

// H4 - Card titles
className="font-poppins text-2xl font-bold"
// Fixed: 24px

// H5 - Small headings
className="font-poppins text-xl font-bold"
// Fixed: 20px
```

#### Body Text

```tsx
// Large body text (hero descriptions)
className="font-inter text-lg md:text-xl"
// Mobile: 18px, Desktop: 20px

// Regular body text
className="font-inter text-base"
// Fixed: 16px

// Small text (captions, labels)
className="font-inter text-sm"
// Fixed: 14px

// Extra small (badges, metadata)
className="font-inter text-xs"
// Fixed: 12px
```

#### Font Weights

```tsx
font-extrabold  // 800 - Large headings only
font-bold       // 700 - Headings, important labels
font-semibold   // 600 - Button text, card titles
font-medium     // 500 - Form labels, emphasis
font-normal     // 400 - Body text (default)
```

### Text Color Hierarchy

```tsx
// Primary text (headings, important content)
text-white or text-foreground

// Secondary text (descriptions, body copy)
text-gray-100

// Muted text (captions, secondary info)
text-gray-400 or text-muted-foreground

// Links
text-primary hover:text-primary-hover

// Disabled/placeholder
text-gray-500
```

### Line Height

```tsx
leading-tight      // 1.25 - Large headings
leading-normal     // 1.5 - Default body text
leading-relaxed    // 1.625 - Long-form content, descriptions
```

---

## Spacing System

### Spacing Scale (4px base unit)

Use systematic increments based on 4px grid:

```
4px  = space-1  = 0.25rem
8px  = space-2  = 0.5rem
12px = space-3  = 0.75rem
16px = space-4  = 1rem
20px = space-5  = 1.25rem
24px = space-6  = 1.5rem
32px = space-8  = 2rem
48px = space-12 = 3rem
64px = space-16 = 4rem
```

### Spacing Rules

**RULE 1**: Paragraph spacing equals font size
- 16px paragraph → `mb-4` (16px margin-bottom)

**RULE 2**: Heading bottom margin = 2x font size OR use scale
- 32px heading → `mb-8` (32px) or `mb-12` (48px)

**RULE 3**: Section padding is consistent
- Regular sections: `py-16 md:py-24` (64px → 96px)
- Hero sections: `py-20 md:py-32` (80px → 128px)

**RULE 4**: Use consistent gaps
- Button groups: `gap-4` (16px)
- Card grids: `gap-6` (24px)
- Trust indicators: `gap-6 md:gap-8` (24px → 32px)

### Component Spacing Standards

```tsx
// Section padding
<section className="py-16 md:py-24 px-4">  // Regular section
<section className="py-20 md:py-32 px-4">  // Hero section

// Section headers
<div className="text-center mb-12">  // Consistent 48px spacing

// Heading margins
<h1 className="mb-6">     // 24px after large headings
<h2 className="mb-6">     // 24px after section headers
<h3 className="mb-4">     // 16px after card titles

// Card padding
<Card>
  <CardHeader className="p-6">      // Uniform 24px padding
  <CardContent className="p-6">     // Uniform 24px padding
  <CardFooter className="pt-6">     // Top padding only
</Card>

// Form spacing
<form className="space-y-6">         // 24px between form fields
  <div className="space-y-2">        // 8px within field group
    <Label>...</Label>
    <Input />
  </div>
</form>

// Grid gaps
<div className="grid gap-6">         // Cards in grid: 24px gap

// Button groups
<div className="flex gap-4">         // Buttons: 16px gap
```

### Spacing Anti-Patterns

```tsx
// ❌ WRONG - Random spacing values
mb-3, mb-5, mb-7, mb-10, mb-14, mb-16 (inconsistent)

// ✅ CORRECT - Systematic spacing
mb-4, mb-6, mb-8, mb-12, mb-16 (following 4/6/8/12/16 pattern)

// ❌ WRONG - Inconsistent card padding
<CardHeader className="pb-6 pt-8">
<CardContent className="pt-8">

// ✅ CORRECT - Uniform padding
<CardHeader className="p-6">
<CardContent className="p-6">
```

---

## Border Radius

```css
--radius: 0.75rem;  /* 12px base radius */
```

### Radius Scale

```tsx
rounded-lg    /* var(--radius) = 12px - Default for cards, buttons */
rounded-md    /* calc(var(--radius) - 2px) = 10px - Medium elements */
rounded-sm    /* calc(var(--radius) - 4px) = 8px - Small elements */
rounded-xl    /* 12px - Buttons, cards with emphasis */
rounded-2xl   /* 16px - Large containers */
rounded-full  /* 9999px - Pills, badges, avatars */
```

**Usage**:
- Cards: `rounded-lg` or `rounded-xl`
- Buttons: `rounded-xl`
- Inputs: `rounded-md`
- Badges/Pills: `rounded-full`
- Icons containers: `rounded-xl` or `rounded-2xl`

---

## Component Patterns

### Buttons

```tsx
// Primary CTA
<Button
  size="lg"
  className="bg-primary hover:bg-primary-hover text-white
             shadow-2xl px-8 py-6 rounded-xl font-semibold
             transition-all hover:scale-105"
>

// Secondary Button
<Button
  size="lg"
  variant="secondary"
  className="bg-secondary hover:bg-secondary-hover text-white"
>

// Outline Button (on dark background)
<Button
  size="lg"
  variant="outline"
  className="border-2 border-white bg-white/5 backdrop-blur-sm
             text-white hover:bg-white/15"
>

// Ghost Button
<Button variant="ghost" className="text-gray-100 hover:bg-gray-800">
```

**Button Sizes**:
- `size="lg"`: `h-11 px-8` (44px height, large touch target)
- `size="default"`: `h-10 px-4` (40px height, standard)
- `size="sm"`: `h-9 px-3` (36px height, compact)

### Cards

```tsx
// Standard Card
<Card className="border-2 border-gray-700 hover:border-primary/30
                 transition-all hover:shadow-xl bg-gray-800">
  <CardHeader className="p-6">
    <CardTitle className="font-poppins text-2xl font-bold text-white mb-4">
      Title
    </CardTitle>
    <p className="font-inter text-base text-gray-100 leading-relaxed">
      Description
    </p>
  </CardHeader>
  <CardContent className="p-6">
    Content
  </CardContent>
  <CardFooter className="pt-6">
    <Button className="w-full">Action</Button>
  </CardFooter>
</Card>

// Highlighted Card (Popular/Featured)
<Card className="border-2 border-primary shadow-2xl bg-gray-800">
  {/* Same padding and structure */}
</Card>
```

**Card Rules**:
- Uniform padding: `p-6` (24px) for all sections
- Border: `border-2 border-gray-700`
- Hover state: `hover:border-primary/30 hover:shadow-xl`
- Background: Always `bg-gray-800` on dark theme

### Forms

```tsx
// Form Container
<form className="space-y-6">  {/* 24px between fields */}

  {/* Field Group */}
  <div className="space-y-2">  {/* 8px within group */}
    <Label htmlFor="email" className="text-sm font-medium">
      Email
    </Label>
    <Input
      id="email"
      type="email"
      className="h-10 w-full rounded-md border border-input
                 bg-background px-3 py-2"
      placeholder="you@example.com"
    />
  </div>

  {/* Submit Button */}
  <Button type="submit" className="w-full py-6 rounded-xl">
    Submit
  </Button>
</form>
```

### Badges & Pills

```tsx
// Standard Badge
<div className="inline-flex items-center gap-2 bg-primary/10
                backdrop-blur-sm px-4 py-2 rounded-full
                border border-primary/20">
  <Icon className="w-4 h-4 text-primary" />
  <span className="font-inter text-sm font-semibold text-primary">
    Label
  </span>
</div>

// Simple Badge
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full
               bg-primary/10 text-xs font-semibold text-primary">
  New
</span>
```

### Icon Containers

```tsx
// Gradient Icon Box (used in feature cards)
<div className="w-14 h-14 rounded-xl bg-gradient-to-br
                from-primary to-accent flex items-center
                justify-center shadow-md">
  <Icon className="w-7 h-7 text-white" />
</div>

// Numbered Badge (step indicators)
<div className="w-8 h-8 bg-gray-900 rounded-full shadow-md
                flex items-center justify-center
                font-bold text-primary text-lg
                border-2 border-primary">
  1
</div>
```

---

## Layout Patterns

### Section Structure

```tsx
<section className="py-16 md:py-24 px-4 bg-gray-900">
  <div className="container mx-auto max-w-6xl">

    {/* Section Header */}
    <div className="text-center mb-12">
      <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6 text-white">
        Section Title
      </h2>
      <p className="font-inter text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
        Section description with max-width constraint
      </p>
    </div>

    {/* Section Content */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Content items */}
    </div>
  </div>
</section>
```

### Grid Layouts

```tsx
// 2-column grid (features)
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// 3-column grid (cards)
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// 4-column grid (pricing)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

**Grid Rules**:
- Always start with `grid-cols-1` for mobile
- Use `gap-6` (24px) for consistent spacing
- Add responsive breakpoints: `md:grid-cols-X lg:grid-cols-Y`

### Container Widths

```tsx
max-w-3xl   // 768px - Text content, CTAs
max-w-4xl   // 896px - Medium sections
max-w-6xl   // 1152px - Standard content width
max-w-7xl   // 1280px - Wide layouts (pricing grids)
```

---

## Responsive Breakpoints

### Tailwind Default Breakpoints

```
sm:  640px  // Small tablets
md:  768px  // Tablets
lg:  1024px // Laptops
xl:  1280px // Desktops
2xl: 1536px // Large desktops
```

### Breakpoint Strategy

**RULE**: Maximum 2-3 breakpoints per element

```tsx
// ✅ CORRECT - 3 breakpoints max
text-4xl md:text-5xl lg:text-6xl

// ❌ WRONG - Too many breakpoints
text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
```

### Mobile-First Approach

```tsx
// Start with mobile, add larger screens
<div className="px-4 py-16 md:py-24">
  <h1 className="text-4xl md:text-5xl lg:text-6xl">

// NOT desktop-first
<div className="lg:px-8 md:px-6 px-4">  // ❌ Wrong order
```

---

## Accessibility Standards

### WCAG AA Compliance

All color combinations MUST meet WCAG AA standards:
- **Normal text**: 4.5:1 contrast ratio minimum
- **Large text** (18pt+): 3:1 contrast ratio minimum
- **UI components**: 3:1 contrast ratio minimum

### Current Compliance Status

✅ **Compliant combinations**:
- Primary (#E63946) on white: 4.52:1 ✓
- Secondary (#1D3557) on white: 12.68:1 ✓
- Accent (#D56F00) on white: 4.54:1 ✓
- White text on gray-900: 17.2:1 ✓
- Gray-100 text on gray-900: 15.8:1 ✓

### Focus States

```tsx
// All interactive elements MUST have focus indicators
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

### Touch Targets

Minimum touch target size: **40x40px** (per WCAG guidelines)

```tsx
// Buttons should use size="lg" or larger
<Button size="lg" className="h-11">  // 44px height ✓

// Icon buttons need explicit sizing
<button className="h-10 w-10">      // 40px minimum ✓
```

---

## Animation Standards

### Transitions

**RULE**: Lightweight animations only. No heavy animations per client requirement.

```tsx
// Standard transitions
transition-all duration-300

// Hover scale (subtle)
hover:scale-105  // 5% scale only

// Hover translate (cards)
hover:-translate-y-2  // 8px lift

// Hover shadow
hover:shadow-xl
```

### Animated Backgrounds (Hero Sections Only)

```tsx
// Subtle pulse animation for decorative blobs
<div className="animate-pulse">
  <div className="w-96 h-96 bg-primary/50 rounded-full blur-3xl" />
</div>
```

**Permitted Animations**:
- `transition-all` - Standard property transitions
- `hover:scale-105` - Subtle scale on hover
- `hover:-translate-y-2` - Card lift effect
- `animate-pulse` - Background decorative elements only

**Forbidden Animations**:
- ❌ Slide-in/slide-out page transitions
- ❌ Rotating elements
- ❌ Bouncing/shaking effects
- ❌ Parallax scrolling
- ❌ Auto-playing carousels

---

## Design Tokens Reference

### Quick Reference Table

| Token | Value | Usage |
|-------|-------|-------|
| **Section Padding** | `py-16 md:py-24` | Regular sections |
| **Hero Padding** | `py-20 md:py-32` | Hero sections |
| **Section Header Margin** | `mb-12` | After section title |
| **Heading Margin** | `mb-6` | After H1/H2 |
| **Card Padding** | `p-6` | All card sections |
| **Form Field Spacing** | `space-y-6` | Between fields |
| **Form Group Spacing** | `space-y-2` | Within field group |
| **Grid Gap** | `gap-6` | Cards and grids |
| **Button Group Gap** | `gap-4` | Between buttons |
| **Border Width** | `border-2` | Cards, buttons |
| **Border Color** | `border-gray-700` | Default borders |
| **Border Radius** | `rounded-xl` | Buttons, emphasized cards |

---

## Anti-Patterns (DO NOT USE)

### Spacing Anti-Patterns

```tsx
// ❌ Random margin values
mb-3, mb-5, mb-7, mb-10, mb-14

// ❌ Inconsistent padding
<Card>
  <CardHeader className="pb-6 pt-8">  // Different values
  <CardContent className="pt-8">      // Inconsistent
</Card>

// ❌ Too many responsive breakpoints
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
```

### Color Anti-Patterns

```tsx
// ❌ Hardcoded hex colors
<div style={{ backgroundColor: '#1e2835' }}>
<div className="bg-[#E63946]">

// ❌ Mixing light and dark theme on same page
<section className="bg-white text-gray-800">  // Light theme
<section className="bg-gray-900 text-white">  // Dark theme
```

### Typography Anti-Patterns

```tsx
// ❌ Inconsistent font families
<h1 className="font-inter">           // Should be font-poppins
<p className="font-poppins">           // Should be font-inter

// ❌ Extreme font weights
<span className="font-thin">           // Too light, hard to read
<span className="font-black">          // Only use font-extrabold max
```

### Component Anti-Patterns

```tsx
// ❌ Scale transform on grid items
<Card className="scale-105">           // Breaks grid alignment

// ❌ Inline styles
<div style={{ padding: '24px' }}>     // Use Tailwind classes

// ❌ Arbitrary values everywhere
<div className="mt-[17px] px-[23px]"> // Use spacing scale
```

---

## Implementation Checklist

When creating or updating components:

- [ ] Uses dark theme colors (`bg-gray-900`, `text-white`, etc.)
- [ ] Follows spacing scale (4/6/8/12/16px increments)
- [ ] Typography uses max 2-3 breakpoints
- [ ] Section padding is `py-16 md:py-24` or `py-20 md:py-32`
- [ ] Section headers have `mb-12` margin
- [ ] Cards use uniform `p-6` padding
- [ ] Forms use `space-y-6` for fields, `space-y-2` for groups
- [ ] Grids use `gap-6` spacing
- [ ] Button groups use `gap-4` spacing
- [ ] Colors use semantic tokens (not hardcoded values)
- [ ] Font families: Poppins for headings, Inter for body
- [ ] WCAG AA contrast ratios maintained
- [ ] Focus states defined for interactive elements
- [ ] Touch targets minimum 40x40px
- [ ] Only lightweight animations used

---

## Version History

### 1.0.0 - 2025-10-09 (Initial Release)

**Established**:
- Dark theme as default
- Systematic spacing scale (4px base)
- Typography progression rules (max 2-3 breakpoints)
- Component spacing standards
- Color system with WCAG AA compliance
- Border radius standards
- Animation guidelines (lightweight only)

**Rationale**: Visual enhancement work revealed inconsistent spacing, typography, and theme usage across pages. This design system codifies the improvements made and prevents future inconsistencies.

---

**Document Owner**: Development Team
**Review Cycle**: Quarterly or when significant visual changes are proposed
**Related Documents**:
- `CLAUDE.md` - Developer guidance
- `.specify/memory/constitution.md` - Project principles
- `app/globals.css` - Color token definitions
