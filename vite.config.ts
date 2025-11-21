import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    base: './', // <--- ADD THIS LINE. It fixes the blank screen path issue.
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY),
    },
  }
})