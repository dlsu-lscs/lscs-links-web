import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/auth": {
                target: "https://core.api.dlsu-lscs.org",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/auth/, ""),
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});

