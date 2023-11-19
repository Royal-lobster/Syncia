import { AgentAction, AgentFinish, BaseMessage, ChainValues, LLMResult } from "../schema/index.js";
import { BaseCallbackHandler, CallbackHandlerMethods, HandleLLMNewTokenCallbackFields, NewTokenIndices } from "./base.js";
import { LangChainTracerFields } from "./handlers/tracer_langchain.js";
import { Serialized } from "../load/serializable.js";
import { Document } from "../document.js";
type BaseCallbackManagerMethods = {
    [K in keyof CallbackHandlerMethods]?: (...args: Parameters<Required<CallbackHandlerMethods>[K]>) => Promise<unknown>;
};
export interface CallbackManagerOptions {
    verbose?: boolean;
    tracing?: boolean;
}
export type Callbacks = CallbackManager | (BaseCallbackHandler | CallbackHandlerMethods)[];
export interface BaseCallbackConfig {
    /**
     * Tags for this call and any sub-calls (eg. a Chain calling an LLM).
     * You can use these to filter calls.
     */
    tags?: string[];
    /**
     * Metadata for this call and any sub-calls (eg. a Chain calling an LLM).
     * Keys should be strings, values should be JSON-serializable.
     */
    metadata?: Record<string, unknown>;
    /**
     * Callbacks for this call and any sub-calls (eg. a Chain calling an LLM).
     * Tags are passed to all callbacks, metadata is passed to handle*Start callbacks.
     */
    callbacks?: Callbacks;
}
export declare function parseCallbackConfigArg(arg: Callbacks | BaseCallbackConfig | undefined): BaseCallbackConfig;
/**
 * Manage callbacks from different components of LangChain.
 */
export declare abstract class BaseCallbackManager {
    abstract addHandler(handler: BaseCallbackHandler): void;
    abstract removeHandler(handler: BaseCallbackHandler): void;
    abstract setHandlers(handlers: BaseCallbackHandler[]): void;
    setHandler(handler: BaseCallbackHandler): void;
}
/**
 * Base class for run manager in LangChain.
 */
declare class BaseRunManager {
    readonly runId: string;
    protected readonly handlers: BaseCallbackHandler[];
    protected readonly inheritableHandlers: BaseCallbackHandler[];
    protected readonly tags: string[];
    protected readonly inheritableTags: string[];
    protected readonly metadata: Record<string, unknown>;
    protected readonly inheritableMetadata: Record<string, unknown>;
    protected readonly _parentRunId?: string | undefined;
    constructor(runId: string, handlers: BaseCallbackHandler[], inheritableHandlers: BaseCallbackHandler[], tags: string[], inheritableTags: string[], metadata: Record<string, unknown>, inheritableMetadata: Record<string, unknown>, _parentRunId?: string | undefined);
    handleText(text: string): Promise<void>;
}
/**
 * Manages callbacks for retriever runs.
 */
export declare class CallbackManagerForRetrieverRun extends BaseRunManager implements BaseCallbackManagerMethods {
    getChild(tag?: string): CallbackManager;
    handleRetrieverEnd(documents: Document[]): Promise<void>;
    handleRetrieverError(err: Error | unknown): Promise<void>;
}
export declare class CallbackManagerForLLMRun extends BaseRunManager implements BaseCallbackManagerMethods {
    handleLLMNewToken(token: string, idx?: NewTokenIndices, _runId?: string, _parentRunId?: string, _tags?: string[], fields?: HandleLLMNewTokenCallbackFields): Promise<void>;
    handleLLMError(err: Error | unknown): Promise<void>;
    handleLLMEnd(output: LLMResult): Promise<void>;
}
export declare class CallbackManagerForChainRun extends BaseRunManager implements BaseCallbackManagerMethods {
    getChild(tag?: string): CallbackManager;
    handleChainError(err: Error | unknown, _runId?: string, _parentRunId?: string, _tags?: string[], kwargs?: {
        inputs?: Record<string, unknown>;
    }): Promise<void>;
    handleChainEnd(output: ChainValues, _runId?: string, _parentRunId?: string, _tags?: string[], kwargs?: {
        inputs?: Record<string, unknown>;
    }): Promise<void>;
    handleAgentAction(action: AgentAction): Promise<void>;
    handleAgentEnd(action: AgentFinish): Promise<void>;
}
export declare class CallbackManagerForToolRun extends BaseRunManager implements BaseCallbackManagerMethods {
    getChild(tag?: string): CallbackManager;
    handleToolError(err: Error | unknown): Promise<void>;
    handleToolEnd(output: string): Promise<void>;
}
export declare class CallbackManager extends BaseCallbackManager implements BaseCallbackManagerMethods {
    handlers: BaseCallbackHandler[];
    inheritableHandlers: BaseCallbackHandler[];
    tags: string[];
    inheritableTags: string[];
    metadata: Record<string, unknown>;
    inheritableMetadata: Record<string, unknown>;
    name: string;
    private readonly _parentRunId?;
    constructor(parentRunId?: string);
    handleLLMStart(llm: Serialized, prompts: string[], _runId?: string | undefined, _parentRunId?: string | undefined, extraParams?: Record<string, unknown> | undefined): Promise<CallbackManagerForLLMRun[]>;
    handleChatModelStart(llm: Serialized, messages: BaseMessage[][], _runId?: string | undefined, _parentRunId?: string | undefined, extraParams?: Record<string, unknown> | undefined): Promise<CallbackManagerForLLMRun[]>;
    handleChainStart(chain: Serialized, inputs: ChainValues, runId?: string, runType?: string | undefined): Promise<CallbackManagerForChainRun>;
    handleToolStart(tool: Serialized, input: string, runId?: string): Promise<CallbackManagerForToolRun>;
    handleRetrieverStart(retriever: Serialized, query: string, runId?: string, _parentRunId?: string | undefined): Promise<CallbackManagerForRetrieverRun>;
    addHandler(handler: BaseCallbackHandler, inherit?: boolean): void;
    removeHandler(handler: BaseCallbackHandler): void;
    setHandlers(handlers: BaseCallbackHandler[], inherit?: boolean): void;
    addTags(tags: string[], inherit?: boolean): void;
    removeTags(tags: string[]): void;
    addMetadata(metadata: Record<string, unknown>, inherit?: boolean): void;
    removeMetadata(metadata: Record<string, unknown>): void;
    copy(additionalHandlers?: BaseCallbackHandler[], inherit?: boolean): CallbackManager;
    static fromHandlers(handlers: CallbackHandlerMethods): CallbackManager;
    static configure(inheritableHandlers?: Callbacks, localHandlers?: Callbacks, inheritableTags?: string[], localTags?: string[], inheritableMetadata?: Record<string, unknown>, localMetadata?: Record<string, unknown>, options?: CallbackManagerOptions): Promise<CallbackManager | undefined>;
}
export declare class TraceGroup {
    private groupName;
    private options?;
    private runManager?;
    constructor(groupName: string, options?: {
        projectName?: string | undefined;
        exampleId?: string | undefined;
    } | undefined);
    private getTraceGroupCallbackManager;
    start(inputs?: ChainValues): Promise<CallbackManager>;
    error(err: Error | unknown): Promise<void>;
    end(output?: ChainValues): Promise<void>;
}
export declare function traceAsGroup<T, A extends any[]>(groupOptions: {
    name: string;
} & LangChainTracerFields, enclosedCode: (manager: CallbackManager, ...args: A) => Promise<T>, ...args: A): Promise<T>;
export {};
