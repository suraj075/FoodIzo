import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all requests starting with `/api` to the backend server
      '/api': {
        target: 'http://localhost:4000', // Backend server URL
        changeOrigin: true, // Required for CORS
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove `/api` prefix
      },
    },
  },
});