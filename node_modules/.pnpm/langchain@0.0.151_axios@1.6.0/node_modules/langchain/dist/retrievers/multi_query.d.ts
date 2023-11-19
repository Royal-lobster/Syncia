import { LLMChain } from "../chains/llm_chain.js";
import { Document } from "../document.js";
import { BaseRetriever, BaseRetrieverInput } from "../schema/retriever.js";
import { CallbackManagerForRetrieverRun } from "../callbacks/index.js";
import { BaseLanguageModel } from "../base_language/index.js";
import { BasePromptTemplate } from "../prompts/base.js";
interface LineList {
    lines: string[];
}
export interface MultiQueryRetrieverInput extends BaseRetrieverInput {
    retriever: BaseRetriever;
    llmChain: LLMChain<LineList>;
    queryCount?: number;
    parserKey?: string;
}
export declare class MultiQueryRetriever extends BaseRetriever {
    static lc_name(): string;
    lc_namespace: string[];
    private retriever;
    private llmChain;
    private queryCount;
    private parserKey;
    constructor(fields: MultiQueryRetrieverInput);
    static fromLLM(fields: Omit<MultiQueryRetrieverInput, "llmChain"> & {
        llm: BaseLanguageModel;
        prompt?: BasePromptTemplate;
    }): MultiQueryRetriever;
    private _generateQueries;
    private _retrieveDocuments;
    private _uniqueUnion;
    _getRelevantDocuments(question: string, runManager?: CallbackManagerForRetrieverRun): Promise<Document[]>;
}
export {};
