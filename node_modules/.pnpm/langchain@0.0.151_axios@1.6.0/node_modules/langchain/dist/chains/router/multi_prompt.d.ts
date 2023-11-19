import { BaseLanguageModel } from "../../base_language/index.js";
import { MultiRouteChain, MultiRouteChainInput } from "./multi_route.js";
import { BaseChain } from "../../chains/base.js";
import { LLMChainInput } from "../../chains/llm_chain.js";
import { PromptTemplate } from "../../prompts/prompt.js";
/**
 * A class that represents a multi-prompt chain in the LangChain
 * framework. It extends the MultiRouteChain class and provides additional
 * functionality specific to multi-prompt chains.
 */
export declare class MultiPromptChain extends MultiRouteChain {
    /**
     * @deprecated Use `fromLLMAndPrompts` instead
     */
    static fromPrompts(llm: BaseLanguageModel, promptNames: string[], promptDescriptions: string[], promptTemplates: string[] | PromptTemplate[], defaultChain?: BaseChain, options?: Omit<MultiRouteChainInput, "defaultChain">): MultiPromptChain;
    /**
     * A static method that creates an instance of MultiPromptChain from a
     * BaseLanguageModel and a set of prompts. It takes in optional parameters
     * for the default chain and additional options.
     * @param llm A BaseLanguageModel instance.
     * @param promptNames An array of prompt names.
     * @param promptDescriptions An array of prompt descriptions.
     * @param promptTemplates An array of prompt templates.
     * @param defaultChain An optional BaseChain instance to be used as the default chain.
     * @param llmChainOpts Optional parameters for the LLMChainInput, excluding 'llm' and 'prompt'.
     * @param conversationChainOpts Optional parameters for the LLMChainInput, excluding 'llm' and 'outputKey'.
     * @param multiRouteChainOpts Optional parameters for the MultiRouteChainInput, excluding 'defaultChain'.
     * @returns An instance of MultiPromptChain.
     */
    static fromLLMAndPrompts(llm: BaseLanguageModel, { promptNames, promptDescriptions, promptTemplates, defaultChain, llmChainOpts, conversationChainOpts, multiRouteChainOpts, }: {
        promptNames: string[];
        promptDescriptions: string[];
        promptTemplates: string[] | PromptTemplate[];
        defaultChain?: BaseChain;
        llmChainOpts?: Omit<LLMChainInput, "llm" | "prompt">;
        conversationChainOpts?: Omit<LLMChainInput, "llm" | "outputKey">;
        multiRouteChainOpts?: Omit<MultiRouteChainInput, "defaultChain">;
    }): MultiPromptChain;
    _chainType(): string;
}
