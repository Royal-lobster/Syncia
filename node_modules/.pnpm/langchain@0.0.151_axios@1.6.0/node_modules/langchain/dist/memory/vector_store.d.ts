import { VectorStoreRetriever } from "../vectorstores/base.js";
import { BaseMemory, InputValues, MemoryVariables, OutputValues } from "./base.js";
/**
 * Interface for the parameters required to initialize a
 * VectorStoreRetrieverMemory instance.
 */
export interface VectorStoreRetrieverMemoryParams {
    vectorStoreRetriever: VectorStoreRetriever;
    inputKey?: string;
    outputKey?: string;
    memoryKey?: string;
    returnDocs?: boolean;
}
/**
 * Class for managing long-term memory in Large Language Model (LLM)
 * applications. It provides a way to persist and retrieve relevant
 * documents from a vector store database, which can be useful for
 * maintaining conversation history or other types of memory in an LLM
 * application.
 */
export declare class VectorStoreRetrieverMemory extends BaseMemory implements VectorStoreRetrieverMemoryParams {
    vectorStoreRetriever: VectorStoreRetriever;
    inputKey?: string;
    memoryKey: string;
    returnDocs: boolean;
    constructor(fields: VectorStoreRetrieverMemoryParams);
    get memoryKeys(): string[];
    /**
     * Method to load memory variables. It uses the vectorStoreRetriever to
     * get relevant documents based on the query obtained from the input
     * values.
     * @param values An InputValues object.
     * @returns A Promise that resolves to a MemoryVariables object.
     */
    loadMemoryVariables(values: InputValues): Promise<MemoryVariables>;
    /**
     * Method to save context. It constructs a document from the input and
     * output values (excluding the memory key) and adds it to the vector
     * store database using the vectorStoreRetriever.
     * @param inputValues An InputValues object.
     * @param outputValues An OutputValues object.
     * @returns A Promise that resolves to void.
     */
    saveContext(inputValues: InputValues, outputValues: OutputValues): Promise<void>;
}
