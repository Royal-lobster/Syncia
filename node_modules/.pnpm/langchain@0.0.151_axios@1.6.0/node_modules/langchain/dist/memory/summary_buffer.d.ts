import { InputValues, MemoryVariables, OutputValues } from "./base.js";
import { BaseConversationSummaryMemory, BaseConversationSummaryMemoryInput } from "./summary.js";
/**
 * Interface for the input parameters of the
 * ConversationSummaryBufferMemory class.
 */
export interface ConversationSummaryBufferMemoryInput extends BaseConversationSummaryMemoryInput {
    maxTokenLimit?: number;
}
/**
 * Class that extends BaseConversationSummaryMemory and implements
 * ConversationSummaryBufferMemoryInput. It manages the conversation
 * history in a LangChain application by maintaining a buffer of chat
 * messages and providing methods to load, save, prune, and clear the
 * memory.
 */
export declare class ConversationSummaryBufferMemory extends BaseConversationSummaryMemory implements ConversationSummaryBufferMemoryInput {
    movingSummaryBuffer: string;
    maxTokenLimit: number;
    constructor(fields: ConversationSummaryBufferMemoryInput);
    get memoryKeys(): string[];
    /**
     * Method that loads the chat messages from the memory and returns them as
     * a string or as a list of messages, depending on the returnMessages
     * property.
     * @param _ InputValues object, not used in this method.
     * @returns Promise that resolves with MemoryVariables object containing the loaded chat messages.
     */
    loadMemoryVariables(_?: InputValues): Promise<MemoryVariables>;
    /**
     * Method that saves the context of the conversation, including the input
     * and output values, and prunes the memory if it exceeds the maximum
     * token limit.
     * @param inputValues InputValues object containing the input values of the conversation.
     * @param outputValues OutputValues object containing the output values of the conversation.
     * @returns Promise that resolves when the context is saved and the memory is pruned.
     */
    saveContext(inputValues: InputValues, outputValues: OutputValues): Promise<void>;
    /**
     * Method that prunes the memory if the total number of tokens in the
     * buffer exceeds the maxTokenLimit. It removes messages from the
     * beginning of the buffer until the total number of tokens is within the
     * limit.
     * @returns Promise that resolves when the memory is pruned.
     */
    prune(): Promise<void>;
    /**
     * Method that clears the memory and resets the movingSummaryBuffer.
     * @returns Promise that resolves when the memory is cleared.
     */
    clear(): Promise<void>;
}
