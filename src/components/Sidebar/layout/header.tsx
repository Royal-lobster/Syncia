import { HiX } from "react-icons/hi";

const Header = () => {
	const onToggle = () => {
		chrome.runtime.sendMessage({ action: "close-sidebar" });
	};

	return (
		<div className="ChatDockX-flex ChatDockX-justify-between ChatDockX-p-3.5 ChatDockX-border-b dark:ChatDockX-border-neutral-800 ChatDockX-border-neutral-200">
			<h1 className="ChatDockX-text-2xl ChatDockX-m-0 ChatDockX-p-0">
				ChatDock{" "}
				<span className="dark:ChatDockX-text-blue-300 ChatDockX-text-blue-500">
					X
				</span>
			</h1>
			<button className="ChatDockX-text-xl" onClick={onToggle}>
				<HiX />
			</button>
		</div>
	);
};

export default Header;
