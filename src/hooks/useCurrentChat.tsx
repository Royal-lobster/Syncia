import { useState } from "react"
import { useStorage } from "./useStorage"


export enum ChatRole {
  "USER",
  "ASSISTANT",
  "SYSTEM"
}

export type ChatMessage = {
  role: ChatRole
  content: string
  timestamp: number
}

export const useCurrentChat = (chatId: string) => {
  const [storedMessages, setStoredMessages] = useStorage<ChatMessage[]>(`CHAT-${chatId}`, [])
  const [messages, setMessages] = useState<ChatMessage[]>(storedMessages) // we don't directly update storedMessages for performance reasons

  const updateAssistantMessage = (chunk: string) => {
    setMessages(messages => {
      if (messages[messages.length - 1].role === ChatRole.USER) {
        return [...messages, {
          role: ChatRole.ASSISTANT,
          content: chunk,
          timestamp: Date.now(),
        }]
      }
      const lastMessage = messages[messages.length - 1]
      lastMessage.content += chunk
      return [...messages]
    })
  }

  const addNewMessage = (role: ChatRole, message: string) => {
    const newMessage: ChatMessage = {
      role,
      content: message,
      timestamp: Date.now(),
    }
    setMessages([...messages, newMessage])
  }

  const updateStoredMessages = () => {
    setStoredMessages(messages)
  }

  const clearMessages = () => {
    setMessages([])
    updateStoredMessages()
  }

  return {
    messages,
    updateAssistantMessage,
    addNewMessage,
    updateStoredMessages,
    clearMessages
  }
}
