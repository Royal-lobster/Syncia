"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBAtlasVectorSearch = void 0;
const base_js_1 = require("./base.cjs");
const document_js_1 = require("../document.cjs");
const math_js_1 = require("../util/math.cjs");
/**
 * Class that is a wrapper around MongoDB Atlas Vector Search. It is used
 * to store embeddings in MongoDB documents, create a vector search index,
 * and perform K-Nearest Neighbors (KNN) search with an approximate
 * nearest neighbor algorithm.
 */
class MongoDBAtlasVectorSearch extends base_js_1.VectorStore {
    _vectorstoreType() {
        return "mongodb_atlas";
    }
    constructor(embeddings, args) {
        super(embeddings, args);
        Object.defineProperty(this, "collection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "indexName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "textKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "embeddingKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.collection = args.collection;
        this.indexName = args.indexName ?? "default";
        this.textKey = args.textKey ?? "text";
        this.embeddingKey = args.embeddingKey ?? "embedding";
    }
    /**
     * Method to add vectors and their corresponding documents to the MongoDB
     * collection.
     * @param vectors Vectors to be added.
     * @param documents Corresponding documents to be added.
     * @returns Promise that resolves when the vectors and documents have been added.
     */
    async addVectors(vectors, documents) {
        const docs = vectors.map((embedding, idx) => ({
            [this.textKey]: documents[idx].pageContent,
            [this.embeddingKey]: embedding,
            ...documents[idx].metadata,
        }));
        await this.collection.insertMany(docs);
    }
    /**
     * Method to add documents to the MongoDB collection. It first converts
     * the documents to vectors using the embeddings and then calls the
     * addVectors method.
     * @param documents Documents to be added.
     * @returns Promise that resolves when the documents have been added.
     */
    async addDocuments(documents) {
        const texts = documents.map(({ pageContent }) => pageContent);
        return this.addVectors(await this.embeddings.embedDocuments(texts), documents);
    }
    /**
     * Method that performs a similarity search on the vectors stored in the
     * MongoDB collection. It returns a list of documents and their
     * corresponding similarity scores.
     * @param query Query vector for the similarity search.
     * @param k Number of nearest neighbors to return.
     * @param filter Optional filter to be applied.
     * @returns Promise that resolves to a list of documents and their corresponding similarity scores.
     */
    async similaritySearchVectorWithScore(query, k, filter) {
        const knnBeta = {
            vector: query,
            path: this.embeddingKey,
            k,
        };
        let preFilter;
        let postFilterPipeline;
        let includeEmbeddings;
        if (filter?.preFilter ||
            filter?.postFilterPipeline ||
            filter?.includeEmbeddings) {
            preFilter = filter.preFilter;
            postFilterPipeline = filter.postFilterPipeline;
            includeEmbeddings = filter.includeEmbeddings || false;
        }
        else
            preFilter = filter;
        if (preFilter) {
            knnBeta.filter = preFilter;
        }
        const pipeline = [
            {
                $search: {
                    index: this.indexName,
                    knnBeta,
                },
            },
            {
                $set: {
                    score: { $meta: "searchScore" },
                },
            },
        ];
        if (!includeEmbeddings) {
            const removeEmbeddingsStage = {
                $project: {
                    [this.embeddingKey]: 0,
                },
            };
            pipeline.push(removeEmbeddingsStage);
        }
        if (postFilterPipeline) {
            pipeline.push(...postFilterPipeline);
        }
        const results = this.collection.aggregate(pipeline);
        const ret = [];
        for await (const result of results) {
            const { score, [this.textKey]: text, ...metadata } = result;
            ret.push([new document_js_1.Document({ pageContent: text, metadata }), score]);
        }
        return ret;
    }
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
    async maxMarginalRelevanceSearch(query, options) {
        const { k, fetchK = 20, lambda = 0.5, filter } = options;
        const queryEmbedding = await this.embeddings.embedQuery(query);
        // preserve the original value of includeEmbeddings
        const includeEmbeddingsFlag = options.filter?.includeEmbeddings || false;
        // update filter to include embeddings, as they will be used in MMR
        const includeEmbeddingsFilter = {
            ...filter,
            includeEmbeddings: true,
        };
        const resultDocs = await this.similaritySearchVectorWithScore(queryEmbedding, fetchK, includeEmbeddingsFilter);
        const embeddingList = resultDocs.map((doc) => doc[0].metadata[this.embeddingKey]);
        const mmrIndexes = (0, math_js_1.maximalMarginalRelevance)(queryEmbedding, embeddingList, lambda, k);
        return mmrIndexes.map((idx) => {
            const doc = resultDocs[idx][0];
            // remove embeddings if they were not requested originally
            if (!includeEmbeddingsFlag) {
                delete doc.metadata[this.embeddingKey];
            }
            return doc;
        });
    }
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
    static async fromTexts(texts, metadatas, embeddings, dbConfig) {
        const docs = [];
        for (let i = 0; i < texts.length; i += 1) {
            const metadata = Array.isArray(metadatas) ? metadatas[i] : metadatas;
            const newDoc = new document_js_1.Document({
                pageContent: texts[i],
                metadata,
            });
            docs.push(newDoc);
        }
        return MongoDBAtlasVectorSearch.fromDocuments(docs, embeddings, dbConfig);
    }
    /**
     * Static method to create an instance of MongoDBAtlasVectorSearch from a
     * list of documents. It first converts the documents to vectors and then
     * adds them to the MongoDB collection.
     * @param docs List of documents to be converted to vectors.
     * @param embeddings Embeddings to be used for conversion.
     * @param dbConfig Database configuration for MongoDB Atlas.
     * @returns Promise that resolves to a new instance of MongoDBAtlasVectorSearch.
     */
    static async fromDocuments(docs, embeddings, dbConfig) {
        const instance = new this(embeddings, dbConfig);
        await instance.addDocuments(docs);
        return instance;
    }
}
exports.MongoDBAtlasVectorSearch = MongoDBAtlasVectorSearch;
