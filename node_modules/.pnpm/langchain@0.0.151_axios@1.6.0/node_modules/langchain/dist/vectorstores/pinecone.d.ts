import { VectorStore } from "./base.js";
import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
import { AsyncCaller, type AsyncCallerParams } from "../util/async_caller.js";
type PineconeMetadata = Record<string, any>;
type VectorOperationsApi = ReturnType<import("@pinecone-database/pinecone").PineconeClient["Index"]>;
export interface PineconeLibArgs extends AsyncCallerParams {
    pineconeIndex: VectorOperationsApi;
    textKey?: string;
    namespace?: string;
    filter?: PineconeMetadata;
}
/**
 * Type that defines the parameters for the delete operation in the
 * PineconeStore class. It includes ids, deleteAll flag, and namespace.
 */
export type PineconeDeleteParams = {
    ids?: string[];
    deleteAll?: boolean;
    namespace?: string;
};
/**
 * Class that extends the VectorStore class and provides methods to
 * interact with the Pinecone vector database.
 */
export declare class PineconeStore extends VectorStore {
    FilterType: PineconeMetadata;
    textKey: string;
    namespace?: string;
    pineconeIndex: VectorOperationsApi;
    filter?: PineconeMetadata;
    caller: AsyncCaller;
    _vectorstoreType(): string;
    constructor(embeddings: Embeddings, args: PineconeLibArgs);
    /**
     * Method that adds documents to the Pinecone database.
     * @param documents Array of documents to add to the Pinecone database.
     * @param options Optional ids for the documents.
     * @returns Promise that resolves with the ids of the added documents.
     */
    addDocuments(documents: Document[], options?: {
        ids?: string[];
    } | string[]): Promise<string[]>;
    /**
     * Method that adds vectors to the Pinecone database.
     * @param vectors Array of vectors to add to the Pinecone database.
     * @param documents Array of documents associated with the vectors.
     * @param options Optional ids for the vectors.
     * @returns Promise that resolves with the ids of the added vectors.
     */
    addVectors(vectors: number[][], documents: Document[], options?: {
        ids?: string[];
    } | string[]): Promise<string[]>;
    /**
     * Method that deletes vectors from the Pinecone database.
     * @param params Parameters for the delete operation.
     * @returns Promise that resolves when the delete operation is complete.
     */
    delete(params: PineconeDeleteParams): Promise<void>;
    /**
     * Method that performs a similarity search in the Pinecone database and
     * returns the results along with their scores.
     * @param query Query vector for the similarity search.
     * @param k Number of top results to return.
     * @param filter Optional filter to apply to the search.
     * @returns Promise that resolves with an array of documents and their scores.
     */
    similaritySearchVectorWithScore(query: number[], k: number, filter?: PineconeMetadata): Promise<[Document, number][]>;
    /**
     * Static method that creates a new instance of the PineconeStore class
     * from texts.
     * @param texts Array of texts to add to the Pinecone database.
     * @param metadatas Metadata associated with the texts.
     * @param embeddings Embeddings to use for the texts.
     * @param dbConfig Configuration for the Pinecone database.
     * @returns Promise that resolves with a new instance of the PineconeStore class.
     */
    static fromTexts(texts: string[], metadatas: object[] | object, embeddings: Embeddings, dbConfig: {
        /**
         * @deprecated Use pineconeIndex instead
         */
        pineconeClient: VectorOperationsApi;
        textKey?: string;
        namespace?: string | undefined;
    } | PineconeLibArgs): Promise<PineconeStore>;
    /**
     * Static method that creates a new instance of the PineconeStore class
     * from documents.
     * @param docs Array of documents to add to the Pinecone database.
     * @param embeddings Embeddings to use for the documents.
     * @param dbConfig Configuration for the Pinecone database.
     * @returns Promise that resolves with a new instance of the PineconeStore class.
     */
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig: PineconeLibArgs): Promise<PineconeStore>;
    /**
     * Static method that creates a new instance of the PineconeStore class
     * from an existing index.
     * @param embeddings Embeddings to use for the documents.
     * @param dbConfig Configuration for the Pinecone database.
     * @returns Promise that resolves with a new instance of the PineconeStore class.
     */
    static fromExistingIndex(embeddings: Embeddings, dbConfig: PineconeLibArgs): Promise<PineconeStore>;
}
export {};
