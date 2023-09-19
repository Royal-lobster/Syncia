import { AvailableModels, Mode } from "../config/settings"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { useStorage } from "./useStorage"

interface UseChatCompletionProps {
  model: AvailableModels
  apiKey: string
  mode: Mode
  systemPrompt: string
}


type Role = "user" | "assistant" | "system"

type Message = {
  role: Role
  message: string
  timestamp: number
}

export const useChatCompletion = ({
  model,
  apiKey,
  mode,
  systemPrompt,
}: UseChatCompletionProps) => {
  const chat = new ChatOpenAI({
    streaming: true,
  });

  const [messages, setMessages] = useStorage()

}
