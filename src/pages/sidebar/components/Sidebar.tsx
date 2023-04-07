import { useOpenAIKey } from "../../../hooks/useOpenAIKey";
import Auth from "./auth";
import Chat from "./chat";
import Header from "./layout/header";
import "../../../index.css";

function Sidebar() {
	const [openAiKey] = useOpenAIKey();
	return (
		<div className="ChatDockX-flex ChatDockX-backdrop-blur-sm ChatDockX-flex-col ChatDockX-min-h-screen ChatDockX-shadow-md ChatDockX-border-l dark:!ChatDockX-text-white dark:ChatDockX-border-neutral-800 ChatDockX-border-neutral-200 ChatDockX-top-0 ChatDockX-right-0 ChatDockX-w-[400px] ChatDockX-h-full dark:ChatDockX-bg-neutral-950/90 ChatDockX-bg-neutral-100/95">
			<Header />
			{openAiKey ? <Chat apiKey={openAiKey} /> : <Auth />}
		</div>
	);
}

export default Sidebar;
