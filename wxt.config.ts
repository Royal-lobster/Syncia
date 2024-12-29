import { defineConfig } from "wxt";
import packageJson from "./package.json";

const [major, minor, patch, label = "0"] = packageJson.version
	.replace(/[^\d.-]+/g, "")
	.split(/[.-]/);

export default defineConfig({
	manifest: ({ mode }) => ({
		name:
			mode === "staging"
				? "[INTERNAL] Syncia"
				: "Syncia - Power of ChatGPT on any website",
		description:
			"Syncia is a browser extension that allows you to use Open AI's GPT in any website.",
		version: `${major}.${minor}.${patch}.${label}`,
		version_name: packageJson.version,
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
			"16": "icon/icon-16.png",
			"32": "icon/icon-32.png",
			"48": "icon/icon-48.png",
			"128": "icon/icon-128.png",
		},
		permissions: [
			"storage",
			"unlimitedStorage",
			"contextMenus",
			"tabs",
			"activeTab",
			"clipboardWrite",
		],
		web_accessible_resources: [
			{
				resources: [
					"src/pages/sidebar/index.html",
					"images/robot.png",
					"src/pages/settings/index.html",
				],
				matches: ["http://*/*", "https://*/*"],
			},
		],
	}),
	extensionApi: "chrome",
	modules: ["@wxt-dev/module-react"],
});
