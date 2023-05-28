import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifestConfig from './manifest.config'
import zipPack from 'vite-plugin-zip-pack'

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest: manifestConfig }),
    zipPack({
      inDir: 'dist',
      outDir: 'artifacts',
      outFileName: 'chrome.zip',
    }),
  ],
  server: {
    port: 5173,
    hmr: {
      port: 5173,
    },
  },
  build: {
    rollupOptions: {
      input: {
        sidebar: 'src/pages/sidebar/index.html',
        settings: 'src/pages/settings/index.html',
      },
    },
  },
})
