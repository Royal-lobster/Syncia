import { RedisClientOptions, RedisClientType, RedisModules, RedisFunctions, RedisScripts } from "redis";
import { BaseMessage, BaseListChatMessageHistory } from "../../schema/index.js";
/**
 * Type for the input to the `RedisChatMessageHistory` constructor.
 */
export type RedisChatMessageHistoryInput = {
    sessionId: string;
    sessionTTL?: number;
    config?: RedisClientOptions;
    client?: any;
};
/**
 * Class for storing chat message history using Redis. Extends the
 * `BaseListChatMessageHistory` class.
 */
export declare class RedisChatMessageHistory extends BaseListChatMessageHistory {
    lc_namespace: string[];
    get lc_secrets(): {
        "config.url": string;
        "config.username": string;
        "config.password": string;
    };
    client: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
    private sessionId;
    private sessionTTL?;
    constructor(fields: RedisChatMessageHistoryInput);
    /**
     * Ensures the Redis client is ready to perform operations. If the client
     * is not ready, it attempts to connect to the Redis database.
     * @returns Promise resolving to true when the client is ready.
     */
    ensureReadiness(): Promise<boolean>;
    /**
     * Retrieves all chat messages from the Redis database for the current
     * session.
     * @returns Promise resolving to an array of `BaseMessage` instances.
     */
    getMessages(): Promise<BaseMessage[]>;
    /**
     * Adds a new chat message to the Redis database for the current session.
     * @param message The `BaseMessage` instance to add.
     * @returns Promise resolving when the message has been added.
     */
    addMessage(message: BaseMessage): Promise<void>;
    /**
     * Deletes all chat messages from the Redis database for the current
     * session.
     * @returns Promise resolving when the messages have been deleted.
     */
    clear(): Promise<void>;
}
