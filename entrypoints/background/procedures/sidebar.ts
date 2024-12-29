import { t } from "../trpc";

export const sidebarProcedures = {
	toggleSidebar: t.procedure.mutation(async () => {
		const [tab] = await browser.tabs.query({
			active: true,
			currentWindow: true,
		});
		if (tab.id) {
			await browser.tabs.sendMessage(tab.id, { action: "open-sidebar" });
		}
	}),

	getSidebarShortcut: t.procedure.query(async () => {
		const commands = await browser.commands.getAll();
		const shortcut = commands.find((c) => c.name === "open-sidebar")?.shortcut;

		const [tab] = await browser.tabs.query({
			active: true,
			currentWindow: true,
		});
		if (tab?.id) {
			browser.tabs.onUpdated.addListener(function listener(tabId, info) {
				if (info.status === "complete" && tabId === tab.id) {
					browser.tabs.sendMessage(tab.id, {
						action: "sidebar-shortcut",
						shortcut,
					});
					browser.tabs.onUpdated.removeListener(listener);
				}
			});
		}
		return shortcut;
	}),

	captureScreen: t.procedure.query(async () => {
		return await browser.tabs.captureVisibleTab();
	}),
};
