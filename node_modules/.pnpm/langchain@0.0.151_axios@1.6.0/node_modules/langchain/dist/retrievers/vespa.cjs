"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VespaRetriever = void 0;
const document_js_1 = require("../document.cjs");
const base_js_1 = require("./remote/base.cjs");
/**
 * Class responsible for retrieving data from Vespa. It extends the
 * `RemoteRetriever` class and includes methods for creating the JSON body
 * for a query and processing the JSON response from Vespa.
 */
class VespaRetriever extends base_js_1.RemoteRetriever {
    static lc_name() {
        return "VespaRetriever";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "retrievers", "vespa"]
        });
        Object.defineProperty(this, "query_body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "content_field", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.query_body = fields.query_body;
        this.content_field = fields.content_field;
        this.url = `${this.url}/search/?`;
    }
    /**
     * Method that takes a query string as input and returns a JSON object
     * that includes the query and the original `query_body`.
     * @param query The query string to be sent to Vespa.
     * @returns A JSON object that includes the query and the original `query_body`.
     */
    createJsonBody(query) {
        return {
            ...this.query_body,
            query,
        };
    }
    /**
     * Method that processes the JSON response from Vespa into an array of
     * `Document` instances. Each `Document` instance includes the content
     * from the specified `content_field` and the document's ID.
     * @param json The JSON response from Vespa.
     * @returns An array of `Document` instances.
     */
    processJsonResponse(json) {
        return json.root.children.map((doc) => new document_js_1.Document({
            pageContent: doc.fields[this.content_field],
            metadata: { id: doc.id },
        }));
    }
}
exports.VespaRetriever = VespaRetriever;
