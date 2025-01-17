import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

const env = loadEnv("all", process.cwd());

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), reactRouter()],
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },
    server: {
        proxy: {
            "/api": {
                target: env.DEV ? env.VITE_API_URL_DEV : env.VITE_API_URL_PROD,
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./app"),
        },
    },
});
