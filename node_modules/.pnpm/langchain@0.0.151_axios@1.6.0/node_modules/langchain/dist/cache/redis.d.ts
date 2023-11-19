import type { createCluster, createClient } from "redis";
import { BaseCache, Generation } from "../schema/index.js";
/**
 * Represents the type of the Redis client used to interact with the Redis
 * database.
 */
type RedisClientType = ReturnType<typeof createClient> | ReturnType<typeof createCluster>;
/**
 * Represents a specific implementation of a caching mechanism using Redis
 * as the underlying storage system. It extends the `BaseCache` class and
 * overrides its methods to provide the Redis-specific logic.
 */
export declare class RedisCache extends BaseCache {
    private redisClient;
    constructor(redisClient: RedisClientType);
    /**
     * Retrieves data from the cache. It constructs a cache key from the given
     * `prompt` and `llmKey`, and retrieves the corresponding value from the
     * Redis database.
     * @param prompt The prompt used to construct the cache key.
     * @param llmKey The LLM key used to construct the cache key.
     * @returns An array of Generations if found, null otherwise.
     */
    lookup(prompt: string, llmKey: string): Promise<Generation[] | null>;
    /**
     * Updates the cache with new data. It constructs a cache key from the
     * given `prompt` and `llmKey`, and stores the `value` in the Redis
     * database.
     * @param prompt The prompt used to construct the cache key.
     * @param llmKey The LLM key used to construct the cache key.
     * @param value The value to be stored in the cache.
     */
    update(prompt: string, llmKey: string, value: Generation[]): Promise<void>;
}
export {};
