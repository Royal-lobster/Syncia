import { Document } from "../../document.js";
import { Docstore } from "../../schema/index.js";
/**
 * Class for storing and retrieving documents in memory asynchronously.
 * Extends the Docstore class.
 */
export declare class InMemoryDocstore extends Docstore {
    _docs: Map<string, Document>;
    constructor(docs?: Map<string, Document>);
    /**
     * Searches for a document in the store based on its ID.
     * @param search The ID of the document to search for.
     * @returns The document with the given ID.
     */
    search(search: string): Promise<Document>;
    /**
     * Adds new documents to the store.
     * @param texts An object where the keys are document IDs and the values are the documents themselves.
     * @returns Void
     */
    add(texts: Record<string, Document>): Promise<void>;
}
/**
 * Class for storing and retrieving documents in memory synchronously.
 */
export declare class SynchronousInMemoryDocstore {
    _docs: Map<string, Document>;
    constructor(docs?: Map<string, Document>);
    /**
     * Searches for a document in the store based on its ID.
     * @param search The ID of the document to search for.
     * @returns The document with the given ID.
     */
    search(search: string): Document;
    /**
     * Adds new documents to the store.
     * @param texts An object where the keys are document IDs and the values are the documents themselves.
     * @returns Void
     */
    add(texts: Record<string, Document>): void;
}
