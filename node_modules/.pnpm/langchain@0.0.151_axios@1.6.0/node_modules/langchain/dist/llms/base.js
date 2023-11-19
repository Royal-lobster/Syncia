import { InMemoryCache } from "../cache/index.js";
import { AIMessage, GenerationChunk, RUN_KEY, } from "../schema/index.js";
import { BaseLanguageModel, } from "../base_language/index.js";
import { CallbackManager, } from "../callbacks/manager.js";
import { getBufferString } from "../memory/base.js";
/**
 * LLM Wrapper. Provides an {@link call} (an {@link generate}) function that takes in a prompt (or prompts) and returns a string.
 */
export class BaseLLM extends BaseLanguageModel {
    constructor({ cache, concurrency, ...rest }) {
        super(concurrency ? { maxConcurrency: concurrency, ...rest } : rest);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "llms", this._llmType()]
        });
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (typeof cache === "object") {
            this.cache = cache;
        }
        else if (cache) {
            this.cache = InMemoryCache.global();
        }
        else {
            this.cache = undefined;
        }
    }
    /**
     * This method takes an input and options, and returns a string. It
     * converts the input to a prompt value and generates a result based on
     * the prompt.
     * @param input Input for the LLM.
     * @param options Options for the LLM call.
     * @returns A string result based on the prompt.
     */
    async invoke(input, options) {
        const promptValue = BaseLLM._convertInputToPromptValue(input);
        const result = await this.generatePrompt([promptValue], options, options?.callbacks);
        return result.generations[0][0].text;
    }
    // eslint-disable-next-line require-yield
    async *_streamResponseChunks(_input, _options, _runManager) {
        throw new Error("Not implemented.");
    }
    _separateRunnableConfigFromCallOptions(options) {
        const [runnableConfig, callOptions] = super._separateRunnableConfigFromCallOptions(options);
        if (callOptions?.timeout && !callOptions.signal) {
            callOptions.signal = AbortSignal.timeout(callOptions.timeout);
        }
        return [runnableConfig, callOptions];
    }
    async *_streamIterator(input, options) {
        // Subclass check required to avoid double callbacks with default implementation
        if (this._streamResponseChunks === BaseLLM.prototype._streamResponseChunks) {
            yield this.invoke(input, options);
        }
        else {
            const prompt = BaseLLM._convertInputToPromptValue(input);
            const [runnableConfig, callOptions] = this._separateRunnableConfigFromCallOptions(options);
            const callbackManager_ = await CallbackManager.configure(runnableConfig.callbacks, this.callbacks, runnableConfig.tags, this.tags, runnableConfig.metadata, this.metadata, { verbose: this.verbose });
            const extra = {
                options: callOptions,
                invocation_params: this?.invocationParams(callOptions),
            };
            const runManagers = await callbackManager_?.handleLLMStart(this.toJSON(), [prompt.toString()], undefined, undefined, extra);
            let generation = new GenerationChunk({
                text: "",
            });
            try {
                for await (const chunk of this._streamResponseChunks(input.toString(), callOptions, runManagers?.[0])) {
                    if (!generation) {
                        generation = chunk;
                    }
                    else {
                        generation = generation.concat(chunk);
                    }
                    if (typeof chunk.text === "string") {
                        yield chunk.text;
                    }
                }
            }
            catch (err) {
                await Promise.all((runManagers ?? []).map((runManager) => runManager?.handleLLMError(err)));
                throw err;
            }
            await Promise.all((runManagers ?? []).map((runManager) => runManager?.handleLLMEnd({
                generations: [[generation]],
            })));
        }
    }
    /**
     * This method takes prompt values, options, and callbacks, and generates
     * a result based on the prompts.
     * @param promptValues Prompt values for the LLM.
     * @param options Options for the LLM call.
     * @param callbacks Callbacks for the LLM call.
     * @returns An LLMResult based on the prompts.
     */
    async generatePrompt(promptValues, options, callbacks) {
        const prompts = promptValues.map((promptValue) => promptValue.toString());
        return this.generate(prompts, options, callbacks);
    }
    /**
     * Get the parameters used to invoke the model
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invocationParams(_options) {
        return {};
    }
    _flattenLLMResult(llmResult) {
        const llmResults = [];
        for (let i = 0; i < llmResult.generations.length; i += 1) {
            const genList = llmResult.generations[i];
            if (i === 0) {
                llmResults.push({
                    generations: [genList],
                    llmOutput: llmResult.llmOutput,
                });
            }
            else {
                const llmOutput = llmResult.llmOutput
                    ? { ...llmResult.llmOutput, tokenUsage: {} }
                    : undefined;
                llmResults.push({
                    generations: [genList],
                    llmOutput,
                });
            }
        }
        return llmResults;
    }
    /** @ignore */
    async _generateUncached(prompts, parsedOptions, handledOptions) {
        const callbackManager_ = await CallbackManager.configure(handledOptions.callbacks, this.callbacks, handledOptions.tags, this.tags, handledOptions.metadata, this.metadata, { verbose: this.verbose });
        const extra = {
            options: parsedOptions,
            invocation_params: this?.invocationParams(parsedOptions),
        };
        const runManagers = await callbackManager_?.handleLLMStart(this.toJSON(), prompts, undefined, undefined, extra);
        let output;
        try {
            output = await this._generate(prompts, parsedOptions, runManagers?.[0]);
        }
        catch (err) {
            await Promise.all((runManagers ?? []).map((runManager) => runManager?.handleLLMError(err)));
            throw err;
        }
        const flattenedOutputs = this._flattenLLMResult(output);
        await Promise.all((runManagers ?? []).map((runManager, i) => runManager?.handleLLMEnd(flattenedOutputs[i])));
        const runIds = runManagers?.map((manager) => manager.runId) || undefined;
        // This defines RUN_KEY as a non-enumerable property on the output object
        // so that it is not serialized when the output is stringified, and so that
        // it isnt included when listing the keys of the output object.
        Object.defineProperty(output, RUN_KEY, {
            value: runIds ? { runIds } : undefined,
            configurable: true,
        });
        return output;
    }
    /**
     * Run the LLM on the given prompts and input, handling caching.
     */
    async generate(prompts, options, callbacks) {
        if (!Array.isArray(prompts)) {
            throw new Error("Argument 'prompts' is expected to be a string[]");
        }
        let parsedOptions;
        if (Array.isArray(options)) {
            parsedOptions = { stop: options };
        }
        else {
            parsedOptions = options;
        }
        const [runnableConfig, callOptions] = this._separateRunnableConfigFromCallOptions(parsedOptions);
        runnableConfig.callbacks = runnableConfig.callbacks ?? callbacks;
        if (!this.cache) {
            return this._generateUncached(prompts, callOptions, runnableConfig);
        }
        const { cache } = this;
        const params = this.serialize();
        params.stop = callOptions.stop ?? params.stop;
        const llmStringKey = `${Object.entries(params).sort()}`;
        const missingPromptIndices = [];
        const generations = await Promise.all(prompts.map(async (prompt, index) => {
            const result = await cache.lookup(prompt, llmStringKey);
            if (!result) {
                missingPromptIndices.push(index);
            }
            return result;
        }));
        let llmOutput = {};
        if (missingPromptIndices.length > 0) {
            const results = await this._generateUncached(missingPromptIndices.map((i) => prompts[i]), callOptions, runnableConfig);
            await Promise.all(results.generations.map(async (generation, index) => {
                const promptIndex = missingPromptIndices[index];
                generations[promptIndex] = generation;
                return cache.update(prompts[promptIndex], llmStringKey, generation);
            }));
            llmOutput = results.llmOutput ?? {};
        }
        return { generations, llmOutput };
    }
    /**
     * Convenience wrapper for {@link generate} that takes in a single string prompt and returns a single string output.
     */
    async call(prompt, options, callbacks) {
        const { generations } = await this.generate([prompt], options, callbacks);
        return generations[0][0].text;
    }
    /**
     * This method is similar to `call`, but it's used for making predictions
     * based on the input text.
     * @param text Input text for the prediction.
     * @param options Options for the LLM call.
     * @param callbacks Callbacks for the LLM call.
     * @returns A prediction based on the input text.
     */
    async predict(text, options, callbacks) {
        return this.call(text, options, callbacks);
    }
    /**
     * This method takes a list of messages, options, and callbacks, and
     * returns a predicted message.
     * @param messages A list of messages for the prediction.
     * @param options Options for the LLM call.
     * @param callbacks Callbacks for the LLM call.
     * @returns A predicted message based on the list of messages.
     */
    async predictMessages(messages, options, callbacks) {
        const text = getBufferString(messages);
        const prediction = await this.call(text, options, callbacks);
        return new AIMessage(prediction);
    }
    /**
     * Get the identifying parameters of the LLM.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _identifyingParams() {
        return {};
    }
    /**
     * Return a json-like object representing this LLM.
     */
    serialize() {
        return {
            ...this._identifyingParams(),
            _type: this._llmType(),
            _model: this._modelType(),
        };
    }
    _modelType() {
        return "base_llm";
    }
    /**
     * Load an LLM from a json-like object describing it.
     */
    static async deserialize(data) {
        const { _type, _model, ...rest } = data;
        if (_model && _model !== "base_llm") {
            throw new Error(`Cannot load LLM with model ${_model}`);
        }
        const Cls = {
            openai: (await import("./openai.js")).OpenAI,
        }[_type];
        if (Cls === undefined) {
            throw new Error(`Cannot load  LLM with type ${_type}`);
        }
        return new Cls(rest);
    }
}
/**
 * LLM class that provides a simpler interface to subclass than {@link BaseLLM}.
 *
 * Requires only implementing a simpler {@link _call} method instead of {@link _generate}.
 *
 * @augments BaseLLM
 */
export class LLM extends BaseLLM {
    async _generate(prompts, options, runManager) {
        const generations = await Promise.all(prompts.map((prompt, promptIndex) => this._call(prompt, { ...options, promptIndex }, runManager).then((text) => [{ text }])));
        return { generations };
    }
}
