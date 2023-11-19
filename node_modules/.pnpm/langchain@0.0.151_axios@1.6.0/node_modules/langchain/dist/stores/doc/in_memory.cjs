"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynchronousInMemoryDocstore = exports.InMemoryDocstore = void 0;
const index_js_1 = require("../../schema/index.cjs");
/**
 * Class for storing and retrieving documents in memory asynchronously.
 * Extends the Docstore class.
 */
class InMemoryDocstore extends index_js_1.Docstore {
    constructor(docs) {
        super();
        Object.defineProperty(this, "_docs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._docs = docs ?? new Map();
    }
    /**
     * Searches for a document in the store based on its ID.
     * @param search The ID of the document to search for.
     * @returns The document with the given ID.
     */
    async search(search) {
        const result = this._docs.get(search);
        if (!result) {
            throw new Error(`ID ${search} not found.`);
        }
        else {
            return result;
        }
    }
    /**
     * Adds new documents to the store.
     * @param texts An object where the keys are document IDs and the values are the documents themselves.
     * @returns Void
     */
    async add(texts) {
        const keys = [...this._docs.keys()];
        const overlapping = Object.keys(texts).filter((x) => keys.includes(x));
        if (overlapping.length > 0) {
            throw new Error(`Tried to add ids that already exist: ${overlapping}`);
        }
        for (const [key, value] of Object.entries(texts)) {
            this._docs.set(key, value);
        }
    }
}
exports.InMemoryDocstore = InMemoryDocstore;
/**
 * Class for storing and retrieving documents in memory synchronously.
 */
class SynchronousInMemoryDocstore {
    constructor(docs) {
        Object.defineProperty(this, "_docs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._docs = docs ?? new Map();
    }
    /**
     * Searches for a document in the store based on its ID.
     * @param search The ID of the document to search for.
     * @returns The document with the given ID.
     */
    search(search) {
        const result = this._docs.get(search);
        if (!result) {
            throw new Error(`ID ${search} not found.`);
        }
        else {
            return result;
        }
    }
    /**
     * Adds new documents to the store.
     * @param texts An object where the keys are document IDs and the values are the documents themselves.
     * @returns Void
     */
    add(texts) {
        const keys = [...this._docs.keys()];
        const overlapping = Object.keys(texts).filter((x) => keys.includes(x));
        if (overlapping.length > 0) {
            throw new Error(`Tried to add ids that already exist: ${overlapping}`);
        }
        for (const [key, value] of Object.entries(texts)) {
            this._docs.set(key, value);
        }
    }
}
exports.SynchronousInMemoryDocstore = SynchronousInMemoryDocstore;
