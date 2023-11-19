"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheerioWebBaseLoader = void 0;
const document_js_1 = require("../../document.cjs");
const base_js_1 = require("../base.cjs");
const async_caller_js_1 = require("../../util/async_caller.cjs");
/**
 * A class that extends the BaseDocumentLoader and implements the
 * DocumentLoader interface. It represents a document loader for loading
 * web-based documents using Cheerio.
 */
class CheerioWebBaseLoader extends base_js_1.BaseDocumentLoader {
    constructor(webPath, fields) {
        super();
        Object.defineProperty(this, "webPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: webPath
        });
        Object.defineProperty(this, "timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "selector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "textDecoder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { timeout, selector, textDecoder, ...rest } = fields ?? {};
        this.timeout = timeout ?? 10000;
        this.caller = new async_caller_js_1.AsyncCaller(rest);
        this.selector = selector ?? "body";
        this.textDecoder = textDecoder;
    }
    static async _scrape(url, caller, timeout, textDecoder) {
        const { load } = await CheerioWebBaseLoader.imports();
        const response = await caller.call(fetch, url, {
            signal: timeout ? AbortSignal.timeout(timeout) : undefined,
        });
        const html = textDecoder?.decode(await response.arrayBuffer()) ??
            (await response.text());
        return load(html);
    }
    /**
     * Fetches the web document from the webPath and loads it using Cheerio.
     * It returns a CheerioAPI instance.
     * @returns A Promise that resolves to a CheerioAPI instance.
     */
    async scrape() {
        return CheerioWebBaseLoader._scrape(this.webPath, this.caller, this.timeout, this.textDecoder);
    }
    /**
     * Extracts the text content from the loaded document using the selector
     * and creates a Document instance with the extracted text and metadata.
     * It returns an array of Document instances.
     * @returns A Promise that resolves to an array of Document instances.
     */
    async load() {
        const $ = await this.scrape();
        const text = $(this.selector).text();
        const metadata = { source: this.webPath };
        return [new document_js_1.Document({ pageContent: text, metadata })];
    }
    /**
     * A static method that dynamically imports the Cheerio library and
     * returns the load function. If the import fails, it throws an error.
     * @returns A Promise that resolves to an object containing the load function from the Cheerio library.
     */
    static async imports() {
        try {
            const { load } = await import("cheerio");
            return { load };
        }
        catch (e) {
            console.error(e);
            throw new Error("Please install cheerio as a dependency with, e.g. `yarn add cheerio`");
        }
    }
}
exports.CheerioWebBaseLoader = CheerioWebBaseLoader;
