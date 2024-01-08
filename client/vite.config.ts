import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import postcssNesting from "postcss-nesting";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests",
    cache: {
      dir: "./node_modules/.vitest",
    },
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/components"),
    },
  },
});
