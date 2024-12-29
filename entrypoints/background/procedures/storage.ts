import { t } from "../trpc";

export const storageProcedures = {
	handleStorageChange: t.procedure.mutation(async () => {
		console.log("📝 Storage changed");
		const router = appRouter.createCaller({});
		await router.createContextMenu();
	}),
};
