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
    "react-markdown": "^8.0.6",
    "react-syntax-highlighter": "^15.5.0",
    "react-textarea-autosize": "^8.4.1",
    "remark-gfm": "^3.0.1",
    sse: "github:mpetazzoni/sse.js",
    "webextension-polyfill": "^0.10.0"
  },
  devDependencies: {
    "@types/chrome": "^0.0.227",
    "@types/node": "^18.11.18",
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@types/react-syntax-highlighter": "^15.5.6",
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
      resources: [
        "contentStyle.css",
        "icon-128.png",
        "icon-34.png",
        "/src/pages/sidebar/index.html"
      ],
      matches: []
    }
  ]
};
var manifest_default = manifest;

// utils/plugins/make-manifest.ts
var __vite_injected_original_dirname2 = "/Users/srujangurram/Projects/personal/ChatDockX/utils/plugins";
var { resolve: resolve2 } = path2;
var outDir2 = resolve2(__vite_injected_original_dirname2, "..", "..", "public");
function makeManifest() {
  return {
    name: "make-manifest",
    buildEnd() {
      if (!fs2.existsSync(outDir2)) {
        fs2.mkdirSync(outDir2);
      }
      const manifestPath = resolve2(outDir2, "manifest.json");
      fs2.writeFileSync(manifestPath, JSON.stringify(manifest_default, null, 2));
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
        background: resolve3(pagesDir, "background", "index.ts"),
        sidebar: resolve3(pagesDir, "sidebar", "index.html")
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9jb3B5LWNvbnRlbnQtc3R5bGUudHMiLCAidXRpbHMvbG9nLnRzIiwgInV0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdC50cyIsICJwYWNrYWdlLmpzb24iLCAic3JjL21hbmlmZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3NydWphbmd1cnJhbS9Qcm9qZWN0cy9wZXJzb25hbC9DaGF0RG9ja1hcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBjb3B5Q29udGVudFN0eWxlIGZyb20gXCIuL3V0aWxzL3BsdWdpbnMvY29weS1jb250ZW50LXN0eWxlXCI7XG5pbXBvcnQgbWFrZU1hbmlmZXN0IGZyb20gXCIuL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdFwiO1xuXG5jb25zdCByb290ID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpO1xuY29uc3QgcGFnZXNEaXIgPSByZXNvbHZlKHJvb3QsIFwicGFnZXNcIik7XG5jb25zdCBhc3NldHNEaXIgPSByZXNvbHZlKHJvb3QsIFwiYXNzZXRzXCIpO1xuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwiZGlzdFwiKTtcbmNvbnN0IHB1YmxpY0RpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcInB1YmxpY1wiKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBzcmNcIjogcm9vdCxcbiAgICAgIFwiQGFzc2V0c1wiOiBhc3NldHNEaXIsXG4gICAgICBcIkBwYWdlc1wiOiBwYWdlc0RpcixcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKSwgbWFrZU1hbmlmZXN0KCksIGNvcHlDb250ZW50U3R5bGUoKV0sXG4gIHB1YmxpY0RpcixcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXIsXG4gICAgc291cmNlbWFwOiBwcm9jZXNzLmVudi5fX0RFVl9fID09PSBcInRydWVcIixcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDoge1xuICAgICAgICBjb250ZW50OiByZXNvbHZlKHBhZ2VzRGlyLCBcImNvbnRlbnRcIiwgXCJpbmRleC50c3hcIiksXG4gICAgICAgIGJhY2tncm91bmQ6IHJlc29sdmUocGFnZXNEaXIsIFwiYmFja2dyb3VuZFwiLCBcImluZGV4LnRzXCIpLFxuICAgICAgICBzaWRlYmFyOiByZXNvbHZlKHBhZ2VzRGlyLCBcInNpZGViYXJcIiwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgfSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogKGNodW5rKSA9PiBgc3JjL3BhZ2VzLyR7Y2h1bmsubmFtZX0vaW5kZXguanNgLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3V0aWxzL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3V0aWxzL3BsdWdpbnMvY29weS1jb250ZW50LXN0eWxlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3V0aWxzL3BsdWdpbnMvY29weS1jb250ZW50LXN0eWxlLnRzXCI7aW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBjb2xvckxvZyBmcm9tICcuLi9sb2cnO1xuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSc7XG5cbmNvbnN0IHsgcmVzb2x2ZSB9ID0gcGF0aDtcblxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnLi4nKTtcbmNvbnN0IGNvbnRlbnRTdHlsZSA9IHJlc29sdmUocm9vdCwgJ3NyYycsICdwYWdlcycsICdjb250ZW50JywgJ3N0eWxlLmNzcycpO1xuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICdwdWJsaWMnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29weUNvbnRlbnRTdHlsZSgpOiBQbHVnaW5PcHRpb24ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdtYWtlLW1hbmlmZXN0JyxcbiAgICBidWlsZEVuZCgpIHtcbiAgICAgIGZzLmNvcHlGaWxlU3luYyhjb250ZW50U3R5bGUsIHJlc29sdmUob3V0RGlyLCAnY29udGVudFN0eWxlLmNzcycpKTtcblxuICAgICAgY29sb3JMb2coJ2NvbnRlbnRTdHlsZSBjb3BpZWQnLCAnc3VjY2VzcycpO1xuICAgIH0sXG4gIH07XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc3J1amFuZ3VycmFtL1Byb2plY3RzL3BlcnNvbmFsL0NoYXREb2NrWC91dGlscy9sb2cudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3NydWphbmd1cnJhbS9Qcm9qZWN0cy9wZXJzb25hbC9DaGF0RG9ja1gvdXRpbHMvbG9nLnRzXCI7dHlwZSBDb2xvclR5cGUgPSAnc3VjY2VzcycgfCAnaW5mbycgfCAnZXJyb3InIHwgJ3dhcm5pbmcnIHwga2V5b2YgdHlwZW9mIENPTE9SUztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sb3JMb2cobWVzc2FnZTogc3RyaW5nLCB0eXBlPzogQ29sb3JUeXBlKSB7XG4gIGxldCBjb2xvcjogc3RyaW5nID0gdHlwZSB8fCBDT0xPUlMuRmdCbGFjaztcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnR3JlZW47XG4gICAgICBicmVhaztcbiAgICBjYXNlICdpbmZvJzpcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnQmx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnUmVkO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnd2FybmluZyc6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ1llbGxvdztcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgY29uc29sZS5sb2coY29sb3IsIG1lc3NhZ2UpO1xufVxuXG5jb25zdCBDT0xPUlMgPSB7XG4gIFJlc2V0OiAnXFx4MWJbMG0nLFxuICBCcmlnaHQ6ICdcXHgxYlsxbScsXG4gIERpbTogJ1xceDFiWzJtJyxcbiAgVW5kZXJzY29yZTogJ1xceDFiWzRtJyxcbiAgQmxpbms6ICdcXHgxYls1bScsXG4gIFJldmVyc2U6ICdcXHgxYls3bScsXG4gIEhpZGRlbjogJ1xceDFiWzhtJyxcbiAgRmdCbGFjazogJ1xceDFiWzMwbScsXG4gIEZnUmVkOiAnXFx4MWJbMzFtJyxcbiAgRmdHcmVlbjogJ1xceDFiWzMybScsXG4gIEZnWWVsbG93OiAnXFx4MWJbMzNtJyxcbiAgRmdCbHVlOiAnXFx4MWJbMzRtJyxcbiAgRmdNYWdlbnRhOiAnXFx4MWJbMzVtJyxcbiAgRmdDeWFuOiAnXFx4MWJbMzZtJyxcbiAgRmdXaGl0ZTogJ1xceDFiWzM3bScsXG4gIEJnQmxhY2s6ICdcXHgxYls0MG0nLFxuICBCZ1JlZDogJ1xceDFiWzQxbScsXG4gIEJnR3JlZW46ICdcXHgxYls0Mm0nLFxuICBCZ1llbGxvdzogJ1xceDFiWzQzbScsXG4gIEJnQmx1ZTogJ1xceDFiWzQ0bScsXG4gIEJnTWFnZW50YTogJ1xceDFiWzQ1bScsXG4gIEJnQ3lhbjogJ1xceDFiWzQ2bScsXG4gIEJnV2hpdGU6ICdcXHgxYls0N20nLFxufSBhcyBjb25zdDtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3NydWphbmd1cnJhbS9Qcm9qZWN0cy9wZXJzb25hbC9DaGF0RG9ja1gvdXRpbHMvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NydWphbmd1cnJhbS9Qcm9qZWN0cy9wZXJzb25hbC9DaGF0RG9ja1gvdXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zcnVqYW5ndXJyYW0vUHJvamVjdHMvcGVyc29uYWwvQ2hhdERvY2tYL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdC50c1wiO2ltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGNvbG9yTG9nIGZyb20gXCIuLi9sb2dcIjtcbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi4vLi4vc3JjL21hbmlmZXN0XCI7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuXG5jb25zdCB7IHJlc29sdmUgfSA9IHBhdGg7XG5cbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcIi4uXCIsIFwiLi5cIiwgXCJwdWJsaWNcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VNYW5pZmVzdCgpOiBQbHVnaW5PcHRpb24ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwibWFrZS1tYW5pZmVzdFwiLFxuICAgIGJ1aWxkRW5kKCkge1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKG91dERpcikpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKG91dERpcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hbmlmZXN0UGF0aCA9IHJlc29sdmUob3V0RGlyLCBcIm1hbmlmZXN0Lmpzb25cIik7XG5cbiAgICAgIGZzLndyaXRlRmlsZVN5bmMobWFuaWZlc3RQYXRoLCBKU09OLnN0cmluZ2lmeShtYW5pZmVzdCwgbnVsbCwgMikpO1xuXG4gICAgICBjb2xvckxvZyhgTWFuaWZlc3QgZmlsZSBjb3B5IGNvbXBsZXRlOiAke21hbmlmZXN0UGF0aH1gLCBcInN1Y2Nlc3NcIik7XG4gICAgfSxcbiAgfTtcbn1cbiIsICJ7XG4gIFwibmFtZVwiOiBcImNoYXQtZG9jay14XCIsXG4gIFwiZGlzcGxheU5hbWVcIjogXCJDaGF0RG9jayBYXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIHNpbXBsZSBjaHJvbWUgZXh0ZW5zaW9uIGZvciBpbnRlcmFjdGluZyB3aXRoIGNoYXRncHQgd2l0aCBpbiB5b3VyIGNvbmZvcnRcIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vUm95YWwtbG9ic3Rlci9DaGF0RG9ja1guZ2l0XCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwidml0ZSBidWlsZFwiLFxuICAgIFwiZGV2XCI6IFwibm9kZW1vblwiXG4gIH0sXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAcmFkaXgtdWkvcmVhY3QtcG9ydGFsXCI6IFwiXjEuMC4yXCIsXG4gICAgXCJiZXR0ZXItc3NlXCI6IFwiXjAuOC4wXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWljb25zXCI6IFwiXjQuOC4wXCIsXG4gICAgXCJyZWFjdC1tYXJrZG93blwiOiBcIl44LjAuNlwiLFxuICAgIFwicmVhY3Qtc3ludGF4LWhpZ2hsaWdodGVyXCI6IFwiXjE1LjUuMFwiLFxuICAgIFwicmVhY3QtdGV4dGFyZWEtYXV0b3NpemVcIjogXCJeOC40LjFcIixcbiAgICBcInJlbWFyay1nZm1cIjogXCJeMy4wLjFcIixcbiAgICBcInNzZVwiOiBcImdpdGh1YjptcGV0YXp6b25pL3NzZS5qc1wiLFxuICAgIFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTAuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjIyN1wiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMTguMTEuMThcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4wLjI3XCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjAuMTBcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1zeW50YXgtaGlnaGxpZ2h0ZXJcIjogXCJeMTUuNS42XCIsXG4gICAgXCJAdHlwZXMvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTAuMFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNS40OS4wXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjUuNDkuMFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI6IFwiXjMuMC4xXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xM1wiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguMzIuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl44LjYuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjogXCJeMi4yNy41XCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLWpzeC1hMTF5XCI6IFwiXjYuNy4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0XCI6IFwiXjcuMzIuMVwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl40LjMuMFwiLFxuICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMS4wXCIsXG4gICAgXCJub2RlbW9uXCI6IFwiXjIuMC4yMFwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMjFcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuMi40XCIsXG4gICAgXCJ0cy1ub2RlXCI6IFwiXjEwLjkuMVwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl40LjkuNFwiLFxuICAgIFwidml0ZVwiOiBcIl40LjAuNFwiXG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3NydWphbmd1cnJhbS9Qcm9qZWN0cy9wZXJzb25hbC9DaGF0RG9ja1gvc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc3J1amFuZ3VycmFtL1Byb2plY3RzL3BlcnNvbmFsL0NoYXREb2NrWC9zcmMvbWFuaWZlc3QudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3NydWphbmd1cnJhbS9Qcm9qZWN0cy9wZXJzb25hbC9DaGF0RG9ja1gvc3JjL21hbmlmZXN0LnRzXCI7aW1wb3J0IHR5cGUgeyBNYW5pZmVzdCB9IGZyb20gXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIjtcbmltcG9ydCBwa2cgZnJvbSBcIi4uL3BhY2thZ2UuanNvblwiO1xuXG5jb25zdCBtYW5pZmVzdDogTWFuaWZlc3QuV2ViRXh0ZW5zaW9uTWFuaWZlc3QgPSB7XG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gIG5hbWU6IHBrZy5kaXNwbGF5TmFtZSxcbiAgdmVyc2lvbjogcGtnLnZlcnNpb24sXG4gIGRlc2NyaXB0aW9uOiBwa2cuZGVzY3JpcHRpb24sXG4gIHBlcm1pc3Npb25zOiBbXCJzdG9yYWdlXCJdLFxuICBiYWNrZ3JvdW5kOiB7XG4gICAgc2VydmljZV93b3JrZXI6IFwic3JjL3BhZ2VzL2JhY2tncm91bmQvaW5kZXguanNcIixcbiAgICB0eXBlOiBcIm1vZHVsZVwiLFxuICB9LFxuICBpY29uczoge1xuICAgIFwiMTI4XCI6IFwiaWNvbi0xMjgucG5nXCIsXG4gIH0sXG4gIGNvbW1hbmRzOiB7XG4gICAgXCJvcGVuLXNpZGViYXJcIjoge1xuICAgICAgc3VnZ2VzdGVkX2tleToge1xuICAgICAgICBkZWZhdWx0OiBcIkN0cmwrQlwiLFxuICAgICAgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIk9wZW4gdGhlIHNpZGViYXJcIixcbiAgICB9LFxuICB9LFxuICBjb250ZW50X3NjcmlwdHM6IFtcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbXCJodHRwOi8vKi8qXCIsIFwiaHR0cHM6Ly8qLypcIiwgXCI8YWxsX3VybHM+XCJdLFxuICAgICAganM6IFtcInNyYy9wYWdlcy9jb250ZW50L2luZGV4LmpzXCJdLFxuICAgICAgY3NzOiBbXCJjb250ZW50U3R5bGUuY3NzXCJdLFxuICAgIH0sXG4gIF0sXG4gIGRldnRvb2xzX3BhZ2U6IFwic3JjL3BhZ2VzL2RldnRvb2xzL2luZGV4Lmh0bWxcIixcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIFwiY29udGVudFN0eWxlLmNzc1wiLFxuICAgICAgICBcImljb24tMTI4LnBuZ1wiLFxuICAgICAgICBcImljb24tMzQucG5nXCIsXG4gICAgICAgIFwiL3NyYy9wYWdlcy9zaWRlYmFyL2luZGV4Lmh0bWxcIixcbiAgICAgIF0sXG4gICAgICBtYXRjaGVzOiBbXSxcbiAgICB9LFxuICBdLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWFuaWZlc3Q7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStULE9BQU8sV0FBVztBQUNqVixTQUFTLFdBQUFBLGdCQUFlO0FBQ3hCLFNBQVMsb0JBQW9COzs7QUNGMFYsWUFBWSxRQUFRO0FBQzNZLFlBQVksVUFBVTs7O0FDQ1AsU0FBUixTQUEwQixTQUFpQixNQUFrQjtBQUNsRSxNQUFJLFFBQWdCLFFBQVEsT0FBTztBQUVuQyxVQUFRLE1BQU07QUFBQSxJQUNaLEtBQUs7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLElBQ0YsS0FBSztBQUNILGNBQVEsT0FBTztBQUNmO0FBQUEsSUFDRixLQUFLO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxJQUNGLEtBQUs7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLEVBQ0o7QUFFQSxVQUFRLElBQUksT0FBTyxPQUFPO0FBQzVCO0FBRUEsSUFBTSxTQUFTO0FBQUEsRUFDYixPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixLQUFLO0FBQUEsRUFDTCxZQUFZO0FBQUEsRUFDWixPQUFPO0FBQUEsRUFDUCxTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixT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QUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLEdBQUcsYUFBYSxHQUFHLGlCQUFpQixDQUFDO0FBQUEsRUFDckQ7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQUFHO0FBQUEsSUFDQSxXQUFXLFFBQVEsSUFBSSxZQUFZO0FBQUEsSUFDbkMsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsU0FBU0YsU0FBUSxVQUFVLFdBQVcsV0FBVztBQUFBLFFBQ2pELFlBQVlBLFNBQVEsVUFBVSxjQUFjLFVBQVU7QUFBQSxRQUN0RCxTQUFTQSxTQUFRLFVBQVUsV0FBVyxZQUFZO0FBQUEsTUFDcEQ7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQixDQUFDLFVBQVUsYUFBYSxNQUFNO0FBQUEsTUFDaEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInJlc29sdmUiLCAiZnMiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJyZXNvbHZlIiwgInBhdGgiLCAib3V0RGlyIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInJvb3QiLCAicmVzb2x2ZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJvdXREaXIiXQp9Cg==
