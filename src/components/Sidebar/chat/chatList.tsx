import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CodeBlock from "./markdown-components/CodeBlock";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";
import { ChatMessage, ChatRole } from "../../../hooks/useOpenAI";
import { Table } from "./markdown-components/Table";

interface ChatListProps {
	messages: ChatMessage[];
}

const ChatList = ({ messages }: ChatListProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [messages]);

	const filteredMsgs = messages.filter((msg) => msg.role !== ChatRole.SYSTEM);

	return (
		<div
			ref={containerRef}
			className="ChatDockX-h-[calc(100vh-200px)] ChatDockX-text-sm ChatDockX-overflow-y-auto ChatDockX-pb-12 ChatDockX-break-words"
		>
			{filteredMsgs.length < 1 ? (
				<div className="ChatDockX-mt-10 ChatDockX-text-center">
					<img
						alt="robot"
						src="/images/robot.png"
						className="ChatDockX-mx-auto"
						height={300}
						width={300}
					/>
					<h1 className="ChatDockX-text-xl ChatDockX-text-gray-400">
						Start a new conversation ✨
					</h1>
					<p className="ChatDockX-text-gray-400 ChatDockX-mt-1 ChatDockX-leading-tight ChatDockX-font-light">
						Type your message at the bottom <br /> and press send button
					</p>
				</div>
			) : (
				filteredMsgs
					.filter((msg) => msg.role !== ChatRole.SYSTEM)
					.map((msg, i) => (
						<div
							data-user={msg.role === ChatRole.USER || undefined}
							className="markdown ChatDockX-p-4 data-[user]:ChatDockX-border-l-4 ChatDockX-border-blue-400 data-[user]:ChatDockX-bg-black/10 data-[user]:dark:ChatDockX-bg-neutral-800/95 ChatDockX-max-w-[400px]"
							key={msg.timestamp}
						>
							<ReactMarkdown
								remarkPlugins={[remarkGfm]}
								components={{
									code: CodeBlock,
									table: Table,
								}}
							>
								{msg.content}
							</ReactMarkdown>
						</div>
					))
			)}
		</div>
	);
};

export default ChatList;
