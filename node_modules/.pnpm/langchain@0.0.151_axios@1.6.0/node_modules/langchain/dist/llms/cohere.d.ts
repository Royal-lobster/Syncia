import { LLM, BaseLLMParams } from "./base.js";
/**
 * Interface for the input parameters specific to the Cohere model.
 */
export interface CohereInput extends BaseLLMParams {
    /** Sampling temperature to use */
    temperature?: number;
    /**
     * Maximum number of tokens to generate in the completion.
     */
    maxTokens?: number;
    /** Model to use */
    model?: string;
    apiKey?: string;
}
/**
 * Class representing a Cohere Large Language Model (LLM). It interacts
 * with the Cohere API to generate text completions.
 */
export declare class Cohere extends LLM implements CohereInput {
    static lc_name(): string;
    get lc_secrets(): {
        [key: string]: string;
    } | undefined;
    get lc_aliases(): {
        [key: string]: string;
    } | undefined;
    lc_serializable: boolean;
    temperature: number;
    maxTokens: number;
    model: string;
    apiKey: string;
    constructor(fields?: CohereInput);
    _llmType(): string;
    /** @ignore */
    _call(prompt: string, options: this["ParsedCallOptions"]): Promise<string>;
    /** @ignore */
    static imports(): Promise<{
        cohere: typeof import("cohere-ai");
    }>;
}
