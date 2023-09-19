import { randomUUID } from "crypto"
import { useStorage } from "./useStorage"

interface ChatHistory {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export const useHistory = () => {
  const [history, setHistory] = useStorage<ChatHistory[]>("HISTORY", [])

  const createChatHistory = () => {
    const newId = randomUUID()

    setHistory(prev => [...prev, {
      id: newId,
      name: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }])

    return newId
  }
  const deleteChatHistory = (id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id))
  }
  const getChatHistory = (id: string) => {
    return history.find(h => h.id === id)
  }

  return {
    createChatHistory,
    deleteChatHistory,
    getChatHistory,
    history,
  }
}
