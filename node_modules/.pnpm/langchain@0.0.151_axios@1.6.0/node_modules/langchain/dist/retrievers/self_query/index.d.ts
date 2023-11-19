import { LLMChain } from "../../chains/llm_chain.js";
import { QueryConstructorChainOptions } from "../../chains/query_constructor/index.js";
import { Document } from "../../document.js";
import { BaseRetriever, BaseRetrieverInput } from "../../schema/retriever.js";
import { VectorStore } from "../../vectorstores/base.js";
import { FunctionalTranslator } from "./functional.js";
import { BaseTranslator, BasicTranslator } from "./base.js";
import { CallbackManagerForRetrieverRun } from "../../callbacks/manager.js";
export { BaseTranslator, BasicTranslator, FunctionalTranslator };
/**
 * Interface for the arguments required to create a SelfQueryRetriever
 * instance. It extends the BaseRetrieverInput interface.
 */
export interface SelfQueryRetrieverArgs<T extends VectorStore> extends BaseRetrieverInput {
    vectorStore: T;
    structuredQueryTranslator: BaseTranslator<T>;
    llmChain: LLMChain;
    verbose?: boolean;
    useOriginalQuery?: boolean;
    searchParams?: {
        k?: number;
        filter?: T["FilterType"];
        mergeFiltersOperator?: "or" | "and" | "replace";
    };
}
/**
 * Class for question answering over an index. It retrieves relevant
 * documents based on a query. It extends the BaseRetriever class and
 * implements the SelfQueryRetrieverArgs interface.
 */
export declare class SelfQueryRetriever<T extends VectorStore> extends BaseRetriever implements SelfQueryRetrieverArgs<T> {
    static lc_name(): string;
    get lc_namespace(): string[];
    vectorStore: T;
    llmChain: LLMChain;
    verbose?: boolean;
    structuredQueryTranslator: BaseTranslator<T>;
    useOriginalQuery: boolean;
    searchParams?: {
        k?: number;
        filter?: T["FilterType"];
        mergeFiltersOperator?: "or" | "and" | "replace";
    };
    constructor(options: SelfQueryRetrieverArgs<T>);
    _getRelevantDocuments(query: string, runManager?: CallbackManagerForRetrieverRun): Promise<Document<Record<string, unknown>>[]>;
    /**
     * Static method to create a new SelfQueryRetriever instance from a
     * BaseLanguageModel and a VectorStore. It first loads a query constructor
     * chain using the loadQueryConstructorChain function, then creates a new
     * SelfQueryRetriever instance with the loaded chain and the provided
     * options.
     * @param options The options used to create the SelfQueryRetriever instance. It includes the QueryConstructorChainOptions and all the SelfQueryRetrieverArgs except 'llmChain'.
     * @returns A new instance of SelfQueryRetriever.
     */
    static fromLLM<T extends VectorStore>(options: QueryConstructorChainOptions & Omit<SelfQueryRetrieverArgs<T>, "llmChain">): SelfQueryRetriever<T>;
}
