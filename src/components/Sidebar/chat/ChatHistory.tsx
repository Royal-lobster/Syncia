import { useChatHistory } from "../../../hooks/useChatHistory";
import * as Select from "@radix-ui/react-select";
import { RiTimeLine } from "react-icons/ri";

const ChatHistory = () => {
  const { history, setCurrentChatId, currentChatId, getChatHistory } =
    useChatHistory();

  const currentChat = getChatHistory(currentChatId);
  console.log(currentChatId);
  console.log(currentChat, history);

  return (
    <div>
      <Select.Root>
        <Select.Trigger className="cdx-border cdx-p-2 cdx-rounded-sm">
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
