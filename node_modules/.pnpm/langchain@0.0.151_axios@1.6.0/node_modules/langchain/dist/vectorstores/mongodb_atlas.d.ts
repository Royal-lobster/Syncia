import type { Collection, Document as MongoDBDocument } from "mongodb";
import { MaxMarginalRelevanceSearchOptions, VectorStore } from "./base.js";
import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
/**
 * Type that defines the arguments required to initialize the
 * MongoDBAtlasVectorSearch class. It includes the MongoDB collection,
 * index name, text key, and embedding key.
 */
export type MongoDBAtlasVectorSearchLibArgs = {
    readonly collection: Collection<MongoDBDocument>;
    readonly indexName?: string;
    readonly textKey?: string;
    readonly embeddingKey?: string;
};
/**
 * Type that defines the filter used in the
 * similaritySearchVectorWithScore and maxMarginalRelevanceSearch methods.
 * It includes pre-filter, post-filter pipeline, and a flag to include
 * embeddings.
 */
type MongoDBAtlasFilter = {
    preFilter?: MongoDBDocument;
    postFilterPipeline?: MongoDBDocument[];
    includeEmbeddings?: boolean;
} & MongoDBDocument;
/**
 * Class that is a wrapper around MongoDB Atlas Vector Search. It is used
 * to store embeddings in MongoDB documents, create a vector search index,
 * and perform K-Nearest Neighbors (KNN) search with an approximate
 * nearest neighbor algorithm.
 */
export declare class MongoDBAtlasVectorSearch extends VectorStore {
    FilterType: MongoDBAtlasFilter;
    private readonly collection;
    private readonly indexName;
    private readonly textKey;
    private readonly embeddingKey;
    _vectorstoreType(): string;
    constructor(embeddings: Embeddings, args: MongoDBAtlasVectorSearchLibArgs);
    /**
     * Method to add vectors and their corresponding documents to the MongoDB
     * collection.
     * @param vectors Vectors to be added.
     * @param documents Corresponding documents to be added.
     * @returns Promise that resolves when the vectors and documents have been added.
     */
    addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    /**
     * Method to add documents to the MongoDB collection. It first converts
     * the documents to vectors using the embeddings and then calls the
     * addVectors method.
     * @param documents Documents to be added.
     * @returns Promise that resolves when the documents have been added.
     */
    addDocuments(documents: Document[]): Promise<void>;
    /**
     * Method that performs a similarity search on the vectors stored in the
     * MongoDB collection. It returns a list of documents and their
     * corresponding similarity scores.
     * @param query Query vector for the similarity search.
     * @param k Number of nearest neighbors to return.
     * @param filter Optional filter to be applied.
     * @returns Promise that resolves to a list of documents and their corresponding similarity scores.
     */
    similaritySearchVectorWithScore(query: number[], k: number, filter?: MongoDBAtlasFilter): Promise<[Document, number][]>;
    /**
     * Return documents selected using the maximal marginal relevance.
     * Maximal marginal relevance optimizes for similarity to the query AND diversity
     * among selected documents.
     *
     * @param {string} query - Text to look up documents similar to.
     * @param {number} options.k - Number of documents to return.
     * @param {number} options.fetchK=20- Number of documents to fetch before passing to the MMR algorithm.
     * @param {number} options.lambda=0.5 - Number between 0 and 1 that determines the degree of diversity among the results,
     *                 where 0 corresponds to maximum diversity and 1 to minimum diversity.
     * @param {MongoDBAtlasFilter} options.filter - Optional Atlas Search operator to pre-filter on document fields
     *                                      or post-filter following the knnBeta search.
     *
     * @returns {Promise<Document[]>} - List of documents selected by maximal marginal relevance.
     */
    maxMarginalRelevanceSearch(query: string, options: MaxMarginalRelevanceSearchOptions<this["FilterType"]>): Promise<Document[]>;
    /**
     * Static method to create an instance of MongoDBAtlasVectorSearch from a
     * list of texts. It first converts the texts to vectors and then adds
     * them to the MongoDB collection.
     * @param texts List of texts to be converted to vectors.
     * @param metadatas Metadata for the texts.
     * @param embeddings Embeddings to be used for conversion.
     * @param dbConfig Database configuration for MongoDB Atlas.
     * @returns Promise that resolves to a new instance of MongoDBAtlasVectorSearch.
     */
    static fromTexts(texts: string[], metadatas: object[] | object, embeddings: Embeddings, dbConfig: MongoDBAtlasVectorSearchLibArgs): Promise<MongoDBAtlasVectorSearch>;
    /**
     * Static method to create an instance of MongoDBAtlasVectorSearch from a
     * list of documents. It first converts the documents to vectors and then
     * adds them to the MongoDB collection.
     * @param docs List of documents to be converted to vectors.
     * @param embeddings Embeddings to be used for conversion.
     * @param dbConfig Database configuration for MongoDB Atlas.
     * @returns Promise that resolves to a new instance of MongoDBAtlasVectorSearch.
     */
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig: MongoDBAtlasVectorSearchLibArgs): Promise<MongoDBAtlasVectorSearch>;
}
export {};
