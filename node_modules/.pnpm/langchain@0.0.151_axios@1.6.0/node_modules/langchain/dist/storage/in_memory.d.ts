import { BaseStore } from "../schema/storage.js";
/**
 * In-memory implementation of the BaseStore using a dictionary. Used for
 * storing key-value pairs in memory.
 */
export declare class InMemoryStore<T = any> extends BaseStore<string, T> {
    lc_namespace: string[];
    protected store: Record<string, T>;
    /**
     * Retrieves the values associated with the given keys from the store.
     * @param keys Keys to retrieve values for.
     * @returns Array of values associated with the given keys.
     */
    mget(keys: string[]): Promise<T[]>;
    /**
     * Sets the values for the given keys in the store.
     * @param keyValuePairs Array of key-value pairs to set in the store.
     * @returns Promise that resolves when all key-value pairs have been set.
     */
    mset(keyValuePairs: [string, T][]): Promise<void>;
    /**
     * Deletes the given keys and their associated values from the store.
     * @param keys Keys to delete from the store.
     * @returns Promise that resolves when all keys have been deleted.
     */
    mdelete(keys: string[]): Promise<void>;
    /**
     * Asynchronous generator that yields keys from the store. If a prefix is
     * provided, it only yields keys that start with the prefix.
     * @param prefix Optional prefix to filter keys.
     * @returns AsyncGenerator that yields keys from the store.
     */
    yieldKeys(prefix?: string | undefined): AsyncGenerator<string>;
}
