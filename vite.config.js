// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: false,
    },
    historyApiFallback: true,
  },
  build: {
    chunkSizeWarningLimit: 1500,
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});