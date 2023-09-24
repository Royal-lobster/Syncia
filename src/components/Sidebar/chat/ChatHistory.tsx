import { useChatHistory } from "../../../hooks/useChatHistory";
import * as Select from "@radix-ui/react-select";
import { RiTimeLine } from "react-icons/ri";

const ChatHistory = () => {
  const { history, setCurrentChatId, currentChatId, getChatHistory } =
    useChatHistory();

  const currentChat = getChatHistory(currentChatId);

  return (
    <div>
      <Select.Root>
        <Select.Trigger className="cdx-border cdx-border-neutral-500/20 cdx-flex cdx-gap-2 cdx-items-center cdx-py-2 cdx-px-3 cdx-text-sm cdx-text-neutral-700 dark:cdx-text-neutral-300 cdx-rounded-md">
          <RiTimeLine /> {currentChat?.name}
        </Select.Trigger>
        <Select.Content>
          History
          <div>
            {history.map((chat) => (
              <Select.Item
                value={chat.id}
                key={chat.id}
                onSelect={() => setCurrentChatId(chat.id)}
              >
                {chat.name}
              </Select.Item>
            ))}
          </div>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default ChatHistory;
