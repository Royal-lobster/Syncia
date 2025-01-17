import { OpenAIEmbeddings } from '@langchain/openai'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { createSHA256Hash } from './createSHA256Hash'
import { readStorage, setStorage } from '../hooks/useStorage'
import { useSettings } from '../hooks/useSettings'

export const getMatchedContent = async (
  query: string,
  context: string,
  apiKey: string,
  baseURL: string,
) => {
  const vectorStore = await getContextVectorStore(context, apiKey, baseURL)
  const retriever = vectorStore.asRetriever()
  const relevantDocs = await retriever.getRelevantDocuments(query)
  return relevantDocs.map((doc) => doc.pageContent).join('\n')
}

const getContextVectorStore = async (
  context: string,
  apiKey: string,
  baseURL: string,
) => {
  const [settings] = useSettings()
  const embeddingModel = settings.chat.embeddingModel || 'text-embedding-ada-002'
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: apiKey,
    modelName: embeddingModel,
    configuration: {
      baseURL: baseURL,
    },
  })
  const hashKey = `SYNCIA_STORE_EMBEDDINGS_${await createSHA256Hash(context)}`
  const memoryVectors = await readStorage<[]>(hashKey, 'indexedDB')

  if (!memoryVectors) {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    })
    const docs = await textSplitter.createDocuments([context])
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
    await setStorage(hashKey, store.memoryVectors, 'indexedDB')
    return store
  }

  const store = new MemoryVectorStore(embeddings)
  store.memoryVectors = memoryVectors
  return store
}
