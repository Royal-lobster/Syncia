import { BaseDocumentCompressor } from "./document_compressors/index.js";
import { Document } from "../document.js";
import { BaseRetriever, BaseRetrieverInput } from "../schema/retriever.js";
import { CallbackManagerForRetrieverRun } from "../callbacks/manager.js";
/**
 * Interface for the arguments required to construct a
 * ContextualCompressionRetriever. It extends the BaseRetrieverInput
 * interface with two additional fields: baseCompressor and baseRetriever.
 */
export interface ContextualCompressionRetrieverArgs extends BaseRetrieverInput {
    baseCompressor: BaseDocumentCompressor;
    baseRetriever: BaseRetriever;
}
/**
 * A retriever that wraps a base retriever and compresses the results. It
 * retrieves relevant documents based on a given query and then compresses
 * these documents using a specified document compressor.
 */
export declare class ContextualCompressionRetriever extends BaseRetriever {
    static lc_name(): string;
    lc_namespace: string[];
    baseCompressor: BaseDocumentCompressor;
    baseRetriever: BaseRetriever;
    constructor(fields: ContextualCompressionRetrieverArgs);
    _getRelevantDocuments(query: string, runManager?: CallbackManagerForRetrieverRun): Promise<Document[]>;
}
