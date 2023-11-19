"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGPTPluginRetriever = void 0;
const document_js_1 = require("../../document.cjs");
const base_js_1 = require("./base.cjs");
/**
 * Class that connects ChatGPT to third-party applications via plugins. It
 * extends the RemoteRetriever class and implements the
 * ChatGPTPluginRetrieverParams interface.
 */
class ChatGPTPluginRetriever extends base_js_1.RemoteRetriever {
    constructor({ topK = 4, filter, ...rest }) {
        super(rest);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "retrievers", "remote", "chatgpt-plugin"]
        });
        Object.defineProperty(this, "topK", {
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
        this.topK = topK;
        this.filter = filter;
    }
    /**
     * Creates a JSON body for the request to the ChatGPTRetrievalPlugin
     * server.
     * @param query The query to send to the server.
     * @returns A JSON object representing the body of the request.
     */
    createJsonBody(query) {
        return {
            queries: [
                {
                    query,
                    top_k: this.topK,
                    filter: this.filter,
                },
            ],
        };
    }
    /**
     * Processes the JSON response from the ChatGPTRetrievalPlugin server and
     * returns an array of Document instances.
     * @param json The JSON response from the server.
     * @returns An array of Document instances.
     */
    processJsonResponse(json) {
        const results = json?.results?.[0]?.results;
        if (!results) {
            // Note an empty array of results would not fall into this case
            throw new Error("No results returned from ChatGPTPluginRetriever");
        }
        return results.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result) => new document_js_1.Document({
            pageContent: result.text,
            metadata: result.metadata,
        }));
    }
}
exports.ChatGPTPluginRetriever = ChatGPTPluginRetriever;
