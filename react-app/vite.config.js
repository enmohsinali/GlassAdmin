import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Build optimization
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },

    // Chunk splitting strategy for optimal loading
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and related libs
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Charts chunk (heavy library)
          'charts': ['react-apexcharts', 'apexcharts'],
          // UI components chunk
          'ui': ['framer-motion', 'lucide-react'],
          // i18n chunk
          'i18n': ['react-i18next', 'i18next', 'i18next-browser-languagedetector'],
          // Form libraries
          'forms': ['react-hook-form', '@hookform/resolvers', 'yup'],
          // Utilities
          'utils': ['date-fns', 'clsx'],
        },
      },
    },

    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,

    // Enable source maps for debugging (can be disabled for production)
    sourcemap: false,
  },

  // Server optimization
  server: {
    // Enable compression
    compress: true,
  },

  // Preview optimization
  preview: {
    port: 4173,
    strictPort: true,
  },
})
