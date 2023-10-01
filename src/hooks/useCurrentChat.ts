import { useState } from "react";
import { useStorage } from "./useStorage";
import { atom } from "jotai";
import { useChatHistory } from "./useChatHistory";
import { getCurrentSiteHostName } from "../lib/getCurrentSiteHostName";

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

export const getStoredChatKey = (chatId: string | null) => `CHAT-${chatId}`;

/**
 * This hook is responsible for managing the current chat
 * the user is viewing.
 *
 * It uses the currentChatId from useChatHistory.ts to
 * determine which chat to modify.
 *
 * And stores each chat's messages in local storage under
 * the key `CHAT-${chatId}`.
 */
export const useCurrentChat = () => {
  const { currentChatId, deleteChatHistory, createChatHistory } =
    useChatHistory();
  const [storedMessages, setStoredMessages] = useStorage<ChatMessage[]>(
    getStoredChatKey(currentChatId),
    storedMessagesAtom
  );
  const [messages, setMessages] = useState<ChatMessage[]>(storedMessages); // we don't directly update storedMessages for performance reasons

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

  const addNewMessage = async (role: ChatRole, message: string) => {
    if (!currentChatId) {
      createChatHistory(await getCurrentSiteHostName());
    }
    const newMessage: ChatMessage = {
      role,
      content: message,
      timestamp: Date.now(),
    };
    setMessages([...messages, newMessage]);
  };

  const commitToStoredMessages = () => {
    setStoredMessages(messages);
  };

  const clearMessages = () => {
    setMessages([]);
    chrome.storage.local.remove(`CHAT-${currentChatId}`);
    deleteChatHistory(currentChatId);
  };

  return {
    messages,
    updateAssistantMessage,
    addNewMessage,
    commitToStoredMessages,
    clearMessages,
  };
};
