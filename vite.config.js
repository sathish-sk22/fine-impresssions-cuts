import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        cncEngraving: resolve(import.meta.dirname, 'cnc-engraving/index.html'),
        laserMarking: resolve(import.meta.dirname, 'laser-marking/index.html'),
        metalEngraving: resolve(import.meta.dirname, 'metal-engraving/index.html'),
        leatherEmbossing: resolve(import.meta.dirname, 'leather-embossing/index.html'),
      },
    },
  },
})
