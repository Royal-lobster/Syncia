import { BaseLanguageModel } from "../../base_language/index.js";
import { CallbackManagerForChainRun } from "../../callbacks/manager.js";
import { ChainValues } from "../../schema/index.js";
import { BaseChain, ChainInputs } from "../base.js";
import { LLMChain } from "../llm_chain.js";
import { SerializedBaseChain } from "../serde.js";
import { ConstitutionalPrinciple } from "./constitutional_principle.js";
/**
 * Interface for the input of a ConstitutionalChain. Extends ChainInputs.
 */
export interface ConstitutionalChainInput extends ChainInputs {
    chain: LLMChain;
    constitutionalPrinciples: ConstitutionalPrinciple[];
    critiqueChain: LLMChain;
    revisionChain: LLMChain;
}
/**
 * Class representing a ConstitutionalChain. Extends BaseChain and
 * implements ConstitutionalChainInput.
 */
export declare class ConstitutionalChain extends BaseChain implements ConstitutionalChainInput {
    static lc_name(): string;
    chain: LLMChain;
    constitutionalPrinciples: ConstitutionalPrinciple[];
    critiqueChain: LLMChain;
    revisionChain: LLMChain;
    get inputKeys(): string[];
    get outputKeys(): string[];
    constructor(fields: ConstitutionalChainInput);
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    /**
     * Static method that returns an array of ConstitutionalPrinciple objects
     * based on the provided names.
     * @param names Optional array of principle names.
     * @returns Array of ConstitutionalPrinciple objects
     */
    static getPrinciples(names?: string[]): ConstitutionalPrinciple[];
    /**
     * Static method that creates a new instance of the ConstitutionalChain
     * class from a BaseLanguageModel object and additional options.
     * @param llm BaseLanguageModel instance.
     * @param options Options for the ConstitutionalChain.
     * @returns New instance of ConstitutionalChain
     */
    static fromLLM(llm: BaseLanguageModel, options: Omit<ConstitutionalChainInput, "critiqueChain" | "revisionChain"> & {
        critiqueChain?: LLMChain;
        revisionChain?: LLMChain;
    }): ConstitutionalChain;
    private static _parseCritique;
    _chainType(): "constitutional_chain";
    serialize(): SerializedBaseChain;
}
