import { InputValues, MemoryVariables } from "./base.js";
import { BaseChatMemory, BaseChatMemoryInput } from "./chat_memory.js";
/**
 * Interface for the input parameters of the `BufferMemory` class.
 */
export interface BufferMemoryInput extends BaseChatMemoryInput {
    humanPrefix?: string;
    aiPrefix?: string;
    memoryKey?: string;
}
/**
 * The `BufferMemory` class is a type of memory component used for storing
 * and managing previous chat messages. It is a wrapper around
 * `ChatMessageHistory` that extracts the messages into an input variable.
 * This class is particularly useful in applications like chatbots where
 * it is essential to remember previous interactions. Note: The memory
 * instance represents the history of a single conversation. Therefore, it
 * is not recommended to share the same history or memory instance between
 * two different chains. If you deploy your LangChain app on a serverless
 * environment, do not store memory instances in a variable, as your
 * hosting provider may reset it by the next time the function is called.
 */
export declare class BufferMemory extends BaseChatMemory implements BufferMemoryInput {
    humanPrefix: string;
    aiPrefix: string;
    memoryKey: string;
    constructor(fields?: BufferMemoryInput);
    get memoryKeys(): string[];
    /**
     * Loads the memory variables. It takes an `InputValues` object as a
     * parameter and returns a `Promise` that resolves with a
     * `MemoryVariables` object.
     * @param _values `InputValues` object.
     * @returns A `Promise` that resolves with a `MemoryVariables` object.
     */
    loadMemoryVariables(_values: InputValues): Promise<MemoryVariables>;
}
