"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HuggingFaceInference = void 0;
const env_js_1 = require("../util/env.cjs");
const base_js_1 = require("./base.cjs");
/**
 * Class implementing the Large Language Model (LLM) interface using the
 * Hugging Face Inference API for text generation.
 */
class HuggingFaceInference extends base_js_1.LLM {
    get lc_secrets() {
        return {
            apiKey: "HUGGINGFACEHUB_API_KEY",
        };
    }
    constructor(fields) {
        super(fields ?? {});
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "gpt2"
        });
        Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "maxTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "topP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "topK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "frequencyPenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        this.model = fields?.model ?? this.model;
        this.temperature = fields?.temperature ?? this.temperature;
        this.maxTokens = fields?.maxTokens ?? this.maxTokens;
        this.topP = fields?.topP ?? this.topP;
        this.topK = fields?.topK ?? this.topK;
        this.frequencyPenalty = fields?.frequencyPenalty ?? this.frequencyPenalty;
        this.apiKey =
            fields?.apiKey ?? (0, env_js_1.getEnvironmentVariable)("HUGGINGFACEHUB_API_KEY");
        if (!this.apiKey) {
            throw new Error("Please set an API key for HuggingFace Hub in the environment variable HUGGINGFACEHUB_API_KEY or in the apiKey field of the HuggingFaceInference constructor.");
        }
    }
    _llmType() {
        return "hf";
    }
    /** @ignore */
    async _call(prompt, options) {
        const { HfInference } = await HuggingFaceInference.imports();
        const hf = new HfInference(this.apiKey);
        const res = await this.caller.callWithOptions({ signal: options.signal }, hf.textGeneration.bind(hf), {
            model: this.model,
            parameters: {
                // make it behave similar to openai, returning only the generated text
                return_full_text: false,
                temperature: this.temperature,
                max_new_tokens: this.maxTokens,
                top_p: this.topP,
                top_k: this.topK,
                repetition_penalty: this.frequencyPenalty,
            },
            inputs: prompt,
        });
        return res.generated_text;
    }
    /** @ignore */
    static async imports() {
        try {
            const { HfInference } = await import("@huggingface/inference");
            return { HfInference };
        }
        catch (e) {
            throw new Error("Please install huggingface as a dependency with, e.g. `yarn add @huggingface/inference`");
        }
    }
}
exports.HuggingFaceInference = HuggingFaceInference;
