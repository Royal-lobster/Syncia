import { useCallback } from 'react'
import { getNewUUID } from '../utils/UUID'
import { ChatHistory, ChatMessage, StorageKey } from './useOpenAI'
import { useStorage } from './useStorage'

export const useChatHistory = () => {
    type ReturnType = [
        ChatHistory[],
        (url: string, currentId: string, messages: ChatMessage[]) => void,
    ]

    // getting required data
    const uuid = getNewUUID()
    const initialChatHistoryValue = {
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
    const setChatHistory = useCallback(
        (url: string, currentId: string, messages: ChatMessage[]): void => {
            console.log(chatHistory, 'chathistory in chat history')
            setHistory((prev) => {
                let index = prev.findIndex((chatMessage) => chatMessage.url === url)
                let update = prev
                if (index === -1) {
                    index = prev.length
                    update[index] = {
                        id: getNewUUID(),
                        url: url,
                        timestamp: messages[1].timestamp,
                        ChatMessages: messages,
                    }
                    return update
                } else {
                    let currentIdIndex
                    if (currentId) {
                        currentIdIndex = prev.findIndex(
                            (chatMessage) => chatMessage.id === currentId,
                        )
                        if (currentIdIndex != -1) {
                            index = currentIdIndex
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
                        }
                    }
                    return update
                }
            })
        },
        [],
    )

    return [chatHistory, setChatHistory] as ReturnType
}
