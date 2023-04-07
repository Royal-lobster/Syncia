import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { GiMagicBroom } from "react-icons/gi";
import { IoSend } from "react-icons/io5";
import { HiHand } from "react-icons/hi";
import { ChatMessageParams, ChatRole } from "../../../../hooks/useOpenAI";

interface SidebarInputProps {
	loading: boolean;
	submitMessage: (messages: ChatMessageParams[]) => void;
	clearMessages: () => void;
	chatIsEmpty: boolean;
	cancelRequest: () => void;
}

export function SidebarInput({
	loading,
	submitMessage,
	clearMessages,
	chatIsEmpty,
	cancelRequest,
}: SidebarInputProps) {
	const [text, setText] = useState("");
	const [delayedLoading, setDelayedLoading] = useState(false);

	useEffect(() => {
		const handleLoadingTimeout = setTimeout(() => {
			setDelayedLoading(loading);
		}, 2000);
		return () => {
			clearTimeout(handleLoadingTimeout);
		};
	}, [loading]);

	const handleSubmit = () => {
		submitMessage([{ content: text, role: ChatRole.USER }]);
		setText("");
	};

	return (
		<div className="ChatDockX-fixed ChatDockX-bottom-0 ChatDockX-left-0 ChatDockX-right-0 ChatDockX-flex ChatDockX-flex-col ">
			<div className="ChatDockX-flex ChatDockX-items-center ChatDockX-justify-between">
				{!chatIsEmpty && (
					<button
						onClick={clearMessages}
						className="ChatDockX-rounded-full ChatDockX-h-10 ChatDockX-w-10 ChatDockX-grid ChatDockX-place-items-center ChatDockX-text-center ChatDockX-bg-blue-500 hover:ChatDockX-bg-blue-700 ChatDockX-text-white ChatDockX-font-bold ChatDockX-m-2"
					>
						<GiMagicBroom size={18} className="mx-auto" />
					</button>
				)}
			</div>

			<div className="ChatDockX-m-2 ChatDockX-rounded-md ChatDockX-border dark:ChatDockX-border-neutral-800 ChatDockX-border-neutral-300 dark:ChatDockX-bg-neutral-900/90 ChatDockX-bg-neutral-200/95 focus:ChatDockX-outline-none focus:ChatDockX-ring-2 focus:ChatDockX-ring-blue-900 focus:ChatDockX-ring-opacity-50">
				<TextareaAutosize
					minRows={2}
					maxLength={10000}
					placeholder="Type your message here..."
					value={text}
					disabled={loading}
					className="ChatDockX-p-3 ChatDockX-w-full ChatDockX-text-sm ChatDockX-resize-none ChatDockX-max-h-96 ChatDockX-pb-0 ChatDockX-bg-transparent !ChatDockX-border-none focus:!ChatDockX-outline-none"
					onChange={(e) => {
						e.preventDefault();
						setText(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							handleSubmit();
						}
					}}
				/>
				<div className="ChatDockX-flex ChatDockX-justify-between ChatDockX-items-center ChatDockX-p-3">
					<div>
						<span className="ChatDockX-text-xs ChatDockX-font-semibold ChatDockX-text-neutral-500 dark:ChatDockX-text-neutral-200">
							{text.length} / 10,000
						</span>
					</div>
					{!delayedLoading ? (
						<button
							disabled={loading}
							onClick={handleSubmit}
							className="ChatDockX-flex ChatDockX-gap-2 disabled:ChatDockX-bg-slate-500 disabled:ChatDockX-text-slate-400 ChatDockX-items-center ChatDockX-bg-blue-500 hover:ChatDockX-bg-blue-700 ChatDockX-text-white ChatDockX-font-bold ChatDockX-py-2 ChatDockX-px-4 ChatDockX-rounded"
						>
							<span>Send</span> <IoSend size={10} />
						</button>
					) : (
						<button
							onClick={cancelRequest}
							className="ChatDockX-flex ChatDockX-gap-2 disabled:ChatDockX-bg-slate-500 disabled:ChatDockX-text-slate-400 ChatDockX-items-center ChatDockX-bg-red-500 hover:ChatDockX-bg-red-700 ChatDockX-text-white ChatDockX-font-bold ChatDockX-py-2 ChatDockX-px-4 ChatDockX-rounded"
						>
							<HiHand size={18} /> <span>Stop</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
