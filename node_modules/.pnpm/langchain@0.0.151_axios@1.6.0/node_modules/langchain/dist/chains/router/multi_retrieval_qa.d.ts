import { BaseLanguageModel } from "../../base_language/index.js";
import { MultiRouteChain, MultiRouteChainInput } from "./multi_route.js";
import { BaseChain } from "../../chains/base.js";
import { PromptTemplate } from "../../prompts/prompt.js";
import { BaseRetriever } from "../../schema/retriever.js";
import { RetrievalQAChainInput } from "../../chains/retrieval_qa.js";
/**
 * A type that represents the default values for the MultiRetrievalQAChain
 * class. It includes optional properties for the default retriever,
 * default prompt, and default chain.
 */
export type MultiRetrievalDefaults = {
    defaultRetriever?: BaseRetriever;
    defaultPrompt?: PromptTemplate;
    defaultChain?: BaseChain;
};
/**
 * A class that represents a multi-retrieval question answering chain in
 * the LangChain framework. It extends the MultiRouteChain class and
 * provides additional functionality specific to multi-retrieval QA
 * chains.
 */
export declare class MultiRetrievalQAChain extends MultiRouteChain {
    get outputKeys(): string[];
    /**
     * @deprecated Use `fromRetrieversAndPrompts` instead
     */
    static fromRetrievers(llm: BaseLanguageModel, retrieverNames: string[], retrieverDescriptions: string[], retrievers: BaseRetriever[], retrieverPrompts?: PromptTemplate[], defaults?: MultiRetrievalDefaults, options?: Omit<MultiRouteChainInput, "defaultChain">): MultiRetrievalQAChain;
    /**
     * A static method that creates an instance of MultiRetrievalQAChain from
     * a BaseLanguageModel and a set of retrievers. It takes in optional
     * parameters for the retriever names, descriptions, prompts, defaults,
     * and additional options. It is an alternative method to fromRetrievers
     * and provides more flexibility in configuring the underlying chains.
     * @param llm A BaseLanguageModel instance.
     * @param retrieverNames An array of retriever names.
     * @param retrieverDescriptions An array of retriever descriptions.
     * @param retrievers An array of BaseRetriever instances.
     * @param retrieverPrompts An optional array of PromptTemplate instances for the retrievers.
     * @param defaults An optional MultiRetrievalDefaults instance.
     * @param multiRetrievalChainOpts Additional optional parameters for the multi-retrieval chain.
     * @param retrievalQAChainOpts Additional optional parameters for the retrieval QA chain.
     * @returns A new instance of MultiRetrievalQAChain.
     */
    static fromLLMAndRetrievers(llm: BaseLanguageModel, { retrieverNames, retrieverDescriptions, retrievers, retrieverPrompts, defaults, multiRetrievalChainOpts, retrievalQAChainOpts, }: {
        retrieverNames: string[];
        retrieverDescriptions: string[];
        retrievers: BaseRetriever[];
        retrieverPrompts?: PromptTemplate[];
        defaults?: MultiRetrievalDefaults;
        multiRetrievalChainOpts?: Omit<MultiRouteChainInput, "defaultChain">;
        retrievalQAChainOpts?: Partial<Omit<RetrievalQAChainInput, "retriever" | "combineDocumentsChain">> & {
            prompt?: PromptTemplate;
        };
    }): MultiRetrievalQAChain;
    _chainType(): string;
}
