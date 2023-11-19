import { InputValues, MemoryVariables } from "./base.js";
import { BaseChatMemory, BaseChatMemoryInput } from "./chat_memory.js";
/**
 * Interface for the input parameters of the BufferWindowMemory class.
 */
export interface BufferWindowMemoryInput extends BaseChatMemoryInput {
    humanPrefix?: string;
    aiPrefix?: string;
    memoryKey?: string;
    k?: number;
}
/**
 * Class for managing and storing previous chat messages. It extends the
 * BaseChatMemory class and implements the BufferWindowMemoryInput
 * interface. This class is stateful and stores messages in a buffer. When
 * called in a chain, it returns all of the messages it has stored.
 */
export declare class BufferWindowMemory extends BaseChatMemory implements BufferWindowMemoryInput {
    humanPrefix: string;
    aiPrefix: string;
    memoryKey: string;
    k: number;
    constructor(fields?: BufferWindowMemoryInput);
    get memoryKeys(): string[];
    /**
     * Method to load the memory variables. Retrieves the chat messages from
     * the history, slices the last 'k' messages, and stores them in the
     * memory under the memoryKey. If the returnMessages property is set to
     * true, the method returns the messages as they are. Otherwise, it
     * returns a string representation of the messages.
     * @param _values InputValues object.
     * @returns Promise that resolves to a MemoryVariables object.
     */
    loadMemoryVariables(_values: InputValues): Promise<MemoryVariables>;
}
