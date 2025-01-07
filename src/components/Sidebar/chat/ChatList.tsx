import { useEffect, useRef } from 'react'
import {
  RiCloseLine,
  RiErrorWarningLine,
  RiLoader4Line,
  RiFileCopyLine,
} from 'react-icons/ri'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { type ChatMessage, ChatRole } from '../../../hooks/useCurrentChat'
import FilePreviewBar from './FilePreviewBar'
import CodeBlock from './markdown-components/CodeBlock'
import { Table } from './markdown-components/Table'

interface ChatListProps {
  messages: ChatMessage[]
  removeMessagePair: (timestamp: number) => void
  generating: boolean
  error: Error | null
}

const ChatList = ({
  messages,
  removeMessagePair,
  generating,
  error,
}: ChatListProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: This is intentional, we need this for scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages]) // Add messages as a dependency

  const filteredMsgs = messages.filter((msg) => msg.role !== ChatRole.SYSTEM)

  const formatContent = (content: string) => {
    return content.replace(/(?<=\n\n)(?![*-])\n/gi, '&nbsp;\n ')
  }

  const handleCopyMessage = (content: string) => {
    window.parent.postMessage(
      {
        action: 'copy-to-clipboard',
        _payload: { content },
      },
      '*',
    )
  }

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
            height={128}
            width={128}
          />
          <h1 className="cdx-text-xl cdx-text-gray-500 dark:cdx-text-gray-400">
            Start a new conversation 🎉
          </h1>
          <p className="cdx-text-gray-500 dark:cdx-text-gray-400 cdx-mt-1 cdx-leading-tight cdx-font-light">
            Type your message at the bottom <br /> and press send button
          </p>
        </div>
      ) : (
        filteredMsgs
          .filter((msg) => msg.role !== ChatRole.SYSTEM)
          .map((msg, i) => (
            <div
              data-user={msg.role === ChatRole.USER ? 'true' : undefined}
              className="markdown cdx-group cdx-relative cdx-px-4 cdx-py-2 data-[user]:cdx-border-l-2 cdx-border-blue-400 data-[user]:cdx-bg-black/5 data-[user]:dark:cdx-bg-neutral-900/50 cdx-max-w-[400px]"
              key={`${msg.timestamp}-${i}`}
            >
              {msg.role === ChatRole.USER && (
                <button
                  type="button"
                  onClick={() => removeMessagePair(msg.timestamp)}
                  className="cdx-absolute group-hover:cdx-visible cdx-invisible cdx-right-2 cdx-top-2 cdx-p-0.5 cdx-bg-black/20 cdx-rounded"
                >
                  <RiCloseLine />
                </button>
              )}
              {msg.role === ChatRole.ASSISTANT && (
                <button
                  type="button"
                  onClick={() => handleCopyMessage(formatContent(msg.content))}
                  className="cdx-absolute group-hover:cdx-visible cdx-invisible cdx-right-2 cdx-top-2 cdx-p-0.5 cdx-bg-black/20 cdx-rounded"
                >
                  <RiFileCopyLine />
                </button>
              )}
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code: CodeBlock,
                  table: Table,
                }}
              >
                {formatContent(msg.content)}
              </ReactMarkdown>
              {msg.files && <FilePreviewBar files={msg.files} />}
            </div>
          ))
      )}
      {messages[messages.length - 1]?.role === ChatRole.USER && (
        <div className="cdx-text-neutral-500">
          {generating && !error && (
            <div className="cdx-animate-pulse cdx-mt-4 cdx-flex cdx-justify-center cdx-items-center cdx-gap-2">
              <RiLoader4Line className="cdx-animate-spin" />
              <span>Generating</span>
            </div>
          )}
          {error && (
            <div className="cdx-p-4 cdx-flex cdx-items-center cdx-gap-4 cdx-bg-red-500/10">
              <RiErrorWarningLine
                className="cdx-text-red-500 cdx-flex-shrink-0"
                size={20}
              />
              <span>{error.message}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ChatList
