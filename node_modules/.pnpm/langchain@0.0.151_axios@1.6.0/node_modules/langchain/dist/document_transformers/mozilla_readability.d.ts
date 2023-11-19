import { Options } from "mozilla-readability";
import { Document } from "../document.js";
import { MappingDocumentTransformer } from "../schema/document.js";
/**
 * A transformer that uses the Mozilla Readability library to extract the
 * main content from a web page.
 */
export declare class MozillaReadabilityTransformer extends MappingDocumentTransformer {
    protected options: Options;
    static lc_name(): string;
    constructor(options?: Options);
    _transformDocument(document: Document): Promise<Document>;
}
