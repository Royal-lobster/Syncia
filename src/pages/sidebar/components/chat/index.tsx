import React from "react";
import ChatList from "./chatList";
import { SidebarInput } from "./chatInput";
import { GPT35, useChatCompletion } from "@src/hooks/useOpenAI";

interface ChatProps {
  apiKey: string;
}

const Chat = ({ apiKey }: ChatProps) => {
  const [messages, submitMessage] = useChatCompletion({
    model: GPT35.TURBO,
    apiKey,
  });
  return (
    <>
      <ChatList messages={messages} />
      <SidebarInput submitMessage={submitMessage} />
    </>
  );
};

export default Chat;
