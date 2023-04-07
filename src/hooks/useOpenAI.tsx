import React, { useEffect, useState } from 'react'
import { SSE } from 'sse'
import { useStorage } from './useStorage'

export enum GPT35 {
  TURBO = 'gpt-3.5-turbo',
  TURBO_0301 = 'gpt-3.5-turbo-0301',
}

export enum GPT4 {
  BASE = 'gpt-4',
  BASE_0314 = 'gpt-4-0314',
  BASE_32K = 'gpt-4-32k',
  BASE_32K_0314 = 'gpt-4-32k-0314',
}

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
  model: GPT35 | GPT4
  systemPrompt?: string
}

const CHAT_COMPLETIONS_URL = 'https://api.openai.com/v1/chat/completions'

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

export const useChatCompletion = ({
  model,
  apiKey,
  systemPrompt,
}: OpenAIStreamingProps) => {
  const systemMessage = createChatMessage({
    content: systemPrompt || '',
    role: ChatRole.SYSTEM,
  })

  const [storedMessages, setStoredMessages] = useStorage<ChatMessage[]>(
    'CHAT_MESSAGES',
    [systemMessage],
    'local',
  )
  const [messages, setMessages] = useState<ChatMessage[]>([systemMessage])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (storedMessages.length > 1 && messages.length <= 1) {
      setMessages(storedMessages)
    }
  }, [storedMessages])

  useEffect(() => {
    if (messages.length > 1 && !messages[messages.length - 1].meta.loading) {
      setStoredMessages(messages)
      setLoading(false)
    } else if (messages.length > 1) {
      setLoading(true)
    }
  }, [messages])

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
          .filter((m, i) => updatedMessages.length - 1 !== i)
          .map(officialOpenAIParams),
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

      source.addEventListener('readystatechange', (e) => {
        // readyState: 0 - connecting, 1 - open, 2 - closed
        if (e.readyState && e.readyState > 1) {
          const afterTimestamp = Date.now()
          const diffInSeconds = (afterTimestamp - beforeTimestamp) / 1000
          const formattedDiff = diffInSeconds.toFixed(2) + ' sec.'

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
    setStoredMessages([systemMessage])
  }, [setMessages])

  return { messages, submitQuery, loading, clearMessages, cancelRequest }
}
