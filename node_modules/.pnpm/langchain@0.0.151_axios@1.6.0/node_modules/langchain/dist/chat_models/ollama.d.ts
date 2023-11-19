import { SimpleChatModel, BaseChatModelParams } from "./base.js";
import { BaseLanguageModelCallOptions } from "../base_language/index.js";
import { OllamaInput } from "../util/ollama.js";
import { CallbackManagerForLLMRun } from "../callbacks/manager.js";
import { BaseMessage, ChatGenerationChunk } from "../schema/index.js";
/**
 * An interface defining the options for an Ollama API call. It extends
 * the BaseLanguageModelCallOptions interface.
 */
export interface OllamaCallOptions extends BaseLanguageModelCallOptions {
}
/**
 * A class that enables calls to the Ollama API to access large language
 * models in a chat-like fashion. It extends the SimpleChatModel class and
 * implements the OllamaInput interface.
 */
export declare class ChatOllama extends SimpleChatModel implements OllamaInput {
    CallOptions: OllamaCallOptions;
    static lc_name(): string;
    lc_serializable: boolean;
    model: string;
    baseUrl: string;
    embeddingOnly?: boolean;
    f16KV?: boolean;
    frequencyPenalty?: number;
    logitsAll?: boolean;
    lowVram?: boolean;
    mainGpu?: number;
    mirostat?: number;
    mirostatEta?: number;
    mirostatTau?: number;
    numBatch?: number;
    numCtx?: number;
    numGpu?: number;
    numGqa?: number;
    numKeep?: number;
    numThread?: number;
    penalizeNewline?: boolean;
    presencePenalty?: number;
    repeatLastN?: number;
    repeatPenalty?: number;
    ropeFrequencyBase?: number;
    ropeFrequencyScale?: number;
    temperature?: number;
    stop?: string[];
    tfsZ?: number;
    topK?: number;
    topP?: number;
    typicalP?: number;
    useMLock?: boolean;
    useMMap?: boolean;
    vocabOnly?: boolean;
    constructor(fields: OllamaInput & BaseChatModelParams);
    _llmType(): string;
    /**
     * A method that returns the parameters for an Ollama API call. It
     * includes model and options parameters.
     * @param options Optional parsed call options.
     * @returns An object containing the parameters for an Ollama API call.
     */
    invocationParams(options?: this["ParsedCallOptions"]): {
        model: string;
        options: {
            embedding_only: boolean | undefined;
            f16_kv: boolean | undefined;
            frequency_penalty: number | undefined;
            logits_all: boolean | undefined;
            low_vram: boolean | undefined;
            main_gpu: number | undefined;
            mirostat: number | undefined;
            mirostat_eta: number | undefined;
            mirostat_tau: number | undefined;
            num_batch: number | undefined;
            num_ctx: number | undefined;
            num_gpu: number | undefined;
            num_gqa: number | undefined;
            num_keep: number | undefined;
            num_thread: number | undefined;
            penalize_newline: boolean | undefined;
            presence_penalty: number | undefined;
            repeat_last_n: number | undefined;
            repeat_penalty: number | undefined;
            rope_frequency_base: number | undefined;
            rope_frequency_scale: number | undefined;
            temperature: number | undefined;
            stop: string[] | undefined;
            tfs_z: number | undefined;
            top_k: number | undefined;
            top_p: number | undefined;
            typical_p: number | undefined;
            use_mlock: boolean | undefined;
            use_mmap: boolean | undefined;
            vocab_only: boolean | undefined;
        };
    };
    _combineLLMOutput(): {};
    _streamResponseChunks(input: BaseMessage[], options: this["ParsedCallOptions"], runManager?: CallbackManagerForLLMRun): AsyncGenerator<ChatGenerationChunk>;
    protected _formatMessagesAsPrompt(messages: BaseMessage[]): string;
    /** @ignore */
    _call(messages: BaseMessage[], options: this["ParsedCallOptions"]): Promise<string>;
}
