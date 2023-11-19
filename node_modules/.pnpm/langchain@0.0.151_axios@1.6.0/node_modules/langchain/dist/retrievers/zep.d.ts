import { ZepClient } from "@getzep/zep-js";
import { BaseRetriever, BaseRetrieverInput } from "../schema/retriever.js";
import { Document } from "../document.js";
/**
 * Configuration interface for the ZepRetriever class. Extends the
 * BaseRetrieverInput interface.
 */
export interface ZepRetrieverConfig extends BaseRetrieverInput {
    sessionId: string;
    url: string;
    topK?: number;
    apiKey?: string;
}
/**
 * Class for retrieving information from a Zep long-term memory store.
 * Extends the BaseRetriever class.
 */
export declare class ZepRetriever extends BaseRetriever {
    static lc_name(): string;
    lc_namespace: string[];
    get lc_secrets(): {
        [key: string]: string;
    } | undefined;
    get lc_aliases(): {
        [key: string]: string;
    } | undefined;
    zepClientPromise: Promise<ZepClient>;
    private sessionId;
    private topK?;
    constructor(config: ZepRetrieverConfig);
    /**
     *  Converts an array of search results to an array of Document objects.
     *  @param {MemorySearchResult[]} results - The array of search results.
     *  @returns {Document[]} An array of Document objects representing the search results.
     */
    private searchResultToDoc;
    /**
     *  Retrieves the relevant documents based on the given query.
     *  @param {string} query - The query string.
     *  @returns {Promise<Document[]>} A promise that resolves to an array of relevant Document objects.
     */
    _getRelevantDocuments(query: string): Promise<Document[]>;
}
