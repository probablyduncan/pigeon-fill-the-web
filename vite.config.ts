import { defineConfig } from "vite"
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import glsl from "vite-plugin-glsl"
import tailwindcss from "@tailwindcss/vite"

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [
        tailwindcss(),
        glsl({ minify: true }),
    ],
    build: {
        rollupOptions: {
            input: {
                landing: resolve(__dirname, 'index.html'),
                website: resolve(__dirname, 'website.html'),
                book: resolve(__dirname, 'book.html'),
                about: resolve(__dirname, 'about.html'),
            },
        },
    },
})