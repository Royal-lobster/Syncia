import { BaseCallbackConfig, CallbackManagerForRetrieverRun, Callbacks } from "../callbacks/manager.js";
import { Document } from "../document.js";
import { Runnable } from "./runnable/index.js";
import { RunnableConfig } from "./runnable/config.js";
/**
 * Base Retriever class. All indexes should extend this class.
 */
export interface BaseRetrieverInput {
    callbacks?: Callbacks;
    tags?: string[];
    metadata?: Record<string, unknown>;
    verbose?: boolean;
}
/**
 * Abstract base class for a Document retrieval system. A retrieval system
 * is defined as something that can take string queries and return the
 * most 'relevant' Documents from some source.
 */
export declare abstract class BaseRetriever extends Runnable<string, Document[]> {
    callbacks?: Callbacks;
    tags?: string[];
    metadata?: Record<string, unknown>;
    verbose?: boolean;
    constructor(fields?: BaseRetrieverInput);
    /**
     * TODO: This should be an abstract method, but we'd like to avoid breaking
     * changes to people currently using subclassed custom retrievers.
     * Change it on next major release.
     */
    _getRelevantDocuments(_query: string, _callbacks?: CallbackManagerForRetrieverRun): Promise<Document[]>;
    invoke(input: string, options?: RunnableConfig): Promise<Document[]>;
    /**
     * Main method used to retrieve relevant documents. It takes a query
     * string and an optional configuration object, and returns a promise that
     * resolves to an array of `Document` objects. This method handles the
     * retrieval process, including starting and ending callbacks, and error
     * handling.
     * @param query The query string to retrieve relevant documents for.
     * @param config Optional configuration object for the retrieval process.
     * @returns A promise that resolves to an array of `Document` objects.
     */
    getRelevantDocuments(query: string, config?: Callbacks | BaseCallbackConfig): Promise<Document[]>;
}
