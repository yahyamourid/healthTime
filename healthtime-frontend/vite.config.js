import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
  build: {
    rollupOptions: {
      external: ['zxcvbn', 'zod'],
      output: {
        globals: {
          zxcvbn: 'zxcvbn',
          zod: 'Zod'
        }
      }
    }
  }
  // ,
  // build: {
  //   rollupOptions: {
  //     external: ['zxcvbn','zod']
  //   }
  // }
})
