import { t } from "../trpc";
import { getStoredPrompts } from "../../../lib/getStoredPrompts";
import type { Prompt } from "../../../hooks/usePrompts";

export const contextMenuProcedures = {
	createContextMenu: t.procedure.mutation(async () => {
		const prompts = await getStoredPrompts();
		const contextMenuItems = [];

		const createChildContextMenu = (prompts: Prompt[], parentId?: string) => {
			for (const prompt of prompts) {
				contextMenuItems.push({
					id: prompt.id,
					title: prompt.name,
					contexts: ["selection"],
					parentId,
				});
				if (prompt.children) createChildContextMenu(prompt.children, prompt.id);
			}
		};
		createChildContextMenu(prompts);

		contextMenuItems.push(
			{
				id: "separator",
				type: "separator",
				contexts: ["selection"],
			},
			{
				id: "settings",
				title: "Settings",
				contexts: ["selection"],
			},
		);

		await browser.contextMenus.removeAll();

		for (const item of contextMenuItems) {
			browser.contextMenus.create(item);
		}
	}),

	handleContextMenuClick: t.procedure
		.input(
			t.object({
				menuItemId: t.string(),
				selectionText: t.string().optional(),
				tabId: t.number().optional(),
			}),
		)
		.mutation(async ({ input }) => {
			if (input.menuItemId === "settings") {
				await browser.tabs.create({
					url: browser.runtime.getURL("/src/pages/settings/index.html"),
				});
			} else if (input.tabId) {
				await browser.tabs.sendMessage(input.tabId, {
					action: "forward-context-menu-click",
					payload: {
						selectedText: input.selectionText,
						id: input.menuItemId,
					},
				});
			}
		}),
};
