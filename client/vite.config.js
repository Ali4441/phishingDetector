import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        danger: '#ef4444',
        warning: '#f59e0b',
        success: '#10b981',
        darkbg: '#0f172a',
        cardbg: '#1e293b',
      }
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
