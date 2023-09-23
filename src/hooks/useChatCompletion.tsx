import { AvailableModels, Mode } from "../config/settings"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { useCurrentChat, ChatRole } from "./useCurrentChat"
import { useMemo } from "react"
import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema"
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
  const { messages, updateAssistantMessage, addNewMessage, updateStoredMessages, clearMessages } = useCurrentChat(chatId)
  const [generating, setGenerating] = useState(false)

  const controller = new AbortController();

  const chat = useMemo(() => new ChatOpenAI({
    streaming: true,
    openAIApiKey: apiKey,
  }), [])

  const submitQuery = async (query: string) => {
    addNewMessage(ChatRole.USER, query)
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
