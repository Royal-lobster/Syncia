"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncoderBackedStore = void 0;
const storage_js_1 = require("../schema/storage.cjs");
/**
 * Class that provides a layer of abstraction over the base storage,
 * allowing for the encoding and decoding of keys and values. It extends
 * the BaseStore class.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class EncoderBackedStore extends storage_js_1.BaseStore {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "storage", "encoder_backed"]
        });
        Object.defineProperty(this, "store", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "keyEncoder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "valueSerializer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "valueDeserializer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.store = fields.store;
        this.keyEncoder = fields.keyEncoder;
        this.valueSerializer = fields.valueSerializer;
        this.valueDeserializer = fields.valueDeserializer;
    }
    /**
     * Method to get multiple keys at once. It works with the encoded keys and
     * serialized values.
     * @param keys Array of keys to get
     * @returns Promise that resolves with an array of values or undefined for each key
     */
    async mget(keys) {
        const encodedKeys = keys.map(this.keyEncoder);
        const values = await this.store.mget(encodedKeys);
        return values.map((value) => {
            if (value === undefined) {
                return undefined;
            }
            return this.valueDeserializer(value);
        });
    }
    /**
     * Method to set multiple keys at once. It works with the encoded keys and
     * serialized values.
     * @param keyValuePairs Array of key-value pairs to set
     * @returns Promise that resolves when the operation is complete
     */
    async mset(keyValuePairs) {
        const encodedPairs = keyValuePairs.map(([key, value]) => [this.keyEncoder(key), this.valueSerializer(value)]);
        return this.store.mset(encodedPairs);
    }
    /**
     * Method to delete multiple keys at once. It works with the encoded keys.
     * @param keys Array of keys to delete
     * @returns Promise that resolves when the operation is complete
     */
    async mdelete(keys) {
        const encodedKeys = keys.map(this.keyEncoder);
        return this.store.mdelete(encodedKeys);
    }
    /**
     * Method to yield keys. It works with the encoded keys.
     * @param prefix Optional prefix to filter keys
     * @returns AsyncGenerator that yields keys
     */
    async *yieldKeys(prefix) {
        yield* this.store.yieldKeys(prefix);
    }
}
exports.EncoderBackedStore = EncoderBackedStore;
