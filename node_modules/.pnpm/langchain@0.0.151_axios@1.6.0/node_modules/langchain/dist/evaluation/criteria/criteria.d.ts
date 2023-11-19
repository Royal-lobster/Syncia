import { BaseLLMOutputParser } from "../../schema/output_parser.js";
import { EvalOutputType, LLMEvalChainInput, LLMStringEvaluator, StringEvaluatorArgs } from "../base.js";
import { ChainValues, ChatGeneration, Generation } from "../../schema/index.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { Callbacks } from "../../callbacks/index.js";
import { BaseCallbackConfig } from "../../callbacks/manager.js";
import { BasePromptTemplate } from "../../prompts/index.js";
import { ConstitutionalPrinciple } from "../../chains/index.js";
/**
 * A Criteria to evaluate.
 */
export type Criteria = "conciseness" | "relevance" | "correctness" | "coherence" | "harmfulness" | "maliciousness" | "helpfulness" | "controversiality" | "misogyny" | "criminality" | "insensitivity" | "depth" | "creativity" | "detail";
export type CriteriaLike = {
    [key: string]: string;
} | Criteria | ConstitutionalPrinciple;
/**
 * A parser for the output of the CriteriaEvalChain.
 */
export declare class CriteriaResultOutputParser extends BaseLLMOutputParser<EvalOutputType> {
    lc_namespace: string[];
    parseResult(generations: Generation[] | ChatGeneration[], _callbacks: Callbacks | undefined): Promise<EvalOutputType>;
}
export interface CriteriaEvalInput {
    input?: string;
    output: string;
    reference?: string;
}
export declare class CriteriaEvalChain extends LLMStringEvaluator {
    static lc_name(): string;
    criterionName?: string;
    evaluationName?: string;
    requiresInput: boolean;
    requiresReference: boolean;
    skipReferenceWarning: string;
    outputParser: BaseLLMOutputParser<EvalOutputType>;
    /**
     * Resolve the criteria to evaluate.
     * @param criteria The criteria to evaluate the runs against. It can be:
     *                 -  a mapping of a criterion name to its description
     *                 -  a single criterion name present in one of the default criteria
     *                 -  a single `ConstitutionalPrinciple` instance
     *
     * @return A dictionary mapping criterion names to descriptions.
     */
    static resolveCriteria(criteria?: CriteriaLike): Record<string, string>;
    /**
     * Resolve the prompt to use for the evaluation.
     * @param prompt
     */
    static resolvePrompt(prompt?: BasePromptTemplate): BasePromptTemplate<any, import("../../schema/index.js").BasePromptValue, any>;
    /**
     * Create a new instance of the CriteriaEvalChain.
     * @param llm
     * @param criteria
     * @param chainOptions Options to pass to the constructor of the LLMChain.
     */
    static fromLLM(llm: BaseLanguageModel, criteria?: CriteriaLike, chainOptions?: Partial<Omit<LLMEvalChainInput, "llm">>): Promise<CriteriaEvalChain>;
    getEvalInput({ input, prediction, reference, }: StringEvaluatorArgs): CriteriaEvalInput;
    /**
     * Prepare the output of the evaluation.
     * @param result
     */
    _prepareOutput(result: ChainValues): any;
    _evaluateStrings(args: StringEvaluatorArgs, callOptions: this["llm"]["CallOptions"], config?: Callbacks | BaseCallbackConfig): Promise<ChainValues>;
}
/**
 * Criteria evaluation chain that requires references.
 */
export declare class LabeledCriteriaEvalChain extends CriteriaEvalChain {
    static lc_name(): string;
    requiresReference: boolean;
    static resolvePrompt(prompt?: BasePromptTemplate): BasePromptTemplate<any, import("../../schema/index.js").BasePromptValue, any>;
}
