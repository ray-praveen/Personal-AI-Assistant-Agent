import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envDir: '../',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          clerk: ['@clerk/clerk-react'],
          charts: ['recharts'],
          motion: ['framer-motion']
        }
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
      '/health': 'http://localhost:5000'
    }
  }
});
