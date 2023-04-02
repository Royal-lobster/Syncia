import { ChatMessage, ChatRole } from "@src/hooks/useOpenAI";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import CodeBlock from "./markdown-components/CodeBlock";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";

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
      className="h-[calc(100vh-200px)] text-base overflow-y-auto break-words"
    >
      {filteredMsgs.length < 1 ? (
        <div className="mt-10 text-center text-xl text-gray-400">
          Start a new conversation ✨
        </div>
      ) : (
        filteredMsgs
          .filter((msg) => msg.role !== ChatRole.SYSTEM)
          .map((msg, i) => (
            <div
              data-user={msg.role === ChatRole.USER || undefined}
              className="p-4 data-[user]:border-l-4 border-blue-400 data-[user]:bg-black/10 data-[user]:dark:bg-slate-800/95 max-w-[400px]"
              key={i}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: CodeBlock,
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
