import { BaseStore } from "../schema/storage.js";
import { Document } from "../document.js";
import { BaseRetriever, BaseRetrieverInput } from "../schema/retriever.js";
import { VectorStore } from "../vectorstores/base.js";
/**
 * Arguments for the MultiVectorRetriever class.
 */
export interface MultiVectorRetrieverInput extends BaseRetrieverInput {
    vectorstore: VectorStore;
    docstore: BaseStore<string, Document>;
    idKey?: string;
    childK?: number;
    parentK?: number;
}
/**
 * A retriever that retrieves documents from a vector store and a document
 * store. It uses the vector store to find relevant documents based on a
 * query, and then retrieves the full documents from the document store.
 */
export declare class MultiVectorRetriever extends BaseRetriever {
    static lc_name(): string;
    lc_namespace: string[];
    vectorstore: VectorStore;
    docstore: BaseStore<string, Document>;
    protected idKey: string;
    protected childK?: number;
    protected parentK?: number;
    constructor(args: MultiVectorRetrieverInput);
    _getRelevantDocuments(query: string): Promise<Document[]>;
}
