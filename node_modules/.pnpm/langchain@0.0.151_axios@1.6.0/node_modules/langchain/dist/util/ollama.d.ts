import { BaseLanguageModelCallOptions } from "../base_language/index.js";
export interface OllamaInput {
    embeddingOnly?: boolean;
    f16KV?: boolean;
    frequencyPenalty?: number;
    logitsAll?: boolean;
    lowVram?: boolean;
    mainGpu?: number;
    model?: string;
    baseUrl?: string;
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
}
export interface OllamaRequestParams {
    model: string;
    prompt: string;
    options: {
        embedding_only?: boolean;
        f16_kv?: boolean;
        frequency_penalty?: number;
        logits_all?: boolean;
        low_vram?: boolean;
        main_gpu?: number;
        mirostat?: number;
        mirostat_eta?: number;
        mirostat_tau?: number;
        num_batch?: number;
        num_ctx?: number;
        num_gpu?: number;
        num_gqa?: number;
        num_keep?: number;
        num_thread?: number;
        penalize_newline?: boolean;
        presence_penalty?: number;
        repeat_last_n?: number;
        repeat_penalty?: number;
        rope_frequency_base?: number;
        rope_frequency_scale?: number;
        temperature?: number;
        stop?: string[];
        tfs_z?: number;
        top_k?: number;
        top_p?: number;
        typical_p?: number;
        use_mlock?: boolean;
        use_mmap?: boolean;
        vocab_only?: boolean;
    };
}
export interface OllamaCallOptions extends BaseLanguageModelCallOptions {
}
export type OllamaGenerationChunk = {
    response: string;
    model: string;
    created_at: string;
    done: boolean;
};
export declare function createOllamaStream(baseUrl: string, params: OllamaRequestParams, options: OllamaCallOptions): AsyncGenerator<OllamaGenerationChunk>;
