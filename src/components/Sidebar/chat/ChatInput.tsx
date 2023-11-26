import { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { GiMagicBroom } from 'react-icons/gi'
import { IoSend } from 'react-icons/io5'
import { HiHand } from 'react-icons/hi'
import ChatHistory from './ChatHistory'
import { useChatHistory } from '../../../hooks/useChatHistory'
import WebPageContentToggle from './WebPageContentToggle'
import ImageCaptureButton from './ImageCaptureButton'
import { MessageDraft, useMessageDraft } from '../../../hooks/useMessageDraft'
import FilePreviewBar from './FilePreviewBar'
import MessageDraftLengthCounter from './MessageDraftLengthCounter'

interface SidebarInputProps {
  loading: boolean
  submitMessage: (message: MessageDraft, context?: string) => void
  clearMessages: () => void
  chatIsEmpty: boolean
  cancelRequest: () => void
  isWebpageContextOn: boolean
  isVisionModel: boolean
}

const MAX_MESSAGE_LENGTH = 10000

export function SidebarInput({
  loading,
  submitMessage,
  clearMessages,
  chatIsEmpty,
  cancelRequest,
  isWebpageContextOn,
  isVisionModel,
}: SidebarInputProps) {
  const {
    messageDraft,
    setMessageDraftText,
    resetMessageDraft,
    addMessageDraftFile,
    removeMessageDraftFile,
  } = useMessageDraft()
  const [delayedLoading, setDelayedLoading] = useState(false)
  const { history } = useChatHistory()

  useEffect(() => {
    const handleLoadingTimeout = setTimeout(() => {
      setDelayedLoading(loading)
    }, 1000)
    return () => {
      clearTimeout(handleLoadingTimeout)
    }
  }, [loading])

  const handleSubmit = async () => {
    let context
    if (isWebpageContextOn) {
      const pageContent = new Promise((resolve) => {
        window.addEventListener('message', function (event) {
          const { action, payload } = event.data
          if (action === 'get-page-content') {
            resolve(payload)
          }
        })

        window.parent.postMessage({ action: 'get-page-content' }, '*')
      })
      context = (await pageContent) as string
    }
    submitMessage(messageDraft, isWebpageContextOn ? context : undefined)
    resetMessageDraft()
  }

  const sendButton = (
    <button
      type="button"
      disabled={loading}
      onClick={handleSubmit}
      className="cdx-flex cdx-gap-2 disabled:cdx-bg-slate-500 disabled:cdx-text-slate-400 cdx-items-center cdx-bg-blue-500 hover:cdx-bg-blue-700 cdx-text-white cdx-py-2 cdx-px-4 cdx-rounded"
    >
      <span>Send</span> <IoSend size={10} />
    </button>
  )

  const stopButton = (
    <button
      type="button"
      onClick={cancelRequest}
      className="cdx-flex cdx-gap-2 disabled:cdx-bg-slate-500 disabled:cdx-text-slate-400 cdx-items-center cdx-bg-red-500 hover:cdx-bg-red-700 cdx-text-white cdx-py-2 cdx-px-4 cdx-rounded"
    >
      <HiHand size={18} /> <span>Stop</span>
    </button>
  )

  return (
    <div className="cdx-fixed cdx-bottom-0 cdx-left-0 cdx-right-0 cdx-flex cdx-flex-col ">
      <div className="cdx-flex cdx-mx-3 cdx-items-center cdx-justify-between">
        {!chatIsEmpty ? (
          <button
            type="button"
            onClick={clearMessages}
            className="cdx-rounded-full cdx-h-10 cdx-w-10 cdx-grid cdx-place-items-center cdx-text-center cdx-bg-blue-500 hover:cdx-bg-blue-700 cdx-text-white"
          >
            <GiMagicBroom size={18} className="mx-auto" />
          </button>
        ) : (
          <div />
        )}
        {(history.length || !chatIsEmpty) && <ChatHistory />}
      </div>

      <div className="cdx-m-2 cdx-rounded-md cdx-border dark:cdx-border-neutral-800 cdx-border-neutral-300 dark:cdx-bg-neutral-900/90 cdx-bg-neutral-200/90 focus:cdx-outline-none focus:cdx-ring-2 focus:cdx-ring-blue-900 focus:cdx-ring-opacity-50">
        {messageDraft.files.length > 0 && (
          <FilePreviewBar
            files={messageDraft.files}
            removeFile={removeMessageDraftFile}
          />
        )}
        <TextareaAutosize
          minRows={2}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="Type your message here..."
          value={messageDraft.text}
          disabled={loading}
          className="cdx-p-3 cdx-w-full focus:!cdx-outline-none placeholder:cdx-text-neutral-500 cdx-text-sm cdx-resize-none cdx-max-h-96 cdx-pb-0 cdx-bg-transparent !cdx-border-none"
          onChange={(e) => {
            e.preventDefault()
            setMessageDraftText(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />
        <div className="cdx-flex cdx-justify-between cdx-items-center cdx-p-3">
          {isVisionModel ? (
            <ImageCaptureButton addMessageDraftFile={addMessageDraftFile} />
          ) : (
            <div>
              <MessageDraftLengthCounter
                length={messageDraft.text.length}
                MAX_LENGTH={MAX_MESSAGE_LENGTH}
              />
            </div>
          )}
          <div className="cdx-flex cdx-items-center cdx-justify-center cdx-gap-4">
            <WebPageContentToggle />
            {!delayedLoading ? sendButton : stopButton}
          </div>
        </div>
      </div>
    </div>
  )
}
