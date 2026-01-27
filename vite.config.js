import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  base: '/', // Updated for custom domain cardperks.xyz at root
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-fuse': ['fuse.js'],
          'vendor-markdown': ['react-markdown'],

          // Data chunks
          'data-vouchers': ['./src/data/vouchers.json'],
          'data-cards': ['./src/data/creditCards.json'],
          'data-guides': ['./src/data/guides.json'],

          // Route chunks (lazy loaded components)
          'route-guides': ['./src/components/Guides.jsx'],
          'route-cards': [
            './src/components/CreditCardComparison.jsx',
            './src/components/CardGuide.jsx'
          ],
          'route-calculators': [
            './src/components/RewardsCalculator.jsx',
            './src/components/PointsConverter.jsx'
          ],
          'route-ai': ['./src/components/AskAI.jsx'],
        }
      }
    },
    // Set chunk size warning limit
    chunkSizeWarningLimit: 500,

    // Minify for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true
      }
    },

    // Source maps for debugging
    sourcemap: false, // Disable for smaller bundle
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'fuse.js']
  }
})
