import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import CodeBlock from './markdown-components/CodeBlock'
import remarkGfm from 'remark-gfm'
import { useEffect, useRef } from 'react'
import { ChatMessage, ChatRole } from '../../../hooks/useOpenAI'
import { Table } from './markdown-components/Table'
import remarkBreaks from 'remark-breaks'
import rehypeRaw from 'rehype-raw'

interface ChatListProps {
  messages: ChatMessage[]
}

const ChatList = ({ messages }: ChatListProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  const filteredMsgs = messages.filter((msg) => msg.role !== ChatRole.SYSTEM)

  console.log(messages)

  return (
    <div
      ref={containerRef}
      className="cdx-h-[calc(100vh-200px)] cdx-text-sm cdx-overflow-y-auto cdx-pb-12 cdx-break-words"
    >
      {filteredMsgs.length < 1 ? (
        <div className="cdx-mt-10 cdx-text-center">
          <img
            alt="robot"
            src="/images/robot.png"
            className="cdx-mx-auto"
            height={300}
            width={300}
          />
          <h1 className="cdx-text-xl cdx-text-gray-400">
            Start a new conversation ✨
          </h1>
          <p className="cdx-text-gray-400 cdx-mt-1 cdx-leading-tight cdx-font-light">
            Type your message at the bottom <br /> and press send button
          </p>
        </div>
      ) : (
        filteredMsgs
          .filter((msg) => msg.role !== ChatRole.SYSTEM)
          .map((msg) => (
            <div
              data-user={msg.role === ChatRole.USER || undefined}
              className="markdown cdx-p-4 data-[user]:cdx-border-l-2 cdx-border-blue-400 data-[user]:cdx-bg-black/5 data-[user]:dark:cdx-bg-neutral-900/50 cdx-max-w-[400px]"
              key={msg.timestamp}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
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
  )
}

export default ChatList
