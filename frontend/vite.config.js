import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: [
      "853cc3b8ee46.ngrok-free.app",
    ],
    proxy: {
      "/weatherapi": {
        target: "https://api.weatherapi.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weatherapi/, ""),
      },
    },
  },
})
