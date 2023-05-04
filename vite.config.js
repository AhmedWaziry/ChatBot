import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: "es",
        strict: false,
        entryFileNames: "assets/chat_extension_1.js",
        dir: "dist",
      },
    },
  },
});
