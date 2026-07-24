import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_URL,
        changeOrigin: true,
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 5173,
  }
})
