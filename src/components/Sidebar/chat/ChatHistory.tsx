import { useChatHistory } from '../../../hooks/useChatHistory';
import * as Select from '@radix-ui/react-select';
import { RiAddLine, RiTimeLine } from 'react-icons/ri';
import { generateReadableRelativeDate } from '../../../utils/generateReadableDate';

const ChatHistory = () => {
  const {
    history,
    setCurrentChatId,
    currentChatId,
    getChatHistory,
    createChatHistoryFromActiveTab
  } = useChatHistory();

  const currentChat = getChatHistory(currentChatId);

  return (
    <div>
      <Select.Root>
        <Select.Trigger className='cdx-border cdx-border-neutral-500/20 cdx-flex cdx-gap-2 cdx-items-center cdx-py-2 cdx-px-3 cdx-text-sm cdx-text-neutral-700 dark:cdx-text-neutral-300 cdx-rounded-md'>
          <RiTimeLine /> <span>{currentChat?.name}</span>
        </Select.Trigger>
        <Select.Content
          side='top'
          position='popper'
          className='cdx-w-full cdx-max-w-xs cdx-min-w-[230px] cdx-bg-white/90 dark:cdx-bg-[#1f1f1fe5] cdx-rounded-lg cdx-mb-1.5 cdx-pb-3 cdx-overflow-hidden'
        >
          <div className='cdx-backdrop-blur-md'>
            <div className='cdx-flex cdx-justify-between cdx-items-center cdx-p-3 cdx-border-b-[#E5E7EB] cdx-border-b dark:cdx-border-b-[#2F2F2F]'>
              <h1 className='cdx-text-sm cdx-font-bold cdx-text-[#5A5A5A] dark:cdx-text-[#E3E3E3]'>
                History
              </h1>
              <button
                type='button'
                className='cdx-flex cdx-items-center cdx-bg-[#3B82F6] cdx-gap-1.5 cdx-px-2.5 cdx-py-1.5 cdx-rounded-sm cdx-font-medium'
                onClick={() => {
                  createChatHistoryFromActiveTab();
                }}
              >
                <RiAddLine />
                New Chat
              </button>
            </div>
            <div>
              {history.map((chat, i) => (
                <Select.Item
                  value={chat.id}
                  key={chat.id}
                  onSelect={() => setCurrentChatId(chat.id)}
                  className={`cdx-px-3 cdx-py-1.5 cdx-relative cdx-flex cdx-justify-between cdx-items-center cdx-border-b dark:cdx-border-b-[#2F2F2F] ${
                    i === history.length - 1
                      ? 'cdx-border-b-0'
                      : 'cdx-border-b-[#E5E7EB]'
                  } cdx-cursor-pointer`}
                >
                  <div
                    className='cdx-absolute cdx-left-0 cdx-h-full cdx-w-[3px] data-[currentChat]:cdx-bg-[#70A3F3]'
                    data-currentChat={currentChat?.id === chat.id || undefined}
                  />
                  <span className='cdx-lowercase cdx-text-sm dark:cdx-text-[#E3E3E3] cdx-text-[#5A5A5A]'>
                    {chat.name}
                  </span>
                  <span className='cdx-text-[10px] cdx-text-[#898989] dark:cdx-text-white/50'>
                    {generateReadableRelativeDate(chat.createdAt)}
                  </span>
                </Select.Item>
              ))}
            </div>
          </div>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default ChatHistory;
