import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  preview: {
    port: 5170,
    strictPort: true,
    allowedHosts: ["cisa.krisnabmntr.my.id"],
  },
  server: {
    port: 5170,
    strictPort: true,
    host: true,
    origin: "http://localhost:5170",
  },
});
