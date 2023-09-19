import { AvailableModels, Mode } from "../config/settings"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { useStorage } from "./useStorage"
import { useCurrentChat, Role } from "./useCurrentChat"
import { useMemo } from "react"
import { AIMessage, HumanMessage, SystemMessage } from "langchain/dist/schema"
import { useState } from "react"

interface UseChatCompletionProps {
  model: AvailableModels
  apiKey: string
  mode: Mode
  systemPrompt: string
  chatId: string
}


export const useChatCompletion = ({
  model,
  apiKey,
  mode,
  systemPrompt,
  chatId,
}: UseChatCompletionProps) => {
  const { messages, updateAssistantMessage, updateStoredMessages, clearMessages } = useCurrentChat(chatId)
  const [generating, setGenerating] = useState(false)

  const controller = new AbortController();

  const chat = useMemo(() => new ChatOpenAI({
    streaming: true,
  }), [])



  const submitQuery = async (query: string) => {
    const previousMessages = messages.map((msg) => {
      switch (msg.role) {
        case Role.ASSISTANT:
          return new AIMessage(msg.message)
        case Role.SYSTEM:
          return new SystemMessage(msg.message)
        case Role.USER:
          return new HumanMessage(msg.message)
      }
    })
    setGenerating(true)
    const response = await chat.call([...previousMessages, new HumanMessage(query)], {
      signal: controller.signal,
      callbacks: [
        {
          handleLLMNewToken: updateAssistantMessage
        },
      ],
    });
    setGenerating(false)
    updateStoredMessages()
    return response.content
  }

  const cancelRequest = () => {
    controller.abort()
    setGenerating(false)
  }


  return { messages, submitQuery, generating, cancelRequest, clearMessages }
}
