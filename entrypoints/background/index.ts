import { createChromeHandler } from "trpc-chrome/adapter";
import { backgroundLog } from "../../logs";
import { t } from "./trpc";
import { sidebarProcedures } from "./procedures/sidebar";
import { contextMenuProcedures } from "./procedures/contextMenu";
import { storageProcedures } from "./procedures/storage";

const appRouter = t.router({
	...sidebarProcedures,
	...contextMenuProcedures,
	...storageProcedures,
});

export type AppRouter = typeof appRouter;

export default defineBackground({
	main() {
		backgroundLog();

		createChromeHandler({ router: appRouter });
		const router = appRouter.createCaller({});

		// Initial setup
		router.createContextMenu();

		// Event listeners
		browser.contextMenus.onClicked.addListener((info, tab) => {
			router.handleContextMenuClick({
				menuItemId: info.menuItemId.toString(),
				selectionText: info.selectionText,
				tabId: tab?.id,
			});
		});

		browser.storage.onChanged.addListener(() => {
			router.handleStorageChange();
		});

		browser.action.onClicked.addListener(() => {
			router.toggleSidebar();
		});

		browser.commands.onCommand.addListener((command) => {
			console.log(`🚚 [Command Received] ${command}`);
			if (command === "open-sidebar") {
				router.toggleSidebar();
			}
		});
	},
});
