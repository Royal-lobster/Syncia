import pRetry from "p-retry";
import { CallbackManager, } from "../../callbacks/manager.js";
import { Serializable } from "../../load/serializable.js";
import { IterableReadableStream } from "../../util/stream.js";
import { getCallbackMangerForConfig } from "./config.js";
import { AsyncCaller } from "../../util/async_caller.js";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _coerceToDict(value, defaultKey) {
    return value && !Array.isArray(value) && typeof value === "object"
        ? value
        : { [defaultKey]: value };
}
/**
 * A Runnable is a generic unit of work that can be invoked, batched, streamed, and/or
 * transformed.
 */
export class Runnable extends Serializable {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_runnable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    /**
     * Bind arguments to a Runnable, returning a new Runnable.
     * @param kwargs
     * @returns A new RunnableBinding that, when invoked, will apply the bound args.
     */
    bind(kwargs) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableBinding({ bound: this, kwargs });
    }
    /**
     * Return a new Runnable that maps a list of inputs to a list of outputs,
     * by calling invoke() with each input.
     */
    map() {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableEach({ bound: this });
    }
    /**
     * Bind arguments to a Runnable, returning a new Runnable.
     * @param kwargs
     * @returns A new RunnableBinding that, when invoked, will apply the bound args.
     */
    withRetry(fields) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableRetry({
            bound: this,
            kwargs: {},
            maxAttemptNumber: fields?.stopAfterAttempt,
            ...fields,
        });
    }
    /**
     * Create a new runnable from the current one that will try invoking
     * other passed fallback runnables if the initial invocation fails.
     * @param fields.fallbacks Other runnables to call if the runnable errors.
     * @returns A new RunnableWithFallbacks.
     */
    withFallbacks(fields) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableWithFallbacks({
            runnable: this,
            fallbacks: fields.fallbacks,
        });
    }
    _getOptionsList(options, length = 0) {
        if (Array.isArray(options)) {
            if (options.length !== length) {
                throw new Error(`Passed "options" must be an array with the same length as the inputs, but got ${options.length} options for ${length} inputs`);
            }
            return options;
        }
        return Array.from({ length }, () => options);
    }
    async batch(inputs, options, batchOptions) {
        const configList = this._getOptionsList(options ?? {}, inputs.length);
        const caller = new AsyncCaller({
            maxConcurrency: batchOptions?.maxConcurrency,
            onFailedAttempt: (e) => {
                throw e;
            },
        });
        const batchCalls = inputs.map((input, i) => caller.call(async () => {
            try {
                const result = await this.invoke(input, configList[i]);
                return result;
            }
            catch (e) {
                if (batchOptions?.returnExceptions) {
                    return e;
                }
                throw e;
            }
        }));
        return Promise.all(batchCalls);
    }
    /**
     * Default streaming implementation.
     * Subclasses should override this method if they support streaming output.
     * @param input
     * @param options
     */
    async *_streamIterator(input, options) {
        yield this.invoke(input, options);
    }
    /**
     * Stream output in chunks.
     * @param input
     * @param options
     * @returns A readable stream that is also an iterable.
     */
    async stream(input, options) {
        return IterableReadableStream.fromAsyncGenerator(this._streamIterator(input, options));
    }
    _separateRunnableConfigFromCallOptions(options = {}) {
        const runnableConfig = {
            callbacks: options.callbacks,
            tags: options.tags,
            metadata: options.metadata,
        };
        const callOptions = { ...options };
        delete callOptions.callbacks;
        delete callOptions.tags;
        delete callOptions.metadata;
        return [runnableConfig, callOptions];
    }
    async _callWithConfig(func, input, options) {
        const callbackManager_ = await getCallbackMangerForConfig(options);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"), undefined, options?.runType);
        let output;
        try {
            output = await func.bind(this)(input, options, runManager);
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(_coerceToDict(output, "output"));
        return output;
    }
    /**
     * Internal method that handles batching and configuration for a runnable
     * It takes a function, input values, and optional configuration, and
     * returns a promise that resolves to the output values.
     * @param func The function to be executed for each input value.
     * @param input The input values to be processed.
     * @param config Optional configuration for the function execution.
     * @returns A promise that resolves to the output values.
     */
    async _batchWithConfig(func, inputs, options, batchOptions) {
        const configs = this._getOptionsList((options ?? {}), inputs.length);
        const callbackManagers = await Promise.all(configs.map(getCallbackMangerForConfig));
        const runManagers = await Promise.all(callbackManagers.map((callbackManager, i) => callbackManager?.handleChainStart(this.toJSON(), _coerceToDict(inputs[i], "input"))));
        let outputs;
        try {
            outputs = await func(inputs, configs, runManagers, batchOptions);
        }
        catch (e) {
            await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(e)));
            throw e;
        }
        await Promise.all(runManagers.map((runManager) => runManager?.handleChainEnd(_coerceToDict(outputs, "output"))));
        return outputs;
    }
    /**
     * Helper method to transform an Iterator of Input values into an Iterator of
     * Output values, with callbacks.
     * Use this to implement `stream()` or `transform()` in Runnable subclasses.
     */
    async *_transformStreamWithConfig(inputGenerator, transformer, options) {
        let finalInput;
        let finalInputSupported = true;
        let finalOutput;
        let finalOutputSupported = true;
        const callbackManager_ = await getCallbackMangerForConfig(options);
        let runManager;
        const serializedRepresentation = this.toJSON();
        async function* wrapInputForTracing() {
            for await (const chunk of inputGenerator) {
                if (!runManager) {
                    // Start the run manager AFTER the iterator starts to preserve
                    // tracing order
                    runManager = await callbackManager_?.handleChainStart(serializedRepresentation, { input: "" }, undefined, options?.runType);
                }
                if (finalInputSupported) {
                    if (finalInput === undefined) {
                        finalInput = chunk;
                    }
                    else {
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            finalInput = finalInput.concat(chunk);
                        }
                        catch {
                            finalInput = undefined;
                            finalInputSupported = false;
                        }
                    }
                }
                yield chunk;
            }
        }
        const wrappedInputGenerator = wrapInputForTracing();
        try {
            const outputIterator = transformer(wrappedInputGenerator, runManager, options);
            for await (const chunk of outputIterator) {
                yield chunk;
                if (finalOutputSupported) {
                    if (finalOutput === undefined) {
                        finalOutput = chunk;
                    }
                    else {
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            finalOutput = finalOutput.concat(chunk);
                        }
                        catch {
                            finalOutput = undefined;
                            finalOutputSupported = false;
                        }
                    }
                }
            }
        }
        catch (e) {
            await runManager?.handleChainError(e, undefined, undefined, undefined, {
                inputs: _coerceToDict(finalInput, "input"),
            });
            throw e;
        }
        await runManager?.handleChainEnd(finalOutput ?? {}, undefined, undefined, undefined, { inputs: _coerceToDict(finalInput, "input") });
    }
    _patchConfig(config = {}, callbackManager = undefined) {
        return { ...config, callbacks: callbackManager };
    }
    /**
     * Create a new runnable sequence that runs each individual runnable in series,
     * piping the output of one runnable into another runnable or runnable-like.
     * @param coerceable A runnable, function, or object whose values are functions or runnables.
     * @returns A new runnable sequence.
     */
    pipe(coerceable) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableSequence({
            first: this,
            last: _coerceToRunnable(coerceable),
        });
    }
    /**
     * Default implementation of transform, which buffers input and then calls stream.
     * Subclasses should override this method if they can start producing output while
     * input is still being generated.
     * @param generator
     * @param options
     */
    async *transform(generator, options) {
        let finalChunk;
        for await (const chunk of generator) {
            if (!finalChunk) {
                finalChunk = chunk;
            }
            else {
                // Make a best effort to gather, for any type that supports concat.
                // This method should throw an error if gathering fails.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                finalChunk = finalChunk.concat(chunk);
            }
        }
        yield* this._streamIterator(finalChunk, options);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isRunnable(thing) {
        return thing.lc_runnable;
    }
}
/**
 * A runnable that delegates calls to another runnable with a set of kwargs.
 */
export class RunnableBinding extends Runnable {
    static lc_name() {
        return "RunnableBinding";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "bound", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.bound = fields.bound;
        this.kwargs = fields.kwargs;
    }
    bind(kwargs) {
        return new RunnableBinding({
            bound: this.bound,
            kwargs: { ...this.kwargs, ...kwargs },
        });
    }
    async invoke(input, options) {
        return this.bound.invoke(input, { ...options, ...this.kwargs });
    }
    async batch(inputs, options, batchOptions) {
        const mergedOptions = Array.isArray(options)
            ? options.map((individualOption) => ({
                ...individualOption,
                ...this.kwargs,
            }))
            : { ...options, ...this.kwargs };
        return this.bound.batch(inputs, mergedOptions, batchOptions);
    }
    async *_streamIterator(input, options) {
        yield* this.bound._streamIterator(input, { ...options, ...this.kwargs });
    }
    async stream(input, options) {
        return this.bound.stream(input, { ...options, ...this.kwargs });
    }
    async *transform(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generator, options) {
        yield* this.bound.transform(generator, options);
    }
    static isRunnableBinding(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
        return thing.bound && Runnable.isRunnable(thing.bound);
    }
}
/**
 * A runnable that delegates calls to another runnable
 * with each element of the input sequence.
 */
export class RunnableEach extends Runnable {
    static lc_name() {
        return "RunnableEach";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "bound", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.bound = fields.bound;
    }
    /**
     * Binds the runnable with the specified arguments.
     * @param args The arguments to bind the runnable with.
     * @returns A new instance of the `RunnableEach` class that is bound with the specified arguments.
     */
    bind(kwargs) {
        return new RunnableEach({
            bound: this.bound.bind(kwargs),
        });
    }
    /**
     * Invokes the runnable with the specified input and configuration.
     * @param input The input to invoke the runnable with.
     * @param config The configuration to invoke the runnable with.
     * @returns A promise that resolves to the output of the runnable.
     */
    async invoke(inputs, config) {
        return this._callWithConfig(this._invoke, inputs, config);
    }
    /**
     * A helper method that is used to invoke the runnable with the specified input and configuration.
     * @param input The input to invoke the runnable with.
     * @param config The configuration to invoke the runnable with.
     * @returns A promise that resolves to the output of the runnable.
     */
    async _invoke(inputs, config, runManager) {
        return this.bound.batch(inputs, this._patchConfig(config, runManager?.getChild()));
    }
}
/**
 * Base class for runnables that can be retried a
 * specified number of times.
 */
export class RunnableRetry extends RunnableBinding {
    static lc_name() {
        return "RunnableRetry";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "maxAttemptNumber", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "onFailedAttempt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => { }
        });
        this.maxAttemptNumber = fields.maxAttemptNumber ?? this.maxAttemptNumber;
        this.onFailedAttempt = fields.onFailedAttempt ?? this.onFailedAttempt;
    }
    _patchConfigForRetry(attempt, config, runManager) {
        const tag = attempt > 1 ? `retry:attempt:${attempt}` : undefined;
        return this._patchConfig(config, runManager?.getChild(tag));
    }
    async _invoke(input, config, runManager) {
        return pRetry((attemptNumber) => super.invoke(input, this._patchConfigForRetry(attemptNumber, config, runManager)), {
            onFailedAttempt: this.onFailedAttempt,
            retries: Math.max(this.maxAttemptNumber - 1, 0),
            randomize: true,
        });
    }
    /**
     * Method that invokes the runnable with the specified input, run manager,
     * and config. It handles the retry logic by catching any errors and
     * recursively invoking itself with the updated config for the next retry
     * attempt.
     * @param input The input for the runnable.
     * @param runManager The run manager for the runnable.
     * @param config The config for the runnable.
     * @returns A promise that resolves to the output of the runnable.
     */
    async invoke(input, config) {
        return this._callWithConfig(this._invoke, input, config);
    }
    async _batch(inputs, configs, runManagers, batchOptions) {
        const resultsMap = {};
        try {
            await pRetry(async (attemptNumber) => {
                const remainingIndexes = inputs
                    .map((_, i) => i)
                    .filter((i) => resultsMap[i.toString()] === undefined ||
                    // eslint-disable-next-line no-instanceof/no-instanceof
                    resultsMap[i.toString()] instanceof Error);
                const remainingInputs = remainingIndexes.map((i) => inputs[i]);
                const patchedConfigs = remainingIndexes.map((i) => this._patchConfigForRetry(attemptNumber, configs?.[i], runManagers?.[i]));
                const results = await super.batch(remainingInputs, patchedConfigs, {
                    ...batchOptions,
                    returnExceptions: true,
                });
                let firstException;
                for (let i = 0; i < results.length; i += 1) {
                    const result = results[i];
                    const resultMapIndex = remainingIndexes[i];
                    // eslint-disable-next-line no-instanceof/no-instanceof
                    if (result instanceof Error) {
                        if (firstException === undefined) {
                            firstException = result;
                        }
                    }
                    resultsMap[resultMapIndex.toString()] = result;
                }
                if (firstException) {
                    throw firstException;
                }
                return results;
            }, {
                onFailedAttempt: this.onFailedAttempt,
                retries: Math.max(this.maxAttemptNumber - 1, 0),
                randomize: true,
            });
        }
        catch (e) {
            if (batchOptions?.returnExceptions !== true) {
                throw e;
            }
        }
        return Object.keys(resultsMap)
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .map((key) => resultsMap[parseInt(key, 10)]);
    }
    async batch(inputs, options, batchOptions) {
        return this._batchWithConfig(this._batch.bind(this), inputs, options, batchOptions);
    }
}
/**
 * A sequence of runnables, where the output of each is the input of the next.
 */
export class RunnableSequence extends Runnable {
    static lc_name() {
        return "RunnableSequence";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "first", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "middle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "last", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        this.first = fields.first;
        this.middle = fields.middle ?? this.middle;
        this.last = fields.last;
    }
    get steps() {
        return [this.first, ...this.middle, this.last];
    }
    async invoke(input, options) {
        const callbackManager_ = await getCallbackMangerForConfig(options);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"));
        let nextStepInput = input;
        let finalOutput;
        try {
            const initialSteps = [this.first, ...this.middle];
            for (let i = 0; i < initialSteps.length; i += 1) {
                const step = initialSteps[i];
                nextStepInput = await step.invoke(nextStepInput, this._patchConfig(options, runManager?.getChild(`seq:step:${i + 1}`)));
            }
            // TypeScript can't detect that the last output of the sequence returns RunOutput, so call it out of the loop here
            finalOutput = await this.last.invoke(nextStepInput, this._patchConfig(options, runManager?.getChild(`seq:step:${this.steps.length}`)));
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(_coerceToDict(finalOutput, "output"));
        return finalOutput;
    }
    async batch(inputs, options, batchOptions) {
        const configList = this._getOptionsList(options ?? {}, inputs.length);
        const callbackManagers = await Promise.all(configList.map(getCallbackMangerForConfig));
        const runManagers = await Promise.all(callbackManagers.map((callbackManager, i) => callbackManager?.handleChainStart(this.toJSON(), _coerceToDict(inputs[i], "input"))));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let nextStepInputs = inputs;
        let finalOutputs;
        try {
            const initialSteps = [this.first, ...this.middle];
            for (let i = 0; i < initialSteps.length; i += 1) {
                const step = initialSteps[i];
                nextStepInputs = await step.batch(nextStepInputs, runManagers.map((runManager, j) => this._patchConfig(configList[j], runManager?.getChild(`seq:step:${i + 1}`))), batchOptions);
            }
            finalOutputs = await this.last.batch(nextStepInputs, runManagers.map((runManager) => this._patchConfig(configList[this.steps.length - 1], runManager?.getChild(`seq:step:${this.steps.length}`))), batchOptions);
        }
        catch (e) {
            await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(e)));
            throw e;
        }
        await Promise.all(runManagers.map((runManager, i) => runManager?.handleChainEnd(_coerceToDict(finalOutputs[i], "output"))));
        return finalOutputs;
    }
    async *_streamIterator(input, options) {
        const callbackManager_ = await getCallbackMangerForConfig(options);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"));
        let nextStepInput = input;
        const steps = [this.first, ...this.middle, this.last];
        // Find the index of the last runnable in the sequence that doesn't have an overridden .transform() method
        // and start streaming from there
        const streamingStartStepIndex = Math.min(steps.length - 1, steps.length -
            [...steps].reverse().findIndex((step) => {
                const isDefaultImplementation = step.transform === Runnable.prototype.transform;
                const boundRunnableIsDefaultImplementation = RunnableBinding.isRunnableBinding(step) &&
                    step.bound?.transform === Runnable.prototype.transform;
                return (isDefaultImplementation || boundRunnableIsDefaultImplementation);
            }) -
            1);
        try {
            const invokeSteps = steps.slice(0, streamingStartStepIndex);
            for (let i = 0; i < invokeSteps.length; i += 1) {
                const step = invokeSteps[i];
                nextStepInput = await step.invoke(nextStepInput, this._patchConfig(options, runManager?.getChild(`seq:step:${i + 1}`)));
            }
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        let concatSupported = true;
        let finalOutput;
        try {
            let finalGenerator = await steps[streamingStartStepIndex]._streamIterator(nextStepInput, this._patchConfig(options, runManager?.getChild(`seq:step:${streamingStartStepIndex + 1}`)));
            const finalSteps = steps.slice(streamingStartStepIndex + 1);
            for (let i = 0; i < finalSteps.length; i += 1) {
                const step = finalSteps[i];
                finalGenerator = await step.transform(finalGenerator, this._patchConfig(options, runManager?.getChild(`seq:step:${streamingStartStepIndex + i + 2}`)));
            }
            for await (const chunk of finalGenerator) {
                yield chunk;
                if (concatSupported) {
                    if (finalOutput === undefined) {
                        finalOutput = chunk;
                    }
                    else {
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            finalOutput = finalOutput.concat(chunk);
                        }
                        catch (e) {
                            finalOutput = undefined;
                            concatSupported = false;
                        }
                    }
                }
            }
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(_coerceToDict(finalOutput, "output"));
    }
    pipe(coerceable) {
        if (RunnableSequence.isRunnableSequence(coerceable)) {
            return new RunnableSequence({
                first: this.first,
                middle: this.middle.concat([
                    this.last,
                    coerceable.first,
                    ...coerceable.middle,
                ]),
                last: coerceable.last,
            });
        }
        else {
            return new RunnableSequence({
                first: this.first,
                middle: [...this.middle, this.last],
                last: _coerceToRunnable(coerceable),
            });
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isRunnableSequence(thing) {
        return Array.isArray(thing.middle) && Runnable.isRunnable(thing);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static from([first, ...runnables]) {
        return new RunnableSequence({
            first: _coerceToRunnable(first),
            middle: runnables.slice(0, -1).map(_coerceToRunnable),
            last: _coerceToRunnable(runnables[runnables.length - 1]),
        });
    }
}
/**
 * A runnable that runs a mapping of runnables in parallel,
 * and returns a mapping of their outputs.
 */
export class RunnableMap extends Runnable {
    static lc_name() {
        return "RunnableMap";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "steps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.steps = {};
        for (const [key, value] of Object.entries(fields.steps)) {
            this.steps[key] = _coerceToRunnable(value);
        }
    }
    async invoke(input, options
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
        const callbackManager_ = await getCallbackMangerForConfig(options);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), {
            input,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const output = {};
        try {
            for (const [key, runnable] of Object.entries(this.steps)) {
                const result = await runnable.invoke(input, this._patchConfig(options, runManager?.getChild()));
                output[key] = result;
            }
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(output);
        return output;
    }
}
/**
 * A runnable that runs a callable.
 */
export class RunnableLambda extends Runnable {
    static lc_name() {
        return "RunnableLambda";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "func", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.func = fields.func;
    }
    async _invoke(input, config, runManager) {
        let output = await this.func(input);
        if (output && Runnable.isRunnable(output)) {
            output = await output.invoke(input, this._patchConfig(config, runManager?.getChild()));
        }
        return output;
    }
    async invoke(input, options) {
        return this._callWithConfig(this._invoke, input, options);
    }
}
/**
 * A Runnable that can fallback to other Runnables if it fails.
 */
export class RunnableWithFallbacks extends Runnable {
    static lc_name() {
        return "RunnableWithFallbacks";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "runnable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fallbacks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.runnable = fields.runnable;
        this.fallbacks = fields.fallbacks;
    }
    *runnables() {
        yield this.runnable;
        for (const fallback of this.fallbacks) {
            yield fallback;
        }
    }
    async invoke(input, options) {
        const callbackManager_ = await CallbackManager.configure(options?.callbacks, undefined, options?.tags, undefined, options?.metadata);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"));
        let firstError;
        for (const runnable of this.runnables()) {
            try {
                const output = await runnable.invoke(input, this._patchConfig(options, runManager?.getChild()));
                await runManager?.handleChainEnd(_coerceToDict(output, "output"));
                return output;
            }
            catch (e) {
                if (firstError === undefined) {
                    firstError = e;
                }
            }
        }
        if (firstError === undefined) {
            throw new Error("No error stored at end of fallback.");
        }
        await runManager?.handleChainError(firstError);
        throw firstError;
    }
    async batch(inputs, options, batchOptions) {
        if (batchOptions?.returnExceptions) {
            throw new Error("Not implemented.");
        }
        const configList = this._getOptionsList(options ?? {}, inputs.length);
        const callbackManagers = await Promise.all(configList.map((config) => CallbackManager.configure(config?.callbacks, undefined, config?.tags, undefined, config?.metadata)));
        const runManagers = await Promise.all(callbackManagers.map((callbackManager, i) => callbackManager?.handleChainStart(this.toJSON(), _coerceToDict(inputs[i], "input"))));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let firstError;
        for (const runnable of this.runnables()) {
            try {
                const outputs = await runnable.batch(inputs, runManagers.map((runManager, j) => this._patchConfig(configList[j], runManager?.getChild())), batchOptions);
                await Promise.all(runManagers.map((runManager, i) => runManager?.handleChainEnd(_coerceToDict(outputs[i], "output"))));
                return outputs;
            }
            catch (e) {
                if (firstError === undefined) {
                    firstError = e;
                }
            }
        }
        if (!firstError) {
            throw new Error("No error stored at end of fallbacks.");
        }
        await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(firstError)));
        throw firstError;
    }
}
// TODO: Figure out why the compiler needs help eliminating Error as a RunOutput type
export function _coerceToRunnable(coerceable) {
    if (typeof coerceable === "function") {
        return new RunnableLambda({ func: coerceable });
    }
    else if (Runnable.isRunnable(coerceable)) {
        return coerceable;
    }
    else if (!Array.isArray(coerceable) && typeof coerceable === "object") {
        const runnables = {};
        for (const [key, value] of Object.entries(coerceable)) {
            runnables[key] = _coerceToRunnable(value);
        }
        return new RunnableMap({
            steps: runnables,
        });
    }
    else {
        throw new Error(`Expected a Runnable, function or object.\nInstead got an unsupported type.`);
    }
}
