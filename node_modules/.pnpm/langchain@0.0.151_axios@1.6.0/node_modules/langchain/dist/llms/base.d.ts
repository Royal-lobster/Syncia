import { BaseCache, BaseMessage, BasePromptValue, GenerationChunk, LLMResult } from "../schema/index.js";
import { BaseLanguageModel, BaseLanguageModelCallOptions, BaseLanguageModelInput, BaseLanguageModelParams } from "../base_language/index.js";
import { BaseCallbackConfig, CallbackManagerForLLMRun, Callbacks } from "../callbacks/manager.js";
import { RunnableConfig } from "../schema/runnable/config.js";
export type SerializedLLM = {
    _model: string;
    _type: string;
} & Record<string, any>;
export interface BaseLLMParams extends BaseLanguageModelParams {
    /**
     * @deprecated Use `maxConcurrency` instead
     */
    concurrency?: number;
    cache?: BaseCache | boolean;
}
export interface BaseLLMCallOptions extends BaseLanguageModelCallOptions {
}
/**
 * LLM Wrapper. Provides an {@link call} (an {@link generate}) function that takes in a prompt (or prompts) and returns a string.
 */
export declare abstract class BaseLLM<CallOptions extends BaseLLMCallOptions = BaseLLMCallOptions> extends BaseLanguageModel<string, CallOptions> {
    ParsedCallOptions: Omit<CallOptions, keyof RunnableConfig & "timeout">;
    lc_namespace: string[];
    cache?: BaseCache;
    constructor({ cache, concurrency, ...rest }: BaseLLMParams);
    /**
     * This method takes an input and options, and returns a string. It
     * converts the input to a prompt value and generates a result based on
     * the prompt.
     * @param input Input for the LLM.
     * @param options Options for the LLM call.
     * @returns A string result based on the prompt.
     */
    invoke(input: BaseLanguageModelInput, options?: CallOptions): Promise<string>;
    _streamResponseChunks(_input: string, _options: this["ParsedCallOptions"], _runManager?: CallbackManagerForLLMRun): AsyncGenerator<GenerationChunk>;
    protected _separateRunnableConfigFromCallOptions(options?: Partial<CallOptions>): [RunnableConfig, this["ParsedCallOptions"]];
    _streamIterator(input: BaseLanguageModelInput, options?: CallOptions): AsyncGenerator<string>;
    /**
     * This method takes prompt values, options, and callbacks, and generates
     * a result based on the prompts.
     * @param promptValues Prompt values for the LLM.
     * @param options Options for the LLM call.
     * @param callbacks Callbacks for the LLM call.
     * @returns An LLMResult based on the prompts.
     */
    generatePrompt(promptValues: BasePromptValue[], options?: string[] | CallOptions, callbacks?: Callbacks): Promise<LLMResult>;
    /**
     * Run the LLM on the given prompts and input.
     */
    abstract _generate(prompts: string[], options: this["ParsedCallOptions"], runManager?: CallbackManagerForLLMRun): Promise<LLMResult>;
    /**
     * Get the parameters used to invoke the model
     */
    invocationParams(_options?: this["ParsedCallOptions"]): any;
    _flattenLLMResult(llmResult: LLMResult): LLMResult[];
    /** @ignore */
    _generateUncached(prompts: string[], parsedOptions: this["ParsedCallOptions"], handledOptions: BaseCallbackConfig): Promise<LLMResult>;
    /**
     * Run the LLM on the given prompts and input, handling caching.
     */
    generate(prompts: string[], options?: string[] | CallOptions, callbacks?: Callbacks): Promise<LLMResult>;
    /**
     * Convenience wrapper for {@link generate} that takes in a single string prompt and returns a single string output.
     */
    call(prompt: string, options?: string[] | CallOptions, callbacks?: Callbacks): Promise<string>;
    /**
     * This method is similar to `call`, but it's used for making predictions
     * based on the input text.
     * @param text Input text for the prediction.
     * @param options Options for the LLM call.
     * @param callbacks Callbacks for the LLM call.
     * @returns A prediction based on the input text.
     */
    predict(text: string, options?: string[] | CallOptions, callbacks?: Callbacks): Promise<string>;
    /**
     * This method takes a list of messages, options, and callbacks, and
     * returns a predicted message.
     * @param messages A list of messages for the prediction.
     * @param options Options for the LLM call.
     * @param callbacks Callbacks for the LLM call.
     * @returns A predicted message based on the list of messages.
     */
    predictMessages(messages: BaseMessage[], options?: string[] | CallOptions, callbacks?: Callbacks): Promise<BaseMessage>;
    /**
     * Get the identifying parameters of the LLM.
     */
    _identifyingParams(): Record<string, any>;
    /**
     * Return the string type key uniquely identifying this class of LLM.
     */
    abstract _llmType(): string;
    /**
     * Return a json-like object representing this LLM.
     */
    serialize(): SerializedLLM;
    _modelType(): string;
    /**
     * Load an LLM from a json-like object describing it.
     */
    static deserialize(data: SerializedLLM): Promise<BaseLLM>;
}
/**
 * LLM class that provides a simpler interface to subclass than {@link BaseLLM}.
 *
 * Requires only implementing a simpler {@link _call} method instead of {@link _generate}.
 *
 * @augments BaseLLM
 */
export declare abstract class LLM<CallOptions extends BaseLLMCallOptions = BaseLLMCallOptions> extends BaseLLM<CallOptions> {
    /**
     * Run the LLM on the given prompt and input.
     */
    abstract _call(prompt: string, options: this["ParsedCallOptions"], runManager?: CallbackManagerForLLMRun): Promise<string>;
    _generate(prompts: string[], options: this["ParsedCallOptions"], runManager?: CallbackManagerForLLMRun): Promise<LLMResult>;
}
