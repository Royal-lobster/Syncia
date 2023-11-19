import { BaseStore } from "../schema/storage.js";
import { AsyncCallerParams } from "../util/async_caller.js";
import { Embeddings } from "./base.js";
/**
 * Interface for the fields required to initialize an instance of the
 * CacheBackedEmbeddings class.
 */
export interface CacheBackedEmbeddingsFields extends AsyncCallerParams {
    underlyingEmbeddings: Embeddings;
    documentEmbeddingStore: BaseStore<string, number[]>;
}
/**
 * Interface for caching results from embedding models.
 *
 * The interface allows works with any store that implements
 * the abstract store interface accepting keys of type str and values of list of
 * floats.
 *
 * If need be, the interface can be extended to accept other implementations
 * of the value serializer and deserializer, as well as the key encoder.
 */
export declare class CacheBackedEmbeddings extends Embeddings {
    protected underlyingEmbeddings: Embeddings;
    protected documentEmbeddingStore: BaseStore<string, number[]>;
    constructor(fields: CacheBackedEmbeddingsFields);
    /**
     * Embed query text.
     *
     * This method does not support caching at the moment.
     *
     * Support for caching queries is easy to implement, but might make
     * sense to hold off to see the most common patterns.
     *
     * If the cache has an eviction policy, we may need to be a bit more careful
     * about sharing the cache between documents and queries. Generally,
     * one is OK evicting query caches, but document caches should be kept.
     *
     * @param document The text to embed.
     * @returns The embedding for the given text.
     */
    embedQuery(document: string): Promise<number[]>;
    /**
     * Embed a list of texts.
     *
     * The method first checks the cache for the embeddings.
     * If the embeddings are not found, the method uses the underlying embedder
     * to embed the documents and stores the results in the cache.
     *
     * @param documents
     * @returns A list of embeddings for the given texts.
     */
    embedDocuments(documents: string[]): Promise<number[][]>;
    /**
     * Create a new CacheBackedEmbeddings instance from another embeddings instance
     * and a storage instance.
     * @param underlyingEmbeddings Embeddings used to populate the cache for new documents.
     * @param documentEmbeddingStore Stores raw document embedding values. Keys are hashes of the document content.
     * @param options.namespace Optional namespace for store keys.
     * @returns A new CacheBackedEmbeddings instance.
     */
    static fromBytesStore(underlyingEmbeddings: Embeddings, documentEmbeddingStore: BaseStore<string, Uint8Array>, options?: {
        namespace?: string;
    }): CacheBackedEmbeddings;
}
