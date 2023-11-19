import { KVMap, BaseRun } from "langsmith/schemas";
import { AgentAction, AgentFinish, BaseMessage, ChainValues, LLMResult } from "../../schema/index.js";
import { Serialized } from "../../load/serializable.js";
import { BaseCallbackHandler, BaseCallbackHandlerInput, HandleLLMNewTokenCallbackFields, NewTokenIndices } from "../base.js";
import { Document } from "../../document.js";
export type RunType = string;
export interface Run extends BaseRun {
    id: string;
    start_time: number;
    execution_order: number;
    child_runs: this[];
    child_execution_order: number;
    events: Array<{
        name: string;
        time: string;
        kwargs?: Record<string, unknown>;
    }>;
}
export interface AgentRun extends Run {
    actions: AgentAction[];
}
export declare abstract class BaseTracer extends BaseCallbackHandler {
    protected runMap: Map<string, Run>;
    constructor(_fields?: BaseCallbackHandlerInput);
    copy(): this;
    protected abstract persistRun(run: Run): Promise<void>;
    protected _addChildRun(parentRun: Run, childRun: Run): void;
    protected _startTrace(run: Run): void;
    protected _endTrace(run: Run): Promise<void>;
    protected _getExecutionOrder(parentRunId: string | undefined): number;
    handleLLMStart(llm: Serialized, prompts: string[], runId: string, parentRunId?: string, extraParams?: KVMap, tags?: string[], metadata?: KVMap): Promise<void>;
    handleChatModelStart(llm: Serialized, messages: BaseMessage[][], runId: string, parentRunId?: string, extraParams?: KVMap, tags?: string[], metadata?: KVMap): Promise<void>;
    handleLLMEnd(output: LLMResult, runId: string): Promise<void>;
    handleLLMError(error: Error, runId: string): Promise<void>;
    handleChainStart(chain: Serialized, inputs: ChainValues, runId: string, parentRunId?: string, tags?: string[], metadata?: KVMap, runType?: string): Promise<void>;
    handleChainEnd(outputs: ChainValues, runId: string, _parentRunId?: string, _tags?: string[], kwargs?: {
        inputs?: Record<string, unknown>;
    }): Promise<void>;
    handleChainError(error: Error, runId: string, _parentRunId?: string, _tags?: string[], kwargs?: {
        inputs?: Record<string, unknown>;
    }): Promise<void>;
    handleToolStart(tool: Serialized, input: string, runId: string, parentRunId?: string, tags?: string[], metadata?: KVMap): Promise<void>;
    handleToolEnd(output: string, runId: string): Promise<void>;
    handleToolError(error: Error, runId: string): Promise<void>;
    handleAgentAction(action: AgentAction, runId: string): Promise<void>;
    handleAgentEnd(action: AgentFinish, runId: string): Promise<void>;
    handleRetrieverStart(retriever: Serialized, query: string, runId: string, parentRunId?: string, tags?: string[], metadata?: KVMap): Promise<void>;
    handleRetrieverEnd(documents: Document<Record<string, unknown>>[], runId: string): Promise<void>;
    handleRetrieverError(error: Error, runId: string): Promise<void>;
    handleText(text: string, runId: string): Promise<void>;
    handleLLMNewToken(token: string, idx: NewTokenIndices, runId: string, _parentRunId?: string, _tags?: string[], fields?: HandleLLMNewTokenCallbackFields): Promise<void>;
    onLLMStart?(run: Run): void | Promise<void>;
    onLLMEnd?(run: Run): void | Promise<void>;
    onLLMError?(run: Run): void | Promise<void>;
    onChainStart?(run: Run): void | Promise<void>;
    onChainEnd?(run: Run): void | Promise<void>;
    onChainError?(run: Run): void | Promise<void>;
    onToolStart?(run: Run): void | Promise<void>;
    onToolEnd?(run: Run): void | Promise<void>;
    onToolError?(run: Run): void | Promise<void>;
    onAgentAction?(run: Run): void | Promise<void>;
    onAgentEnd?(run: Run): void | Promise<void>;
    onRetrieverStart?(run: Run): void | Promise<void>;
    onRetrieverEnd?(run: Run): void | Promise<void>;
    onRetrieverError?(run: Run): void | Promise<void>;
    onText?(run: Run): void | Promise<void>;
    onLLMNewToken?(run: Run): void | Promise<void>;
}
