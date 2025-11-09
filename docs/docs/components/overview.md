---
sidebar_position: 1
title: Components Overview
---

# Components Overview

GlassAdmin includes **40+ professional UI components** built with React, Tailwind CSS, and Framer Motion.

## Component Categories

### 📝 Form Components (10)

| Component | Variants | Description |
|-----------|----------|-------------|
| **Button** | 6 | Primary, Secondary, Success, Danger, Warning, Ghost |
| **AnimatedButton** | - | Button with loading states and animations |
| **Input** | 8 types | Text, Email, Password, Number, Tel, URL, Search, Date |
| **SearchInput** | - | Input with autocomplete |
| **Select** | - | Dropdown select |
| **Textarea** | - | Multi-line text input |
| **Checkbox** | - | Checkbox with label |
| **Radio & RadioGroup** | - | Radio buttons |
| **Switch** | - | Toggle switch |
| **Slider & RangeSlider** | - | Slider input |
| **FileUpload** | - | File upload with drag & drop |
| **FormWizard** | 2 | Horizontal & Vertical multi-step forms |

### 🎨 Layout Components (9)

| Component | Description |
|-----------|-------------|
| **Card** | Standard card with optional title |
| **GlassCard** | Glassmorphic card with gradient options |
| **Breadcrumbs** | Navigation breadcrumbs |
| **Tabs** | Tabbed interface |
| **Accordion** | Collapsible content |
| **Modal** | Modal dialog |
| **Drawer** | Slide-out panel (4 positions) |
| **Sidebar** | Main navigation sidebar |
| **Header** | Top navigation bar with search, notifications |
| **PageWrapper** | Page layout wrapper with breadcrumbs |

### 📊 Data Display (7)

| Component | Variants | Description |
|-----------|----------|-------------|
| **Badge** | 6 | Primary, Secondary, Success, Danger, Warning, Default |
| **Avatar** | 6 sizes | xs, sm, md, lg, xl, 2xl |
| **Stats** | - | Statistics card |
| **Tag** | - | Tag with remove option |
| **Tooltip** | - | Hover tooltip |
| **EmptyState** | - | Empty state placeholder |
| **Pagination** | - | Pagination controls |

### 💬 Feedback Components (8)

| Component | Types | Description |
|-----------|-------|-------------|
| **Alert** | 4 | Success, Warning, Error, Info |
| **Spinner** | 3 | Default, Dots, Pulse |
| **Skeleton** | 6 | Default, Card, Table, Avatar, Text, List |
| **Progress** | - | Linear progress bar |
| **CircularProgress** | - | Circular progress |
| **StepProgress** | - | Multi-step progress |
| **PulsingLoader** | - | Pulsing animation |
| **BouncingDots** | - | Bouncing dots loader |
| **WaveLoader** | - | Wave animation loader |
| **GlassShimmer** | - | Glass shimmer effect |
| **FullPageLoader** | - | Full page loading screen |

### 🎬 Animation Components (6)

| Component | Description |
|-----------|-------------|
| **FadeIn** | Fade in on scroll |
| **ScaleIn** | Scale in on scroll |
| **SlideIn** | Slide in from direction |
| **StaggerContainer** | Stagger children animation |
| **StaggerItem** | Staggered item |
| **Parallax** | Parallax scroll effect |

### 🔍 Advanced Components (2)

| Component | Description |
|-----------|-------------|
| **GlobalSearch** | Global search with categories and autocomplete |
| **Charts** | ApexCharts integration (Line, Bar, Area, Pie, Donut) |

## Quick Usage Examples

### Button

```jsx
import { Button } from './components/ui';

<Button variant="primary" size="md" onClick={() => {}}>
  Click Me
</Button>

<Button variant="success" loading={isLoading}>
  Submit
</Button>
```

**Props:**
- `variant`: primary | secondary | success | danger | warning | ghost
- `size`: sm | md | lg
- `loading`: boolean
- `disabled`: boolean
- `leftIcon`, `rightIcon`: React node

### Card & GlassCard

```jsx
import { Card, GlassCard } from './components/ui';

<Card title="Card Title" hover>
  <p>Card content</p>
</Card>

<GlassCard gradient="blue" animate>
  <p>Beautiful glass effect</p>
</GlassCard>
```

**Card Props:**
- `title`: string
- `hover`: boolean
- `className`: string

**GlassCard Props:**
- `gradient`: blue | purple | pink | green | orange
- `animate`: boolean

### Form Components

```jsx
import { Input, Select, Switch, Textarea } from './components/ui';

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

<Select
  label="Country"
  options={countries}
  value={selected}
  onChange={setSelected}
/>

<Switch
  checked={enabled}
  onChange={setEnabled}
  label="Enable notifications"
/>

<Textarea
  label="Message"
  rows={4}
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
```

### Modal

```jsx
import { Modal, Button } from './components/ui';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <p>Modal content goes here</p>
  <Button onClick={() => setIsOpen(false)}>Close</Button>
</Modal>
```

### Progress & Loaders

```jsx
import { Progress, CircularProgress, Spinner } from './components/ui';

<Progress value={75} color="primary" />

<CircularProgress value={60} size="lg" color="success" />

<Spinner size="md" color="blue" />
```

### Badges & Avatars

```jsx
import { Badge, Avatar } from './components/ui';

<Badge variant="success" size="sm">Active</Badge>
<Badge variant="danger">Error</Badge>

<Avatar 
  src="https://example.com/avatar.jpg"
  alt="User Name"
  size="lg"
/>
```

### Animations

```jsx
import { FadeIn, ScaleIn, SlideIn } from './components/ui';

<FadeIn delay={0.2}>
  <div>Fades in on scroll</div>
</FadeIn>

<ScaleIn>
  <div>Scales up on scroll</div>
</ScaleIn>

<SlideIn direction="left">
  <div>Slides from left</div>
</SlideIn>
```

## Component Features

### Accessibility ♿

All components are WCAG 2.1 Level AA compliant:
- ✅ Semantic HTML
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management
- ✅ Color contrast ≥ 4.5:1

### Theming 🎨

All components respect theme settings:
- Dark/Light mode support
- CSS variable-based theming
- Consistent spacing
- Typography scale

### Responsive 📱

All components are fully responsive:
- Mobile-first design
- Breakpoint-aware
- Touch-friendly

### Performance ⚡

- Lazy loading ready
- Code splitting
- Tree shakeable
- Optimized bundle size

## Component Documentation

For detailed API documentation of each component, see:

- [Form Components](./form-components)
- [Layout Components](./layout-components)
- [Data Display](./data-display)
- [Feedback Components](./feedback-components)
- [Animation Components](./animations)

## Creating Custom Components

All components use a consistent pattern:

```jsx
import { useTheme } from '../context/ThemeContext';

const MyComponent = ({ variant = 'default', ...props }) => {
  const { isDark } = useTheme();
  
  const baseClasses = 'rounded-lg p-4 transition-all';
  const themeClasses = isDark ? 'bg-dark text-light' : 'bg-light text-dark';
  
  return (
    <div className={`${baseClasses} ${themeClasses}`} {...props}>
      {/* Component content */}
    </div>
  );
};

export default MyComponent;
```

## Component Exports

All components are exported from `src/components/ui/index.js`:

```jsx
// Import multiple components
import { Button, Card, Input, Modal } from './components/ui';

// Or import individually
import Button from './components/ui/Button';
```

## Next Steps

- [Form Components Documentation](./form-components)
- [Layout Components Documentation](./layout-components)  
- [Theming Guide](../guides/theming)
- [Building Custom Components](../guides/custom-components)
