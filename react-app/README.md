# Glassmorphism Creative Cloud App - React Version

A beautiful, modern React application featuring glassmorphism design with Creative Cloud app management interface.

## Features

- **Glassmorphism Design**: Frosted glass effect with backdrop blur and semi-transparent backgrounds
- **Dark/Light Mode Toggle**: Seamlessly switch between dark and light themes
- **Responsive Design**: Fully responsive layout that works on all devices
- **React Router**: Multi-page application with Login, Register, and Main pages
- **Component-Based Architecture**: Modular and reusable React components
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Modern UI/UX**: Clean, intuitive interface with smooth transitions

## Project Structure

```
react-app/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Header.jsx       # Navigation header with search
│   │   ├── Sidebar.jsx      # Left navigation sidebar
│   │   ├── Hero.jsx         # Adobe Stock promotional banner
│   │   ├── InstalledApps.jsx  # List of installed apps
│   │   ├── AppCards.jsx     # Grid of available apps
│   │   └── Modal.jsx        # Update modal popup
│   ├── pages/               # Page components
│   │   ├── MainPage.jsx     # Main dashboard page
│   │   ├── LoginPage.jsx    # Login page
│   │   └── RegisterPage.jsx # Registration page
│   ├── context/             # React Context providers
│   │   └── ThemeContext.jsx # Dark/Light theme management
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles and Tailwind imports
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── vite.config.js           # Vite configuration
└── package.json             # Project dependencies
```

## Installation

1. **Navigate to the react-app directory:**
   ```bash
   cd react-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Routes

- `/` - Main dashboard with app management
- `/login` - User login page
- `/register` - User registration page

## Features Breakdown

### 1. Theme System

The application uses React Context for global theme management:

```jsx
import { useTheme } from './context/ThemeContext';

const { isDark, toggleTheme } = useTheme();
```

- **Dark Mode**: Dark backgrounds with high contrast
- **Light Mode**: Light, airy backgrounds
- Toggle between themes with a single button click

### 2. Components

#### Header
- Navigation menu (Apps, Your work, Discover, Market)
- Search bar
- Notifications with badge
- Profile image

#### Sidebar
- Apps section (All Apps, Updates)
- Categories (Photography, Graphic Design, Video, etc.)
- Fonts management
- Resource links (Stock, Tutorials, Portfolio, etc.)

#### Hero Section
- Adobe Stock promotional banner
- Call-to-action button
- Featured image

#### Installed Apps
- List of installed applications
- Status indicators (Updated/Update Available)
- Action buttons (Open/Update)
- Click Update to show modal

#### App Cards
- Grid of available apps in your plan
- App descriptions
- Update buttons
- Hover effects with scale animation

#### Modal
- Update confirmation dialog
- Checkbox options
- Cancel and Continue buttons
- Backdrop overlay

### 3. Pages

#### Main Page (Dashboard)
- Complete app management interface
- Dark/light mode toggle
- Install new app button
- All components integrated

#### Login Page
- Email and password fields
- Remember me checkbox
- Forgot password link
- Social login buttons (Google, Facebook, Twitter)
- Link to registration

#### Register Page
- First and last name fields
- Email and password
- Password strength indicator
- Confirm password
- Terms and conditions checkbox
- Link to login

## Customization

### Colors

Edit `tailwind.config.js` to customize colors:

```js
colors: {
  'theme-dark-bg': 'rgba(16, 18, 27, 0.4)',
  'theme-light-bg': 'rgba(255, 255, 255, 0.31)',
  'primary-blue': '#3a6df0',
  'primary-green': '#3bf083',
  'primary-red': '#ff705c',
  // Add your custom colors here
}
```

### Fonts

The project uses Poppins font from Google Fonts. To change:

1. Update the import in `src/index.css`:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
   ```

2. Update `tailwind.config.js`:
   ```js
   fontFamily: {
     'custom': ['Your Font', 'sans-serif'],
   }
   ```

## Technologies Used

- **React 18**: Latest React version with hooks
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **PostCSS**: CSS processing
- **Autoprefixer**: Automatic vendor prefixing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Lazy Loading**: Components are loaded on demand
- **Code Splitting**: Automatic code splitting with Vite
- **Optimized Images**: Efficient image loading
- **Minimal Bundle Size**: Optimized for production

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is for demonstration purposes.

## Credits

Design inspired by Adobe Creative Cloud with glassmorphism effects.
