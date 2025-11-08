# Theme Customization Guide

## Overview

GlassAdmin now uses a centralized color system with CSS variables, making it easy to customize the entire theme by changing values in one place.

## Quick Start: Changing Theme Colors

To customize your theme colors, edit the CSS variables in `/react-app/src/index.css`:

```css
:root {
  /* Primary Colors - Change these to customize your theme */
  --color-primary: 58 109 240; /* #3a6df0 - Main brand color (blue) */
  --color-primary-hover: 30 89 241; /* #1e59f1 - Darker blue for hover */

  /* Semantic Colors */
  --color-success: 59 240 131; /* #3bf083 - Green for success states */
  --color-success-hover: 45 220 115; /* Darker green for hover */

  --color-warning: 255 189 46; /* #ffbd2e - Yellow/Orange for warnings */
  --color-warning-hover: 235 169 26; /* Darker yellow for hover */

  --color-danger: 255 112 92; /* #ff705c - Red for errors/danger */
  --color-danger-hover: 235 92 72; /* Darker red for hover */

  --color-purple: 147 51 234; /* #9333ea - Purple accent */
  --color-purple-hover: 127 31 214; /* Darker purple for hover */
}
```

### Color Format

Colors are specified as **RGB values without commas** (e.g., `58 109 240` for #3a6df0). This format allows Tailwind to add opacity modifiers automatically.

**Example conversions:**
- `#3a6df0` → `58 109 240`
- `#ff705c` → `255 112 92`
- `#3bf083` → `59 240 131`

You can use online tools like https://www.rapidtables.com/convert/color/hex-to-rgb.html to convert hex to RGB.

## Using Theme Colors in Components

### In Tailwind Classes

Use the semantic color names:

```jsx
// ✅ CORRECT - Uses theme variables
<button className="bg-primary hover:bg-primary-hover text-white">
  Primary Button
</button>

<div className="bg-success text-white">Success Message</div>
<div className="bg-danger text-white">Error Message</div>
<div className="bg-warning text-white">Warning</div>
```

### Button Component

```jsx
// Available variants use theme colors
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary (Green)</Button>
<Button variant="danger">Danger</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Badge Component

```jsx
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="purple">Purple</Badge>
```

## Files Already Updated

The following components have been updated to use the CSS variable system:

✅ **Core System:**
- `/react-app/src/index.css` - CSS variables defined
- `/react-app/tailwind.config.js` - Tailwind theme configured

✅ **Components:**
- `/react-app/src/components/ui/Button.jsx` - All variants use theme colors
- `/react-app/src/components/ui/Badge.jsx` - All variants use theme colors

## Files That Still Need Updates

⚠️ **The following files still contain hardcoded colors** and should be updated to use the theme system:

### High Priority Pages (Recently Created)
1. `/react-app/src/pages/MessengerPage.jsx` - Messenger interface colors
2. `/react-app/src/pages/TasksPage.jsx` - Task management colors
3. `/react-app/src/pages/ContactDetailPage.jsx` - Contact detail colors
4. `/react-app/src/pages/ContactsPage.jsx` - Contacts page colors
5. `/react-app/src/pages/FinancialPage.jsx` - Financial dashboard colors
6. `/react-app/src/pages/ScrumBoardPage.jsx` - Scrum board colors
7. `/react-app/src/pages/CalendarPage.jsx` - Calendar page colors

### Dashboard Pages
8. `/react-app/src/pages/dashboards/EcommerceDashboard.jsx`
9. `/react-app/src/pages/dashboards/AnalyticsDashboard.jsx`

### User Management
10. `/react-app/src/pages/users/UserList.jsx`
11. `/react-app/src/pages/users/UserDetails.jsx`

### Product Management
12. `/react-app/src/pages/products/ProductList.jsx`
13. `/react-app/src/pages/products/ProductDetails.jsx`

### Auth Pages
14. `/react-app/src/pages/LoginPage.jsx`
15. `/react-app/src/pages/RegisterPage.jsx`
16. `/react-app/src/pages/ResetPassword.jsx`
17. `/react-app/src/pages/NotFound.jsx`

### Components
18. `/react-app/src/components/Calendar.jsx`
19. `/react-app/src/components/Calendar.css`
20. `/react-app/src/components/Sidebar.jsx`
21. `/react-app/src/components/Header.jsx`
22. `/react-app/src/components/Hero.jsx`
23. `/react-app/src/components/Modal.jsx`
24. `/react-app/src/components/InstalledApps.jsx`
25. `/react-app/src/components/AppCards.jsx`
26. `/react-app/src/components/LanguageSwitcher.jsx`

### UI Components
27. `/react-app/src/components/ui/Input.jsx`
28. `/react-app/src/components/ui/Select.jsx`
29. `/react-app/src/components/ui/Textarea.jsx`
30. `/react-app/src/components/ui/Slider.jsx`
31. `/react-app/src/components/ui/Radio.jsx`
32. `/react-app/src/components/ui/Progress.jsx`
33. `/react-app/src/components/ui/Spinner.jsx`
34. `/react-app/src/components/ui/Pagination.jsx`
35. `/react-app/src/components/ui/Tag.jsx`
36. `/react-app/src/components/ui/Alert.jsx`
37. `/react-app/src/components/ui/GlassCard.jsx`
38. `/react-app/src/components/ui/FormWizard.jsx`
39. `/react-app/src/components/ui/LoadingAnimation.jsx`
40. `/react-app/src/components/ui/AnimatedButton.jsx`

### Layout
41. `/react-app/src/layouts/DashboardLayout.jsx`

## How to Update Hardcoded Colors

### Find and Replace Patterns

Search for these patterns and replace with theme classes:

**Primary Blue (#3a6df0):**
```jsx
// ❌ WRONG - Hardcoded
bg-[#3a6df0]
text-[#3a6df0]

// ✅ CORRECT - Uses theme
bg-primary
text-primary
```

**Hover States:**
```jsx
// ❌ WRONG
hover:bg-[#1e59f1]

// ✅ CORRECT
hover:bg-primary-hover
```

**Success Green (#3bf083):**
```jsx
// ❌ WRONG
bg-[#3bf083]

// ✅ CORRECT
bg-success
```

**Danger Red (#ff705c):**
```jsx
// ❌ WRONG
bg-[#ff705c]

// ✅ CORRECT
bg-danger
```

**Warning Yellow (#ffbd2e):**
```jsx
// ❌ WRONG
bg-[#ffbd2e]

// ✅ CORRECT
bg-warning
```

**Purple (#9333ea):**
```jsx
// ❌ WRONG
bg-[#9333ea]

// ✅ CORRECT
bg-purple
```

## Available Tailwind Classes

After the update, you can use these Tailwind classes throughout your application:

### Primary Color
- `bg-primary` - Background
- `bg-primary-hover` - Background hover state
- `text-primary` - Text color
- `border-primary` - Border color
- `bg-primary/50` - With 50% opacity

### Success Color
- `bg-success`
- `bg-success-hover`
- `text-success`
- `border-success`

### Warning Color
- `bg-warning`
- `bg-warning-hover`
- `text-warning`
- `border-warning`

### Danger Color
- `bg-danger`
- `bg-danger-hover`
- `text-danger`
- `border-danger`

### Info Color
- `bg-info`
- `bg-info-hover`
- `text-info`
- `border-info`

### Purple Color
- `bg-purple`
- `bg-purple-hover`
- `text-purple`
- `border-purple`

## Common Color Combinations

### Example 1: Changing Primary Color to Purple

```css
:root {
  --color-primary: 147 51 234; /* Purple */
  --color-primary-hover: 127 31 214; /* Darker purple */
}
```

### Example 2: Changing Primary Color to Green

```css
:root {
  --color-primary: 16 185 129; /* #10b981 - Emerald green */
  --color-primary-hover: 5 150 105; /* #059669 - Darker emerald */
}
```

### Example 3: Changing to Orange Theme

```css
:root {
  --color-primary: 249 115 22; /* #f97316 - Orange */
  --color-primary-hover: 234 88 12; /* #ea580c - Darker orange */
}
```

## Testing Your Changes

After changing colors in `index.css`, your changes will be reflected across:
- All buttons with `variant="primary"`
- All badges with `variant="primary"`
- Any component using `bg-primary`, `text-primary`, etc.

The colors will automatically work with dark/light mode and all opacity modifiers.

## Best Practices

1. **Always use theme classes** for brand colors
2. **Update files gradually** - start with high-priority pages
3. **Test in both dark and light modes** after changing colors
4. **Use hover variants** for interactive elements
5. **Document custom colors** if you add new ones

## Migration Checklist

For each file that needs updating:

- [ ] Open the file
- [ ] Search for `#3a6df0` → Replace with `bg-primary` or `text-primary`
- [ ] Search for `#1e59f1` → Replace with `bg-primary-hover`
- [ ] Search for `#3bf083` → Replace with `bg-success`
- [ ] Search for `#ff705c` → Replace with `bg-danger`
- [ ] Search for `#ffbd2e` → Replace with `bg-warning`
- [ ] Search for `#9333ea` → Replace with `bg-purple`
- [ ] Test the component in browser
- [ ] Verify dark/light mode compatibility

## Need Help?

If you encounter any issues:
1. Check that the color format is correct (RGB without commas)
2. Ensure you're using the class format: `bg-primary` not `background-primary`
3. Remember to restart the development server after changing `index.css`
4. Check browser console for any Tailwind errors

## Summary

**Before (Hardcoded):**
- Colors scattered across 40+ files
- Difficult to maintain and customize
- Need to update dozens of files to change theme

**After (CSS Variables):**
- Colors defined in ONE place (`index.css`)
- Easy to customize entire theme
- Change one value, update everywhere
- Perfect for selling as a template

---

**Note:** The migration is partially complete. Button and Badge components are done. All page files created after 2025-11-08 (Messenger, Tasks, Contacts, Financial, ScrumBoard, Calendar) still need updating.
