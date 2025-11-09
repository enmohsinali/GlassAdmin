---
sidebar_position: 1
title: Theming & Customization
---

# Theming & Customization

Learn how to customize GlassAdmin's appearance and create your own theme.

## Theme System

GlassAdmin uses a CSS variable-based theme system that makes customization easy.

### Theme Structure

```css
:root {
  /* Primary Colors */
  --color-primary: 58 109 240;
  --color-success: 46 204 113;
  --color-warning: 241 196 15;
  --color-danger: 231 76 60;
  
  /* Neutral Colors */
  --color-text: 26 26 26;
  --color-muted: 113 119 144;
  
  /* Theme-specific (change based on dark/light) */
  --bg-primary: 255 255 255;
  --bg-secondary: 249 250 251;
}
```

## Changing Colors

### Method 1: CSS Variables (Recommended)

Edit `src/index.css`:

```css
:root {
  --color-primary: 58 109 240;  /* Change this to your color */
}
```

**Example - Purple Theme:**
```css
:root {
  --color-primary: 139 92 246;  /* Purple */
  --color-success: 34 197 94;   /* Green */
  --color-danger: 239 68 68;    /* Red */
}
```

### Method 2: Tailwind Config

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3a6df0',
          dark: '#2952cc',
          light: '#5a8dff',
        },
      },
    },
  },
};
```

## Dark/Light Mode

### Using Theme Context

```jsx
import { useTheme } from './context/ThemeContext';

function MyComponent() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
```

### Theme-Aware Styling

```jsx
const MyComponent = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={isDark ? 'bg-dark text-light' : 'bg-light text-dark'}>
      Content
    </div>
  );
};
```

## Customizing Components

### Button Variants

Add custom button variants in `src/components/ui/Button.jsx`:

```jsx
const variants = {
  primary: 'bg-primary text-white',
  // Add your custom variant
  custom: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
};
```

Usage:
```jsx
<Button variant="custom">Custom Button</Button>
```

### Card Styles

Customize cards in `src/components/ui/Card.jsx`:

```jsx
<Card className="border-2 border-primary shadow-lg">
  Custom styled card
</Card>
```

## Background Customization

### Available Backgrounds

GlassAdmin includes 6 background options:

1. **Gradient 1** - Blue gradient
2. **Gradient 2** - Purple gradient  
3. **Video 1** - Abstract video
4. **Video 2** - Geometric video
5. **Image** - macOS 26 wallpaper
6. **Solid** - Solid color

### Changing Background

**Via Settings Page:**
- Navigate to Settings > Appearance
- Choose from 6 background options

**Programmatically:**
```jsx
import { useBackground } from './context/BackgroundContext';

const MyComponent = () => {
  const { background, setBackground } = useBackground();
  
  return (
    <select 
      value={background} 
      onChange={(e) => setBackground(e.target.value)}
    >
      <option value="gradient1">Gradient 1</option>
      <option value="gradient2">Gradient 2</option>
      <option value="video1">Video 1</option>
      <option value="video2">Video 2</option>
      <option value="image">Image</option>
      <option value="solid">Solid</option>
    </select>
  );
};
```

### Adding Custom Background

Edit `src/context/BackgroundContext.jsx`:

```jsx
const backgrounds = {
  // ... existing backgrounds
  custom: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
};
```

## Font Customization

### Available Fonts

- **Poppins** (Default)
- **Inter**
- **DM Sans**

### Changing Fonts

**Via Settings:**
- Settings > Fonts
- Select font family

**In Code:**
```jsx
import { useFonts } from './context/FontContext';

const { font, setFont } = useFonts();
setFont('inter');  // or 'poppins', 'dm-sans'
```

### Adding Custom Fonts

1. **Add font to Tailwind config:**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        custom: ['Your Font', 'sans-serif'],
      },
    },
  },
};
```

2. **Import font in index.css:**

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font');
```

## Glassmorphism Effects

### Customizing Glass Effect

Edit glass effect intensity:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.31);  /* Adjust opacity */
  backdrop-filter: blur(20px);            /* Adjust blur */
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.35);
}
```

### GlassCard Gradients

Available gradients:
- `blue`
- `purple`
- `pink`
- `green`
- `orange`

```jsx
<GlassCard gradient="purple">
  Purple glass effect
</GlassCard>
```

## Border Radius

### Global Border Radius

Edit `src/index.css`:

```css
:root {
  --radius-sm: 8px;   /* Small elements */
  --radius-md: 14px;  /* Cards */
  --radius-lg: 20px;  /* Buttons */
}
```

### Per Component

```jsx
<Card className="rounded-xl">  {/* Tailwind classes */}
  Custom border radius
</Card>
```

## Spacing

### Global Spacing Scale

Tailwind's spacing scale is used throughout:

```jsx
<div className="p-4">    {/* 16px padding */}
<div className="m-6">    {/* 24px margin */}
<div className="gap-8">  {/* 32px gap */}
```

### Custom Spacing

```jsx
<div className="p-[30px]">  {/* Arbitrary value */}
  Custom padding
</div>
```

## Typography

### Text Sizes

```jsx
<h1 className="text-3xl font-bold">Heading 1</h1>
<h2 className="text-2xl font-semibold">Heading 2</h2>
<p className="text-base">Body text</p>
<span className="text-sm text-muted">Small text</span>
```

### Custom Typography

```css
.custom-heading {
  @apply text-4xl font-extrabold tracking-tight;
}
```

## Shadows

### Available Shadows

```jsx
<div className="shadow-sm">Small shadow</div>
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>
<div className="shadow-xl">Extra large shadow</div>
```

### Custom Shadows

```css
.custom-shadow {
  box-shadow: 0 20px 50px rgba(58, 109, 240, 0.2);
}
```

## Animations

### Transition Duration

```jsx
<div className="transition-all duration-300">  {/* 300ms */}
  Smooth transition
</div>
```

### Custom Animations

```css
@keyframes custom-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.custom-pulse {
  animation: custom-pulse 2s ease-in-out infinite;
}
```

## Complete Theme Example

Here's a complete custom theme:

```css
/* src/index.css */
:root {
  /* Brand Colors - Purple Theme */
  --color-primary: 139 92 246;      /* Purple */
  --color-success: 34 197 94;       /* Green */
  --color-warning: 251 146 60;      /* Orange */
  --color-danger: 239 68 68;        /* Red */
  
  /* Borders */
  --radius-md: 16px;
  --radius-lg: 24px;
  
  /* Spacing */
  --spacing-unit: 8px;
}

/* Custom button */
.btn-brand {
  @apply bg-gradient-to-r from-purple-600 to-pink-600;
  @apply text-white font-semibold py-3 px-6;
  @apply rounded-full shadow-lg;
  @apply hover:shadow-xl transition-all duration-300;
}
```

## Best Practices

1. **Use CSS Variables** - Easy to change globally
2. **Consistent Spacing** - Use Tailwind's spacing scale
3. **Test Both Themes** - Check dark and light modes
4. **Accessibility** - Maintain 4.5:1 contrast ratio
5. **Performance** - Avoid heavy animations on mobile

## Preset Themes

Coming soon: Pre-built theme presets
- Corporate Blue
- Modern Purple
- Nature Green
- Sunset Orange
- Midnight Dark

## Need Help?

- [Component Styling](../components/overview)
- [Dark Mode Guide](./dark-mode)
- Support: support@glassadmin.com
