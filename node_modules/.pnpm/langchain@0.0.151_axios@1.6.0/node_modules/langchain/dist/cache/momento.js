/* eslint-disable no-instanceof/no-instanceof */
import { CacheGet, CacheSet, InvalidArgumentError, } from "@gomomento/sdk";
import { BaseCache } from "../schema/index.js";
import { getCacheKey } from "./base.js";
import { ensureCacheExists } from "../util/momento.js";
/**
 * A cache that uses Momento as the backing store.
 * See https://gomomento.com.
 */
export class MomentoCache extends BaseCache {
    constructor(props) {
        super();
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cacheName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ttlSeconds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = props.client;
        this.cacheName = props.cacheName;
        this.validateTtlSeconds(props.ttlSeconds);
        this.ttlSeconds = props.ttlSeconds;
    }
    /**
     * Create a new standard cache backed by Momento.
     *
     * @param {MomentoCacheProps} props The settings to instantiate the cache.
     * @param {ICacheClient} props.client The Momento cache client.
     * @param {string} props.cacheName The name of the cache to use to store the data.
     * @param {number} props.ttlSeconds The time to live for the cache items. If not specified,
     * the cache client default is used.
     * @param {boolean} props.ensureCacheExists If true, ensure that the cache exists before returning.
     * If false, the cache is not checked for existence. Defaults to true.
     * @throws {@link InvalidArgumentError} if {@link props.ttlSeconds} is not strictly positive.
     * @returns The Momento-backed cache.
     */
    static async fromProps(props) {
        const instance = new MomentoCache(props);
        if (props.ensureCacheExists || props.ensureCacheExists === undefined) {
            await ensureCacheExists(props.client, props.cacheName);
        }
        return instance;
    }
    /**
     * Validate the user-specified TTL, if provided, is strictly positive.
     * @param ttlSeconds The TTL to validate.
     */
    validateTtlSeconds(ttlSeconds) {
        if (ttlSeconds !== undefined && ttlSeconds <= 0) {
            throw new InvalidArgumentError("ttlSeconds must be positive.");
        }
    }
    /**
     * Lookup LLM generations in cache by prompt and associated LLM key.
     * @param prompt The prompt to lookup.
     * @param llmKey The LLM key to lookup.
     * @returns The generations associated with the prompt and LLM key, or null if not found.
     */
    async lookup(prompt, llmKey) {
        const key = getCacheKey(prompt, llmKey);
        const getResponse = await this.client.get(this.cacheName, key);
        if (getResponse instanceof CacheGet.Hit) {
            const value = getResponse.valueString();
            return JSON.parse(value);
        }
        else if (getResponse instanceof CacheGet.Miss) {
            return null;
        }
        else if (getResponse instanceof CacheGet.Error) {
            throw getResponse.innerException();
        }
        else {
            throw new Error(`Unknown response type: ${getResponse.toString()}`);
        }
    }
    /**
     * Update the cache with the given generations.
     *
     * Note this overwrites any existing generations for the given prompt and LLM key.
     *
     * @param prompt The prompt to update.
     * @param llmKey The LLM key to update.
     * @param value The generations to store.
     */
    async update(prompt, llmKey, value) {
        const key = getCacheKey(prompt, llmKey);
        const setResponse = await this.client.set(this.cacheName, key, JSON.stringify(value), { ttl: this.ttlSeconds });
        if (setResponse instanceof CacheSet.Success) {
            // pass
        }
        else if (setResponse instanceof CacheSet.Error) {
            throw setResponse.innerException();
        }
        else {
            throw new Error(`Unknown response type: ${setResponse.toString()}`);
        }
    }
}
