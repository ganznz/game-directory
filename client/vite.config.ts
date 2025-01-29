import path from "path";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import autoprefixer from "autoprefixer";

const env = loadEnv("all", process.cwd());

export default defineConfig({
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    build: {
        cssMinify: true,
        ssr: false,
    },
    css: {
        postcss: {
            plugins: [autoprefixer],
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
