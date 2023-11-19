import { BaseLanguageModel } from "../base_language/index.js";
import { BaseEntityStore } from "../schema/index.js";
import { BaseChatMemory, BaseChatMemoryInput } from "./chat_memory.js";
import { InputValues, MemoryVariables, OutputValues } from "./base.js";
import { PromptTemplate } from "../prompts/prompt.js";
/**
 * Interface for the input parameters required by the EntityMemory class.
 */
export interface EntityMemoryInput extends BaseChatMemoryInput {
    llm: BaseLanguageModel;
    humanPrefix?: string;
    aiPrefix?: string;
    entityExtractionPrompt?: PromptTemplate;
    entitySummarizationPrompt?: PromptTemplate;
    entityCache?: string[];
    k?: number;
    chatHistoryKey?: string;
    entitiesKey?: string;
    entityStore?: BaseEntityStore;
}
/**
 * Class for managing entity extraction and summarization to memory in
 * chatbot applications. Extends the BaseChatMemory class and implements
 * the EntityMemoryInput interface.
 */
export declare class EntityMemory extends BaseChatMemory implements EntityMemoryInput {
    private entityExtractionChain;
    private entitySummarizationChain;
    entityStore: BaseEntityStore;
    entityCache: string[];
    k: number;
    chatHistoryKey: string;
    llm: BaseLanguageModel;
    entitiesKey: string;
    humanPrefix?: string;
    aiPrefix?: string;
    constructor(fields: EntityMemoryInput);
    get memoryKeys(): string[];
    get memoryVariables(): string[];
    /**
     * Method to load memory variables and perform entity extraction.
     * @param inputs Input values for the method.
     * @returns Promise resolving to an object containing memory variables.
     */
    loadMemoryVariables(inputs: InputValues): Promise<MemoryVariables>;
    /**
     * Method to save the context from a conversation to a buffer and perform
     * entity summarization.
     * @param inputs Input values for the method.
     * @param outputs Output values from the method.
     * @returns Promise resolving to void.
     */
    saveContext(inputs: InputValues, outputs: OutputValues): Promise<void>;
    /**
     * Method to clear the memory contents.
     * @returns Promise resolving to void.
     */
    clear(): Promise<void>;
}
