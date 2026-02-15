import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/perk-ai': {
        target: 'https://n8n.cheq.dpdns.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/perk-ai/, '/webhook/e0d56849-6354-495f-9713-9ff792f391c5'),
      },
    },
  },
})
