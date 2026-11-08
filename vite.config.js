import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/leaflet')) {
            return 'vendor-leaflet';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (id.includes('rawMapSpawns.json')) {
            return 'data-spawns';
          }
          if (id.includes('wikiItems.json')) {
            return 'data-wiki';
          }
          if (id.includes('vaultsQuestsFood.js') || id.includes('skillsShopsEndgame.js') || id.includes('trophiesData.js')) {
            return 'data-guides';
          }
        },
      },
    },
  },
});
