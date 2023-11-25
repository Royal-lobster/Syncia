import endent from 'endent'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { AIMessage, HumanMessage, SystemMessage } from 'langchain/schema'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { useMemo, useState } from 'react'
import { AvailableModels, Mode } from '../config/settings'
import { ChatRole, useCurrentChat } from './useCurrentChat'

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

  const llm = useMemo(
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

  const submitQuery = async (query: string, context?: string) => {
    await addNewMessage(ChatRole.USER, query)
    const options = {
      signal: controller.signal,
      callbacks: [{ handleLLMNewToken: updateAssistantMessage }],
    }

    setGenerating(true)

    /**
     * If context is provided, we need to use the LLM to get the relevant documents
     * and then run the LLM on those documents. We use in memory vector store to
     * get the relevant documents
     */
    let matchedContext
    if (context) {
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
      })
      const docs = await textSplitter.createDocuments([context])
      const vectorStore = await MemoryVectorStore.fromDocuments(
        docs,
        new OpenAIEmbeddings({
          openAIApiKey: apiKey,
        }),
      )
      const retriever = vectorStore.asRetriever()
      const relevantDocs = await retriever.getRelevantDocuments(query)
      console.log(relevantDocs)
      matchedContext = relevantDocs.map((doc) => doc.pageContent).join('\n')
    }

    const expandedQuery = matchedContext
      ? endent`
      ### Context
      ${matchedContext}
      ### Question:
      ${query}
    `
      : query

    const messages = [
      new SystemMessage(systemPrompt),
      ...previousMessages,
      new HumanMessage(expandedQuery),
    ]

    await llm.call(messages, options)
    commitToStoredMessages()
    setGenerating(false)
  }

  const cancelRequest = () => {
    controller.abort()
    commitToStoredMessages()
    setGenerating(false)
  }

  return { messages, submitQuery, generating, cancelRequest, clearMessages }
}
