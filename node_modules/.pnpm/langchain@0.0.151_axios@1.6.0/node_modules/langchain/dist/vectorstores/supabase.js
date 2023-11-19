import { VectorStore } from "./base.js";
import { Document } from "../document.js";
/**
 * Class for interacting with a Supabase database to store and manage
 * vectors.
 */
export class SupabaseVectorStore extends VectorStore {
    _vectorstoreType() {
        return "supabase";
    }
    constructor(embeddings, args) {
        super(embeddings, args);
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queryName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "filter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "upsertBatchSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 500
        });
        this.client = args.client;
        this.tableName = args.tableName || "documents";
        this.queryName = args.queryName || "match_documents";
        this.filter = args.filter;
        this.upsertBatchSize = args.upsertBatchSize ?? this.upsertBatchSize;
    }
    /**
     * Adds documents to the vector store.
     * @param documents The documents to add.
     * @param options Optional parameters for adding the documents.
     * @returns A promise that resolves when the documents have been added.
     */
    async addDocuments(documents, options) {
        const texts = documents.map(({ pageContent }) => pageContent);
        return this.addVectors(await this.embeddings.embedDocuments(texts), documents, options);
    }
    /**
     * Adds vectors to the vector store.
     * @param vectors The vectors to add.
     * @param documents The documents associated with the vectors.
     * @param options Optional parameters for adding the vectors.
     * @returns A promise that resolves with the IDs of the added vectors when the vectors have been added.
     */
    async addVectors(vectors, documents, options) {
        const rows = vectors.map((embedding, idx) => ({
            content: documents[idx].pageContent,
            embedding,
            metadata: documents[idx].metadata,
        }));
        // upsert returns 500/502/504 (yes really any of them) if given too many rows/characters
        // ~2000 trips it, but my data is probably smaller than average pageContent and metadata
        let returnedIds = [];
        for (let i = 0; i < rows.length; i += this.upsertBatchSize) {
            const chunk = rows.slice(i, i + this.upsertBatchSize).map((row, j) => {
                if (options?.ids) {
                    return { id: options.ids[i + j], ...row };
                }
                return row;
            });
            const res = await this.client.from(this.tableName).upsert(chunk).select();
            if (res.error) {
                throw new Error(`Error inserting: ${res.error.message} ${res.status} ${res.statusText}`);
            }
            if (res.data) {
                returnedIds = returnedIds.concat(res.data.map((row) => row.id));
            }
        }
        return returnedIds;
    }
    /**
     * Deletes vectors from the vector store.
     * @param params The parameters for deleting vectors.
     * @returns A promise that resolves when the vectors have been deleted.
     */
    async delete(params) {
        const { ids } = params;
        for (const id of ids) {
            await this.client.from(this.tableName).delete().eq("id", id);
        }
    }
    /**
     * Performs a similarity search on the vector store.
     * @param query The query vector.
     * @param k The number of results to return.
     * @param filter Optional filter to apply to the search.
     * @returns A promise that resolves with the search results when the search is complete.
     */
    async similaritySearchVectorWithScore(query, k, filter) {
        if (filter && this.filter) {
            throw new Error("cannot provide both `filter` and `this.filter`");
        }
        const _filter = filter ?? this.filter ?? {};
        const matchDocumentsParams = {
            query_embedding: query,
        };
        let filterFunction;
        if (typeof _filter === "function") {
            filterFunction = (rpcCall) => _filter(rpcCall).limit(k);
        }
        else if (typeof _filter === "object") {
            matchDocumentsParams.filter = _filter;
            matchDocumentsParams.match_count = k;
            filterFunction = (rpcCall) => rpcCall;
        }
        else {
            throw new Error("invalid filter type");
        }
        const rpcCall = this.client.rpc(this.queryName, matchDocumentsParams);
        const { data: searches, error } = await filterFunction(rpcCall);
        if (error) {
            throw new Error(`Error searching for documents: ${error.code} ${error.message} ${error.details}`);
        }
        const result = searches.map((resp) => [
            new Document({
                metadata: resp.metadata,
                pageContent: resp.content,
            }),
            resp.similarity,
        ]);
        return result;
    }
    /**
     * Creates a new SupabaseVectorStore instance from an array of texts.
     * @param texts The texts to create documents from.
     * @param metadatas The metadata for the documents.
     * @param embeddings The embeddings to use.
     * @param dbConfig The configuration for the Supabase database.
     * @returns A promise that resolves with a new SupabaseVectorStore instance when the instance has been created.
     */
    static async fromTexts(texts, metadatas, embeddings, dbConfig) {
        const docs = [];
        for (let i = 0; i < texts.length; i += 1) {
            const metadata = Array.isArray(metadatas) ? metadatas[i] : metadatas;
            const newDoc = new Document({
                pageContent: texts[i],
                metadata,
            });
            docs.push(newDoc);
        }
        return SupabaseVectorStore.fromDocuments(docs, embeddings, dbConfig);
    }
    /**
     * Creates a new SupabaseVectorStore instance from an array of documents.
     * @param docs The documents to create the instance from.
     * @param embeddings The embeddings to use.
     * @param dbConfig The configuration for the Supabase database.
     * @returns A promise that resolves with a new SupabaseVectorStore instance when the instance has been created.
     */
    static async fromDocuments(docs, embeddings, dbConfig) {
        const instance = new this(embeddings, dbConfig);
        await instance.addDocuments(docs);
        return instance;
    }
    /**
     * Creates a new SupabaseVectorStore instance from an existing index.
     * @param embeddings The embeddings to use.
     * @param dbConfig The configuration for the Supabase database.
     * @returns A promise that resolves with a new SupabaseVectorStore instance when the instance has been created.
     */
    static async fromExistingIndex(embeddings, dbConfig) {
        const instance = new this(embeddings, dbConfig);
        return instance;
    }
}
