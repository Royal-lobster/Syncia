import { LLMChain } from "../chains/llm_chain.js";
import { SystemMessage } from "../schema/index.js";
import { getBufferString, } from "./base.js";
import { BaseChatMemory } from "./chat_memory.js";
import { SUMMARY_PROMPT } from "./prompt.js";
/**
 * Abstract class that provides a structure for storing and managing the
 * memory of a conversation. It includes methods for predicting a new
 * summary for the conversation given the existing messages and summary.
 */
export class BaseConversationSummaryMemory extends BaseChatMemory {
    constructor(fields) {
        const { returnMessages, inputKey, outputKey, chatHistory, humanPrefix, aiPrefix, llm, prompt, summaryChatMessageClass, } = fields;
        super({ returnMessages, inputKey, outputKey, chatHistory });
        Object.defineProperty(this, "memoryKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "history"
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
        Object.defineProperty(this, "llm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "prompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: SUMMARY_PROMPT
        });
        Object.defineProperty(this, "summaryChatMessageClass", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: SystemMessage
        });
        this.memoryKey = fields?.memoryKey ?? this.memoryKey;
        this.humanPrefix = humanPrefix ?? this.humanPrefix;
        this.aiPrefix = aiPrefix ?? this.aiPrefix;
        this.llm = llm;
        this.prompt = prompt ?? this.prompt;
        this.summaryChatMessageClass =
            summaryChatMessageClass ?? this.summaryChatMessageClass;
    }
    /**
     * Predicts a new summary for the conversation given the existing messages
     * and summary.
     * @param messages Existing messages in the conversation.
     * @param existingSummary Current summary of the conversation.
     * @returns A promise that resolves to a new summary string.
     */
    async predictNewSummary(messages, existingSummary) {
        const newLines = getBufferString(messages, this.humanPrefix, this.aiPrefix);
        const chain = new LLMChain({ llm: this.llm, prompt: this.prompt });
        return await chain.predict({
            summary: existingSummary,
            new_lines: newLines,
        });
    }
}
/**
 * Class that provides a concrete implementation of the conversation
 * memory. It includes methods for loading memory variables, saving
 * context, and clearing the memory.
 */
export class ConversationSummaryMemory extends BaseConversationSummaryMemory {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "buffer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
    }
    get memoryKeys() {
        return [this.memoryKey];
    }
    /**
     * Loads the memory variables for the conversation memory.
     * @returns A promise that resolves to an object containing the memory variables.
     */
    async loadMemoryVariables(_) {
        if (this.returnMessages) {
            const result = {
                [this.memoryKey]: [new this.summaryChatMessageClass(this.buffer)],
            };
            return result;
        }
        const result = { [this.memoryKey]: this.buffer };
        return result;
    }
    /**
     * Saves the context of the conversation memory.
     * @param inputValues Input values for the conversation.
     * @param outputValues Output values from the conversation.
     * @returns A promise that resolves when the context has been saved.
     */
    async saveContext(inputValues, outputValues) {
        await super.saveContext(inputValues, outputValues);
        const messages = await this.chatHistory.getMessages();
        this.buffer = await this.predictNewSummary(messages.slice(-2), this.buffer);
    }
    /**
     * Clears the conversation memory.
     * @returns A promise that resolves when the memory has been cleared.
     */
    async clear() {
        await super.clear();
        this.buffer = "";
    }
}
