import { SimpleChatModel } from "./base.js";
import { createOllamaStream } from "../util/ollama.js";
import { AIMessageChunk, ChatGenerationChunk, ChatMessage, } from "../schema/index.js";
/**
 * A class that enables calls to the Ollama API to access large language
 * models in a chat-like fashion. It extends the SimpleChatModel class and
 * implements the OllamaInput interface.
 */
export class ChatOllama extends SimpleChatModel {
    static lc_name() {
        return "ChatOllama";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "llama2"
        });
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "http://localhost:11434"
        });
        Object.defineProperty(this, "embeddingOnly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "f16KV", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "frequencyPenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "logitsAll", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lowVram", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "mainGpu", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "mirostat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "mirostatEta", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "mirostatTau", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "numBatch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "numCtx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "numGpu", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "numGqa", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "numKeep", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "numThread", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "penalizeNewline", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "presencePenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "repeatLastN", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "repeatPenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ropeFrequencyBase", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ropeFrequencyScale", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tfsZ", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "topK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "topP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "typicalP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "useMLock", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "useMMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "vocabOnly", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.model = fields.model ?? this.model;
        this.baseUrl = fields.baseUrl?.endsWith("/")
            ? fields.baseUrl.slice(0, -1)
            : fields.baseUrl ?? this.baseUrl;
        this.embeddingOnly = fields.embeddingOnly;
        this.f16KV = fields.f16KV;
        this.frequencyPenalty = fields.frequencyPenalty;
        this.logitsAll = fields.logitsAll;
        this.lowVram = fields.lowVram;
        this.mainGpu = fields.mainGpu;
        this.mirostat = fields.mirostat;
        this.mirostatEta = fields.mirostatEta;
        this.mirostatTau = fields.mirostatTau;
        this.numBatch = fields.numBatch;
        this.numCtx = fields.numCtx;
        this.numGpu = fields.numGpu;
        this.numGqa = fields.numGqa;
        this.numKeep = fields.numKeep;
        this.numThread = fields.numThread;
        this.penalizeNewline = fields.penalizeNewline;
        this.presencePenalty = fields.presencePenalty;
        this.repeatLastN = fields.repeatLastN;
        this.repeatPenalty = fields.repeatPenalty;
        this.ropeFrequencyBase = fields.ropeFrequencyBase;
        this.ropeFrequencyScale = fields.ropeFrequencyScale;
        this.temperature = fields.temperature;
        this.stop = fields.stop;
        this.tfsZ = fields.tfsZ;
        this.topK = fields.topK;
        this.topP = fields.topP;
        this.typicalP = fields.typicalP;
        this.useMLock = fields.useMLock;
        this.useMMap = fields.useMMap;
        this.vocabOnly = fields.vocabOnly;
    }
    _llmType() {
        return "ollama";
    }
    /**
     * A method that returns the parameters for an Ollama API call. It
     * includes model and options parameters.
     * @param options Optional parsed call options.
     * @returns An object containing the parameters for an Ollama API call.
     */
    invocationParams(options) {
        return {
            model: this.model,
            options: {
                embedding_only: this.embeddingOnly,
                f16_kv: this.f16KV,
                frequency_penalty: this.frequencyPenalty,
                logits_all: this.logitsAll,
                low_vram: this.lowVram,
                main_gpu: this.mainGpu,
                mirostat: this.mirostat,
                mirostat_eta: this.mirostatEta,
                mirostat_tau: this.mirostatTau,
                num_batch: this.numBatch,
                num_ctx: this.numCtx,
                num_gpu: this.numGpu,
                num_gqa: this.numGqa,
                num_keep: this.numKeep,
                num_thread: this.numThread,
                penalize_newline: this.penalizeNewline,
                presence_penalty: this.presencePenalty,
                repeat_last_n: this.repeatLastN,
                repeat_penalty: this.repeatPenalty,
                rope_frequency_base: this.ropeFrequencyBase,
                rope_frequency_scale: this.ropeFrequencyScale,
                temperature: this.temperature,
                stop: options?.stop ?? this.stop,
                tfs_z: this.tfsZ,
                top_k: this.topK,
                top_p: this.topP,
                typical_p: this.typicalP,
                use_mlock: this.useMLock,
                use_mmap: this.useMMap,
                vocab_only: this.vocabOnly,
            },
        };
    }
    _combineLLMOutput() {
        return {};
    }
    async *_streamResponseChunks(input, options, runManager) {
        const stream = await this.caller.call(async () => createOllamaStream(this.baseUrl, {
            ...this.invocationParams(options),
            prompt: this._formatMessagesAsPrompt(input),
        }, options));
        for await (const chunk of stream) {
            yield new ChatGenerationChunk({
                text: chunk.response,
                message: new AIMessageChunk({ content: chunk.response }),
            });
            await runManager?.handleLLMNewToken(chunk.response ?? "");
        }
    }
    _formatMessagesAsPrompt(messages) {
        const formattedMessages = messages
            .map((message) => {
            let messageText;
            if (message._getType() === "human") {
                messageText = `[INST] ${message.content} [/INST]`;
            }
            else if (message._getType() === "ai") {
                messageText = message.content;
            }
            else if (message._getType() === "system") {
                messageText = `<<SYS>> ${message.content} <</SYS>>`;
            }
            else if (ChatMessage.isInstance(message)) {
                messageText = `\n\n${message.role[0].toUpperCase()}${message.role.slice(1)}: ${message.content}`;
            }
            else {
                console.warn(`Unsupported message type passed to Ollama: "${message._getType()}"`);
                messageText = "";
            }
            return messageText;
        })
            .join("\n");
        return formattedMessages;
    }
    /** @ignore */
    async _call(messages, options) {
        const stream = await this.caller.call(async () => createOllamaStream(this.baseUrl, {
            ...this.invocationParams(options),
            prompt: this._formatMessagesAsPrompt(messages),
        }, options));
        const chunks = [];
        for await (const chunk of stream) {
            chunks.push(chunk.response);
        }
        return chunks.join("");
    }
}
