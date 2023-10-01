import { atom } from 'jotai'
import { getUUID } from '../lib/getUUID'
import { useStorage } from './useStorage'

interface ChatHistory {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

const initialChatId = getUUID()
const historyAtom = atom<ChatHistory[]>([])
const currentChatIdAtom = atom<string>(initialChatId)

export const useChatHistory = () => {
  const [history, setHistory] = useStorage<ChatHistory[]>(
    'HISTORY',
    historyAtom,
  )
  const [currentChatId, setCurrentChatId] = useStorage<string>(
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
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0]
    if (tab) {
      console.log(tab)
    }
  })

  const createChatHistoryFromActiveTab = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0] as any
      if (tab) {
        const data = JSON.parse(tab.vivExtData)
        const url = data.urlForThumbnail
        const title = new URL(url).hostname
        createChatHistory(title)
      }
    })
  }

  if (currentChatId === initialChatId) {
    createChatHistoryFromActiveTab()
  }

  const deleteChatHistory = (id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id))
  }
  const getChatHistory = (id: string) => {
    return history.find((h) => h.id === id)
  }

  return {
    currentChatId,
    setCurrentChatId,
    createChatHistory,
    deleteChatHistory,
    getChatHistory,
    createChatHistoryFromActiveTab,
    history,
  }
}
