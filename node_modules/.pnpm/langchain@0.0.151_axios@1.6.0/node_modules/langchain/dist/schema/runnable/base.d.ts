import { CallbackManager, CallbackManagerForChainRun, BaseCallbackConfig } from "../../callbacks/manager.js";
import { Serializable } from "../../load/serializable.js";
import { IterableReadableStream } from "../../util/stream.js";
import { RunnableConfig } from "./config.js";
export type RunnableFunc<RunInput, RunOutput> = (input: RunInput) => RunOutput | Promise<RunOutput>;
export type RunnableLike<RunInput = any, RunOutput = any> = Runnable<RunInput, RunOutput> | RunnableFunc<RunInput, RunOutput> | {
    [key: string]: RunnableLike<RunInput, RunOutput>;
};
export type RunnableBatchOptions = {
    maxConcurrency?: number;
    returnExceptions?: boolean;
};
export type RunnableRetryFailedAttemptHandler = (error: any) => any;
type RunnableConfigAndOptions = RunnableConfig & {
    runType?: string;
};
/**
 * A Runnable is a generic unit of work that can be invoked, batched, streamed, and/or
 * transformed.
 */
export declare abstract class Runnable<RunInput = any, RunOutput = any, CallOptions extends RunnableConfig = RunnableConfig> extends Serializable {
    protected lc_runnable: boolean;
    abstract invoke(input: RunInput, options?: Partial<CallOptions>): Promise<RunOutput>;
    /**
     * Bind arguments to a Runnable, returning a new Runnable.
     * @param kwargs
     * @returns A new RunnableBinding that, when invoked, will apply the bound args.
     */
    bind(kwargs: Partial<CallOptions>): Runnable<RunInput, RunOutput, CallOptions>;
    /**
     * Return a new Runnable that maps a list of inputs to a list of outputs,
     * by calling invoke() with each input.
     */
    map(): Runnable<RunInput[], RunOutput[], CallOptions>;
    /**
     * Bind arguments to a Runnable, returning a new Runnable.
     * @param kwargs
     * @returns A new RunnableBinding that, when invoked, will apply the bound args.
     */
    withRetry(fields?: {
        stopAfterAttempt?: number;
        onFailedAttempt?: RunnableRetryFailedAttemptHandler;
    }): RunnableRetry<RunInput, RunOutput, CallOptions>;
    /**
     * Create a new runnable from the current one that will try invoking
     * other passed fallback runnables if the initial invocation fails.
     * @param fields.fallbacks Other runnables to call if the runnable errors.
     * @returns A new RunnableWithFallbacks.
     */
    withFallbacks(fields: {
        fallbacks: Runnable<RunInput, RunOutput>[];
    }): RunnableWithFallbacks<RunInput, RunOutput>;
    protected _getOptionsList(options: Partial<CallOptions> | Partial<CallOptions>[], length?: number): Partial<CallOptions>[];
    /**
     * Default implementation of batch, which calls invoke N times.
     * Subclasses should override this method if they can batch more efficiently.
     * @param inputs Array of inputs to each batch call.
     * @param options Either a single call options object to apply to each batch call or an array for each call.
     * @param batchOptions.maxConcurrency Maximum number of calls to run at once.
     * @param batchOptions.returnExceptions Whether to return errors rather than throwing on the first one
     * @returns An array of RunOutputs, or mixed RunOutputs and errors if batchOptions.returnExceptions is set
     */
    batch(inputs: RunInput[], options?: Partial<CallOptions> | Partial<CallOptions>[], batchOptions?: RunnableBatchOptions & {
        returnExceptions?: false;
    }): Promise<RunOutput[]>;
    batch(inputs: RunInput[], options?: Partial<CallOptions> | Partial<CallOptions>[], batchOptions?: RunnableBatchOptions & {
        returnExceptions: true;
    }): Promise<(RunOutput | Error)[]>;
    batch(inputs: RunInput[], options?: Partial<CallOptions> | Partial<CallOptions>[], batchOptions?: RunnableBatchOptions): Promise<(RunOutput | Error)[]>;
    /**
     * Default streaming implementation.
     * Subclasses should override this method if they support streaming output.
     * @param input
     * @param options
     */
    _streamIterator(input: RunInput, options?: Partial<CallOptions>): AsyncGenerator<RunOutput>;
    /**
     * Stream output in chunks.
     * @param input
     * @param options
     * @returns A readable stream that is also an iterable.
     */
    stream(input: RunInput, options?: Partial<CallOptions>): Promise<IterableReadableStream<RunOutput>>;
    protected _separateRunnableConfigFromCallOptions(options?: Partial<CallOptions>): [RunnableConfig, Omit<Partial<CallOptions>, keyof RunnableConfig>];
    protected _callWithConfig<T extends RunInput>(func: ((input: T) => Promise<RunOutput>) | ((input: T, config?: RunnableConfig, runManager?: CallbackManagerForChainRun) => Promise<RunOutput>), input: T, options?: RunnableConfigAndOptions): Promise<RunOutput>;
    /**
     * Internal method that handles batching and configuration for a runnable
     * It takes a function, input values, and optional configuration, and
     * returns a promise that resolves to the output values.
     * @param func The function to be executed for each input value.
     * @param input The input values to be processed.
     * @param config Optional configuration for the function execution.
     * @returns A promise that resolves to the output values.
     */
    _batchWithConfig<T extends RunInput>(func: (inputs: T[], configs?: RunnableConfig[], runManagers?: (CallbackManagerForChainRun | undefined)[], batchOptions?: RunnableBatchOptions) => Promise<(RunOutput | Error)[]>, inputs: T[], options?: Partial<RunnableConfigAndOptions> | Partial<RunnableConfigAndOptions>[], batchOptions?: RunnableBatchOptions): Promise<(RunOutput | Error)[]>;
    /**
     * Helper method to transform an Iterator of Input values into an Iterator of
     * Output values, with callbacks.
     * Use this to implement `stream()` or `transform()` in Runnable subclasses.
     */
    protected _transformStreamWithConfig<I extends RunInput, O extends RunOutput>(inputGenerator: AsyncGenerator<I>, transformer: (generator: AsyncGenerator<I>, runManager?: CallbackManagerForChainRun, options?: Partial<RunnableConfig>) => AsyncGenerator<O>, options?: RunnableConfig & {
        runType?: string;
    }): AsyncGenerator<O>;
    _patchConfig(config?: Partial<CallOptions>, callbackManager?: CallbackManager | undefined): Partial<CallOptions>;
    /**
     * Create a new runnable sequence that runs each individual runnable in series,
     * piping the output of one runnable into another runnable or runnable-like.
     * @param coerceable A runnable, function, or object whose values are functions or runnables.
     * @returns A new runnable sequence.
     */
    pipe<NewRunOutput>(coerceable: RunnableLike<RunOutput, NewRunOutput>): RunnableSequence<RunInput, Exclude<NewRunOutput, Error>>;
    /**
     * Default implementation of transform, which buffers input and then calls stream.
     * Subclasses should override this method if they can start producing output while
     * input is still being generated.
     * @param generator
     * @param options
     */
    transform(generator: AsyncGenerator<RunInput>, options: Partial<CallOptions>): AsyncGenerator<RunOutput>;
    static isRunnable(thing: any): thing is Runnable;
}
export type RunnableBindingArgs<RunInput, RunOutput, CallOptions extends RunnableConfig> = {
    bound: Runnable<RunInput, RunOutput, CallOptions>;
    kwargs: Partial<CallOptions>;
};
/**
 * A runnable that delegates calls to another runnable with a set of kwargs.
 */
export declare class RunnableBinding<RunInput, RunOutput, CallOptions extends BaseCallbackConfig> extends Runnable<RunInput, RunOutput, CallOptions> {
    static lc_name(): string;
    lc_namespace: string[];
    lc_serializable: boolean;
    bound: Runnable<RunInput, RunOutput, CallOptions>;
    protected kwargs: Partial<CallOptions>;
    constructor(fields: RunnableBindingArgs<RunInput, RunOutput, CallOptions>);
    bind(kwargs: Partial<CallOptions>): RunnableBinding<RunInput, RunOutput, CallOptions>;
    invoke(input: RunInput, options?: Partial<CallOptions>): Promise<RunOutput>;
    batch(inputs: RunInput[], options?: Partial<CallOptions> | Partial<CallOptions>[], batchOptions?: RunnableBatchOptions & {
        returnExceptions?: false;
    }): Promise<RunOutput[]>;
    batch(inputs: RunInput[], options?: Partial<CallOptions> | Partial<CallOptions>[], batchOptions?: RunnableBatchOptions & {
        returnExceptions: true;
    }): Promise<(RunOutput | Error)[]>;
    batch(inputs: RunInput[], options?: Partial<CallOptions> | Partial<CallOptions>[], batchOptions?: RunnableBatchOptions): Promise<(RunOutput | Error)[]>;
    _streamIterator(input: RunInput, options?: Partial<CallOptions> | undefined): AsyncGenerator<Awaited<RunOutput>, void, unknown>;
    stream(input: RunInput, options?: Partial<CallOptions> | undefined): Promise<IterableReadableStream<RunOutput>>;
    transform(generator: AsyncGenerator<RunInput>, options: Partial<CallOptions>): AsyncGenerator<RunOutput>;
    static isRunnableBinding(thing: any): thing is RunnableBinding<any, any, any>;
}
/**
 * A runnable that delegates calls to another runnable
 * with each element of the input sequence.
 */
export declare class RunnableEach<RunInputItem, RunOutputItem, CallOptions extends BaseCallbackConfig> extends Runnable<RunInputItem[], RunOutputItem[], CallOptions> {
    static lc_name(): string;
    lc_serializable: boolean;
    lc_namespace: string[];
    bound: Runnable<RunInputItem, RunOutputItem, CallOptions>;
    constructor(fields: {
        bound: Runnable<RunInputItem, RunOutputItem, CallOptions>;
    });
    /**
     * Binds the runnable with the specified arguments.
     * @param args The arguments to bind the runnable with.
     * @returns A new instance of the `RunnableEach` class that is bound with the specified arguments.
     */
    bind(kwargs: Partial<CallOptions>): RunnableEach<RunInputItem, RunOutputItem, CallOptions>;
    /**
     * Invokes the runnable with the specified input and configuration.
     * @param input The input to invoke the runnable with.
     * @param config The configuration to invoke the runnable with.
     * @returns A promise that resolves to the output of the runnable.
     */
    invoke(inputs: RunInputItem[], config?: Partial<CallOptions>): Promise<RunOutputItem[]>;
    /**
     * A helper method that is used to invoke the runnable with the specified input and configuration.
     * @param input The input to invoke the runnable with.
     * @param config The configuration to invoke the runnable with.
     * @returns A promise that resolves to the output of the runnable.
     */
    protected _invoke(inputs: RunInputItem[], config?: Partial<CallOptions>, runManager?: CallbackManagerForChainRun): Promise<RunOutputItem[]>;
}
/**
 * Base class for runnables that can be retried a
 * specified number of times.
 */
export declare class RunnableRetry<RunInput = any, RunOutput = any, CallOptions extends RunnableConfig = RunnableConfig> extends RunnableBinding<RunInput, RunOutput, CallOptions> {
    static lc_name(): string;
    lc_namespace: string[];
    protected maxAttemptNumber: number;
    onFailedAttempt?: RunnableRetryFailedAttemptHandler;
    constructor(fields: RunnableBindingArgs<RunInput, RunOutput, CallOptions> & {
        maxAttemptNumber?: number;
        onFailedAttempt?: RunnableRetryFailedAttemptHandler;
    });
    _patchConfigForRetry(attempt: number, config?: Partial<CallOptions>, runManager?: CallbackManagerForChainRun): Partial<CallOptions>;
    protected _invoke(input: RunInput, config?: CallOptions, runManager?: CallbackManagerForChainRun): Promise<RunOutput>;
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
    invoke(input: RunInput, config?: CallOptions): Promise<RunOutput>;
    _batch<ReturnExceptions extends boolean = false>(inputs: RunInput[], configs?: RunnableConfig[], runManagers?: (CallbackManagerForChainRun | undefined)[], batchOptions?: RunnableBatchOptions): Promise<ReturnExceptions extends false ? RunOutput[] : (Error | RunOutput)[]>;
    batch(inputs: RunInput[], options?: Partial<CallOptions> | Partial<CallOptions>[], batchOptions?: RunnableBatchOptions & {
        returnExceptions?: false;
    }): Promise<RunOutput[]>;
    batch(inputs: RunInput[], options?: Partial<CallOptions> | Partial<CallOptions>[], batchOptions?: RunnableBatchOptions & {
        returnExceptions: true;
    }): Promise<(RunOutput | Error)[]>;
    batch(inputs: RunInput[], options?: Partial<CallOptions> | Partial<CallOptions>[], batchOptions?: RunnableBatchOptions): Promise<(RunOutput | Error)[]>;
}
/**
 * A sequence of runnables, where the output of each is the input of the next.
 */
export declare class RunnableSequence<RunInput = any, RunOutput = any> extends Runnable<RunInput, RunOutput> {
    static lc_name(): string;
    protected first: Runnable<RunInput>;
    protected middle: Runnable[];
    protected last: Runnable<any, RunOutput>;
    lc_serializable: boolean;
    lc_namespace: string[];
    constructor(fields: {
        first: Runnable<RunInput>;
        middle?: Runnable[];
        last: Runnable<any, RunOutput>;
    });
    get steps(): Runnable<RunInput, any, BaseCallbackConfig>[];
    invoke(input: RunInput, options?: RunnableConfig): Promise<RunOutput>;
    batch(inputs: RunInput[], options?: Partial<RunnableConfig> | Partial<RunnableConfig>[], batchOptions?: RunnableBatchOptions & {
        returnExceptions?: false;
    }): Promise<RunOutput[]>;
    batch(inputs: RunInput[], options?: Partial<RunnableConfig> | Partial<RunnableConfig>[], batchOptions?: RunnableBatchOptions & {
        returnExceptions: true;
    }): Promise<(RunOutput | Error)[]>;
    batch(inputs: RunInput[], options?: Partial<RunnableConfig> | Partial<RunnableConfig>[], batchOptions?: RunnableBatchOptions): Promise<(RunOutput | Error)[]>;
    _streamIterator(input: RunInput, options?: RunnableConfig): AsyncGenerator<RunOutput>;
    pipe<NewRunOutput>(coerceable: RunnableLike<RunOutput, NewRunOutput>): RunnableSequence<RunInput, Exclude<NewRunOutput, Error>>;
    static isRunnableSequence(thing: any): thing is RunnableSequence;
    static from<RunInput = any, RunOutput = any>([first, ...runnables]: [
        RunnableLike<RunInput>,
        ...RunnableLike[],
        RunnableLike<any, RunOutput>
    ]): RunnableSequence<RunInput, Exclude<RunOutput, Error>>;
}
/**
 * A runnable that runs a mapping of runnables in parallel,
 * and returns a mapping of their outputs.
 */
export declare class RunnableMap<RunInput> extends Runnable<RunInput, Record<string, any>> {
    static lc_name(): string;
    lc_namespace: string[];
    lc_serializable: boolean;
    protected steps: Record<string, Runnable<RunInput>>;
    constructor(fields: {
        steps: Record<string, RunnableLike<RunInput>>;
    });
    invoke(input: RunInput, options?: Partial<BaseCallbackConfig>): Promise<Record<string, any>>;
}
/**
 * A runnable that runs a callable.
 */
export declare class RunnableLambda<RunInput, RunOutput> extends Runnable<RunInput, RunOutput> {
    static lc_name(): string;
    lc_namespace: string[];
    protected func: RunnableFunc<RunInput, RunOutput>;
    constructor(fields: {
        func: RunnableFunc<RunInput, RunOutput>;
    });
    _invoke(input: RunInput, config?: Partial<BaseCallbackConfig>, runManager?: CallbackManagerForChainRun): Promise<RunOutput>;
    invoke(input: RunInput, options?: Partial<BaseCallbackConfig>): Promise<RunOutput>;
}
/**
 * A Runnable that can fallback to other Runnables if it fails.
 */
export declare class RunnableWithFallbacks<RunInput, RunOutput> extends Runnable<RunInput, RunOutput> {
    static lc_name(): string;
    lc_namespace: string[];
    lc_serializable: boolean;
    protected runnable: Runnable<RunInput, RunOutput>;
    protected fallbacks: Runnable<RunInput, RunOutput>[];
    constructor(fields: {
        runnable: Runnable<RunInput, RunOutput>;
        fallbacks: Runnable<RunInput, RunOutput>[];
    });
    runnables(): Generator<Runnable<RunInput, RunOutput, BaseCallbackConfig>, void, unknown>;
    invoke(input: RunInput, options?: Partial<BaseCallbackConfig>): Promise<RunOutput>;
    batch(inputs: RunInput[], options?: Partial<BaseCallbackConfig> | Partial<BaseCallbackConfig>[], batchOptions?: RunnableBatchOptions & {
        returnExceptions?: false;
    }): Promise<RunOutput[]>;
    batch(inputs: RunInput[], options?: Partial<BaseCallbackConfig> | Partial<BaseCallbackConfig>[], batchOptions?: RunnableBatchOptions & {
        returnExceptions: true;
    }): Promise<(RunOutput | Error)[]>;
    batch(inputs: RunInput[], options?: Partial<BaseCallbackConfig> | Partial<BaseCallbackConfig>[], batchOptions?: RunnableBatchOptions): Promise<(RunOutput | Error)[]>;
}
export declare function _coerceToRunnable<RunInput, RunOutput>(coerceable: RunnableLike<RunInput, RunOutput>): Runnable<RunInput, Exclude<RunOutput, Error>>;
export {};
