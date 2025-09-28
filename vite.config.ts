import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // Allow external connections
    port: 2025,
    strictPort: true, // Don't try other ports if 2025 is occupied
    cors: true,
    hmr: {
      port: 2026, // Use different port for HMR to avoid conflicts
    },
    // Allow specific hosts for domain access
    allowedHosts: [
      "pengumuman.bandhayudha.com",
      "pengumuman.bandhayudha.icu",
      "localhost",
      ".localhost",
      "127.0.0.1",
      "::1"
    ],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimized build configuration
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            if (id.includes('@radix-ui')) {
              return 'radix';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('lucide-react')) {
              return 'ui';
            }
            if (id.includes('moment-timezone') || id.includes('papaparse')) {
              return 'utils';
            }
            return 'vendor';
          }
        },
      },
    },
    target: ['es2015'],
    cssCodeSplit: false, // Keep CSS together for faster loading
    sourcemap: false,
    minify: 'esbuild', // Faster than terser
    chunkSizeWarningLimit: 1000, // Increase warning limit
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'moment-timezone', 'papaparse'],
    exclude: ['@tanstack/react-query'], // Only load if needed
  },
  // Add base for Cloudflare tunnel compatibility  
  base: './',
}));
