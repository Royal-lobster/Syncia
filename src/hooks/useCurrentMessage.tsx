import { useCallback, useEffect } from "react"
import { ChatHistory, StorageKey } from "./useOpenAI"
import { useStorage } from "./useStorage"
import { useChatHistory } from "./useChatHistoty"

export function useCurrentMessage(
) {

    type ReturnType = [ChatHistory, (currentId: string) => void]

    const [chatHistory, setChatHistory] = useChatHistory();

    // current chat local storage setup
    const [currentChat, setCurrent] = useStorage<ChatHistory>(
        StorageKey.CURRENT_CHAT,
        chatHistory[0],
        'local',
    )

    const setCurrentChat = useCallback((currentId: string) => {
        // falsy value check
        if (!currentId) return;

        // clear current chat if clear button is clicked
        if (currentId === "clear") setCurrent(chatHistory[0]);

        // find index of current chat
        const index = chatHistory.findIndex(chatMessage => chatMessage.id === currentId)
        if (index != -1) {
            setCurrent(chatHistory[index])
        }
    }, [])

    return [currentChat, setCurrentChat] as ReturnType
}