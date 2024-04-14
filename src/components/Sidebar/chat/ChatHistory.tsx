import { useChatHistory } from '../../../hooks/useChatHistory'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { RiAddLine, RiCloseCircleFill, RiTimeLine } from 'react-icons/ri'
import { generateReadableRelativeDate } from '../../../lib/generateReadableDate'

const ChatHistory = () => {
  const {
    history,
    setCurrentChatId,
    currentChatId,
    getChatHistory,
    createChatHistory,
    deleteChatHistory,
  } = useChatHistory()

  if (!currentChatId) return null

  const currentChat = getChatHistory(currentChatId)

  const handleCreateNewChat = async () => {
    const newId = createChatHistory('New Chat')
    setCurrentChatId(newId)
  }

  const handleChatDelete = (id: string) => {
    deleteChatHistory(id)
  }

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="cdx-flex cdx-items-center cdx-gap-1 cdx-text-neutral-500 dark:cdx-bg-neutral-900 cdx-bg-neutral-200 cdx-border cdx-rounded-md cdx-border-neutral-400/30 dark:cdx-border-neutral-500/30 cdx-py-1 cdx-px-3">
          <RiTimeLine size={18} className="cdx-flex-shrink-0" /> History
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          side="top"
          className="cdx-max-w-xs cdx-mr-3 cdx-w-[280px] dark:cdx-bg-neutral-900 cdx-bg-neutral-200 cdx-border cdx-border-neutral-400/30 dark:cdx-border-neutral-500/30 cdx-rounded-lg cdx-mb-1.5 cdx-pb-3 cdx-overflow-hidden focus:outline-none"
        >
          <div>
            <div className="cdx-flex cdx-justify-between cdx-items-center cdx-p-3 cdx-border-b-[#E5E7EB] cdx-border-b dark:cdx-border-b-[#2F2F2F]">
              <h1 className="cdx-text-lg cdx-font-bold cdx-text-[#5A5A5A] dark:cdx-text-[#E3E3E3]">
                History
              </h1>
              <button
                type="button"
                className="cdx-flex cdx-items-center cdx-text-white cdx-bg-[#3B82F6] cdx-gap-1.5 cdx-px-2.5 cdx-py-1.5 cdx-rounded-md cdx-font-medium"
                onClick={handleCreateNewChat}
              >
                <RiAddLine />
                New Chat
              </button>
            </div>
            <div className="cdx-max-h-96 cdx-overflow-y-auto">
              {history.map((chat, i) => (
                <DropdownMenu.Item
                  key={chat.id}
                  onSelect={() => {
                    setCurrentChatId(chat.id)
                  }}
                  className={`cdx-px-3 cdx-py-1.5 focus:cdx-outline-none focus-visible:cdx-bg-black/20 cdx-relative cdx-flex cdx-gap-3 cdx-justify-between cdx-items-center cdx-border-b dark:cdx-border-b-[#2F2F2F] ${
                    i === history.length - 1
                      ? 'cdx-border-b-0'
                      : 'cdx-border-b-[#E5E7EB]'
                  } cdx-cursor-pointer`}
                >
                  <div className="cdx-flex cdx-gap-2 cdx-justify-center cdx-items-center">
                    <div
                      className="cdx-absolute cdx-left-0 cdx-h-full cdx-w-[3px] data-[current-chat]:cdx-bg-[#70A3F3]"
                      data-current-chat={
                        currentChat?.id === chat.id || undefined
                      }
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleChatDelete(chat.id)
                      }}
                    >
                      <RiCloseCircleFill
                        size={14}
                        className="cdx-text-gray-500"
                      />
                    </button>
                    <div className="cdx-flex cdx-justify-between cdx-items-center cdx-gap-2">
                      <span
                        title={chat.name}
                        className="cdx-text-sm cdx-truncate cdx-max-w-[160px] dark:cdx-text-neutral-300 cdx-text-neutral-600"
                      >
                        {chat.name}
                      </span>
                      <span className="cdx-text-[10px] cdx-text-neutral-500 dark:cdx-text-neutral-400">
                        {generateReadableRelativeDate(chat.createdAt)}
                      </span>
                    </div>
                  </div>
                </DropdownMenu.Item>
              ))}
            </div>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}

export default ChatHistory
