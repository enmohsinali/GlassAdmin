# 🌟 GlassAdmin - Liquid Glass Admin Template

A next-generation admin dashboard template featuring **Apple iOS 26 Liquid Glass UI** aesthetics, built with React, Vite, and Tailwind CSS. GlassAdmin delivers a premium, modern interface with glassmorphic effects, smooth animations, and a fully responsive design.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.18-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 🎨 Design & UI
- **Liquid Glass UI** inspired by Apple iOS 26
- **Glassmorphic effects** with backdrop blur and transparency
- **Light & Dark modes** with smooth transitions
- **Responsive design** - mobile-first approach
- **Premium animations** and micro-interactions
- **Modern color palette** with luminous gradients

### 📊 Dashboards
- **Analytics Dashboard** - KPI cards, revenue charts, traffic sources, visitor stats
- **E-commerce Dashboard** - sales overview, product performance, recent orders
- **Real-time data visualization** with ApexCharts
- **Interactive charts** - line, area, bar, donut charts

### 📄 Pre-Built Pages
- ✅ Analytics Dashboard
- ✅ E-commerce Dashboard
- ✅ User Management (List view with filters)
- ✅ Product Management (Grid & List views)
- ✅ Login & Register pages
- ✅ Main landing page

### 🧩 UI Components Library
- **Layout**: Card, Sidebar, Navbar, DashboardLayout
- **Forms**: Input, Textarea, Select, Checkbox, Switch
- **Data Display**: Badge, Avatar, Stats cards, Tables
- **Actions**: Button (multiple variants and sizes)
- **Utilities**: Theme switcher, Search, Filters

### 🛠️ Tech Stack
- **React 19.1.1** - Latest React with hooks
- **Vite 7.1.7** - Lightning-fast build tool
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **React Router 7.9.5** - Client-side routing
- **ApexCharts** - Modern charting library
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations (ready to use)

### 📦 Additional Features
- **Theme Context** - Global theme management
- **Glassmorphic components** - All components styled with glass effects
- **Utility functions** - Class name merging with clsx
- **Component variants** - Multiple styles for each component
- **TypeScript ready** - Easy to migrate
- **Performance optimized** - Lazy loading and code splitting ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/enmohsinali/GlassAdmin.git
cd GlassAdmin

# Navigate to react-app folder
cd react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
react-app/
├── src/
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Avatar.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Textarea.jsx
│   │   │   ├── Checkbox.jsx
│   │   │   ├── Switch.jsx
│   │   │   └── index.js
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── Modal.jsx
│   ├── layouts/
│   │   └── DashboardLayout.jsx  # Main dashboard layout
│   ├── pages/
│   │   ├── dashboards/
│   │   │   ├── AnalyticsDashboard.jsx
│   │   │   └── EcommerceDashboard.jsx
│   │   ├── users/
│   │   │   └── UserList.jsx
│   │   ├── products/
│   │   │   └── ProductList.jsx
│   │   ├── MainPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── context/
│   │   └── ThemeContext.jsx    # Theme management
│   ├── utils/
│   │   └── cn.js               # Utility functions
│   ├── App.jsx
│   └── main.jsx
├── public/
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🎨 Using Components

### Button Component

```jsx
import { Button } from './components/ui';

// Primary button
<Button variant="primary" size="md">
  Click Me
</Button>

// Glass button with icon
<Button
  variant="glass"
  leftIcon={<Plus />}
>
  Add New
</Button>
```

### Card Component

```jsx
import { Card } from './components/ui';

<Card
  title="Analytics"
  hover={true}
>
  <p>Your content here</p>
</Card>
```

### Input Component

```jsx
import { Input } from './components/ui';
import { Search } from 'lucide-react';

<Input
  placeholder="Search..."
  leftIcon={<Search className="w-5 h-5" />}
/>
```

### Stats Card

```jsx
import { Stats } from './components/ui';
import { DollarSign } from 'lucide-react';

<Stats
  title="Total Revenue"
  value="$180k"
  change="+12.5%"
  changeType="increase"
  icon={DollarSign}
  iconColor="primary-blue"
  description="vs last month"
/>
```

## 🎯 Available Routes

- `/` - Main landing page
- `/login` - Login page
- `/register` - Register page
- `/dashboard/analytics` - Analytics dashboard
- `/dashboard/ecommerce` - E-commerce dashboard
- `/dashboard/users` - User management
- `/dashboard/products` - Product management

## 🎨 Theme Customization

The theme is configured in `tailwind.config.js`. You can customize colors, blur effects, and more:

```js
theme: {
  extend: {
    colors: {
      'primary-blue': '#3a6df0',
      'primary-green': '#3bf083',
      'primary-red': '#ff705c',
      // Add your custom colors
    },
    backdropBlur: {
      'glass': '20px',
      // Customize blur levels
    },
  },
}
```

## 🌙 Dark Mode

The template includes built-in dark mode support. Toggle theme using the theme switcher button or programmatically:

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

## 📊 Charts Integration

GlassAdmin uses ApexCharts for data visualization:

```jsx
import Chart from 'react-apexcharts';

const chartOptions = {
  chart: { type: 'area', background: 'transparent' },
  theme: { mode: isDark ? 'dark' : 'light' },
  colors: ['#3a6df0'],
  // ... more options
};

const chartSeries = [{
  name: 'Revenue',
  data: [30, 40, 35, 50, 49, 60, 70, 91]
}];

<Chart
  options={chartOptions}
  series={chartSeries}
  type="area"
  height={300}
/>
```

## 🚧 Roadmap

### Phase 1 (Current) ✅
- [x] Core UI components
- [x] Dashboard layouts
- [x] Analytics & E-commerce dashboards
- [x] User & Product management
- [x] Theme system

### Phase 2 (Next)
- [ ] More dashboard pages (CRM, Calendar, Messages)
- [ ] Advanced tables with sorting/filtering
- [ ] Form validation examples
- [ ] File upload component
- [ ] Invoice pages
- [ ] Settings pages
- [ ] Error pages (404, 500)

### Phase 3 (Future)
- [ ] Calendar integration (FullCalendar)
- [ ] Chat/Messaging UI
- [ ] Kanban board
- [ ] Email templates
- [ ] Component documentation site
- [ ] Storybook integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Credits

- Design inspired by Apple iOS 26 Liquid Glass UI
- Icons by [Lucide](https://lucide.dev/)
- Charts by [ApexCharts](https://apexcharts.com/)

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using React, Vite, and Tailwind CSS
