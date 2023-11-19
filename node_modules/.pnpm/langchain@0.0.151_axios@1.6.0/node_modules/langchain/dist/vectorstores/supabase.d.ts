import type { SupabaseClient } from "@supabase/supabase-js";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { VectorStore } from "./base.js";
import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
export type SupabaseMetadata = Record<string, any>;
export type SupabaseFilter = PostgrestFilterBuilder<any, any, any>;
export type SupabaseFilterRPCCall = (rpcCall: SupabaseFilter) => SupabaseFilter;
/**
 * Interface for the arguments required to initialize a Supabase library.
 */
export interface SupabaseLibArgs {
    client: SupabaseClient;
    tableName?: string;
    queryName?: string;
    filter?: SupabaseMetadata | SupabaseFilterRPCCall;
    upsertBatchSize?: number;
}
/**
 * Class for interacting with a Supabase database to store and manage
 * vectors.
 */
export declare class SupabaseVectorStore extends VectorStore {
    FilterType: SupabaseMetadata | SupabaseFilterRPCCall;
    client: SupabaseClient;
    tableName: string;
    queryName: string;
    filter?: SupabaseMetadata | SupabaseFilterRPCCall;
    upsertBatchSize: number;
    _vectorstoreType(): string;
    constructor(embeddings: Embeddings, args: SupabaseLibArgs);
    /**
     * Adds documents to the vector store.
     * @param documents The documents to add.
     * @param options Optional parameters for adding the documents.
     * @returns A promise that resolves when the documents have been added.
     */
    addDocuments(documents: Document[], options?: {
        ids?: string[] | number[];
    }): Promise<string[]>;
    /**
     * Adds vectors to the vector store.
     * @param vectors The vectors to add.
     * @param documents The documents associated with the vectors.
     * @param options Optional parameters for adding the vectors.
     * @returns A promise that resolves with the IDs of the added vectors when the vectors have been added.
     */
    addVectors(vectors: number[][], documents: Document[], options?: {
        ids?: string[] | number[];
    }): Promise<string[]>;
    /**
     * Deletes vectors from the vector store.
     * @param params The parameters for deleting vectors.
     * @returns A promise that resolves when the vectors have been deleted.
     */
    delete(params: {
        ids: string[];
    }): Promise<void>;
    /**
     * Performs a similarity search on the vector store.
     * @param query The query vector.
     * @param k The number of results to return.
     * @param filter Optional filter to apply to the search.
     * @returns A promise that resolves with the search results when the search is complete.
     */
    similaritySearchVectorWithScore(query: number[], k: number, filter?: this["FilterType"]): Promise<[Document, number][]>;
    /**
     * Creates a new SupabaseVectorStore instance from an array of texts.
     * @param texts The texts to create documents from.
     * @param metadatas The metadata for the documents.
     * @param embeddings The embeddings to use.
     * @param dbConfig The configuration for the Supabase database.
     * @returns A promise that resolves with a new SupabaseVectorStore instance when the instance has been created.
     */
    static fromTexts(texts: string[], metadatas: object[] | object, embeddings: Embeddings, dbConfig: SupabaseLibArgs): Promise<SupabaseVectorStore>;
    /**
     * Creates a new SupabaseVectorStore instance from an array of documents.
     * @param docs The documents to create the instance from.
     * @param embeddings The embeddings to use.
     * @param dbConfig The configuration for the Supabase database.
     * @returns A promise that resolves with a new SupabaseVectorStore instance when the instance has been created.
     */
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig: SupabaseLibArgs): Promise<SupabaseVectorStore>;
    /**
     * Creates a new SupabaseVectorStore instance from an existing index.
     * @param embeddings The embeddings to use.
     * @param dbConfig The configuration for the Supabase database.
     * @returns A promise that resolves with a new SupabaseVectorStore instance when the instance has been created.
     */
    static fromExistingIndex(embeddings: Embeddings, dbConfig: SupabaseLibArgs): Promise<SupabaseVectorStore>;
}
