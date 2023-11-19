import { ZepClient } from "@getzep/zep-js";
import { InputValues, MemoryVariables, OutputValues } from "./base.js";
import { BaseChatMemory, BaseChatMemoryInput } from "./chat_memory.js";
/**
 * Interface defining the structure of the input data for the ZepMemory
 * class. It includes properties like humanPrefix, aiPrefix, memoryKey,
 * baseURL, sessionId, and apiKey.
 */
export interface ZepMemoryInput extends BaseChatMemoryInput {
    humanPrefix?: string;
    aiPrefix?: string;
    memoryKey?: string;
    baseURL: string;
    sessionId: string;
    apiKey?: string;
}
/**
 * Class used to manage the memory of a chat session, including loading
 * and saving the chat history, and clearing the memory when needed. It
 * uses the ZepClient to interact with the Zep service for managing the
 * chat session's memory.
 */
export declare class ZepMemory extends BaseChatMemory implements ZepMemoryInput {
    humanPrefix: string;
    aiPrefix: string;
    memoryKey: string;
    baseURL: string;
    sessionId: string;
    zepClientPromise: Promise<ZepClient>;
    private readonly zepInitFailMsg;
    constructor(fields: ZepMemoryInput);
    get memoryKeys(): string[];
    /**
     * Method that retrieves the chat history from the Zep service and formats
     * it into a list of messages.
     * @param values Input values for the method.
     * @returns Promise that resolves with the chat history formatted into a list of messages.
     */
    loadMemoryVariables(values: InputValues): Promise<MemoryVariables>;
    /**
     * Method that saves the input and output messages to the Zep service.
     * @param inputValues Input messages to be saved.
     * @param outputValues Output messages to be saved.
     * @returns Promise that resolves when the messages have been saved.
     */
    saveContext(inputValues: InputValues, outputValues: OutputValues): Promise<void>;
    /**
     * Method that deletes the chat history from the Zep service.
     * @returns Promise that resolves when the chat history has been deleted.
     */
    clear(): Promise<void>;
}
