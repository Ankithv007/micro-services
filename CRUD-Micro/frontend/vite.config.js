import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',  // <-- Important if you see white screen on reload
  plugins: [react()]
})
