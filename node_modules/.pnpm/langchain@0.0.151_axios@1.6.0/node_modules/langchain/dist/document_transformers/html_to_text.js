import { htmlToText } from "html-to-text";
import { Document } from "../document.js";
import { MappingDocumentTransformer } from "../schema/document.js";
/**
 * A transformer that converts HTML content to plain text.
 */
export class HtmlToTextTransformer extends MappingDocumentTransformer {
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
        const extractedContent = htmlToText(document.pageContent, this.options);
        return new Document({
            pageContent: extractedContent,
            metadata: { ...document.metadata },
        });
    }
}
