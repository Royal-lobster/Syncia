import { type ClientOptions, OpenAI as OpenAIClient } from "openai";
import { BaseChain, ChainInputs } from "./base.js";
import { ChainValues } from "../schema/index.js";
import { AsyncCaller, AsyncCallerParams } from "../util/async_caller.js";
/**
 * Interface for the input parameters of the OpenAIModerationChain class.
 */
export interface OpenAIModerationChainInput extends ChainInputs, AsyncCallerParams {
    openAIApiKey?: string;
    openAIOrganization?: string;
    throwError?: boolean;
    configuration?: ClientOptions;
}
/**
 * Class representing a chain for moderating text using the OpenAI
 * Moderation API. It extends the BaseChain class and implements the
 * OpenAIModerationChainInput interface.
 */
export declare class OpenAIModerationChain extends BaseChain implements OpenAIModerationChainInput {
    static lc_name(): string;
    get lc_secrets(): {
        [key: string]: string;
    } | undefined;
    inputKey: string;
    outputKey: string;
    openAIApiKey?: string;
    openAIOrganization?: string;
    clientConfig: ClientOptions;
    client: OpenAIClient;
    throwError: boolean;
    caller: AsyncCaller;
    constructor(fields?: OpenAIModerationChainInput);
    _moderate(text: string, results: OpenAIClient.Moderation): string;
    _call(values: ChainValues): Promise<ChainValues>;
    _chainType(): string;
    get inputKeys(): string[];
    get outputKeys(): string[];
}
