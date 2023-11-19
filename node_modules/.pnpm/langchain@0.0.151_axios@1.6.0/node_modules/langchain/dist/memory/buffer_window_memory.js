import { getBufferString } from "./base.js";
import { BaseChatMemory } from "./chat_memory.js";
/**
 * Class for managing and storing previous chat messages. It extends the
 * BaseChatMemory class and implements the BufferWindowMemoryInput
 * interface. This class is stateful and stores messages in a buffer. When
 * called in a chain, it returns all of the messages it has stored.
 */
export class BufferWindowMemory extends BaseChatMemory {
    constructor(fields) {
        super({
            returnMessages: fields?.returnMessages ?? false,
            chatHistory: fields?.chatHistory,
            inputKey: fields?.inputKey,
            outputKey: fields?.outputKey,
        });
        Object.defineProperty(this, "humanPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Human"
        });
        Object.defineProperty(this, "aiPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "AI"
        });
        Object.defineProperty(this, "memoryKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "history"
        });
        Object.defineProperty(this, "k", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 5
        });
        this.humanPrefix = fields?.humanPrefix ?? this.humanPrefix;
        this.aiPrefix = fields?.aiPrefix ?? this.aiPrefix;
        this.memoryKey = fields?.memoryKey ?? this.memoryKey;
        this.k = fields?.k ?? this.k;
    }
    get memoryKeys() {
        return [this.memoryKey];
    }
    /**
     * Method to load the memory variables. Retrieves the chat messages from
     * the history, slices the last 'k' messages, and stores them in the
     * memory under the memoryKey. If the returnMessages property is set to
     * true, the method returns the messages as they are. Otherwise, it
     * returns a string representation of the messages.
     * @param _values InputValues object.
     * @returns Promise that resolves to a MemoryVariables object.
     */
    async loadMemoryVariables(_values) {
        const messages = await this.chatHistory.getMessages();
        if (this.returnMessages) {
            const result = {
                [this.memoryKey]: messages.slice(-this.k * 2),
            };
            return result;
        }
        const result = {
            [this.memoryKey]: getBufferString(messages.slice(-this.k * 2), this.humanPrefix, this.aiPrefix),
        };
        return result;
    }
}
