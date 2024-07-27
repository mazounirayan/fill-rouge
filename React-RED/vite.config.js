import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './', // Ensure this points to the correct root directory
  build: {
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  }
})
