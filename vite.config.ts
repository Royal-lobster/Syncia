import { defineConfig } from 'wxt'

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
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
  }),
})
