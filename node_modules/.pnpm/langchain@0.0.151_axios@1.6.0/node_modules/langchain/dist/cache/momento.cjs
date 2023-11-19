"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MomentoCache = void 0;
/* eslint-disable no-instanceof/no-instanceof */
const sdk_1 = require("@gomomento/sdk");
const index_js_1 = require("../schema/index.cjs");
const base_js_1 = require("./base.cjs");
const momento_js_1 = require("../util/momento.cjs");
/**
 * A cache that uses Momento as the backing store.
 * See https://gomomento.com.
 */
class MomentoCache extends index_js_1.BaseCache {
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
            await (0, momento_js_1.ensureCacheExists)(props.client, props.cacheName);
        }
        return instance;
    }
    /**
     * Validate the user-specified TTL, if provided, is strictly positive.
     * @param ttlSeconds The TTL to validate.
     */
    validateTtlSeconds(ttlSeconds) {
        if (ttlSeconds !== undefined && ttlSeconds <= 0) {
            throw new sdk_1.InvalidArgumentError("ttlSeconds must be positive.");
        }
    }
    /**
     * Lookup LLM generations in cache by prompt and associated LLM key.
     * @param prompt The prompt to lookup.
     * @param llmKey The LLM key to lookup.
     * @returns The generations associated with the prompt and LLM key, or null if not found.
     */
    async lookup(prompt, llmKey) {
        const key = (0, base_js_1.getCacheKey)(prompt, llmKey);
        const getResponse = await this.client.get(this.cacheName, key);
        if (getResponse instanceof sdk_1.CacheGet.Hit) {
            const value = getResponse.valueString();
            return JSON.parse(value);
        }
        else if (getResponse instanceof sdk_1.CacheGet.Miss) {
            return null;
        }
        else if (getResponse instanceof sdk_1.CacheGet.Error) {
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
        const key = (0, base_js_1.getCacheKey)(prompt, llmKey);
        const setResponse = await this.client.set(this.cacheName, key, JSON.stringify(value), { ttl: this.ttlSeconds });
        if (setResponse instanceof sdk_1.CacheSet.Success) {
            // pass
        }
        else if (setResponse instanceof sdk_1.CacheSet.Error) {
            throw setResponse.innerException();
        }
        else {
            throw new Error(`Unknown response type: ${setResponse.toString()}`);
        }
    }
}
exports.MomentoCache = MomentoCache;
