import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Build info plugin - injects version and timestamp at build time
const buildInfoPlugin = () => {
  const buildTime = new Date().toISOString();
  const buildDate = buildTime.split('T')[0];
  
  return {
    name: 'build-info',
    config: () => ({
      define: {
        __BUILD_TIME__: JSON.stringify(buildTime),
        __BUILD_DATE__: JSON.stringify(buildDate),
      },
    }),
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    buildInfoPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
