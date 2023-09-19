import { useEffect } from "react"
import { useState } from "react"
import { useStorage } from "./useStorage"


export enum Role {
  "USER",
  "ASSISTANT",
  "SYSTEM"
}

export type Message = {
  role: Role
  message: string
  timestamp: number
}

export const useCurrentChat = (chatId: string) => {
  const [storedMessages, setStoredMessages] = useStorage<Message[]>(`CHAT-${chatId}`, [])
  const [messages, setMessages] = useState<Message[]>(storedMessages) // we don't directly update storedMessages for performance reasons

  const updateAssistantMessage = (chunk: string) => {
    setMessages(messages => {
      const lastMessage = messages[messages.length - 1]
      lastMessage.message += chunk
      return [...messages]
    })
  }

  const addNewMessage = (role: Role, message: string) => {
    const newMessage: Message = {
      role,
      message,
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
