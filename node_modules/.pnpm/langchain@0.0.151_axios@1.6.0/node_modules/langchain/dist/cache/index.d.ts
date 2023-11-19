import { Generation, BaseCache } from "../schema/index.js";
/**
 * A cache for storing LLM generations that stores data in memory.
 */
export declare class InMemoryCache<T = Generation[]> extends BaseCache<T> {
    private cache;
    constructor(map?: Map<string, T>);
    /**
     * Retrieves data from the cache using a prompt and an LLM key. If the
     * data is not found, it returns null.
     * @param prompt The prompt used to find the data.
     * @param llmKey The LLM key used to find the data.
     * @returns The data corresponding to the prompt and LLM key, or null if not found.
     */
    lookup(prompt: string, llmKey: string): Promise<T | null>;
    /**
     * Updates the cache with new data using a prompt and an LLM key.
     * @param prompt The prompt used to store the data.
     * @param llmKey The LLM key used to store the data.
     * @param value The data to be stored.
     */
    update(prompt: string, llmKey: string, value: T): Promise<void>;
    /**
     * Returns a global instance of InMemoryCache using a predefined global
     * map as the initial cache.
     * @returns A global instance of InMemoryCache.
     */
    static global(): InMemoryCache;
}
