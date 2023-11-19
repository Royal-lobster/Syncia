"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMetadataTaggerFromZod = exports.createMetadataTagger = exports.MetadataTagger = void 0;
const zod_to_json_schema_1 = require("zod-to-json-schema");
const document_js_1 = require("../document.cjs");
const document_js_2 = require("../schema/document.cjs");
const index_js_1 = require("../chains/openai_functions/index.cjs");
const openai_js_1 = require("../chat_models/openai.cjs");
/**
 * A transformer that tags metadata to a document using a tagging chain.
 */
class MetadataTagger extends document_js_2.MappingDocumentTransformer {
    static lc_name() {
        return "MetadataTagger";
    }
    constructor(fields) {
        super();
        Object.defineProperty(this, "taggingChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.taggingChain = fields.taggingChain;
        if (this.taggingChain.inputKeys.length !== 1) {
            throw new Error("Invalid input chain. The input chain must have exactly one input.");
        }
        if (this.taggingChain.outputKeys.length !== 1) {
            throw new Error("Invalid input chain. The input chain must have exactly one output.");
        }
    }
    async _transformDocument(document) {
        const taggingChainResponse = await this.taggingChain.call({
            [this.taggingChain.inputKeys[0]]: document.pageContent,
        });
        const extractedMetadata = taggingChainResponse[this.taggingChain.outputKeys[0]];
        return new document_js_1.Document({
            pageContent: document.pageContent,
            metadata: { ...extractedMetadata, ...document.metadata },
        });
    }
}
exports.MetadataTagger = MetadataTagger;
function createMetadataTagger(schema, options) {
    const { llm = new openai_js_1.ChatOpenAI({ modelName: "gpt-3.5-turbo-0613" }), ...rest } = options;
    const taggingChain = (0, index_js_1.createTaggingChain)(schema, llm, rest);
    return new MetadataTagger({ taggingChain });
}
exports.createMetadataTagger = createMetadataTagger;
function createMetadataTaggerFromZod(schema, options) {
    return createMetadataTagger((0, zod_to_json_schema_1.zodToJsonSchema)(schema), options);
}
exports.createMetadataTaggerFromZod = createMetadataTaggerFromZod;
