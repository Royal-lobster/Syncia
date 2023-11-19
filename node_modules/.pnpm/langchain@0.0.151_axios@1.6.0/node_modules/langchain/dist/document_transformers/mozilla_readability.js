import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import { Document } from "../document.js";
import { MappingDocumentTransformer } from "../schema/document.js";
/**
 * A transformer that uses the Mozilla Readability library to extract the
 * main content from a web page.
 */
export class MozillaReadabilityTransformer extends MappingDocumentTransformer {
    static lc_name() {
        return "MozillaReadabilityTransformer";
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
        const doc = new JSDOM(document.pageContent);
        const readability = new Readability(doc.window.document, this.options);
        const result = readability.parse();
        return new Document({
            pageContent: result?.textContent ?? "",
            metadata: {
                ...document.metadata,
            },
        });
    }
}
