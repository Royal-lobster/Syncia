import { BasePromptTemplate } from "../../prompts/base.js";
import { StuffDocumentsChain, MapReduceDocumentsChain, RefineDocumentsChain, MapReduceDocumentsChainInput } from "../combine_docs_chain.js";
import { BaseLanguageModel } from "../../base_language/index.js";
/**
 * Represents the parameters for creating a QAChain. It can be of three
 * types: "stuff", "map_reduce", or "refine".
 */
export type QAChainParams = ({
    type?: "stuff";
} & StuffQAChainParams) | ({
    type?: "map_reduce";
} & MapReduceQAChainParams) | ({
    type?: "refine";
} & RefineQAChainParams);
export declare const loadQAChain: (llm: BaseLanguageModel, params?: QAChainParams) => StuffDocumentsChain | MapReduceDocumentsChain | RefineDocumentsChain;
/**
 * Represents the parameters for creating a StuffQAChain.
 */
export interface StuffQAChainParams {
    prompt?: BasePromptTemplate;
    verbose?: boolean;
}
/**
 * Loads a StuffQAChain based on the provided parameters. It takes an LLM
 * instance and StuffQAChainParams as parameters.
 * @param llm An instance of BaseLanguageModel.
 * @param params Parameters for creating a StuffQAChain.
 * @returns A StuffQAChain instance.
 */
export declare function loadQAStuffChain(llm: BaseLanguageModel, params?: StuffQAChainParams): StuffDocumentsChain;
/**
 * Represents the parameters for creating a MapReduceQAChain.
 */
export interface MapReduceQAChainParams {
    returnIntermediateSteps?: MapReduceDocumentsChainInput["returnIntermediateSteps"];
    combineMapPrompt?: BasePromptTemplate;
    combinePrompt?: BasePromptTemplate;
    combineLLM?: BaseLanguageModel;
    verbose?: boolean;
}
/**
 * Loads a MapReduceQAChain based on the provided parameters. It takes an
 * LLM instance and MapReduceQAChainParams as parameters.
 * @param llm An instance of BaseLanguageModel.
 * @param params Parameters for creating a MapReduceQAChain.
 * @returns A MapReduceQAChain instance.
 */
export declare function loadQAMapReduceChain(llm: BaseLanguageModel, params?: MapReduceQAChainParams): MapReduceDocumentsChain;
/**
 * Represents the parameters for creating a RefineQAChain.
 */
export interface RefineQAChainParams {
    questionPrompt?: BasePromptTemplate;
    refinePrompt?: BasePromptTemplate;
    refineLLM?: BaseLanguageModel;
    verbose?: boolean;
}
/**
 * Loads a RefineQAChain based on the provided parameters. It takes an LLM
 * instance and RefineQAChainParams as parameters.
 * @param llm An instance of BaseLanguageModel.
 * @param params Parameters for creating a RefineQAChain.
 * @returns A RefineQAChain instance.
 */
export declare function loadQARefineChain(llm: BaseLanguageModel, params?: RefineQAChainParams): RefineDocumentsChain;
