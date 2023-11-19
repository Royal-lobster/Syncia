import { Redis, RedisOptions } from "ioredis";
import { BaseMessage, BaseListChatMessageHistory } from "../../schema/index.js";
/**
 * Type for the input parameter of the RedisChatMessageHistory
 * constructor. It includes fields for the session ID, session TTL, Redis
 * URL, Redis configuration, and Redis client.
 */
export type RedisChatMessageHistoryInput = {
    sessionId: string;
    sessionTTL?: number;
    url?: string;
    config?: RedisOptions;
    client?: Redis;
};
/**
 * Class used to store chat message history in Redis. It provides methods
 * to add, retrieve, and clear messages from the chat history.
 */
export declare class RedisChatMessageHistory extends BaseListChatMessageHistory {
    lc_namespace: string[];
    get lc_secrets(): {
        url: string;
        "config.username": string;
        "config.password": string;
    };
    client: Redis;
    private sessionId;
    private sessionTTL?;
    constructor(fields: RedisChatMessageHistoryInput);
    /**
     * Retrieves all messages from the chat history.
     * @returns Promise that resolves with an array of BaseMessage instances.
     */
    getMessages(): Promise<BaseMessage[]>;
    /**
     * Adds a message to the chat history.
     * @param message The message to add to the chat history.
     * @returns Promise that resolves when the message has been added.
     */
    addMessage(message: BaseMessage): Promise<void>;
    /**
     * Clears all messages from the chat history.
     * @returns Promise that resolves when the chat history has been cleared.
     */
    clear(): Promise<void>;
}
