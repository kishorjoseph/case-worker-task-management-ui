
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API calls starting with /api to the backend server
      '/api/task': {
        target: 'http://localhost:8081', // replace with your backend server
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, ''),
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',  // optional but recommended
  },
});
