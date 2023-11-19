import { LLM, BaseLLMParams } from "./base.js";
/**
 * Interface defining the structure of the input data for the Replicate
 * class. It includes details about the model to be used, any additional
 * input parameters, and the API key for the Replicate service.
 */
export interface ReplicateInput {
    model: `${string}/${string}:${string}`;
    input?: {
        [key: string]: string | number | boolean;
    };
    apiKey?: string;
    /** The key used to pass prompts to the model. */
    promptKey?: string;
}
/**
 * Class responsible for managing the interaction with the Replicate API.
 * It handles the API key and model details, makes the actual API calls,
 * and converts the API response into a format usable by the rest of the
 * LangChain framework.
 */
export declare class Replicate extends LLM implements ReplicateInput {
    static lc_name(): string;
    get lc_secrets(): {
        [key: string]: string;
    } | undefined;
    lc_serializable: boolean;
    model: ReplicateInput["model"];
    input: ReplicateInput["input"];
    apiKey: string;
    promptKey?: string;
    constructor(fields: ReplicateInput & BaseLLMParams);
    _llmType(): string;
    /** @ignore */
    _call(prompt: string, options: this["ParsedCallOptions"]): Promise<string>;
    /** @ignore */
    static imports(): Promise<{
        Replicate: typeof import("replicate").default;
    }>;
}
