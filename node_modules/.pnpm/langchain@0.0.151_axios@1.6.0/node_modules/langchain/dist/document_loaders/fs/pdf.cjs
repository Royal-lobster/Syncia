"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFLoader = void 0;
const document_js_1 = require("../../document.cjs");
const buffer_js_1 = require("./buffer.cjs");
/**
 * A class that extends the `BufferLoader` class. It represents a document
 * loader that loads documents from PDF files.
 */
class PDFLoader extends buffer_js_1.BufferLoader {
    constructor(filePathOrBlob, { splitPages = true, pdfjs = PDFLoaderImports } = {}) {
        super(filePathOrBlob);
        Object.defineProperty(this, "splitPages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pdfjs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.splitPages = splitPages;
        this.pdfjs = pdfjs;
    }
    /**
     * A method that takes a `raw` buffer and `metadata` as parameters and
     * returns a promise that resolves to an array of `Document` instances. It
     * uses the `getDocument` function from the PDF.js library to load the PDF
     * from the buffer. It then iterates over each page of the PDF, retrieves
     * the text content using the `getTextContent` method, and joins the text
     * items to form the page content. It creates a new `Document` instance
     * for each page with the extracted text content and metadata, and adds it
     * to the `documents` array. If `splitPages` is `true`, it returns the
     * array of `Document` instances. Otherwise, if there are no documents, it
     * returns an empty array. Otherwise, it concatenates the page content of
     * all documents and creates a single `Document` instance with the
     * concatenated content.
     * @param raw The buffer to be parsed.
     * @param metadata The metadata of the document.
     * @returns A promise that resolves to an array of `Document` instances.
     */
    async parse(raw, metadata) {
        const { getDocument, version } = await this.pdfjs();
        const pdf = await getDocument({
            data: new Uint8Array(raw.buffer),
            useWorkerFetch: false,
            isEvalSupported: false,
            useSystemFonts: true,
        }).promise;
        const meta = await pdf.getMetadata().catch(() => null);
        const documents = [];
        for (let i = 1; i <= pdf.numPages; i += 1) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            if (content.items.length === 0) {
                continue;
            }
            const text = content.items
                .map((item) => item.str)
                .join("\n");
            documents.push(new document_js_1.Document({
                pageContent: text,
                metadata: {
                    ...metadata,
                    pdf: {
                        version,
                        info: meta?.info,
                        metadata: meta?.metadata,
                        totalPages: pdf.numPages,
                    },
                    loc: {
                        pageNumber: i,
                    },
                },
            }));
        }
        if (this.splitPages) {
            return documents;
        }
        if (documents.length === 0) {
            return [];
        }
        return [
            new document_js_1.Document({
                pageContent: documents.map((doc) => doc.pageContent).join("\n\n"),
                metadata: {
                    ...metadata,
                    pdf: {
                        version,
                        info: meta?.info,
                        metadata: meta?.metadata,
                        totalPages: pdf.numPages,
                    },
                },
            }),
        ];
    }
}
exports.PDFLoader = PDFLoader;
async function PDFLoaderImports() {
    try {
        const { default: mod } = await import("pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js");
        const { getDocument, version } = mod;
        return { getDocument, version };
    }
    catch (e) {
        console.error(e);
        throw new Error("Failed to load pdf-parse. Please install it with eg. `npm install pdf-parse`.");
    }
}
