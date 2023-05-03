import { useCallback, useEffect, useState } from "react";
import { getNewUUID } from "../utils/UUID";
import { ChatHistory, ChatMessage } from "./useOpenAI";
import { useStorage } from "./useStorage";
import Browser from "webextension-polyfill";

export enum StorageKey {
    CHAT_HISTORY = "CHAT_HISTORY",
}

type ReturnType = [
    ChatHistory[],
    (url: string, currentId: string, messages: ChatMessage[]) => void
];

export const useChatHistory = (): ReturnType => {
    const uuid = getNewUUID();
    const initialChatHistoryValue = {
        id: uuid,
        url: window.location.href,
        timestamp: Date.now(),
        ChatMessages: [],
    };

    const [chatHistory, setChatHistory] = useStorage<ChatHistory[]>(StorageKey.CHAT_HISTORY, [initialChatHistoryValue], 'local');

    const updateChatHistory = useCallback(async (url: string, currentId: string, messages: ChatMessage[]) => {
        setChatHistory(history => {
            console.log('chatihchatHistory', history, 'url', url, 'currentId', currentId, 'messages', messages, 'updatehistory');
            let index = history.findIndex((chatMessage) => chatMessage.url === url);
            let update = [...history];
            if (index === -1) {
                index = update.length;
                update[index] = {
                    id: getNewUUID(),
                    url: url,
                    timestamp: messages[1].timestamp,
                    ChatMessages: messages,
                };
                setChatHistory(update);
            } else {
                let currentIdIndex;
                if (currentId) {
                    currentIdIndex = history.findIndex(
                        (chatMessage) => chatMessage.id === currentId
                    );
                    if (currentIdIndex !== -1) {
                        index = currentIdIndex;
                    }
                }

                if (
                    update[index].timestamp !==
                    messages[messages.length - 2].timestamp &&
                    messages.length >= 3
                ) {
                    update[index] = {
                        ...update[index],
                        timestamp: messages[messages.length - 2].timestamp,
                        ChatMessages: [
                            ...update[index].ChatMessages,
                            messages[messages.length - 2],
                            messages[messages.length - 1],
                        ],
                    };
                }
            }
            setChatHistory(update);
            return update;
        })


    }, []);



    return [chatHistory, updateChatHistory];
};
