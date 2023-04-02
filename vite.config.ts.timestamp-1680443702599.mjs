// vite.config.ts
import react from "file:///Users/srujangurram/Projects/personal/ChatDockX/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve as resolve3 } from "path";
import { defineConfig } from "file:///Users/srujangurram/Projects/personal/ChatDockX/node_modules/vite/dist/node/index.js";

// utils/plugins/copy-content-style.ts
import * as fs from "fs";
import * as path from "path";

// utils/log.ts
function colorLog(message, type) {
  let color = type || COLORS.FgBlack;
  switch (type) {
    case "success":
      color = COLORS.FgGreen;
      break;
    case "info":
      color = COLORS.FgBlue;
      break;
    case "error":
      color = COLORS.FgRed;
      break;
    case "warning":
      color = COLORS.FgYellow;
      break;
  }
  console.log(color, message);
}
var COLORS = {
  Reset: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Blink: "\x1B[5m",
  Reverse: "\x1B[7m",
  Hidden: "\x1B[8m",
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m",
  FgWhite: "\x1B[37m",
  BgBlack: "\x1B[40m",
  BgRed: "\x1B[41m",
  BgGreen: "\x1B[42m",
  BgYellow: "\x1B[43m",
  BgBlue: "\x1B[44m",
  BgMagenta: "\x1B[45m",
  BgCyan: "\x1B[46m",
  BgWhite: "\x1B[47m"
};

// utils/plugins/copy-content-style.ts
var __vite_injected_original_dirname = "/Users/srujangurram/Projects/personal/ChatDockX/utils/plugins";
var { resolve } = path;
var root = resolve(__vite_injected_original_dirname, "..", "..");
var contentStyle = resolve(root, "src", "pages", "content", "style.css");
var outDir = resolve(__vite_injected_original_dirname, "..", "..", "public");
function copyContentStyle() {
  return {
    name: "make-manifest",
    buildEnd() {
      fs.copyFileSync(contentStyle, resolve(outDir, "contentStyle.css"));
      colorLog("contentStyle copied", "success");
    }
  };
}

// utils/plugins/make-manifest.ts
import * as fs2 from "fs";
import * as path2 from "path";

// package.json
var package_default = {
  name: "chat-dock-x",
  displayName: "ChatDock X",
  version: "0.0.1",
  description: "A simple chrome extension for interacting with chatgpt with in your confort",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/Royal-lobster/ChatDockX.git"
  },
  scripts: {
    build: "vite build",
    dev: "nodemon"
  },
  type: "module",
  dependencies: {
    "@radix-ui/react-portal": "^1.0.2",
    "better-sse": "^0.8.0",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.8.0",
    "react-textarea-autosize": "^8.4.1",
    sse: "github:mpetazzoni/sse.js",
    "webextension-polyfill": "^0.10.0"
  },
  devDependencies: {
    "@types/chrome": "^0.0.227",
    "@types/node": "^18.11.18",
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@types/webextension-polyfill": "^0.10.0",
    "@typescript-eslint/eslint-plugin": "^5.49.0",
    "@typescript-eslint/parser": "^5.49.0",
    "@vitejs/plugin-react-swc": "^3.0.1",
    autoprefixer: "^10.4.13",
    eslint: "^8.32.0",
    "eslint-config-prettier": "^8.6.0",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-react": "^7.32.1",
    "eslint-plugin-react-hooks": "^4.3.0",
    "fs-extra": "^11.1.0",
    nodemon: "^2.0.20",
    postcss: "^8.4.21",
    tailwindcss: "^3.2.4",
    "ts-node": "^10.9.1",
    typescript: "^4.9.4",
    vite: "^4.0.4"
  }
};

// src/manifest.ts
var manifest = {
  manifest_version: 3,
  name: package_default.displayName,
  version: package_default.version,
  description: package_default.description,
  permissions: ["storage"],
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module"
  },
  icons: {
    "128": "icon-128.png"
  },
  commands: {
    "open-sidebar": {
      suggested_key: {
        default: "Ctrl+B"
      },
      description: "Open the sidebar"
    }
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["contentStyle.css"]
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["contentStyle.css", "icon-128.png", "icon-34.png"],
      matches: []
    }
  ]
};
var manifest_default = manifest;

// utils/plugins/make-manifest.ts
var __vite_injected_original_dirname2 = "/Users/srujangurram/Projects/personal/ChatDockX/utils/plugins";
var { resolve: resolve2 } = path2;
var outDir2 = resolve2(__vite_injected_original_dirname2, "..", "..", "public");
var distDir = resolve2(__vite_injected_original_dirname2, "..", "..", "dist");
function makeManifest() {
  return {
    name: "make-manifest",
    buildEnd() {
      if (!fs2.existsSync(outDir2)) {
        fs2.mkdirSync(outDir2);
      }
      const styles = [];
      if (fs2.existsSync(resolve2(distDir, "assets"))) {
        const assets = fs2.readdirSync(resolve2(distDir, "assets"));
        const css = assets.filter((asset) => asset.endsWith(".css")).map((asset) => `assets/${asset}`);
        styles.push(...css);
      }
      console.log("STULE", styles);
      const modifiedManifest = {
        ...manifest_default,
        content_scripts: [
          {
            ...manifest_default.content_scripts ? manifest_default.content_scripts[0] : [],
            css: [
              ...manifest_default.content_scripts && manifest_default.content_scripts[0] && manifest_default.content_scripts[0].css || [],
              ...styles
            ]
          }
        ]
      };
      const manifestPath = resolve2(outDir2, "manifest.json");
      fs2.writeFileSync(manifestPath, JSON.stringify(modifiedManifest, null, 2));
      colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
    }
  };
}

// vite.config.ts
var __vite_injected_original_dirname3 = "/Users/srujangurram/Projects/personal/ChatDockX";
var root2 = resolve3(__vite_injected_original_dirname3, "src");
var pagesDir = resolve3(root2, "pages");
var assetsDir = resolve3(root2, "assets");
var outDir3 = resolve3(__vite_injected_original_dirname3, "dist");
var publicDir = resolve3(__vite_injected_original_dirname3, "public");
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root2,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [react(), makeManifest(), copyContentStyle()],
  publicDir,
  build: {
    outDir: outDir3,
    sourcemap: process.env.__DEV__ === "true",
    rollupOptions: {
      input: {
        content: resolve3(pagesDir, "content", "index.tsx"),
        background: resolve3(pagesDir, "background", "index.ts")
      },
      output: {
        entryFileNames: (chunk) => `src/pages/${chunk.name}/index.js`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9jb3B5LWNvbnRlbnQtc3R5bGUudHMiLCAidXRpbHMvbG9nLnRzIiwgInV0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdC50cyIsICJwYWNrYWdlLmpzb24iLCAic3JjL21hbmlmZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3NydWphbmd1cnJhbS9Qcm9qZWN0cy9wZXJzb25hbC9DaGF0RG9ja1hcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBjb3B5Q29udGVudFN0eWxlIGZyb20gXCIuL3V0aWxzL3BsdWdpbnMvY29weS1jb250ZW50LXN0eWxlXCI7XG5pbXBvcnQgbWFrZU1hbmlmZXN0IGZyb20gXCIuL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdFwiO1xuXG5jb25zdCByb290ID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpO1xuY29uc3QgcGFnZXNEaXIgPSByZXNvbHZlKHJvb3QsIFwicGFnZXNcIik7XG5jb25zdCBhc3NldHNEaXIgPSByZXNvbHZlKHJvb3QsIFwiYXNzZXRzXCIpO1xuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwiZGlzdFwiKTtcbmNvbnN0IHB1YmxpY0RpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcInB1YmxpY1wiKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBzcmNcIjogcm9vdCxcbiAgICAgIFwiQGFzc2V0c1wiOiBhc3NldHNEaXIsXG4gICAgICBcIkBwYWdlc1wiOiBwYWdlc0RpcixcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKSwgbWFrZU1hbmlmZXN0KCksIGNvcHlDb250ZW50U3R5bGUoKV0sXG4gIHB1YmxpY0RpcixcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXIsXG4gICAgc291cmNlbWFwOiBwcm9jZXNzLmVudi5fX0RFVl9fID09PSBcInRydWVcIixcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDoge1xuICAgICAgICBjb250ZW50OiByZXNvbHZlKHBhZ2VzRGlyLCBcImNvbnRlbnRcIiwgXCJpbmRleC50c3hcIiksXG4gICAgICAgIGJhY2tncm91bmQ6IHJlc29sdmUocGFnZXNEaXIsIFwiYmFja2dyb3VuZFwiLCBcImluZGV4LnRzXCIpLFxuICAgICAgfSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogKGNodW5rKSA9PiBgc3JjL3BhZ2VzLyR7Y2h1bmsubmFtZX0vaW5kZXguanNgLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3V0aWxzL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3V0aWxzL3BsdWdpbnMvY29weS1jb250ZW50LXN0eWxlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3V0aWxzL3BsdWdpbnMvY29weS1jb250ZW50LXN0eWxlLnRzXCI7aW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBjb2xvckxvZyBmcm9tICcuLi9sb2cnO1xuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSc7XG5cbmNvbnN0IHsgcmVzb2x2ZSB9ID0gcGF0aDtcblxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnLi4nKTtcbmNvbnN0IGNvbnRlbnRTdHlsZSA9IHJlc29sdmUocm9vdCwgJ3NyYycsICdwYWdlcycsICdjb250ZW50JywgJ3N0eWxlLmNzcycpO1xuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICdwdWJsaWMnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29weUNvbnRlbnRTdHlsZSgpOiBQbHVnaW5PcHRpb24ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdtYWtlLW1hbmlmZXN0JyxcbiAgICBidWlsZEVuZCgpIHtcbiAgICAgIGZzLmNvcHlGaWxlU3luYyhjb250ZW50U3R5bGUsIHJlc29sdmUob3V0RGlyLCAnY29udGVudFN0eWxlLmNzcycpKTtcblxuICAgICAgY29sb3JMb2coJ2NvbnRlbnRTdHlsZSBjb3BpZWQnLCAnc3VjY2VzcycpO1xuICAgIH0sXG4gIH07XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc3J1amFuZ3VycmFtL1Byb2plY3RzL3BlcnNvbmFsL0NoYXREb2NrWC91dGlscy9sb2cudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3NydWphbmd1cnJhbS9Qcm9qZWN0cy9wZXJzb25hbC9DaGF0RG9ja1gvdXRpbHMvbG9nLnRzXCI7dHlwZSBDb2xvclR5cGUgPSAnc3VjY2VzcycgfCAnaW5mbycgfCAnZXJyb3InIHwgJ3dhcm5pbmcnIHwga2V5b2YgdHlwZW9mIENPTE9SUztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sb3JMb2cobWVzc2FnZTogc3RyaW5nLCB0eXBlPzogQ29sb3JUeXBlKSB7XG4gIGxldCBjb2xvcjogc3RyaW5nID0gdHlwZSB8fCBDT0xPUlMuRmdCbGFjaztcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnR3JlZW47XG4gICAgICBicmVhaztcbiAgICBjYXNlICdpbmZvJzpcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnQmx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnUmVkO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnd2FybmluZyc6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ1llbGxvdztcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgY29uc29sZS5sb2coY29sb3IsIG1lc3NhZ2UpO1xufVxuXG5jb25zdCBDT0xPUlMgPSB7XG4gIFJlc2V0OiAnXFx4MWJbMG0nLFxuICBCcmlnaHQ6ICdcXHgxYlsxbScsXG4gIERpbTogJ1xceDFiWzJtJyxcbiAgVW5kZXJzY29yZTogJ1xceDFiWzRtJyxcbiAgQmxpbms6ICdcXHgxYls1bScsXG4gIFJldmVyc2U6ICdcXHgxYls3bScsXG4gIEhpZGRlbjogJ1xceDFiWzhtJyxcbiAgRmdCbGFjazogJ1xceDFiWzMwbScsXG4gIEZnUmVkOiAnXFx4MWJbMzFtJyxcbiAgRmdHcmVlbjogJ1xceDFiWzMybScsXG4gIEZnWWVsbG93OiAnXFx4MWJbMzNtJyxcbiAgRmdCbHVlOiAnXFx4MWJbMzRtJyxcbiAgRmdNYWdlbnRhOiAnXFx4MWJbMzVtJyxcbiAgRmdDeWFuOiAnXFx4MWJbMzZtJyxcbiAgRmdXaGl0ZTogJ1xceDFiWzM3bScsXG4gIEJnQmxhY2s6ICdcXHgxYls0MG0nLFxuICBCZ1JlZDogJ1xceDFiWzQxbScsXG4gIEJnR3JlZW46ICdcXHgxYls0Mm0nLFxuICBCZ1llbGxvdzogJ1xceDFiWzQzbScsXG4gIEJnQmx1ZTogJ1xceDFiWzQ0bScsXG4gIEJnTWFnZW50YTogJ1xceDFiWzQ1bScsXG4gIEJnQ3lhbjogJ1xceDFiWzQ2bScsXG4gIEJnV2hpdGU6ICdcXHgxYls0N20nLFxufSBhcyBjb25zdDtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3NydWphbmd1cnJhbS9Qcm9qZWN0cy9wZXJzb25hbC9DaGF0RG9ja1gvdXRpbHMvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NydWphbmd1cnJhbS9Qcm9qZWN0cy9wZXJzb25hbC9DaGF0RG9ja1gvdXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdC50c1wiO2ltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGNvbG9yTG9nIGZyb20gXCIuLi9sb2dcIjtcbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi4vLi4vc3JjL21hbmlmZXN0XCI7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuXG5jb25zdCB7IHJlc29sdmUgfSA9IHBhdGg7XG5cbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcIi4uXCIsIFwiLi5cIiwgXCJwdWJsaWNcIik7XG5jb25zdCBkaXN0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi5cIiwgXCIuLlwiLCBcImRpc3RcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VNYW5pZmVzdCgpOiBQbHVnaW5PcHRpb24ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwibWFrZS1tYW5pZmVzdFwiLFxuICAgIGJ1aWxkRW5kKCkge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKG91dERpcikpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKG91dERpcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN0eWxlcyA9IFtdO1xuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocmVzb2x2ZShkaXN0RGlyLCBcImFzc2V0c1wiKSkpIHtcbiAgICAgICAgY29uc3QgYXNzZXRzID0gZnMucmVhZGRpclN5bmMocmVzb2x2ZShkaXN0RGlyLCBcImFzc2V0c1wiKSk7XG4gICAgICAgIGNvbnN0IGNzcyA9IGFzc2V0c1xuICAgICAgICAgIC5maWx0ZXIoKGFzc2V0KSA9PiBhc3NldC5lbmRzV2l0aChcIi5jc3NcIikpXG4gICAgICAgICAgLm1hcCgoYXNzZXQpID0+IGBhc3NldHMvJHthc3NldH1gKTtcbiAgICAgICAgc3R5bGVzLnB1c2goLi4uY3NzKTtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coXCJTVFVMRVwiLCBzdHlsZXMpO1xuXG4gICAgICBjb25zdCBtb2RpZmllZE1hbmlmZXN0ID0ge1xuICAgICAgICAuLi5tYW5pZmVzdCxcbiAgICAgICAgY29udGVudF9zY3JpcHRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgLi4uKG1hbmlmZXN0LmNvbnRlbnRfc2NyaXB0cyA/IG1hbmlmZXN0LmNvbnRlbnRfc2NyaXB0c1swXSA6IFtdKSxcbiAgICAgICAgICAgIGNzczogW1xuICAgICAgICAgICAgICAuLi4oKG1hbmlmZXN0LmNvbnRlbnRfc2NyaXB0cyAmJlxuICAgICAgICAgICAgICAgIG1hbmlmZXN0LmNvbnRlbnRfc2NyaXB0c1swXSAmJlxuICAgICAgICAgICAgICAgIG1hbmlmZXN0LmNvbnRlbnRfc2NyaXB0c1swXS5jc3MpIHx8XG4gICAgICAgICAgICAgICAgW10pLFxuICAgICAgICAgICAgICAuLi5zdHlsZXMsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBtYW5pZmVzdFBhdGggPSByZXNvbHZlKG91dERpciwgXCJtYW5pZmVzdC5qc29uXCIpO1xuXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKG1hbmlmZXN0UGF0aCwgSlNPTi5zdHJpbmdpZnkobW9kaWZpZWRNYW5pZmVzdCwgbnVsbCwgMikpO1xuXG4gICAgICBjb2xvckxvZyhgTWFuaWZlc3QgZmlsZSBjb3B5IGNvbXBsZXRlOiAke21hbmlmZXN0UGF0aH1gLCBcInN1Y2Nlc3NcIik7XG4gICAgfSxcbiAgfTtcbn1cbiIsICJ7XG4gIFwibmFtZVwiOiBcImNoYXQtZG9jay14XCIsXG4gIFwiZGlzcGxheU5hbWVcIjogXCJDaGF0RG9jayBYXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIHNpbXBsZSBjaHJvbWUgZXh0ZW5zaW9uIGZvciBpbnRlcmFjdGluZyB3aXRoIGNoYXRncHQgd2l0aCBpbiB5b3VyIGNvbmZvcnRcIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vUm95YWwtbG9ic3Rlci9DaGF0RG9ja1guZ2l0XCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwidml0ZSBidWlsZFwiLFxuICAgIFwiZGV2XCI6IFwibm9kZW1vblwiXG4gIH0sXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtcG9ydGFsXCI6IFwiXjEuMC4yXCIsXG4gICAgXCJiZXR0ZXItc3NlXCI6IFwiXjAuOC4wXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWljb25zXCI6IFwiXjQuOC4wXCIsXG4gICAgXCJyZWFjdC10ZXh0YXJlYS1hdXRvc2l6ZVwiOiBcIl44LjQuMVwiLFxuICAgIFwic3NlXCI6IFwiZ2l0aHViOm1wZXRhenpvbmkvc3NlLmpzXCIsXG4gICAgXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIjogXCJeMC4xMC4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHR5cGVzL2Nocm9tZVwiOiBcIl4wLjAuMjI3XCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4xOC4xMS4xOFwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjAuMjdcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMC4xMFwiLFxuICAgIFwiQHR5cGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEwLjBcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjUuNDkuMFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl41LjQ5LjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiOiBcIl4zLjAuMVwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTNcIixcbiAgICBcImVzbGludFwiOiBcIl44LjMyLjBcIixcbiAgICBcImVzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeOC42LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4taW1wb3J0XCI6IFwiXjIuMjcuNVwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1qc3gtYTExeVwiOiBcIl42LjcuMVwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdFwiOiBcIl43LjMyLjFcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtaG9va3NcIjogXCJeNC4zLjBcIixcbiAgICBcImZzLWV4dHJhXCI6IFwiXjExLjEuMFwiLFxuICAgIFwibm9kZW1vblwiOiBcIl4yLjAuMjBcIixcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjIxXCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjIuNFwiLFxuICAgIFwidHMtbm9kZVwiOiBcIl4xMC45LjFcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNC45LjRcIixcbiAgICBcInZpdGVcIjogXCJeNC4wLjRcIlxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3NyY1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NydWphbmd1cnJhbS9Qcm9qZWN0cy9wZXJzb25hbC9DaGF0RG9ja1gvc3JjL21hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3NyYy9tYW5pZmVzdC50c1wiO2ltcG9ydCB0eXBlIHsgTWFuaWZlc3QgfSBmcm9tIFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI7XG5pbXBvcnQgcGtnIGZyb20gXCIuLi9wYWNrYWdlLmpzb25cIjtcblxuY29uc3QgbWFuaWZlc3Q6IE1hbmlmZXN0LldlYkV4dGVuc2lvbk1hbmlmZXN0ID0ge1xuICBtYW5pZmVzdF92ZXJzaW9uOiAzLFxuICBuYW1lOiBwa2cuZGlzcGxheU5hbWUsXG4gIHZlcnNpb246IHBrZy52ZXJzaW9uLFxuICBkZXNjcmlwdGlvbjogcGtnLmRlc2NyaXB0aW9uLFxuICBwZXJtaXNzaW9uczogW1wic3RvcmFnZVwiXSxcbiAgYmFja2dyb3VuZDoge1xuICAgIHNlcnZpY2Vfd29ya2VyOiBcInNyYy9wYWdlcy9iYWNrZ3JvdW5kL2luZGV4LmpzXCIsXG4gICAgdHlwZTogXCJtb2R1bGVcIixcbiAgfSxcbiAgaWNvbnM6IHtcbiAgICBcIjEyOFwiOiBcImljb24tMTI4LnBuZ1wiLFxuICB9LFxuICBjb21tYW5kczoge1xuICAgIFwib3Blbi1zaWRlYmFyXCI6IHtcbiAgICAgIHN1Z2dlc3RlZF9rZXk6IHtcbiAgICAgICAgZGVmYXVsdDogXCJDdHJsK0JcIixcbiAgICAgIH0sXG4gICAgICBkZXNjcmlwdGlvbjogXCJPcGVuIHRoZSBzaWRlYmFyXCIsXG4gICAgfSxcbiAgfSxcbiAgY29udGVudF9zY3JpcHRzOiBbXG4gICAge1xuICAgICAgbWF0Y2hlczogW1wiaHR0cDovLyovKlwiLCBcImh0dHBzOi8vKi8qXCIsIFwiPGFsbF91cmxzPlwiXSxcbiAgICAgIGpzOiBbXCJzcmMvcGFnZXMvY29udGVudC9pbmRleC5qc1wiXSxcbiAgICAgIGNzczogW1wiY29udGVudFN0eWxlLmNzc1wiXSxcbiAgICB9LFxuICBdLFxuICBkZXZ0b29sc19wYWdlOiBcInNyYy9wYWdlcy9kZXZ0b29scy9pbmRleC5odG1sXCIsXG4gIHdlYl9hY2Nlc3NpYmxlX3Jlc291cmNlczogW1xuICAgIHtcbiAgICAgIHJlc291cmNlczogW1wiY29udGVudFN0eWxlLmNzc1wiLCBcImljb24tMTI4LnBuZ1wiLCBcImljb24tMzQucG5nXCJdLFxuICAgICAgbWF0Y2hlczogW10sXG4gICAgfSxcbiAgXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1hbmlmZXN0O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErVCxPQUFPLFdBQVc7QUFDalYsU0FBUyxXQUFBQSxnQkFBZTtBQUN4QixTQUFTLG9CQUFvQjs7O0FDRjBWLFlBQVksUUFBUTtBQUMzWSxZQUFZLFVBQVU7OztBQ0NQLFNBQVIsU0FBMEIsU0FBaUIsTUFBa0I7QUFDbEUsTUFBSSxRQUFnQixRQUFRLE9BQU87QUFFbkMsVUFBUSxNQUFNO0FBQUEsSUFDWixLQUFLO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxJQUNGLEtBQUs7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLElBQ0YsS0FBSztBQUNILGNBQVEsT0FBTztBQUNmO0FBQUEsSUFDRixLQUFLO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxFQUNKO0FBRUEsVUFBUSxJQUFJLE9BQU8sT0FBTztBQUM1QjtBQUVBLElBQU0sU0FBUztBQUFBLEVBQ2IsT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBQ1IsS0FBSztBQUFBLEVBQ0wsWUFBWTtBQUFBLEVBQ1osT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBQ1QsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUFBLEVBQ1QsT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBQ1QsVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUFBLEVBQ1QsU0FBUztBQUFBLEVBQ1QsT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBQ1QsVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUNYOzs7QUQvQ0EsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTSxFQUFFLFFBQVEsSUFBSTtBQUVwQixJQUFNLE9BQU8sUUFBUSxrQ0FBVyxNQUFNLElBQUk7QUFDMUMsSUFBTSxlQUFlLFFB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SUFBTUcsVUFBU0YsU0FBUUMsbUNBQVcsTUFBTTtBQUN4QyxJQUFNLFlBQVlELFNBQVFDLG1DQUFXLFFBQVE7QUFFN0MsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsUUFBUUY7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxhQUFhLEdBQUcsaUJBQWlCLENBQUM7QUFBQSxFQUNyRDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBQUc7QUFBQSxJQUNBLFdBQVcsUUFBUSxJQUFJLFlBQVk7QUFBQSxJQUNuQyxlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxTQUFTRixTQUFRLFVBQVUsV0FBVyxXQUFXO0FBQUEsUUFDakQsWUFBWUEsU0FBUSxVQUFVLGNBQWMsVUFBVTtBQUFBLE1BQ3hEO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0IsQ0FBQyxVQUFVLGFBQWEsTUFBTTtBQUFBLE1BQ2hEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJyZXNvbHZlIiwgImZzIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicmVzb2x2ZSIsICJwYXRoIiwgIm91dERpciIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJyb290IiwgInJlc29sdmUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAib3V0RGlyIl0KfQo=
