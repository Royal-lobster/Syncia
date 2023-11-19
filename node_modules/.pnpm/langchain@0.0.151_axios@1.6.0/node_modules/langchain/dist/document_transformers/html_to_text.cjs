"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlToTextTransformer = void 0;
const html_to_text_1 = require("html-to-text");
const document_js_1 = require("../document.cjs");
const document_js_2 = require("../schema/document.cjs");
/**
 * A transformer that converts HTML content to plain text.
 */
class HtmlToTextTransformer extends document_js_2.MappingDocumentTransformer {
    static lc_name() {
        return "HtmlToTextTransformer";
    }
    constructor(options = {}) {
        super(options);
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
    }
    async _transformDocument(document) {
        const extractedContent = (0, html_to_text_1.htmlToText)(document.pageContent, this.options);
        return new document_js_1.Document({
            pageContent: extractedContent,
            metadata: { ...document.metadata },
        });
    }
}
exports.HtmlToTextTransformer = HtmlToTextTransformer;
