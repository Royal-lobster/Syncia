import { Document } from "../document.js";
import { BasePromptTemplate } from "../prompts/base.js";
import { VectorStore, VectorStoreRetriever, VectorStoreRetrieverInput } from "../vectorstores/base.js";
import { BaseLanguageModel } from "../base_language/index.js";
import { CallbackManagerForRetrieverRun } from "../callbacks/manager.js";
/**
 * A string that corresponds to a specific prompt template.
 */
export type PromptKey = "websearch" | "scifact" | "arguana" | "trec-covid" | "fiqa" | "dbpedia-entity" | "trec-news" | "mr-tydi";
/**
 * Options for the HydeRetriever class, which includes a BaseLanguageModel
 * instance, a VectorStore instance, and an optional promptTemplate which
 * can either be a BasePromptTemplate instance or a PromptKey.
 */
export type HydeRetrieverOptions<V extends VectorStore> = VectorStoreRetrieverInput<V> & {
    llm: BaseLanguageModel;
    promptTemplate?: BasePromptTemplate | PromptKey;
};
/**
 * A class for retrieving relevant documents based on a given query. It
 * extends the VectorStoreRetriever class and uses a BaseLanguageModel to
 * generate a hypothetical answer to the query, which is then used to
 * retrieve relevant documents.
 */
export declare class HydeRetriever<V extends VectorStore = VectorStore> extends VectorStoreRetriever<V> {
    static lc_name(): string;
    get lc_namespace(): string[];
    llm: BaseLanguageModel;
    promptTemplate?: BasePromptTemplate;
    constructor(fields: HydeRetrieverOptions<V>);
    _getRelevantDocuments(query: string, runManager?: CallbackManagerForRetrieverRun): Promise<Document[]>;
}
/**
 * Returns a BasePromptTemplate instance based on a given PromptKey.
 */
export declare function getPromptTemplateFromKey(key: PromptKey): BasePromptTemplate;
