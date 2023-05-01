import { useCallback, useEffect, useState } from "react"
import { ChatHistory, StorageKey } from "./useOpenAI"
import { useStorage } from "./useStorage"
import { useChatHistory } from "./useChatHistoty"

export function useCurrentMessage(
) {

    type ReturnType = [ChatHistory, (currentId: string) => void]

    const [chatHistory, setChatHistory] = useChatHistory();

    const [currentChat, setCurrent] = useState<ChatHistory>(chatHistory[chatHistory.length - 1])

    const setCurrentChat = useCallback((currentId: string) => {
        // falsy value check
        if (!currentId) return;

        // clear current chat if clear button is clicked
        if (currentId === "clear") {
            setCurrent(chatHistory[0]);
        }

        // find index of current chat
        const index = chatHistory.findIndex(chatMessage => chatMessage.id === currentId)
        if (index != -1) {
            setCurrent(chatHistory[index])
        }
    }, [currentChat, setCurrent, chatHistory])

    return [currentChat, setCurrentChat] as ReturnType
}