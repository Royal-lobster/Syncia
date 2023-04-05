import { HiX } from "react-icons/hi";

const Header = () => {
	const onToggle = () => {
		chrome.runtime.sendMessage({ action: "close-sidebar" });
	};

	return (
		<div className="flex justify-between p-3.5 border-b dark:border-neutral-800 border-neutral-200">
			<h1 className="text-2xl m-0 p-0">
				ChatDock <span className="dark:text-blue-300 text-blue-500">X</span>
			</h1>
			<button className="text-xl" onClick={onToggle}>
				<HiX />
			</button>
		</div>
	);
};

export default Header;
