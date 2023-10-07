import { atom } from 'jotai'
import { getUUID } from '../lib/getUUID'
import { useStorage } from './useStorage'

interface ChatHistory {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

/**
 * Default history state starts with an empty array
 * Default currentChatId state starts with null
 *
 * When user enters a new message for the first time,
 * we create a new chat history and set it as the current chat
 */
const historyAtom = atom<ChatHistory[]>([])
const currentChatIdAtom = atom<string | null>(null)

/**
 * This hook is responsible for managing the chat history
 * and the current chat id.
 *
 * The chat history is an array of chat objects which
 * contain the chat id, name, createdAt, and updatedAt.
 * (Actual chat messages are stored separately for
 * performance reasons -- see useCurrentChat.ts)
 *
 * The current chat id is the id of the chat that the user
 * is currently viewing.
 */
export const useChatHistory = () => {
  const [history, setHistory] = useStorage<ChatHistory[]>(
    'HISTORY',
    historyAtom,
  )
  const [currentChatId, setCurrentChatId] = useStorage<string | null>(
    'CURRENT_CHAT_ID',
    currentChatIdAtom,
  )

  const createChatHistory = (name: string, newId = getUUID()) => {
    setHistory((prev) => [
      ...prev,
      {
        id: newId,
        name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
    setCurrentChatId(newId)

    return newId
  }

  const deleteChatHistory = async (id: string | null) => {
    if (!id) return
    chrome.storage.local.remove(`CHAT-${id}`)
    setHistory((prev) => prev.filter((h) => h.id !== id))
    const newCurrentChatId = history.find((h) => h.id !== id)?.id ?? null
    setCurrentChatId(newCurrentChatId)
  }

  const getChatHistory = (id: string) => {
    return history.find((h) => h.id === id)
  }

  const updateChatHistory = (id: string, name: string) => {
    setHistory((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          return {
            ...h,
            name,
            updatedAt: new Date().toISOString(),
          }
        }
        return h
      }),
    )
  }

  return {
    currentChatId,
    setCurrentChatId,
    createChatHistory,
    deleteChatHistory,
    getChatHistory,
    updateChatHistory,
    history,
  }
}
