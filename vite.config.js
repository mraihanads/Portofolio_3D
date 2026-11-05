import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react';
            if (id.includes('three') || id.includes('@react-three')) return 'vendor-three';
            if (id.includes('gsap') || id.includes('framer-motion') || id.includes('lenis')) return 'vendor-animation';
          }
        },
      },
    },
  },
})
