import { useChatHistory } from "../../../hooks/useChatHistory";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { RiAddLine, RiCloseCircleFill, RiTimeLine } from "react-icons/ri";
import { generateReadableRelativeDate } from "../../../utils/generateReadableDate";

const ChatHistory = () => {
  const {
    history,
    setCurrentChatId,
    currentChatId,
    getChatHistory,
    createChatHistory,
    deleteChatHistory,
  } = useChatHistory();

  if (!currentChatId) return null;

  const currentChat = getChatHistory(currentChatId);

  const handleCreateNewChat = async () => {
    const newId = createChatHistory("New Chat");
    setCurrentChatId(newId);
  };

  const handleChatDelete = (id: string) => {
    deleteChatHistory(id);
  };

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="cdx-border cdx-border-neutral-500/20 cdx-flex cdx-gap-2 cdx-items-center cdx-py-2 cdx-px-3 cdx-text-sm cdx-text-neutral-700 dark:cdx-text-neutral-300 cdx-rounded-md">
          <RiTimeLine /> <span>{currentChat?.name}</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          side="top"
          className="cdx-w-full cdx-max-w-xs cdx-min-w-[230px] cdx-bg-white/90 dark:cdx-bg-[#1f1f1fe5] cdx-rounded-lg cdx-mb-1.5 cdx-pb-3 cdx-overflow-hidden"
        >
          <div className="cdx-backdrop-blur-md">
            <div className="cdx-flex cdx-justify-between cdx-items-center cdx-p-3 cdx-border-b-[#E5E7EB] cdx-border-b dark:cdx-border-b-[#2F2F2F]">
              <h1 className="cdx-text-lg cdx-font-bold cdx-text-[#5A5A5A] dark:cdx-text-[#E3E3E3]">
                History
              </h1>
              <button
                type="button"
                className="cdx-flex cdx-items-center cdx-bg-[#3B82F6] cdx-gap-1.5 cdx-px-2.5 cdx-py-1.5 cdx-rounded-sm cdx-font-medium"
                onClick={handleCreateNewChat}
              >
                <RiAddLine />
                New Chat
              </button>
            </div>
            <div>
              {history.map((chat, i) => (
                <DropdownMenu.Item
                  key={chat.id}
                  onSelect={() => {
                    setCurrentChatId(chat.id);
                  }}
                  className={`cdx-px-3 cdx-py-1.5 cdx-relative cdx-flex cdx-gap-3 cdx-justify-between cdx-items-center cdx-border-b dark:cdx-border-b-[#2F2F2F] ${
                    i === history.length - 1
                      ? "cdx-border-b-0"
                      : "cdx-border-b-[#E5E7EB]"
                  } cdx-cursor-pointer`}
                >
                  <div
                    className="cdx-absolute cdx-left-0 cdx-h-full cdx-w-[3px] data-[currentChat]:cdx-bg-[#70A3F3]"
                    data-currentChat={currentChat?.id === chat.id || undefined}
                  />
                  <div className="cdx-flex cdx-gap-2 cdx-justify-center cdx-items-center">
                    <button onClick={() => handleChatDelete(chat.id)}>
                      <RiCloseCircleFill size={14} className="cdx-text-gray-500" />
                    </button>
                    <span className="cdx-text-sm dark:cdx-text-[#E3E3E3] cdx-text-[#5A5A5A]">
                      {chat.name}
                    </span>
                  </div>
                  <span className="cdx-text-[10px] cdx-text-[#898989] dark:cdx-text-white/50">
                    {generateReadableRelativeDate(chat.createdAt)}
                  </span>
                </DropdownMenu.Item>
              ))}
            </div>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default ChatHistory;
