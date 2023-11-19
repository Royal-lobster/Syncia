import { Redis } from "@upstash/redis";
import { BaseCache } from "../schema/index.js";
import { getCacheKey } from "./base.js";
/**
 * A cache that uses Upstash as the backing store.
 * See https://docs.upstash.com/redis.
 */
export class UpstashRedisCache extends BaseCache {
    constructor(props) {
        super();
        Object.defineProperty(this, "redisClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { config, client } = props;
        if (client) {
            this.redisClient = client;
        }
        else if (config) {
            this.redisClient = new Redis(config);
        }
        else {
            throw new Error(`Upstash Redis caches require either a config object or a pre-configured client.`);
        }
    }
    /**
     * Lookup LLM generations in cache by prompt and associated LLM key.
     */
    async lookup(prompt, llmKey) {
        let idx = 0;
        let key = getCacheKey(prompt, llmKey, String(idx));
        let value = await this.redisClient.get(key);
        const generations = [];
        while (value) {
            if (!value) {
                break;
            }
            generations.push({ text: value });
            idx += 1;
            key = getCacheKey(prompt, llmKey, String(idx));
            value = await this.redisClient.get(key);
        }
        return generations.length > 0 ? generations : null;
    }
    /**
     * Update the cache with the given generations.
     *
     * Note this overwrites any existing generations for the given prompt and LLM key.
     */
    async update(prompt, llmKey, value) {
        for (let i = 0; i < value.length; i += 1) {
            const key = getCacheKey(prompt, llmKey, String(i));
            await this.redisClient.set(key, value[i].text);
        }
    }
}
