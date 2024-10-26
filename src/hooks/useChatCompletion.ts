import endent from 'endent'
import { ChatOpenAI } from '@langchain/openai'
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages'
import { useMemo, useState } from 'react'
import type { Mode } from '../config/settings'
import { getMatchedContent } from '../lib/getMatchedContent'
import { ChatRole, useCurrentChat } from './useCurrentChat'
import type { MessageDraft } from './useMessageDraft'

interface UseChatCompletionProps {
  model: string
  apiKey: string
  mode: Mode
  systemPrompt: string
  baseURL: string
}

let controller: AbortController

export const useChatCompletion = ({
  model,
  apiKey,
  mode,
  systemPrompt,
  baseURL,
}: UseChatCompletionProps) => {
  const {
    messages,
    updateAssistantMessage,
    addNewMessage,
    commitToStoredMessages,
    clearMessages,
    removeMessagePair,
  } = useCurrentChat()
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const llm = useMemo(() => {
    return new ChatOpenAI({
      streaming: true,
      openAIApiKey: apiKey,
      modelName: model,
      configuration: {
        baseURL: baseURL,
      },
      temperature: Number(mode),
    })
  }, [apiKey, model, mode, baseURL])

  const previousMessages = messages.map((msg) => {
    switch (msg.role) {
      case ChatRole.ASSISTANT:
        return new AIMessage(msg.content)
      case ChatRole.SYSTEM:
        return new SystemMessage(msg.content)
      case ChatRole.USER:
        return new HumanMessage(msg.content)
    }
  })

  const submitQuery = async (message: MessageDraft, context?: string) => {
    await addNewMessage(ChatRole.USER, message)
    controller = new AbortController()
    const options = {
      signal: controller.signal,
      callbacks: [{ handleLLMNewToken: updateAssistantMessage }],
    }

    setError(null)
    setGenerating(true)

    try {
      let matchedContext: string | undefined
      if (context) {
        matchedContext = await getMatchedContent(
          message.text,
          context,
          apiKey,
          baseURL,
        )
      }

      const expandedQuery = matchedContext
        ? endent`
      ### Context
      ${matchedContext}
      ### Question:
      ${message.text}
    `
        : message.text

      const messages = [
        new SystemMessage(systemPrompt),
        ...previousMessages,
        new HumanMessage({
          content:
            message.files.length > 0
              ? [
                  { type: 'text', text: expandedQuery },
                  ...(message.files.length > 0
                    ? await Promise.all(
                        message.files.map(async (file) => {
                          return {
                            type: 'image_url',
                            image_url: { url: file.src },
                          } as const
                        }),
                      )
                    : []),
                ]
              : expandedQuery,
        }),
      ]

      console.log(JSON.stringify(messages, null, 2))

      await llm.invoke(messages, options)
    } catch (e) {
      setError(e as Error)
    } finally {
      commitToStoredMessages()
      setGenerating(false)
    }
  }

  const cancelRequest = () => {
    controller.abort()
    commitToStoredMessages()
    setGenerating(false)
  }

  return {
    messages,
    submitQuery,
    generating,
    cancelRequest,
    clearMessages,
    removeMessagePair,
    error,
  }
}
