"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferMemory = void 0;
const base_js_1 = require("./base.cjs");
const chat_memory_js_1 = require("./chat_memory.cjs");
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
class BufferMemory extends chat_memory_js_1.BaseChatMemory {
    constructor(fields) {
        super({
            chatHistory: fields?.chatHistory,
            returnMessages: fields?.returnMessages ?? false,
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
        this.humanPrefix = fields?.humanPrefix ?? this.humanPrefix;
        this.aiPrefix = fields?.aiPrefix ?? this.aiPrefix;
        this.memoryKey = fields?.memoryKey ?? this.memoryKey;
    }
    get memoryKeys() {
        return [this.memoryKey];
    }
    /**
     * Loads the memory variables. It takes an `InputValues` object as a
     * parameter and returns a `Promise` that resolves with a
     * `MemoryVariables` object.
     * @param _values `InputValues` object.
     * @returns A `Promise` that resolves with a `MemoryVariables` object.
     */
    async loadMemoryVariables(_values) {
        const messages = await this.chatHistory.getMessages();
        if (this.returnMessages) {
            const result = {
                [this.memoryKey]: messages,
            };
            return result;
        }
        const result = {
            [this.memoryKey]: (0, base_js_1.getBufferString)(messages, this.humanPrefix, this.aiPrefix),
        };
        return result;
    }
}
exports.BufferMemory = BufferMemory;
