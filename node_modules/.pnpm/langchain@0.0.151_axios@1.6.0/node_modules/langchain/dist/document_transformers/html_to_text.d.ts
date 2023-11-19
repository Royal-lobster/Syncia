import type { HtmlToTextOptions } from "html-to-text";
import { Document } from "../document.js";
import { MappingDocumentTransformer } from "../schema/document.js";
/**
 * A transformer that converts HTML content to plain text.
 */
export declare class HtmlToTextTransformer extends MappingDocumentTransformer {
    protected options: HtmlToTextOptions;
    static lc_name(): string;
    constructor(options?: HtmlToTextOptions);
    _transformDocument(document: Document): Promise<Document>;
}
