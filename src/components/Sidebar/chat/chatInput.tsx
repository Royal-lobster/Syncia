import { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { GiMagicBroom } from 'react-icons/gi'
import { IoSend } from 'react-icons/io5'
import { HiHand } from 'react-icons/hi'
import { ChatHistory, ChatMessageParams, ChatRole } from '../../../hooks/useOpenAI'
import { History } from './history'
import { useChatHistory } from '../../../hooks/useChatHistoty'

interface SidebarInputProps {
  loading: boolean
  submitMessage: (messages: ChatMessageParams[]) => void
  clearMessages: () => void
  chatIsEmpty: boolean
  cancelRequest: () => void
  setCurrentChat: (chatID: string) => void
  chatHistory: ChatHistory[]
  currentChat: ChatHistory
  currentId: string
  setCurrentId: (currentId: string) => void
}

export function SidebarInput({
  loading,
  submitMessage,
  clearMessages,
  chatIsEmpty,
  cancelRequest,
  chatHistory,
  setCurrentChat,
  currentChat,
  currentId,
  setCurrentId,
}: SidebarInputProps) {
  const [text, setText] = useState('')
  const [delayedLoading, setDelayedLoading] = useState(false)

  console.log(chatHistory, "INPUT COMPONENT");


  useEffect(() => {
    const handleLoadingTimeout = setTimeout(() => {
      setDelayedLoading(loading)
    }, 1000)
    return () => {
      clearTimeout(handleLoadingTimeout)
    }
  }, [loading])

  useEffect(() => {
    setCurrentChat(currentId)
  }, [currentId, chatHistory])

  const handleSubmit = () => {
    submitMessage([{ content: text, role: ChatRole.USER }])
    setText('')
  }

  return (
    <div className="cdx-fixed cdx-bottom-0 cdx-left-0 cdx-right-0 cdx-flex cdx-flex-col ">
      <div className="cdx-flex cdx-items-center cdx-justify-between">
        {!chatIsEmpty ? (
          <button
            onClick={clearMessages}
            className="cdx-rounded-full cdx-h-10 cdx-w-10 cdx-grid cdx-place-items-center cdx-text-center cdx-bg-blue-500 hover:cdx-bg-blue-700 cdx-text-white cdx-m-2"
          >
            <GiMagicBroom size={18} className="mx-auto" />
          </button>
        ) : <div></div>}
        <div className=' '>
          <History chatHistory={chatHistory} setCurrentId={setCurrentId} currentUrl={currentChat?.url} currentId={currentId} />
        </div>
      </div>

      <div className="cdx-m-2 cdx-rounded-md cdx-border dark:cdx-border-neutral-800 cdx-border-neutral-300 dark:cdx-bg-neutral-900/90 cdx-bg-neutral-200/90 focus:cdx-outline-none focus:cdx-ring-2 focus:cdx-ring-blue-900 focus:cdx-ring-opacity-50">
        <TextareaAutosize
          minRows={2}
          maxLength={10000}
          placeholder="Type your message here..."
          value={text}
          disabled={loading}
          className="cdx-p-3 cdx-w-full cdx-text-sm cdx-resize-none cdx-max-h-96 cdx-pb-0 cdx-bg-transparent !cdx-border-none focus:!cdx-outline-none"
          onChange={(e) => {
            e.preventDefault()
            setText(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />
        <div className="cdx-flex cdx-justify-between cdx-items-center cdx-p-3">
          <div>
            <span className="cdx-text-xs cdx-text-neutral-500 dark:cdx-text-neutral-200">
              {text.length} / 10,000
            </span>
          </div>
          {!delayedLoading ? (
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="cdx-flex cdx-gap-2 disabled:cdx-bg-slate-500 disabled:cdx-text-slate-400 cdx-items-center cdx-bg-blue-500 hover:cdx-bg-blue-700 cdx-text-white cdx-py-2 cdx-px-4 cdx-rounded"
            >
              <span>Send</span> <IoSend size={10} />
            </button>
          ) : (
            <button
              onClick={cancelRequest}
              className="cdx-flex cdx-gap-2 disabled:cdx-bg-slate-500 disabled:cdx-text-slate-400 cdx-items-center cdx-bg-red-500 hover:cdx-bg-red-700 cdx-text-white cdx-py-2 cdx-px-4 cdx-rounded"
            >
              <HiHand size={18} /> <span>Stop</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
