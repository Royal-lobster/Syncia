import { AvailableModels, Mode } from '../config/settings'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { useCurrentChat, ChatRole } from './useCurrentChat'
import { useMemo } from 'react'
import { AIMessage, HumanMessage, SystemMessage } from 'langchain/schema'
import { useState } from 'react'

interface UseChatCompletionProps {
  model: AvailableModels
  apiKey: string
  mode: Mode
  systemPrompt: string
}

/**
 * This hook is responsible for managing the chat completion
 * functionality by using the useCurrentChat hook
 *
 * It adds functions for
 * - submitting a query to the chat
 * - cancelling a query
 *
 * And returns them along with useful state from useCurrentChat hook
 */
export const useChatCompletion = ({
  model,
  apiKey,
  mode,
  systemPrompt,
}: UseChatCompletionProps) => {
  const {
    messages,
    updateAssistantMessage,
    addNewMessage,
    commitToStoredMessages,
    clearMessages,
  } = useCurrentChat()
  const [generating, setGenerating] = useState(false)

  const chat = useMemo(
    () =>
      new ChatOpenAI({
        streaming: true,
        openAIApiKey: apiKey,
        modelName: model,
        temperature: Number(mode),
      }),
    [apiKey, model, mode],
  )

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

  const controller = new AbortController()

  const submitQuery = async (query: string) => {
    await addNewMessage(ChatRole.USER, query)
    const messages = [
      new SystemMessage(systemPrompt),
      ...previousMessages,
      new HumanMessage(query),
    ]
    const options = {
      signal: controller.signal,
      callbacks: [{ handleLLMNewToken: updateAssistantMessage }],
    }
    setGenerating(true)
    chat.call(messages, options).then(() => {
      commitToStoredMessages()
      setGenerating(false)
    })
  }

  const cancelRequest = () => {
    controller.abort()
    commitToStoredMessages()
    setGenerating(false)
  }

  return { messages, submitQuery, generating, cancelRequest, clearMessages }
}
