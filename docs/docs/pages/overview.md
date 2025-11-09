---
sidebar_position: 1
title: Pages Overview
---

# Pages Overview

GlassAdmin includes **30+ pre-built pages** ready to use in your application.

## 📊 Dashboards (3)

### Analytics Dashboard
- `/dashboard/analytics`
- Revenue, users, and sales metrics
- Interactive charts and graphs
- Top products table
- Recent activity feed

### E-commerce Dashboard
- `/dashboard/ecommerce`
- Sales overview and trends
- Best selling products
- Recent orders
- Customer analytics

### Financial Dashboard
- `/dashboard/financial`
- Income/expense tracking
- Budget overview
- Transaction history
- Payment analytics

## 👥 User Management (3)

### User List
- `/dashboard/users`
- Searchable user list
- Filter by role, status
- Bulk actions ready

### User Details
- `/dashboard/users/:id`
- User profile view
- Activity history
- Edit capabilities

### User Edit
- `/dashboard/users/:id/edit`
- Edit user information
- Role assignment
- Form validation

## 🛍️ Product Management (3)

### Product List
- `/dashboard/products`
- Grid and list views
- Search and filters
- Inventory tracking

### Product Details
- `/dashboard/products/:id`
- Product information
- Image gallery
- Related products

### Product Form
- `/dashboard/products/new`
- `/dashboard/products/:id/edit`
- Create/edit products
- Image upload
- Category management

## 📦 Order Management (2)

### Orders List
- `/dashboard/orders`
- Order status filters
- Search functionality
- Export ready

### Order Details
- `/dashboard/orders/:id`
- Order timeline
- Customer information
- Shipping tracking

## 📄 Invoice Management (2)

### Invoices List
- `/dashboard/invoices`
- Payment status tracking
- Date range filters
- PDF generation ready

### Invoice Details
- `/dashboard/invoices/:id`
- Print view
- Download PDF
- Payment history

## 📅 Productivity Tools (5)

### Calendar
- `/dashboard/calendar`
- Month/Week/Day views
- Event creation
- Drag & drop events
- Color-coded categories

### Tasks
- `/dashboard/tasks`
- Todo list management
- Priority levels
- Status tracking
- Due dates

### Scrum Board
- `/dashboard/scrum-board`
- Kanban-style board
- Drag & drop cards
- Sprint planning
- Priority labels

### Messenger
- `/dashboard/messenger`
- Chat interface
- Contact list
- Message history
- Real-time ready

### Contacts
- `/dashboard/contacts`
- CRM contact list
- Search and filters
- Activity tracking

## 💼 Marketing & Sales (3)

### Pricing Page ⭐ NEW
- `/dashboard/pricing`
- 3 pricing tiers (Starter, Professional, Enterprise)
- Monthly/Annual toggle
- Savings calculator
- Feature comparison
- FAQ section

**Components Used:**
- Card
- Button  
- Badge
- Switch (for monthly/annual toggle)
- Progress bars

**Features:**
- Fully customizable pricing
- Automatic savings calculation
- Responsive 3-column layout
- Success/warning badges
- Clear CTA buttons

### Subscription Page ⭐ NEW
- `/dashboard/subscription`
- Current plan overview
- Usage statistics with progress bars
- Billing history
- Payment method management
- Plan upgrade/downgrade
- Cancel subscription flow

**Components Used:**
- Card
- Progress bars
- Badge (status indicators)
- Button (actions)
- Alert (warnings)

**Features:**
- Usage tracking (projects, storage, team members)
- Next billing date display
- Invoice download
- Payment method display
- Quick actions sidebar

### About Page ⭐ NEW
- `/dashboard/about`
- Company information
- Mission and vision
- Team showcase (4 members)
- Core values display
- Statistics cards
- Contact information

**Components Used:**
- Card
- Avatar (team members)
- Badge (role tags)
- Button (CTAs)
- Stats cards

**Features:**
- Team member profiles
- Company statistics
- Values showcase
- Contact details
- Responsive grid layout

## 👤 User Profile (3) ⭐ NEW

### Profile Overview
- `/dashboard/profile`
- **Main Features:**
  - User information display
  - Tabbed interface (Overview, Activity, Projects)
  - Skills with progress visualization
  - Recent activity timeline
  - Active projects tracker
  - Statistics (24 projects, 156 tasks, etc.)

**Tabs:**
1. **Overview:** Bio, skills (5), contact info
2. **Activity:** Recent activity timeline (4 items)
3. **Projects:** Active projects with progress (3)

**Components Used:**
- Tabs
- Card
- Avatar (2xl size)
- Badge (Pro Member, Verified, Top Contributor)
- Button (Edit Profile, Settings)
- Progress bars (skills)

### Profile Edit
- `/dashboard/profile/edit`
- **Main Features:**
  - Avatar upload with preview
  - Personal information fields
  - Professional information
  - Social links (website, Twitter, LinkedIn, GitHub)
  - Save/Cancel actions

**Sections:**
1. **Profile Picture:** Upload/Remove
2. **Basic Info:** Name, email, phone, location, company
3. **Professional:** Job title, bio
4. **Social Links:** 4 platforms

**Components Used:**
- Card
- Avatar
- Input fields
- Textarea
- Button (Save, Cancel, Upload)
- Alert (success notification)

### Profile View
- `/dashboard/profile-view`
- **Main Features:**
  - Simple read-only display
  - Centered layout
  - Contact information grid
  - Statistics cards
  - Action buttons

**Components Used:**
- Card
- Avatar (centered, 2xl)
- Badge (status tags)
- Button (Message, Edit Profile)
- Stats cards (4 metrics)

**Best For:** Public profile views, team member directories

## ⚙️ Settings (1)

### Settings Page
- `/dashboard/settings`
- **Tabs:**
  1. **Appearance:** Theme, background, animations
  2. **Fonts:** Font family selection (3 options)
  3. **Profile:** User profile settings
  4. **Notifications:** Email, push notifications
  5. **Security:** Password, 2FA ready

**Background Options:**
- 6 choices: Gradients, videos, images, solid colors

**Font Options:**
- Poppins (default)
- Inter
- DM Sans

## 🔐 Authentication (4)

### Login
- `/login`
- Email/password form
- Remember me
- Social login ready
- Form validation

### Register
- `/register`
- User registration
- Password strength
- Terms acceptance
- Email verification ready

### Forgot Password
- `/forgot-password`
- Email input
- Success confirmation
- Resend link

### Reset Password
- `/reset-password`
- New password form
- Password validation
- Success confirmation

## 🎨 Demo Pages (2)

### Components Showcase
- `/dashboard/components`
- All 40+ components
- Interactive demos
- Live preview
- Code examples ready

### ComponentsDemo
- `/dashboard/components-demo`
- Phase 4 animations
- Loading animations (5 types)
- Scroll animations (6 types)
- Interactive examples

## ❌ Error Pages (1)

### 404 Not Found
- `*` (catch-all route)
- Custom design
- Back to home button
- Animated illustration

## 📱 Responsive Design

All pages are fully responsive:
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px
- **4K:** > 1440px

## 🎨 Design Consistency

All pages feature:
- iOS 26 Liquid Glass design
- Dark/Light mode support
- Consistent spacing and typography
- Smooth animations
- WCAG AA compliant

## 🔗 Page Navigation

Pages are organized in the sidebar:

**Dashboards Section:**
- Analytics, E-commerce

**Management Section:**
- Orders, Invoices, Settings, Calendar, Scrum Board, Financial

**User Section:** ⭐ NEW
- Profile (dropdown)
  - Overview
  - Edit Profile
  - Profile View

**CRM Section:**
- Contacts, Tasks, Messenger

**Demo Section:**
- All Components
- Phase 4 Animations

## 🚀 Adding Custom Pages

To add a new page:

1. Create component in `src/pages/`
2. Add route in `App.jsx`
3. Import lazily for performance
4. Add to sidebar navigation

Example:

```jsx
// 1. Create page
// src/pages/MyPage.jsx
const MyPage = () => {
  return <PageWrapper title="My Page">...</PageWrapper>;
};

// 2. Add route in App.jsx
const MyPage = lazy(() => import('./pages/MyPage'));

<Route path="/dashboard/my-page" element={<MyPage />} />

// 3. Add to Sidebar.jsx
<Link to="/dashboard/my-page">My Page</Link>
```

## 📊 Page Analytics

Track page views, user interactions, and more by integrating:
- Google Analytics
- Mixpanel
- Custom analytics solution

All pages are analytics-ready with proper page titles and metadata.
