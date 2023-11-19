import { BaseRetriever, BaseRetrieverInput } from "../schema/retriever.js";
import { Document } from "../document.js";
import { VectorStore } from "../vectorstores/base.js";
import { Docstore } from "../schema/index.js";
import { TextSplitter } from "../text_splitter.js";
/**
 * Interface for the fields required to initialize a
 * ParentDocumentRetriever instance.
 */
export interface ParentDocumentRetrieverFields extends BaseRetrieverInput {
    vectorstore: VectorStore;
    docstore: Docstore;
    childSplitter: TextSplitter;
    parentSplitter?: TextSplitter;
    idKey?: string;
    childK?: number;
    parentK?: number;
}
/**
 * A type of document retriever that splits input documents into smaller chunks
 * while separately storing and preserving the original documents.
 * The small chunks are embedded, then on retrieval, the original
 * "parent" documents are retrieved.
 *
 * This strikes a balance between better targeted retrieval with small documents
 * and the more context-rich larger documents.
 */
export declare class ParentDocumentRetriever extends BaseRetriever {
    static lc_name(): string;
    lc_namespace: string[];
    protected vectorstore: VectorStore;
    protected docstore: Docstore;
    protected childSplitter: TextSplitter;
    protected parentSplitter?: TextSplitter;
    protected idKey: string;
    protected childK?: number;
    protected parentK?: number;
    constructor(fields: ParentDocumentRetrieverFields);
    _getRelevantDocuments(query: string): Promise<Document[]>;
    /**
     * Adds documents to the docstore and vectorstores.
     * @param docs The documents to add
     * @param config.ids Optional list of ids for documents. If provided should be the same
     *   length as the list of documents. Can provided if parent documents
     *   are already in the document store and you don't want to re-add
     *   to the docstore. If not provided, random UUIDs will be used as ids.
     * @param config.addToDocstore Boolean of whether to add documents to docstore.
     * This can be false if and only if `ids` are provided. You may want
     *   to set this to False if the documents are already in the docstore
     *   and you don't want to re-add them.
     */
    addDocuments(docs: Document[], config?: {
        ids?: string[];
        addToDocstore?: boolean;
    }): Promise<void>;
}
