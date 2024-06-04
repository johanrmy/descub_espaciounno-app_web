import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 80,
    
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@data': path.resolve(__dirname, './src/data'),
      '@auth': path.resolve(__dirname, './src/auth'),
      '@handlers': path.resolve(__dirname, './src/handlers')
    }
  },
  build: {
    sourcemap: false
  }
})
