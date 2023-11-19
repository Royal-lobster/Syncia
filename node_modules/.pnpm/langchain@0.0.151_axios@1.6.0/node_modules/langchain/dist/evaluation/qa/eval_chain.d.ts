import { LLMChain, LLMChainInput } from "../../chains/llm_chain.js";
import { PromptTemplate } from "../../prompts/prompt.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { ChainValues } from "../../schema/index.js";
export interface EvaluateArgs {
    questionKey: string;
    answerKey: string;
    predictionKey: string;
}
export declare class QAEvalChain extends LLMChain {
    static lc_name(): string;
    static fromLlm(llm: BaseLanguageModel, options?: {
        prompt?: PromptTemplate;
        chainInput?: Omit<LLMChainInput, "llm">;
    }): QAEvalChain;
    evaluate(examples: ChainValues, predictions: ChainValues, args?: EvaluateArgs): Promise<ChainValues>;
}
