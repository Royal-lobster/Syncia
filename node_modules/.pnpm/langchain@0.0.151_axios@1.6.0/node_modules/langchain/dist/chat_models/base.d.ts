import { BaseMessage, BasePromptValue, ChatResult, BaseMessageChunk, LLMResult, ChatGenerationChunk, BaseMessageLike } from "../schema/index.js";
import { BaseLanguageModel, BaseLanguageModelCallOptions, BaseLanguageModelInput, BaseLanguageModelParams } from "../base_language/index.js";
import { CallbackManagerForLLMRun, Callbacks } from "../callbacks/manager.js";
import { RunnableConfig } from "../schema/runnable/config.js";
/**
 * Represents a serialized chat model.
 */
export type SerializedChatModel = {
    _model: string;
    _type: string;
} & Record<string, any>;
/**
 * Represents a serialized large language model.
 */
export type SerializedLLM = {
    _model: string;
    _type: string;
} & Record<string, any>;
/**
 * Represents the parameters for a base chat model.
 */
export type BaseChatModelParams = BaseLanguageModelParams;
/**
 * Represents the call options for a base chat model.
 */
export type BaseChatModelCallOptions = BaseLanguageModelCallOptions;
/**
 * Creates a transform stream for encoding chat message chunks.
 * @deprecated Use {@link BytesOutputParser} instead
 * @returns A TransformStream instance that encodes chat message chunks.
 */
export declare function createChatMessageChunkEncoderStream(): TransformStream<BaseMessageChunk, any>;
/**
 * Base class for chat models. It extends the BaseLanguageModel class and
 * provides methods for generating chat based on input messages.
 */
export declare abstract class BaseChatModel<CallOptions extends BaseChatModelCallOptions = BaseChatModelCallOptions> extends BaseLanguageModel<BaseMessageChunk, CallOptions> {
    ParsedCallOptions: Omit<CallOptions, keyof RunnableConfig & "timeout">;
    lc_namespace: string[];
    constructor(fields: BaseChatModelParams);
    abstract _combineLLMOutput?(...llmOutputs: LLMResult["llmOutput"][]): LLMResult["llmOutput"];
    protected _separateRunnableConfigFromCallOptions(options?: Partial<CallOptions>): [RunnableConfig, this["ParsedCallOptions"]];
    /**
     * Invokes the chat model with a single input.
     * @param input The input for the language model.
     * @param options The call options.
     * @returns A Promise that resolves to a BaseMessageChunk.
     */
    invoke(input: BaseLanguageModelInput, options?: CallOptions): Promise<BaseMessageChunk>;
    _streamResponseChunks(_messages: BaseMessage[], _options: this["ParsedCallOptions"], _runManager?: CallbackManagerForLLMRun): AsyncGenerator<ChatGenerationChunk>;
    _streamIterator(input: BaseLanguageModelInput, options?: CallOptions): AsyncGenerator<BaseMessageChunk>;
    /**
     * Generates chat based on the input messages.
     * @param messages An array of arrays of BaseMessage instances.
     * @param options The call options or an array of stop sequences.
     * @param callbacks The callbacks for the language model.
     * @returns A Promise that resolves to an LLMResult.
     */
    generate(messages: BaseMessageLike[][], options?: string[] | CallOptions, callbacks?: Callbacks): Promise<LLMResult>;
    /**
     * Get the parameters used to invoke the model
     */
    invocationParams(_options?: this["ParsedCallOptions"]): any;
    _modelType(): string;
    abstract _llmType(): string;
    /**
     * Generates a prompt based on the input prompt values.
     * @param promptValues An array of BasePromptValue instances.
     * @param options The call options or an array of stop sequences.
     * @param callbacks The callbacks for the language model.
     * @returns A Promise that resolves to an LLMResult.
     */
    generatePrompt(promptValues: BasePromptValue[], options?: string[] | CallOptions, callbacks?: Callbacks): Promise<LLMResult>;
    abstract _generate(messages: BaseMessage[], options: this["ParsedCallOptions"], runManager?: CallbackManagerForLLMRun): Promise<ChatResult>;
    /**
     * Makes a single call to the chat model.
     * @param messages An array of BaseMessage instances.
     * @param options The call options or an array of stop sequences.
     * @param callbacks The callbacks for the language model.
     * @returns A Promise that resolves to a BaseMessage.
     */
    call(messages: BaseMessageLike[], options?: string[] | CallOptions, callbacks?: Callbacks): Promise<BaseMessage>;
    /**
     * Makes a single call to the chat model with a prompt value.
     * @param promptValue The value of the prompt.
     * @param options The call options or an array of stop sequences.
     * @param callbacks The callbacks for the language model.
     * @returns A Promise that resolves to a BaseMessage.
     */
    callPrompt(promptValue: BasePromptValue, options?: string[] | CallOptions, callbacks?: Callbacks): Promise<BaseMessage>;
    /**
     * Predicts the next message based on the input messages.
     * @param messages An array of BaseMessage instances.
     * @param options The call options or an array of stop sequences.
     * @param callbacks The callbacks for the language model.
     * @returns A Promise that resolves to a BaseMessage.
     */
    predictMessages(messages: BaseMessage[], options?: string[] | CallOptions, callbacks?: Callbacks): Promise<BaseMessage>;
    /**
     * Predicts the next message based on a text input.
     * @param text The text input.
     * @param options The call options or an array of stop sequences.
     * @param callbacks The callbacks for the language model.
     * @returns A Promise that resolves to a string.
     */
    predict(text: string, options?: string[] | CallOptions, callbacks?: Callbacks): Promise<string>;
}
/**
 * An abstract class that extends BaseChatModel and provides a simple
 * implementation of _generate.
 */
export declare abstract class SimpleChatModel extends BaseChatModel {
    abstract _call(messages: BaseMessage[], options: this["ParsedCallOptions"], runManager?: CallbackManagerForLLMRun): Promise<string>;
    _generate(messages: BaseMessage[], options: this["ParsedCallOptions"], runManager?: CallbackManagerForLLMRun): Promise<ChatResult>;
}
