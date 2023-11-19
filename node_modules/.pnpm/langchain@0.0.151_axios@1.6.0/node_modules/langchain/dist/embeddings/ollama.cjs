"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OllamaEmbeddings = void 0;
const base_js_1 = require("./base.cjs");
class OllamaEmbeddings extends base_js_1.Embeddings {
    constructor(params) {
        super(params || {});
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
        Object.defineProperty(this, "requestOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (params?.model) {
            this.model = params.model;
        }
        if (params?.baseUrl) {
            this.baseUrl = params.baseUrl;
        }
        if (params?.requestOptions) {
            this.requestOptions = this._convertOptions(params.requestOptions);
        }
    }
    /** convert camelCased Ollama request options like "useMMap" to
     * the snake_cased equivalent which the ollama API actually uses.
     * Used only for consistency with the llms/Ollama and chatModels/Ollama classes
     */
    _convertOptions(requestOptions) {
        const snakeCasedOptions = {};
        const mapping = {
            embeddingOnly: "embedding_only",
            f16KV: "f16_kv",
            frequencyPenalty: "frequency_penalty",
            logitsAll: "logits_all",
            lowVram: "low_vram",
            mainGpu: "main_gpu",
            mirostat: "mirostat",
            mirostatEta: "mirostat_eta",
            mirostatTau: "mirostat_tau",
            numBatch: "num_batch",
            numCtx: "num_ctx",
            numGpu: "num_gpu",
            numGqa: "num_gqa",
            numKeep: "num_keep",
            numThread: "num_thread",
            penalizeNewline: "penalize_newline",
            presencePenalty: "presence_penalty",
            repeatLastN: "repeat_last_n",
            repeatPenalty: "repeat_penalty",
            ropeFrequencyBase: "rope_frequency_base",
            ropeFrequencyScale: "rope_frequency_scale",
            temperature: "temperature",
            stop: "stop",
            tfsZ: "tfs_z",
            topK: "top_k",
            topP: "top_p",
            typicalP: "typical_p",
            useMLock: "use_mlock",
            useMMap: "use_mmap",
            vocabOnly: "vocab_only",
        };
        for (const [key, value] of Object.entries(requestOptions)) {
            const snakeCasedOption = mapping[key];
            if (snakeCasedOption) {
                snakeCasedOptions[snakeCasedOption] = value;
            }
        }
        return snakeCasedOptions;
    }
    async _request(prompt) {
        const { model, baseUrl, requestOptions } = this;
        const response = await fetch(`${baseUrl}/api/embeddings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt,
                model,
                options: requestOptions,
            }),
        });
        if (!response.ok) {
            throw new Error(`Request to Ollama server failed: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        return json.embedding;
    }
    async _embed(strings) {
        const embeddings = [];
        for await (const prompt of strings) {
            const embedding = await this.caller.call(() => this._request(prompt));
            embeddings.push(embedding);
        }
        return embeddings;
    }
    async embedDocuments(documents) {
        return this._embed(documents);
    }
    async embedQuery(document) {
        return (await this.embedDocuments([document]))[0];
    }
}
exports.OllamaEmbeddings = OllamaEmbeddings;
