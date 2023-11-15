import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    publicDir: 'static',
    build: {
        minify: true,
        sourcemap: true,
    },
    plugins: [
        svelte(),
        legacy({
            targets: ['chrome >= 47'],
            modernPolyfills: ['es/global-this'],
        })
    ]
})
