import { HumanMessage } from '@langchain/core/messages'
import { ChatOpenAI } from '@langchain/openai'

export const validateApiKey = async (
  openAIApiKey: string,
  baseURL: string
): Promise<boolean> => {
  const model = new ChatOpenAI({ openAIApiKey:openAIApiKey,configuration: {
    baseURL:  baseURL || "https://api.openai.com/v1",
  },})
  try {
    await model.invoke([new HumanMessage('Say Ok')])
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
