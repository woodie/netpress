import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// Library mode, not Vite's default "app" mode -- app mode wants to own
// index.html and emits hashed filenames into dist/. This project instead
// keeps public/index.html and public/periodic.css as hand-edited files and
// commits public/periodic.js as a predictable-named build artifact (same
// convention as next-caltrain-pwa's webapp/script.js), so the build just
// needs one fixed-name JS file dropped into the existing public/ dir.
export default defineConfig({
  plugins: [svelte()],
  // public/ is both the source of hand-edited static files (index.html,
  // periodic.css, logo.png) and the build's outDir -- so Vite's own
  // publicDir-copy step (which assumes those are two separate folders)
  // would just be copying public/ onto itself. Turned off; nothing needs
  // copying since it's all already sitting there.
  publicDir: false,
  build: {
    outDir: 'public',
    emptyOutDir: false, // public/ also holds index.html, periodic.css, logo.png -- don't wipe those
    lib: {
      entry: 'src/main.js',
      formats: ['iife'],
      name: 'Netpress',
      fileName: () => 'periodic.js'
    }
  }
})
