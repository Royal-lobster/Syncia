import { useState, useEffect } from 'react'
import { getActiveTabUrl } from '../utils/getActiveTab'
import { ChatHistory } from './useOpenAI'
import { getNewUUID } from '../utils/UUID'
import { useStorage } from './useStorage'
import { ChatMessage } from './useOpenAI'

interface IUrlMap {
  url: string
  id: string
}

export function useCurrentUrlandId(
  chatHistory: ChatHistory[],
): [string, string, ChatMessage[]] {
  let [currentUrl, setCurrentUrl] = useState<string>('')
  let [currentId, setCurrentId] = useState<string>('')
  let [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([])

  getActiveTabUrl().then((url) => {
    setCurrentUrl(url)

    const matchingChatHistory = chatHistory.find((chat) => chat.url === url)
    if (matchingChatHistory) {
      setCurrentId(matchingChatHistory.id)
      setCurrentMessages(matchingChatHistory.ChatMessages)
    } else {
      const newId = getNewUUID()
      setCurrentId(newId)
    }
  })
  console.log('useCurrentUrlandId: ', currentUrl, currentId, currentMessages)

  return [currentUrl, currentId, currentMessages]
}
