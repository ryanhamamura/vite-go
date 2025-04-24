import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external access
    proxy: {
      '/api': {
        target: 'http://localhost:8180',
        changeOrigin: true,
        secure: false
      }
    },
    cors: true
  },
  build: {
    outDir: resolve(__dirname, '../backend/dist'),
    emptyOutDir: true,
  },
})
