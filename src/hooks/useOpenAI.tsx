import React, { useEffect, useState } from 'react'
import { SSE } from 'sse'
import { useStorage } from './useStorage'
import { AvailableModels, Mode } from './useSettings'
import { getActiveTabUrl } from '../utils/getActiveTab'
import { getNewUUID } from '../utils/UUID'
import { url } from 'inspector'
import { log } from 'console'

export enum ChatRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

interface ChatMessageIncomingChunk {
  content?: string
  role?: string
}

export interface OpenAIChatMessage {
  content: string
  role: string
}

export interface ChatMessageToken extends OpenAIChatMessage {
  timestamp: number
}

export interface ChatMessageParams extends OpenAIChatMessage {
  timestamp?: number
  meta?: {
    loading?: boolean
    responseTime?: string
    chunks?: ChatMessageToken[]
  }
}

export interface ChatMessage extends ChatMessageParams {
  timestamp: number
  meta: {
    loading: boolean
    responseTime: string
    chunks: ChatMessageToken[]
  }
}

export interface OpenAIStreamingProps {
  apiKey: string
  model: AvailableModels
  mode?: Mode
  systemPrompt?: string
}

export interface ChatHistory {
  timestamp: number
  id: string
  url: string
  ChatMessages: ChatMessage[]
}

export enum StorageKey {
  CHAT_HISTORY = 'CHAT_HISTORY',
  CURRENT_CHAT = 'CURRENT_CHAT'
}

const CHAT_COMPLETIONS_URL = 'https://api.openai.com/v1/chat/completions'

export const useChatCompletion = ({
  model,
  apiKey,
  systemPrompt,
  mode,
}: OpenAIStreamingProps) => {

  const officialOpenAIParams = ({
    content,
    role,
  }: ChatMessage): OpenAIChatMessage => ({ content, role })

  const createChatMessage = ({
    content,
    role,
    ...restOfParams
  }: ChatMessageParams): ChatMessage => ({
    content,
    role,
    timestamp: restOfParams.timestamp || Date.now(),
    meta: {
      loading: false,
      responseTime: '',
      chunks: [],
      ...restOfParams.meta,
    },
  })

  // Initial value of message
  const systemMessage = createChatMessage({
    content: systemPrompt || '',
    role: ChatRole.SYSTEM,
  })

  // getting required data
  const uuid = getNewUUID()
  const initialChatHistoryValue =
  {
    id: uuid,
    url: window.location.href,
    timestamp: Date.now(),
    ChatMessages: [],
  }
  const [chatHistory, setChatHistory] = useStorage<ChatHistory[]>(
    StorageKey.CHAT_HISTORY,
    [initialChatHistoryValue],
    'local',
  )

  const [currentChat, setCurrentChat] = useStorage<ChatHistory>(
    StorageKey.CURRENT_CHAT,
    initialChatHistoryValue,
    'local',
  )

  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<ChatMessage[]>([systemMessage])

  /**
   * this function create a object or update message of existing object
   * @param {ChatHistory[]} prev
   * @return  ChatHistory[]
   */
  const createOrUpdateChatHistory = (prev: ChatHistory[], url: string): ChatHistory[] => {
    let index = prev.findIndex(
      (chatMessage) => chatMessage.url === url,
    )
    let update = prev
    if (index === -1) {
      index = update.length
      console.log(messages.length, "if block");
      update[index] = {
        id: getNewUUID(),
        url: url,
        timestamp: messages[1].timestamp,
        ChatMessages: messages,
      }
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
      }
    }
    return update
  }

  useEffect(() => {
    const check = async () => {
      const url = await getActiveTabUrl();
      console.log('url of setchathistory', url, currentChat, currentChat.url);
      if (messages.length > 1 && !messages[messages.length - 1].meta.loading) {
        console.log(messages, chatHistory, "if block of setHistory");
        setChatHistory((prev) => createOrUpdateChatHistory(prev, url));
      } else if (messages.length > 1) {
        setLoading(true)
      }
    }
    check()
    setLoading(false)
  }, [messages])

  // updating message after changes of chatHistory
  useEffect(() => {
    const check = async () => {
      const url = await getActiveTabUrl();
      if (chatHistory.length > 1 && messages.length <= 3) {
        setCurrentChat((prev) => {
          const index = chatHistory.findIndex(chatMessage => chatMessage.url === url)
          if (index != -1) {
            setMessages(chatHistory[index].ChatMessages)
            return chatHistory[index]
          }
          return initialChatHistoryValue
        })
      }
    }
    check()
  }, [chatHistory])


  let source: SSE | null = null

  const submitQuery = React.useCallback(
    (newMessages?: ChatMessageParams[]) => {
      if (!newMessages || newMessages.length < 1) {
        setMessages([systemMessage])
        return
      }

      if (messages[messages.length - 1]?.meta?.loading) return

      const beforeTimestamp = Date.now()

      const updatedMessages: ChatMessage[] = [
        ...messages,
        ...newMessages.map(createChatMessage),
        createChatMessage({ content: '', role: '', meta: { loading: true } }),
      ]

      setMessages(updatedMessages)

      const payload = JSON.stringify({
        model,
        messages: updatedMessages
          .filter((_m, i) => updatedMessages.length - 1 !== i)
          .map(officialOpenAIParams),
        temperature: Number(mode),
        stream: true,
      })

      const CHAT_HEADERS = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      }

      source = new SSE(CHAT_COMPLETIONS_URL, {
        headers: CHAT_HEADERS,
        method: 'POST',
        payload,
      })

      source.addEventListener('message', (e) => {
        if (e?.data !== '[DONE]') {
          const payload = JSON.parse(e?.data || '{}')
          const chunk: ChatMessageIncomingChunk = payload?.choices?.[0]?.delta

          setMessages((msgs) =>
            msgs.map((message, i) => {
              if (updatedMessages.length - 1 === i) {
                return {
                  content: message.content + (chunk?.content || ''),
                  role: message.role + (chunk?.role || ''),
                  timestamp: 0,
                  meta: {
                    ...message.meta,
                    chunks: [
                      ...message.meta.chunks,
                      {
                        content: chunk?.content || '',
                        role: chunk?.role || '',
                        timestamp: Date.now(),
                      },
                    ],
                  },
                }
              }

              return message
            }),
          )
        } else {
          if (source) source.close()
        }
      })

      source.addEventListener('error', (e) => {
        if (e?.data !== '[DONE]') {
          const payload = JSON.parse(e?.data || '{}')

          const chunk: ChatMessageIncomingChunk = {
            content: payload.error?.message,
            role: ChatRole.ASSISTANT,
          }

          setMessages((msgs) =>
            msgs.map((message, i) => {
              if (updatedMessages.length - 1 === i) {
                return {
                  content: message.content + (chunk?.content || ''),
                  role: message.role + (chunk?.role || ''),
                  timestamp: 0,
                  meta: {
                    ...message.meta,
                    chunks: [
                      ...message.meta.chunks,
                      {
                        content: chunk?.content || '',
                        role: chunk?.role || '',
                        timestamp: Date.now(),
                      },
                    ],
                  },
                }
              }

              return message
            }),
          )
        } else {
          if (source) source.close()
        }
      })

      source.addEventListener('readystatechange', (e) => {
        // readyState: 0 - connecting, 1 - open, 2 - closed
        if (e.readyState && e.readyState > 1) {
          const afterTimestamp = Date.now()
          const diffInSeconds = (afterTimestamp - beforeTimestamp) / 1000
          const formattedDiff = `${diffInSeconds.toFixed(2)} sec.`

          setMessages((msgs) =>
            msgs.map((message, i) => {
              if (updatedMessages.length - 1 === i) {
                return {
                  ...message,
                  timestamp: afterTimestamp,
                  meta: {
                    ...message.meta,
                    loading: false,
                    responseTime: formattedDiff,
                  },
                }
              }

              return message
            }),
          )
        }
      })

      source.stream()
    },
    [messages, setMessages],
  )

  const cancelRequest = React.useCallback(() => {
    if (source) source.close()
    source = null
    messages[messages.length - 1].meta.loading = false
  }, [source])

  const clearMessages = React.useCallback(() => {
    setMessages([systemMessage])
    setCurrentChat(initialChatHistoryValue)
  }, [setMessages, setCurrentChat])

  const setChatMessage = React.useCallback((chatID: string) => {
    setCurrentChat((prev) => {
      const index = chatHistory.findIndex(chatMessages => chatMessages.id == chatID);
      return index != -1 ? chatHistory[index] : initialChatHistoryValue
    })
  }, [setCurrentChat])

  return { messages, submitQuery, loading, clearMessages, cancelRequest, currentChat, chatHistory, setChatMessage }
}
