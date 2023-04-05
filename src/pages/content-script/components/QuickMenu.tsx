import React from "react";
import HighlightMenu from "react-highlight-menu";

export const QuickMenu = () => {
	return (
		<HighlightMenu
			target=".ChatDockX_Body"
			menu={({ selectedText, setClipboard, setMenuOpen }) => (
				<button type="button">hello</button>
			)}
		/>
	);
};
