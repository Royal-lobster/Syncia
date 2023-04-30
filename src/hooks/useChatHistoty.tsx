import { Dispatch, SetStateAction, useCallback, useEffect } from "react"
import { getNewUUID } from "../utils/UUID"
import { ChatHistory, ChatMessage, StorageKey } from "./useOpenAI"
import { useStorage } from "./useStorage"
import { getActiveTabUrl } from "../utils/getActiveTab"
import { type } from "os"


/**
   * this custom hook use to set and get chat history
   * @return {ChatHistory[]} history
   * @return {Function} chatHistory
   */
export const useChatHistory = (
) => {
    type ReturnType = [ChatHistory[], (url: string, currentId: string, messages: ChatMessage[]) => void]

    // getting required data
    const uuid = getNewUUID()
    const initialChatHistoryValue =
    {
        id: uuid,
        url: window.location.href,
        timestamp: Date.now(),
        ChatMessages: [],
    }
    const [chatHistory, setHistory] = useStorage<ChatHistory[]>(
        StorageKey.CHAT_HISTORY,
        [initialChatHistoryValue],
        'local',
    )

    /**
     * this function create a object or update message of existing object
     * @param  {string} url
     * @param {string} currentId
     * @param {ChatMessage[]} messages
     */
    const setChatHistory = useCallback((url: string, currentId: string, messages: ChatMessage[]): void => {
        // if (messages.length > 1 && !messages[messages.length - 1].meta.loading) {
        let index;

        if (currentId) {
            index = chatHistory.findIndex(
                (chatMessage) => chatMessage.id === currentId,
            )
        }
        else {
            index = chatHistory.findIndex(
                (chatMessage) => chatMessage.url === url,
            )
        }

        console.log(messages, 'messages');


        let update = chatHistory
        if (index === -1) {
            index = update.length
            update[index] = {
                id: getNewUUID(),
                url: url,
                timestamp: messages[1].timestamp,
                ChatMessages: messages,
            }
            // setCurrentChat(update[index])
        } else {
            if (update[index].timestamp !== messages[messages.length - 2].timestamp && messages.length >= 3) {
                update[index] = {
                    ...update[index],
                    timestamp: messages[messages.length - 2].timestamp,
                    ChatMessages: [
                        ...update[index].ChatMessages,
                        messages[messages.length - 2],
                        messages[messages.length - 1],
                    ],
                }
                // setCurrentChat(update[index])
            }
        }
        setHistory(update)
    }, [])

    console.log(chatHistory, 'before the sending');

    return [chatHistory, setChatHistory] as ReturnType
}