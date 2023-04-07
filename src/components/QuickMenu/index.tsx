import React from "react";
import HighlightMenu from "react-highlight-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const QuickMenu = () => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button type="button" className="cdx-p-2 cdx-bg-neutral-50">
					ChatDock X
				</button>
			</DropdownMenu.Trigger>
		</DropdownMenu.Root>
	);
};
