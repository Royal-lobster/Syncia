import { BaseLLMOutputParser } from "../../schema/output_parser.js";
import { EvalOutputType, LLMEvalChainInput, LLMPairwiseStringEvaluator, LLMPairwiseStringEvaluatorArgs } from "../base.js";
import { ChainValues, ChatGeneration, Generation } from "../../schema/index.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { Callbacks } from "../../callbacks/index.js";
import { BaseCallbackConfig } from "../../callbacks/manager.js";
import { BasePromptTemplate } from "../../prompts/index.js";
import { CriteriaLike } from "../criteria/criteria.js";
/**
 * A parser for the output of the PairwiseStringEvalChain.
 */
export declare class PairwiseStringResultOutputParser extends BaseLLMOutputParser<EvalOutputType> {
    static lc_name(): string;
    lc_namespace: string[];
    parseResult(generations: Generation[] | ChatGeneration[], _callbacks: Callbacks | undefined): Promise<EvalOutputType>;
}
/**
 * A chain for comparing two outputs, such as the outputs
 * of two models, prompts, or outputs of a single model on similar inputs.
 */
export declare class PairwiseStringEvalChain extends LLMPairwiseStringEvaluator {
    static lc_name(): string;
    criterionName?: string;
    evaluationName?: string;
    requiresInput: boolean;
    requiresReference: boolean;
    skipReferenceWarning: string;
    outputParser: PairwiseStringResultOutputParser;
    static resolvePairwiseCriteria(criteria?: CriteriaLike): Record<string, string>;
    static resolvePairwisePrompt(prompt?: BasePromptTemplate): BasePromptTemplate<any, import("../../schema/index.js").BasePromptValue, any>;
    /**
     * Create a new instance of the PairwiseStringEvalChain.
     * @param llm
     * @param criteria The criteria to use for evaluation.
     * @param chainOptions Options to pass to the chain.
     */
    static fromLLM(llm: BaseLanguageModel, criteria?: CriteriaLike, chainOptions?: Partial<Omit<LLMEvalChainInput, "llm">>): Promise<PairwiseStringEvalChain>;
    _prepareOutput(result: ChainValues): any;
    _evaluateStringPairs(args: LLMPairwiseStringEvaluatorArgs, callOptions: this["llm"]["CallOptions"], config?: Callbacks | BaseCallbackConfig): Promise<ChainValues>;
}
/**
 * A chain for comparing two outputs, such as the outputs
 * of two models, prompts, or outputs of a single model on similar inputs,
 * with labeled preferences.
 */
export declare class LabeledPairwiseStringEvalChain extends PairwiseStringEvalChain {
    static lc_name(): string;
    requiresReference: boolean;
    static resolvePairwisePrompt(prompt?: BasePromptTemplate): BasePromptTemplate<any, import("../../schema/index.js").BasePromptValue, any>;
}
