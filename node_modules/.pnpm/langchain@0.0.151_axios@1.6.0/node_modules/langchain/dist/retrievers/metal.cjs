"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetalRetriever = void 0;
const retriever_js_1 = require("../schema/retriever.cjs");
const document_js_1 = require("../document.cjs");
/**
 * Class used to interact with the Metal service, a managed retrieval &
 * memory platform. It allows you to index your data into Metal and run
 * semantic search and retrieval on it. It extends the `BaseRetriever`
 * class and requires a `Metal` instance and a dictionary of parameters to
 * pass to the Metal API during its initialization.
 */
class MetalRetriever extends retriever_js_1.BaseRetriever {
    static lc_name() {
        return "MetalRetriever";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "retrievers", "metal"]
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = fields.client;
    }
    async _getRelevantDocuments(query) {
        const res = await this.client.search({ text: query });
        const items = ("data" in res ? res.data : res);
        return items.map(({ text, metadata }) => new document_js_1.Document({
            pageContent: text,
            metadata: metadata,
        }));
    }
}
exports.MetalRetriever = MetalRetriever;
