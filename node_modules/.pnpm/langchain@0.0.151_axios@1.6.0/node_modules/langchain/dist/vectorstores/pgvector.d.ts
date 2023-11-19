import { type Pool, type PoolClient, type PoolConfig } from "pg";
import { VectorStore } from "./base.js";
import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
type Metadata = Record<string, unknown>;
/**
 * Interface that defines the arguments required to create a
 * `PGVectorStore` instance. It includes Postgres connection options,
 * table name, filter, and verbosity level.
 */
export interface PGVectorStoreArgs {
    postgresConnectionOptions: PoolConfig;
    tableName: string;
    columns?: {
        idColumnName?: string;
        vectorColumnName?: string;
        contentColumnName?: string;
        metadataColumnName?: string;
    };
    filter?: Metadata;
    verbose?: boolean;
}
/**
 * Class that provides an interface to a Postgres vector database. It
 * extends the `VectorStore` base class and implements methods for adding
 * documents and vectors, performing similarity searches, and ensuring the
 * existence of a table in the database.
 */
export declare class PGVectorStore extends VectorStore {
    FilterType: Metadata;
    tableName: string;
    idColumnName: string;
    vectorColumnName: string;
    contentColumnName: string;
    metadataColumnName: string;
    filter?: Metadata;
    _verbose?: boolean;
    pool: Pool;
    client?: PoolClient;
    _vectorstoreType(): string;
    private constructor();
    /**
     * Static method to create a new `PGVectorStore` instance from a
     * connection. It creates a table if one does not exist, and calls
     * `connect` to return a new instance of `PGVectorStore`.
     *
     * @param embeddings - Embeddings instance.
     * @param fields - `PGVectorStoreArgs` instance.
     * @returns A new instance of `PGVectorStore`.
     */
    static initialize(embeddings: Embeddings, config: PGVectorStoreArgs): Promise<PGVectorStore>;
    protected _initializeClient(): Promise<void>;
    /**
     * Method to add documents to the vector store. It converts the documents into
     * vectors, and adds them to the store.
     *
     * @param documents - Array of `Document` instances.
     * @returns Promise that resolves when the documents have been added.
     */
    addDocuments(documents: Document[]): Promise<void>;
    /**
     * Generates the SQL placeholders for a specific row at the provided index.
     *
     * @param index - The index of the row for which placeholders need to be generated.
     * @returns The SQL placeholders for the row values.
     */
    private generatePlaceholderForRowAt;
    /**
     * Constructs the SQL query for inserting rows into the specified table.
     *
     * @param rows - The rows of data to be inserted, consisting of values and records.
     * @param chunkIndex - The starting index for generating query placeholders based on chunk positioning.
     * @returns The complete SQL INSERT INTO query string.
     */
    private buildInsertQuery;
    /**
     * Method to add vectors to the vector store. It converts the vectors into
     * rows and inserts them into the database.
     *
     * @param vectors - Array of vectors.
     * @param documents - Array of `Document` instances.
     * @returns Promise that resolves when the vectors have been added.
     */
    addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    /**
     * Method to perform a similarity search in the vector store. It returns
     * the `k` most similar documents to the query vector, along with their
     * similarity scores.
     *
     * @param query - Query vector.
     * @param k - Number of most similar documents to return.
     * @param filter - Optional filter to apply to the search.
     * @returns Promise that resolves with an array of tuples, each containing a `Document` and its similarity score.
     */
    similaritySearchVectorWithScore(query: number[], k: number, filter?: this["FilterType"]): Promise<[Document, number][]>;
    /**
     * Method to ensure the existence of the table in the database. It creates
     * the table if it does not already exist.
     *
     * @returns Promise that resolves when the table has been ensured.
     */
    ensureTableInDatabase(): Promise<void>;
    /**
     * Static method to create a new `PGVectorStore` instance from an
     * array of texts and their metadata. It converts the texts into
     * `Document` instances and adds them to the store.
     *
     * @param texts - Array of texts.
     * @param metadatas - Array of metadata objects or a single metadata object.
     * @param embeddings - Embeddings instance.
     * @param dbConfig - `PGVectorStoreArgs` instance.
     * @returns Promise that resolves with a new instance of `PGVectorStore`.
     */
    static fromTexts(texts: string[], metadatas: object[] | object, embeddings: Embeddings, dbConfig: PGVectorStoreArgs): Promise<PGVectorStore>;
    /**
     * Static method to create a new `PGVectorStore` instance from an
     * array of `Document` instances. It adds the documents to the store.
     *
     * @param docs - Array of `Document` instances.
     * @param embeddings - Embeddings instance.
     * @param dbConfig - `PGVectorStoreArgs` instance.
     * @returns Promise that resolves with a new instance of `PGVectorStore`.
     */
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig: PGVectorStoreArgs): Promise<PGVectorStore>;
    /**
     * Closes all the clients in the pool and terminates the pool.
     *
     * @returns Promise that resolves when all clients are closed and the pool is terminated.
     */
    end(): Promise<void>;
}
export {};
