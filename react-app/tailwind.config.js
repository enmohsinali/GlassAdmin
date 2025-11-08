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
        // Using CSS variables for easy theme customization
        'primary': {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
        },
        'success': {
          DEFAULT: 'rgb(var(--color-success) / <alpha-value>)',
          hover: 'rgb(var(--color-success-hover) / <alpha-value>)',
        },
        'warning': {
          DEFAULT: 'rgb(var(--color-warning) / <alpha-value>)',
          hover: 'rgb(var(--color-warning-hover) / <alpha-value>)',
        },
        'danger': {
          DEFAULT: 'rgb(var(--color-danger) / <alpha-value>)',
          hover: 'rgb(var(--color-danger-hover) / <alpha-value>)',
        },
        'info': {
          DEFAULT: 'rgb(var(--color-info) / <alpha-value>)',
          hover: 'rgb(var(--color-info-hover) / <alpha-value>)',
        },
        'purple': {
          DEFAULT: 'rgb(var(--color-purple) / <alpha-value>)',
          hover: 'rgb(var(--color-purple-hover) / <alpha-value>)',
        },

        // Legacy color names for backward compatibility (will be deprecated)
        'theme-dark-bg': 'rgba(16, 18, 27, 0.4)',
        'theme-light-bg': 'rgba(255, 255, 255, 0.31)',
        'popup-dark': '#2b2c48',
        'popup-light': '#ffffff',
        'border-dark': 'rgba(113, 119, 144, 0.25)',
        'border-light': 'rgba(0, 0, 0, 0.12)',
        'primary-blue': 'rgb(var(--color-primary))', // Now uses CSS variable
        'primary-green': 'rgb(var(--color-success))', // Now uses CSS variable
        'primary-red': 'rgb(var(--color-danger))', // Now uses CSS variable
        'inactive-dark': 'rgba(249, 250, 251, 0.55)',
        'inactive-light': 'rgba(60, 58, 58, 0.65)',
        'error': 'rgb(var(--color-danger))', // Now uses CSS variable
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
