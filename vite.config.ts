import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler"]],
            },
        }),
        viteSingleFile({
            removeViteModuleLoader: true,
            useRecommendedBuildConfig: true,
        }),
    ],
    build: {
        assetsInlineLimit: 100000000,
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
            },
        },
    },
    base: "/study-music/",
});
