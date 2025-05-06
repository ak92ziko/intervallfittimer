import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react-i18next', 'i18next']
  },
  build: {
    outDir: 'dist/client',
    rollupOptions: {
      external: ['react-i18next', 'i18next'],
    }
  },
  server: {
    historyApiFallback: true,
  },
});
