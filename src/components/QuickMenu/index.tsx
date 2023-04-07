import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface QuickMenuProps {
	selectedText: string;
	setMenuOpen: (open: boolean) => void;
}

export const QuickMenu = ({ selectedText, setMenuOpen }: QuickMenuProps) => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button
					type="button"
					className="cdx-px-3 cdx-py-2 cdx-border-none cdx-bg-neutral-50 dark:cdx-bg-neutral-800 cdx-text-neutral-950 dark:cdx-text-neutral-100"
				>
					ChatDock X
				</button>
			</DropdownMenu.Trigger>
		</DropdownMenu.Root>
	);
};
