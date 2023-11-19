import { BaseLanguageModel } from "../base_language/index.js";
import { BasePromptTemplate } from "../prompts/base.js";
import { BaseMessage } from "../schema/index.js";
import { InputValues, MemoryVariables, OutputValues } from "./base.js";
import { BaseChatMemory, BaseChatMemoryInput } from "./chat_memory.js";
/**
 * Interface for the input parameters of the ConversationSummaryMemory
 * class.
 */
export interface ConversationSummaryMemoryInput extends BaseConversationSummaryMemoryInput {
}
/**
 * Interface for the input parameters of the BaseConversationSummaryMemory
 * class.
 */
export interface BaseConversationSummaryMemoryInput extends BaseChatMemoryInput {
    llm: BaseLanguageModel;
    memoryKey?: string;
    humanPrefix?: string;
    aiPrefix?: string;
    prompt?: BasePromptTemplate;
    summaryChatMessageClass?: new (content: string) => BaseMessage;
}
/**
 * Abstract class that provides a structure for storing and managing the
 * memory of a conversation. It includes methods for predicting a new
 * summary for the conversation given the existing messages and summary.
 */
export declare abstract class BaseConversationSummaryMemory extends BaseChatMemory {
    memoryKey: string;
    humanPrefix: string;
    aiPrefix: string;
    llm: BaseLanguageModel;
    prompt: BasePromptTemplate;
    summaryChatMessageClass: new (content: string) => BaseMessage;
    constructor(fields: BaseConversationSummaryMemoryInput);
    /**
     * Predicts a new summary for the conversation given the existing messages
     * and summary.
     * @param messages Existing messages in the conversation.
     * @param existingSummary Current summary of the conversation.
     * @returns A promise that resolves to a new summary string.
     */
    predictNewSummary(messages: BaseMessage[], existingSummary: string): Promise<string>;
}
/**
 * Class that provides a concrete implementation of the conversation
 * memory. It includes methods for loading memory variables, saving
 * context, and clearing the memory.
 */
export declare class ConversationSummaryMemory extends BaseConversationSummaryMemory {
    buffer: string;
    constructor(fields: ConversationSummaryMemoryInput);
    get memoryKeys(): string[];
    /**
     * Loads the memory variables for the conversation memory.
     * @returns A promise that resolves to an object containing the memory variables.
     */
    loadMemoryVariables(_: InputValues): Promise<MemoryVariables>;
    /**
     * Saves the context of the conversation memory.
     * @param inputValues Input values for the conversation.
     * @param outputValues Output values from the conversation.
     * @returns A promise that resolves when the context has been saved.
     */
    saveContext(inputValues: InputValues, outputValues: OutputValues): Promise<void>;
    /**
     * Clears the conversation memory.
     * @returns A promise that resolves when the memory has been cleared.
     */
    clear(): Promise<void>;
}
