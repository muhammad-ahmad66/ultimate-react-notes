import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    proxy: {
      // Proxy API requests
      "/api": {
        target: "https://rreact-fast-pizza-api.onrender.com",
        changeOrigin: true, // Ensures the host header is changed to the target
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes '/api' prefix before forwarding
      },
    },
  },
});
