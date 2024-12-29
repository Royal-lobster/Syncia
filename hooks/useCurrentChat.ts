import { useEffect, useRef, useState } from 'react'
import { getCurrentSiteHostName } from '../lib/getCurrentSiteHostName'
import { useChatHistory } from './useChatHistory'
import { readStorage, setStorage } from './useStorage'
import type { MessageDraft, MessageFile } from './useMessageDraft'

export enum ChatRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM',
}

export type ChatMessage = {
  role: ChatRole
  content: string
  files?: MessageFile[]
  timestamp: number
}

export const getStoredChatKey = (chatId: string | null) => `CHAT-${chatId}`

/**
 * This hook is responsible for managing the current chat
 * the user is viewing.
 *
 * It uses the currentChatId from useChatHistory.ts to
 * determine which chat to modify.
 *
 * And stores each chat's messages in local storage under
 * the key `CHAT-${chatId}`.
 */
export const useCurrentChat = () => {
  const {
    currentChatId,
    deleteChatHistory,
    createChatHistory,
    setCurrentChatId,
    history,
    getChatHistory,
    updateChatHistory,
  } = useChatHistory()

  const [messages, setMessages] = useState<ChatMessage[]>([])

  // We use refs here to avoid stale closures
  // This will happen since we are calling addNewMessage
  // inside a callback.
  // For more info check out -
  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const historyRef = useRef<typeof history>([])
  historyRef.current = history
  const currentChatIdRef = useRef<string | null>()
  currentChatIdRef.current = currentChatId
  const messagesRef = useRef<ChatMessage[]>([])
  messagesRef.current = messages

  const fetchStoredMessages = async () => {
    // Between tabs, the currentChatId or currentChatIdRef.current not getting updated
    // so we need to fetch it from the storage.
    const storedChatId = await readStorage<string | null>('CURRENT_CHAT_ID')
    if (!storedChatId) {
      setMessages([])
      return
    }
    const storedMessages = await readStorage<ChatMessage[]>(
      getStoredChatKey(storedChatId),
    )
    if (storedMessages) {
      setMessages(storedMessages)
    } else if (history.length > 1) {
      setMessages([])
    }
  }

  // We need to fetch stored messages when the tab is changed
  // so if changes were made in another tab, we can reflect them
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    chrome.tabs.onActivated.addListener(fetchStoredMessages)
    return () => chrome.tabs.onActivated.removeListener(fetchStoredMessages)
  }, [])

  // We need to fetch stored messages when the current chat id changes
  // we get new history from the storage stored with the new id
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchStoredMessages()
  }, [currentChatId])

  const updateAssistantMessage = (chunk: string) => {
    setMessages((messages) => {
      if (messages[messages.length - 1].role === ChatRole.USER) {
        return [
          ...messages,
          {
            role: ChatRole.ASSISTANT,
            content: chunk,
            timestamp: Date.now(),
          },
        ]
      }
      const lastMessage = messages[messages.length - 1]
      lastMessage.content += chunk
      return [...messages]
    })
  }

  const addNewMessage = async (role: ChatRole, message: MessageDraft) => {
    if (!currentChatIdRef.current || !historyRef.current.length) {
      const newId = createChatHistory(await getCurrentSiteHostName())
      setCurrentChatId(newId)
    }

    const chatHistory = getChatHistory(currentChatIdRef.current!)
    if (chatHistory?.name === 'New Chat') {
      const newChatName = await getCurrentSiteHostName()
      // we update chat name letter by letter to give a typing effect
      const updateChatName = (name: string) => {
        updateChatHistory(currentChatIdRef.current!, name)
        if (name.length < newChatName.length) {
          setTimeout(() => {
            updateChatName(newChatName.slice(0, name.length + 1))
          }, 100)
        }
      }
      updateChatName('')
    }
    const newMessage: ChatMessage = {
      role,
      content: message.text,
      files: message.files,
      timestamp: Date.now(),
    }
    setMessages((m) => [...m, newMessage])
  }

  const removeMessagePair = (timestamp: number) => {
    setMessages((p) => {
      const index = p.findIndex((msg) => msg.timestamp === timestamp)
      if (index === -1 || p[index].role !== ChatRole.USER) return p
      const newMessages = [...p]
      newMessages.splice(index, 1) // remove user message
      if (
        newMessages[index] &&
        newMessages[index].role === ChatRole.ASSISTANT
      ) {
        // remove assistant message
        newMessages.splice(index, 1)
      }
      return newMessages
    })
    commitToStoredMessages()
  }

  const commitToStoredMessages = async () => {
    if (!currentChatIdRef.current) return
    setStorage(getStoredChatKey(currentChatIdRef.current), messagesRef.current)
  }

  const clearMessages = async () => {
    if (!currentChatIdRef.current) return
    setMessages([])
    deleteChatHistory(currentChatIdRef.current)
  }

  return {
    messages: messagesRef.current,
    updateAssistantMessage,
    addNewMessage,
    commitToStoredMessages,
    clearMessages,
    currentChatId,
    removeMessagePair,
  }
}
