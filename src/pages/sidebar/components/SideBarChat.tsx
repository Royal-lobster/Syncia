import { ChatMessage, ChatRole } from "@src/hooks/useOpenAI";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import CodeBlock from "./CodeBlock";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";

interface SideBarChatProps {
  messages: ChatMessage[];
}

const SideBarChat = ({ messages }: SideBarChatProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-200px)] text-base overflow-y-auto"
    >
      {messages.length < 1 ? (
        <div className="mt-10 text-center text-2xl">
          Start a new conversation ✨
        </div>
      ) : (
        messages.map((msg, i) => (
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

export default SideBarChat;
