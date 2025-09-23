import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // Allow external connections
    port: 2025,
    strictPort: true, // Don't try other ports if 2025 is occupied
    // Add performance optimizations for external access
    cors: true,
    hmr: {
      port: 2026, // Use different port for HMR to avoid conflicts
    },
    // Allow specific hosts for domain access
    allowedHosts: [
      "pengumuman.bandhayudha.icu",
      "pengumuman.bandhayudha.com",
      "localhost",
      ".localhost",
      "127.0.0.1",
      "::1"
    ],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Performance optimizations
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-toast', '@radix-ui/react-dialog', '@radix-ui/react-label'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
        },
      },
    },
    // Optimize for mobile
    target: ['es2015', 'safari11'],
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
  },
  // Optimize dev server for external access
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
