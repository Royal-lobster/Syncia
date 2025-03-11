import { defineConfig, UserManifest } from "wxt";

const generateManifest = () => {
  const manifest: UserManifest = {
    action: {
      default_title: "Syncia - Open Sidebar",
    },
    commands: {
      "open-sidebar": {
        suggested_key: {
          default: "Ctrl+Shift+X",
          mac: "Command+Shift+X",
        },
        description: "Open the sidebar",
      },
    },
    externally_connectable: { ids: ["*"] },
    icons: {
      "16": "images/icon-16.png",
      "32": "images/icon-32.png",
      "48": "images/icon-48.png",
      "128": "images/icon-128.png",
    },
    permissions: [
      "storage",
      "unlimitedStorage",
      "contextMenus",
      "tabs",
      "activeTab",
      "clipboardWrite",
    ],
  };
  if (import.meta.env.MANIFEST_VERSION != 2) {
    manifest.web_accessible_resources = [
      {
        resources: ["sidebar.html", "images/robot.png", "options.html"],
        matches: ["http://*/*", "https://*/*"],
      },
    ];
  }

  return manifest;
};

export default defineConfig({
  extensionApi: "webextension-polyfill",
  srcDir: "src",
  manifest: generateManifest(),
  hooks: {
    "build:manifestGenerated": (wxt, manifest) => {
      const version = require("./package.json").version;
      const [major, minor, patch, label = "0"] = version
        .replace(/[^\d.-]+/g, "")
        .split(/[.-]/);

      manifest.name =
        wxt.config.mode === "staging"
          ? "[INTERNAL] Syncia"
          : "Syncia - Power of ChatGPT on any website";

      manifest.description =
        "Syncia is a browser extension that allows you to use Open AI's GPT in any website.";
      manifest.version = `${major}.${minor}.${patch}.${label}`;
      manifest.version_name = version;
    },
  },
});
