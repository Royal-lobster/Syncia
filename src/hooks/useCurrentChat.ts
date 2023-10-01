import { useState } from "react";
import { useStorage } from "./useStorage";
import { atom } from "jotai";
import { useChatHistory } from "./useChatHistory";

export enum ChatRole {
  USER = "USER",
  ASSISTANT = "ASSISTANT",
  SYSTEM = "SYSTEM",
}

export type ChatMessage = {
  role: ChatRole;
  content: string;
  timestamp: number;
};

const storedMessagesAtom = atom<ChatMessage[]>([]);

export const getStoredChatKey = (chatId: string) => `CHAT-${chatId}`;

export const useCurrentChat = (chatId: string) => {
  const [storedMessages, setStoredMessages] = useStorage<ChatMessage[]>(
    getStoredChatKey(chatId),
    storedMessagesAtom
  );

  const [messages, setMessages] = useState<ChatMessage[]>(storedMessages); // we don't directly update storedMessages for performance reasons
  const { deleteChatHistory } = useChatHistory();

  const updateAssistantMessage = (chunk: string) => {
    console.log("INSIDE UPDATE ASSISTANT MESSAGE");
    setMessages((messages) => {
      if (messages[messages.length - 1].role === ChatRole.USER) {
        return [
          ...messages,
          {
            role: ChatRole.ASSISTANT,
            content: chunk,
            timestamp: Date.now(),
          },
        ];
      }
      const lastMessage = messages[messages.length - 1];
      lastMessage.content += chunk;
      return [...messages];
    });
  };

  const addNewMessage = (role: ChatRole, message: string) => {
    const newMessage: ChatMessage = {
      role,
      content: message,
      timestamp: Date.now(),
    };
    setMessages([...messages, newMessage]);
  };

  const updateStoredMessages = () => {
    setStoredMessages(messages);
  };

  const clearMessages = () => {
    setMessages([]);
    chrome.storage.local.remove(`CHAT-${chatId}`);
    deleteChatHistory(chatId);
  };

  return {
    messages,
    updateAssistantMessage,
    addNewMessage,
    updateStoredMessages,
    clearMessages,
  };
};
