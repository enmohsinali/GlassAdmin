# 🎨 GlassAdmin - Glassmorphic Admin Template

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23.24-FF0055?style=flat)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A modern, beautiful admin dashboard template with **Apple iOS 26 Liquid Glass UI** design, featuring glassmorphism effects, smooth animations, comprehensive component library, and full internationalization support.

## ✨ Features

### 🎯 Core Features
- 🌈 **Glassmorphic Design** - Beautiful glass morphism effects with backdrop blur
- 🌓 **Light & Dark Mode** - Seamless theme switching with smooth transitions
- 🌍 **Internationalization** - Multi-language support with RTL/LTR (English, Arabic)
- 📱 **Fully Responsive** - Perfect on all devices from mobile to 4K displays
- ⚡ **Blazing Fast** - Built with Vite for lightning-fast development
- 🎭 **60+ Components** - Comprehensive UI component library
- 🎬 **Smooth Animations** - Framer Motion powered micro-interactions
- ♿ **Accessible** - WCAG 2.1 compliant with keyboard navigation

### 🧩 Component Library (60+ Components)

#### Form Components
- Button (6 variants, animated)
- Input, SearchInput, Textarea
- Select, Checkbox, Switch
- FormWizard (multi-step forms)

#### Layout Components
- Card, GlassCard
- Breadcrumbs, Tabs, Accordion
- Drawer, Modal
- Sidebar, Header, PageWrapper

#### Data Display
- Badge, Avatar, Stats
- Tag, Tooltip, EmptyState
- Pagination

#### Feedback Components
- Alert (4 types)
- Spinner (3 variants)
- Skeleton (6 types)
- Progress (Linear, Circular, Step)

#### Advanced Components
- GlobalSearch (autocomplete)
- AnimatedButton
- Loading Animations (5 types)
- Scroll Animations (6 types)
- GlassCard with refraction effects

### 📊 Pre-Built Pages (20+)

#### Dashboards
- Analytics Dashboard
- E-commerce Dashboard

#### Management
- User Management (List, Details, Edit)
- Product Management (List, Details, Form)
- Order Management (List, Details)
- Invoice Management (List, Details)

#### Authentication
- Login, Register
- Forgot Password, Reset Password

#### Utility Pages
- Settings (Profile, Notifications, Security)
- Components Showcase
- Phase 4 Animations Demo
- 404 Not Found

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/enmohsinali/GlassAdmin.git
   cd GlassAdmin/react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
react-app/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/           # UI component library
│   │   ├── Header.jsx    # Header component
│   │   ├── Sidebar.jsx   # Sidebar navigation
│   │   ├── PageWrapper.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── LanguageSwitcher.jsx
│   │   └── AnimatedPage.jsx
│   ├── context/          # React contexts
│   │   ├── ThemeContext.jsx
│   │   └── LanguageContext.jsx
│   ├── i18n/             # Internationalization
│   │   ├── config.js
│   │   └── locales/
│   │       ├── en.json
│   │       └── ar.json
│   ├── pages/            # Page components
│   │   ├── dashboards/   # Dashboard pages
│   │   ├── users/        # User management
│   │   ├── products/     # Product management
│   │   ├── orders/       # Order management
│   │   ├── invoices/     # Invoice management
│   │   ├── Components.jsx
│   │   └── ...
│   ├── utils/            # Utility functions
│   │   └── cn.js        # className utility
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── docs/                 # Documentation
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── package.json
```

## 🎨 Theming

### Using Theme Context

```jsx
import { useTheme } from './context/ThemeContext';

function MyComponent() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={isDark ? 'dark-styles' : 'light-styles'}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Customizing Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      'primary-blue': '#3a6df0',    // Change primary color
      'primary-green': '#3bf083',   // Success color
      'primary-red': '#ff705c',     // Error color
    }
  }
}
```

### Design Tokens

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | `rgba(255,255,255,0.31)` | `rgba(16,18,27,0.4)` |
| Text | `#1a1a1a` | `#f9fafb` |
| Border | `rgba(255,255,255,0.35)` | `rgba(113,119,144,0.25)` |
| Border Radius (Cards) | `14px` | `14px` |
| Border Radius (Buttons) | `20px` | `20px` |
| Backdrop Blur | `20px` | `20px` |

## 🌍 Internationalization (i18n)

### Switching Languages

```jsx
import { useLanguage } from './context/LanguageContext';

function LanguageExample() {
  const { language, changeLanguage } = useLanguage();

  return (
    <button onClick={() => changeLanguage('ar')}>
      Switch to Arabic
    </button>
  );
}
```

### Using Translations

```jsx
import { useTranslation } from 'react-i18next';

function TranslationExample() {
  const { t } = useTranslation();

  return (
    <h1>{t('common.welcome')}</h1>
  );
}
```

### Adding New Languages

1. Create translation file: `src/i18n/locales/fr.json`
2. Add to config: `src/i18n/config.js`
3. Update LanguageContext with new language metadata

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🧩 Component Usage Examples

For detailed component documentation, see [docs/COMPONENTS.md](docs/COMPONENTS.md)

### Button

```jsx
import { Button, AnimatedButton } from './components/ui';

<Button variant="primary" size="md">
  Click Me
</Button>

<AnimatedButton
  variant="success"
  leftIcon={<Icon />}
  loading={isLoading}
>
  Submit
</AnimatedButton>
```

### Card

```jsx
import { Card, GlassCard } from './components/ui';

<Card title="Card Title" hover>
  <p>Card content goes here</p>
</Card>

<GlassCard title="Glass Card" gradient="blue" animate>
  <p>Beautiful glassmorphic card</p>
</GlassCard>
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
  <p>Modal content</p>
  <Button onClick={() => setIsOpen(false)}>Close</Button>
</Modal>
```

### FormWizard

```jsx
import { FormWizard, Input } from './components/ui';

const steps = [
  {
    title: 'Step 1',
    description: 'Enter details',
    content: <Input label="Name" />
  },
  {
    title: 'Step 2',
    description: 'Confirm',
    content: <p>Review your information</p>
  }
];

<FormWizard
  steps={steps}
  onComplete={() => console.log('Done!')}
/>
```

## 🎬 Animations

### Scroll Animations

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

### Loading Animations

```jsx
import {
  PulsingLoader,
  BouncingDots,
  WaveLoader
} from './components/ui';

<PulsingLoader size="md" color="blue" />
<BouncingDots size="lg" color="green" />
<WaveLoader size="sm" color="red" />
```

## 📱 Responsive Design

### Breakpoints

| Breakpoint | Min Width |
|-----------|-----------|
| xs | 475px |
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

### Usage

```jsx
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-[20px] md:text-[24px] lg:text-[28px]">
    Responsive Title
  </h1>
</div>
```

## 🛠️ Tech Stack

- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool
- **Tailwind CSS 3.4.18** - Utility-first CSS
- **Framer Motion 12.23.24** - Animation library
- **React Router 7.9.5** - Routing
- **React i18next** - Internationalization
- **ApexCharts** - Data visualization
- **React Hook Form** - Form management
- **Lucide React** - Icon library
- **date-fns** - Date utilities

## 📚 Documentation

- [Installation Guide](docs/INSTALLATION.md)
- [Components API](docs/COMPONENTS.md)
- [Theming Guide](docs/THEMING.md)
- [i18n Guide](docs/I18N.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Folder Structure](docs/STRUCTURE.md)
- [Best Practices](docs/BEST_PRACTICES.md)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by Apple iOS 26 Liquid Glass UI
- Glassmorphism effects and modern UI patterns
- Icons from [Lucide](https://lucide.dev)
- Video background from [CodePen](https://codepen.io)

## 📞 Support

- 📧 Email: support@glassadmin.com
- 🐛 Issues: [GitHub Issues](https://github.com/enmohsinali/GlassAdmin/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/enmohsinali/GlassAdmin/discussions)

## 🗺️ Roadmap

- [x] Phase 1: Foundation & Setup
- [x] Phase 2: Core UI Components
- [x] Phase 3: Pre-Built Pages
- [x] Phase 4: Advanced Features & Animations
- [x] Phase 5: Internationalization & Accessibility
- [x] Phase 6: Documentation
- [ ] Phase 7: Performance & Optimization
- [ ] Phase 8: Testing & Quality Assurance
- [ ] Phase 9: Final Polish & Launch
- [ ] Phase 10: Post-Launch Enhancements

## ⭐ Show Your Support

Give a ⭐ if this project helped you!

---

Made with ❤️ using React, Vite, and Tailwind CSS
