import type { Manifest } from "webextension-polyfill";
import pkg from "../package.json";

const manifest: Manifest.WebExtensionManifest = {
  manifest_version: 3,
  name: pkg.displayName,
  version: pkg.version,
  description: pkg.description,
  permissions: ["storage"],
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  icons: {
    "128": "icon-128.png",
  },
  commands: {
    "open-sidebar": {
      suggested_key: {
        default: "Ctrl+B",
      },
      description: "Open the sidebar",
    },
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["contentStyle.css"],
    },
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: [
        "/src/pages/sidebar/index.html",
        "contentStyle.css",
        "icon-128.png",
        "icon-34.png",
        "content.js",
      ],
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
    },
  ],
};

export default manifest;
