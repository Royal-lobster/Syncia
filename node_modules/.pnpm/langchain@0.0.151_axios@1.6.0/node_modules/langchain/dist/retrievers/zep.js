import { NotFoundError, ZepClient, } from "@getzep/zep-js";
import { BaseRetriever } from "../schema/retriever.js";
import { Document } from "../document.js";
/**
 * Class for retrieving information from a Zep long-term memory store.
 * Extends the BaseRetriever class.
 */
export class ZepRetriever extends BaseRetriever {
    static lc_name() {
        return "ZepRetriever";
    }
    get lc_secrets() {
        return {
            apiKey: "ZEP_API_KEY",
            url: "ZEP_API_URL",
        };
    }
    get lc_aliases() {
        return { apiKey: "api_key" };
    }
    constructor(config) {
        super(config);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "retrievers", "zep"]
        });
        Object.defineProperty(this, "zepClientPromise", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sessionId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "topK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.sessionId = config.sessionId;
        this.topK = config.topK;
        this.zepClientPromise = ZepClient.init(config.url, config.apiKey);
    }
    /**
     *  Converts an array of search results to an array of Document objects.
     *  @param {MemorySearchResult[]} results - The array of search results.
     *  @returns {Document[]} An array of Document objects representing the search results.
     */
    searchResultToDoc(results) {
        return results
            .filter((r) => r.message)
            .map(({ message: { content } = {}, ...metadata }, dist) => new Document({
            pageContent: content ?? "",
            metadata: { score: dist, ...metadata },
        }));
    }
    /**
     *  Retrieves the relevant documents based on the given query.
     *  @param {string} query - The query string.
     *  @returns {Promise<Document[]>} A promise that resolves to an array of relevant Document objects.
     */
    async _getRelevantDocuments(query) {
        const payload = { text: query, metadata: {} };
        // Wait for ZepClient to be initialized
        const zepClient = await this.zepClientPromise;
        if (!zepClient) {
            throw new Error("ZepClient is not initialized");
        }
        try {
            const results = await zepClient.memory.searchMemory(this.sessionId, payload, this.topK);
            return this.searchResultToDoc(results);
        }
        catch (error) {
            // eslint-disable-next-line no-instanceof/no-instanceof
            if (error instanceof NotFoundError) {
                return Promise.resolve([]); // Return an empty Document array
            }
            // If it's not a NotFoundError, throw the error again
            throw error;
        }
    }
}
