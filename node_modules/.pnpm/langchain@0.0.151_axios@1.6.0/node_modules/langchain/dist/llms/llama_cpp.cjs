"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamaCpp = void 0;
const node_llama_cpp_1 = require("node-llama-cpp");
const base_js_1 = require("./base.cjs");
/**
 *  To use this model you need to have the `node-llama-cpp` module installed.
 *  This can be installed using `npm install -S node-llama-cpp` and the minimum
 *  version supported in version 2.0.0.
 *  This also requires that have a locally built version of Llama2 installed.
 */
class LlamaCpp extends base_js_1.LLM {
    static lc_name() {
        return "LlamaCpp";
    }
    constructor(inputs) {
        super(inputs);
        Object.defineProperty(this, "batchSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "contextSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "embedding", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "f16Kv", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "gpuLayers", {
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
        Object.defineProperty(this, "seed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "useMlock", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "useMmap", {
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
        Object.defineProperty(this, "modelPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.batchSize = inputs.batchSize;
        this.contextSize = inputs.contextSize;
        this.embedding = inputs.embedding;
        this.f16Kv = inputs.f16Kv;
        this.gpuLayers = inputs.gpuLayers;
        this.logitsAll = inputs.logitsAll;
        this.lowVram = inputs.lowVram;
        this.modelPath = inputs.modelPath;
        this.seed = inputs.seed;
        this.useMlock = inputs.useMlock;
        this.useMmap = inputs.useMmap;
        this.vocabOnly = inputs.vocabOnly;
        this._model = new node_llama_cpp_1.LlamaModel(inputs);
        this._context = new node_llama_cpp_1.LlamaContext({ model: this._model });
    }
    _llmType() {
        return "llama2_cpp";
    }
    /** @ignore */
    async _call(prompt, options) {
        const session = new node_llama_cpp_1.LlamaChatSession({ context: this._context });
        try {
            const compleation = await session.prompt(prompt, options);
            return compleation;
        }
        catch (e) {
            throw new Error("Error getting prompt compleation.");
        }
    }
}
exports.LlamaCpp = LlamaCpp;
