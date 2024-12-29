import { defineConfig } from 'wxt'

export default defineConfig({
  srcDir: 'src',
  manifest: {
    action: {
      default_title: 'Syncia - Open Sidebar',
    },
    commands: {
      'open-sidebar': {
        suggested_key: {
          default: 'Ctrl+Shift+X',
          mac: 'Command+Shift+X',
        },
        description: 'Open the sidebar',
      },
    },
    externally_connectable: { ids: ['*'] },
    manifest_version: 3,
    icons: {
      '16': 'images/icon-16.png',
      '32': 'images/icon-32.png',
      '48': 'images/icon-48.png',
      '128': 'images/icon-128.png',
    },
    permissions: [
      'storage',
      'unlimitedStorage',
      'contextMenus',
      'tabs',
      'activeTab',
      'clipboardWrite',
    ],
    background: {
      service_worker: 'src/pages/background/index.ts',
    },
    content_scripts: [
      {
        matches: ['http://*/*', 'https://*/*', '<all_urls>'],
        js: ['src/pages/content/sidebar.tsx'],
      },
      {
        matches: ['http://*/*', 'https://*/*', '<all_urls>'],
        js: [
          'src/pages/content/quick-menu/initQuickMenu.tsx',
          'src/pages/content/quick-menu/listenContextMenu.tsx',
        ],
        all_frames: true,
      },
    ],
    web_accessible_resources: [
      {
        resources: [
          'src/pages/sidebar/index.html',
          'images/robot.png',
          'src/pages/settings/index.html',
        ],
        matches: ['http://*/*', 'https://*/*'],
      },
    ],
  },
  hooks: {
    'build:manifestGenerated': (wxt, manifest) => {
      const version = require('./package.json').version
      const [major, minor, patch, label = '0'] = version
        .replace(/[^\d.-]+/g, '')
        .split(/[.-]/)

      manifest.name =
        wxt.config.mode === 'staging'
          ? '[INTERNAL] Syncia'
          : 'Syncia - Power of ChatGPT on any website'

      manifest.description =
        "Syncia is a browser extension that allows you to use Open AI's GPT in any website."
      manifest.version = `${major}.${minor}.${patch}.${label}`
      manifest.version_name = version
    },
  },
})
