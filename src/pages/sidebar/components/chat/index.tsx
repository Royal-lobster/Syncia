import React from "react";
import ChatList from "./chatList";
import { SidebarInput } from "./chatInput";
import { GPT35, useChatCompletion } from "@src/hooks/useOpenAI";
import { SYSTEM_PROMPT } from "@src/prompts";

interface ChatProps {
  apiKey: string;
}

const Chat = ({ apiKey }: ChatProps) => {
  const { messages, submitQuery, clearMessages } = useChatCompletion({
    model: GPT35.TURBO,
    apiKey,
    systemPrompt: SYSTEM_PROMPT,
  });
  return (
    <>
      <ChatList messages={messages} />
      <SidebarInput
        submitMessage={submitQuery}
        chatIsEmpty={messages.length <= 1}
        clearMessages={clearMessages}
      />
    </>
  );
};

export default Chat;
