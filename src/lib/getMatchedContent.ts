import { OpenAIEmbeddings } from '@langchain/openai'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { createSHA256Hash } from './createSHA256Hash'

/**
 * This function is responsible for getting the matched content
 * from the context and query
 */
export const getMatchedContent = async (
  query: string,
  context: string,
  apiKey: string,
  baseURL: string
) => {
  const vectorStore = await getContextVectorStore(context, apiKey,baseURL)
  const retriever = vectorStore.asRetriever()
  const relevantDocs = await retriever.getRelevantDocuments(query)
  return relevantDocs.map((doc) => doc.pageContent).join('\n')
}

/**
 * This function is responsible for getting the context vector store
 * from the context. It caches the vector store in the local storage
 * for faster retrieval
 */
const getContextVectorStore = async (context: string, apiKey: string, baseURL: string) => {
  const embeddings = new OpenAIEmbeddings(
    { 
      openAIApiKey: apiKey ,
      configuration: {
        baseURL: baseURL,
      },
    }
  )
  const hashKey = `SYNCIA_STORE_EMBEDDINGS_${await createSHA256Hash(context)}`
  const memoryVectors: [] | null = JSON.parse(
    localStorage.getItem(hashKey) || 'null',
  )

  if (!memoryVectors) {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    })
    const docs = await textSplitter.createDocuments([context])
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
    localStorage.setItem(hashKey, JSON.stringify(store.memoryVectors))
    return store
  }

  const store = new MemoryVectorStore(embeddings)
  store.memoryVectors = memoryVectors
  return store
}
