import { BaseStore } from "../schema/storage.js";
/**
 * Class that extends the BaseStore class to interact with a Redis
 * database. It provides methods for getting, setting, and deleting data,
 * as well as yielding keys from the database.
 */
export class RedisByteStore extends BaseStore {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "storage", "ioredis"]
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ttl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "yieldKeysScanBatchSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1000
        });
        this.client = fields.client;
        this.ttl = fields.ttl;
        this.namespace = fields.namespace;
        this.yieldKeysScanBatchSize =
            fields.yieldKeysScanBatchSize ?? this.yieldKeysScanBatchSize;
    }
    _getPrefixedKey(key) {
        if (this.namespace) {
            const delimiter = "/";
            return `${this.namespace}${delimiter}${key}`;
        }
        return key;
    }
    _getDeprefixedKey(key) {
        if (this.namespace) {
            const delimiter = "/";
            return key.slice(this.namespace.length + delimiter.length);
        }
        return key;
    }
    /**
     * Gets multiple keys from the Redis database.
     * @param keys Array of keys to be retrieved.
     * @returns An array of retrieved values.
     */
    async mget(keys) {
        const prefixedKeys = keys.map(this._getPrefixedKey.bind(this));
        const retrievedValues = await this.client.mgetBuffer(prefixedKeys);
        return retrievedValues.map((key) => {
            if (!key) {
                return undefined;
            }
            else {
                return key;
            }
        });
    }
    /**
     * Sets multiple keys in the Redis database.
     * @param keyValuePairs Array of key-value pairs to be set.
     * @returns Promise that resolves when all keys have been set.
     */
    async mset(keyValuePairs) {
        const decoder = new TextDecoder();
        const encodedKeyValuePairs = keyValuePairs.map(([key, value]) => [
            this._getPrefixedKey(key),
            decoder.decode(value),
        ]);
        const pipeline = this.client.pipeline();
        for (const [key, value] of encodedKeyValuePairs) {
            if (this.ttl) {
                pipeline.set(key, value, "EX", this.ttl);
            }
            else {
                pipeline.set(key, value);
            }
        }
        await pipeline.exec();
    }
    /**
     * Deletes multiple keys from the Redis database.
     * @param keys Array of keys to be deleted.
     * @returns Promise that resolves when all keys have been deleted.
     */
    async mdelete(keys) {
        await this.client.del(...keys.map(this._getPrefixedKey.bind(this)));
    }
    /**
     * Yields keys from the Redis database.
     * @param prefix Optional prefix to filter the keys.
     * @returns An AsyncGenerator that yields keys from the Redis database.
     */
    async *yieldKeys(prefix) {
        let pattern;
        if (prefix) {
            pattern = this._getPrefixedKey(prefix);
        }
        else {
            pattern = this._getPrefixedKey("*");
        }
        let [cursor, batch] = await this.client.scan(0, "MATCH", pattern, "COUNT", this.yieldKeysScanBatchSize);
        for (const key of batch) {
            yield this._getDeprefixedKey(key);
        }
        while (cursor !== "0") {
            [cursor, batch] = await this.client.scan(cursor, "MATCH", pattern, "COUNT", this.yieldKeysScanBatchSize);
            for (const key of batch) {
                yield this._getDeprefixedKey(key);
            }
        }
    }
}
