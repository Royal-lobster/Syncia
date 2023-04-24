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
  const initialChatHistoryValue = [
    {
      id: uuid,
      url: window.location.href,
      timestamp: Date.now(),
      ChatMessages: [],
    },
  ]
  const [chatHistory, setChatHistory] = useStorage<ChatHistory[]>(
    'CHAT_HISTORY',
    initialChatHistoryValue,
    'local',
  )
  const [currentUrl, setCurrentUrl] = useState<string>('')

  /**
   * @param content
   * @param role
   * @param ...restOfParams
   * @return {*}  {ChatMessage}
   */

  // const initialChatMessage = currentMessage.length > 0 ? currentMessage : [systemMessage]

  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<ChatMessage[]>([systemMessage])

  useEffect(() => {
    const setState = async () => {
      const url = await getActiveTabUrl();
      console.log(url);
      setCurrentUrl(url)
    }
    setState()
  }, [messages])

  useEffect(() => {


    if (messages.length > 1 && !messages[messages.length - 1].meta.loading) {
      setChatHistory((prev) => {
        let index = prev.findIndex(
          (chatMessage) => chatMessage.url === currentUrl,
        )
        let update = prev
        if (index === -1) {
          index = update.length
          console.log(messages.length, "if block");
          update[index] = {
            id: getNewUUID(),
            url: currentUrl,
            timestamp: messages[0].timestamp,
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
      })
    } else if (messages.length > 1) {
      setLoading(true)
    }

    setLoading(false)
    console.log(chatHistory, 'update of chat history')

  }, [messages])

  // updating message after changes of chatHistory
  useEffect(() => {
    let initialMessage
    if (chatHistory.length > 1 && messages.length <= 3) {
      initialMessage = chatHistory.find(
        (chatMessage) => chatMessage.url === currentUrl,
      )
      if (initialMessage) {
        setMessages(initialMessage.ChatMessages)
      }
    }

  }, [chatHistory, currentUrl])

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
                  url: currentUrl,
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
                  url: currentUrl,
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
    setChatHistory(initialChatHistoryValue)
  }, [setMessages, setChatHistory])

  return { messages, submitQuery, loading, clearMessages, cancelRequest }
}
