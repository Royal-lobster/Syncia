import { useEffect, useState } from "react";
import { readStorage, setStorage, useStorage } from "./useStorage";
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
  const {
    currentChatId,
    deleteChatHistory,
    createChatHistory,
    setCurrentChatId,
  } = useChatHistory();

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!currentChatId) return;
    const fetchStoredMessages = async () => {
      const storedMessages = await readStorage<ChatMessage[]>(
        getStoredChatKey(currentChatId)
      );
      if (storedMessages) {
        setMessages(storedMessages);
      }
    };
    fetchStoredMessages();
  }, [currentChatId]);

  const updateAssistantMessage = (chunk: string) => {
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
    console.log("addNewMessage", role, message);
    console.log("currentChatId", currentChatId);
    if (!currentChatId) {
      console.log("creating new chat history");
      const newId = createChatHistory(await getCurrentSiteHostName());
      setCurrentChatId(newId);
      console.log("newId", newId);
    }
    const newMessage: ChatMessage = {
      role,
      content: message,
      timestamp: Date.now(),
    };
    setMessages([...messages, newMessage]);
  };

  const commitToStoredMessages = () => {
    console.log("commitToStoredMessages", currentChatId);

    setStorage(getStoredChatKey(currentChatId), messages);
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
