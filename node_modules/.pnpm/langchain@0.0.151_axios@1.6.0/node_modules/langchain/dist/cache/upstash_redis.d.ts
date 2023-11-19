import { Redis, type RedisConfigNodejs } from "@upstash/redis";
import { BaseCache, Generation } from "../schema/index.js";
export type UpstashRedisCacheProps = {
    /**
     * The config to use to instantiate an Upstash Redis client.
     */
    config?: RedisConfigNodejs;
    /**
     * An existing Upstash Redis client.
     */
    client?: Redis;
};
/**
 * A cache that uses Upstash as the backing store.
 * See https://docs.upstash.com/redis.
 */
export declare class UpstashRedisCache extends BaseCache {
    private redisClient;
    constructor(props: UpstashRedisCacheProps);
    /**
     * Lookup LLM generations in cache by prompt and associated LLM key.
     */
    lookup(prompt: string, llmKey: string): Promise<Generation[] | null>;
    /**
     * Update the cache with the given generations.
     *
     * Note this overwrites any existing generations for the given prompt and LLM key.
     */
    update(prompt: string, llmKey: string, value: Generation[]): Promise<void>;
}
