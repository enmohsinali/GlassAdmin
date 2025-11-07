import tailwindcssRTL from 'tailwindcss-rtl';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-dark-bg': 'rgba(16, 18, 27, 0.4)',
        'theme-light-bg': 'rgba(255, 255, 255, 0.31)',
        'popup-dark': '#2b2c48',
        'popup-light': '#ffffff',
        'border-dark': 'rgba(113, 119, 144, 0.25)',
        'border-light': 'rgba(255, 255, 255, 0.35)',
        'primary-blue': '#3a6df0',
        'primary-green': '#3bf083',
        'primary-red': '#ff705c',
        'inactive-dark': 'rgba(249, 250, 251, 0.55)',
        'inactive-light': 'rgba(60, 58, 58, 0.55)',
        // Badge colors with proper contrast
        'success': '#3bf083',
        'error': '#ff705c',
        'warning': '#fbbf24',
        'info': '#3a6df0',
      },
      backdropBlur: {
        'glass': '20px',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      // Add responsive breakpoints documentation
      screens: {
        'xs': '475px',
        // sm: '640px' (default)
        // md: '768px' (default)
        // lg: '1024px' (default)
        // xl: '1280px' (default)
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    tailwindcssRTL,
  ],
}
