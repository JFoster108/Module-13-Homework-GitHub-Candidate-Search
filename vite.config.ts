import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Automatically open browser
  },
  build: {
    outDir: 'dist', // Output directory
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: './', // Ensure relative paths for production
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
