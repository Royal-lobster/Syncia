import { Client } from "langsmith";
import { BaseRun, RunUpdate as BaseRunUpdate, KVMap } from "langsmith/schemas";
import { BaseTracer } from "./tracer.js";
import { BaseCallbackHandlerInput } from "../base.js";
export interface Run extends BaseRun {
    id: string;
    child_runs: this[];
    child_execution_order: number;
}
export interface RunUpdate extends BaseRunUpdate {
    events: BaseRun["events"];
    inputs: KVMap;
}
export interface LangChainTracerFields extends BaseCallbackHandlerInput {
    exampleId?: string;
    projectName?: string;
    client?: Client;
}
export declare class LangChainTracer extends BaseTracer implements LangChainTracerFields {
    name: string;
    projectName?: string;
    exampleId?: string;
    client: Client;
    constructor(fields?: LangChainTracerFields);
    private _convertToCreate;
    protected persistRun(_run: Run): Promise<void>;
    protected _persistRunSingle(run: Run): Promise<void>;
    protected _updateRunSingle(run: Run): Promise<void>;
    onRetrieverStart(run: Run): Promise<void>;
    onRetrieverEnd(run: Run): Promise<void>;
    onRetrieverError(run: Run): Promise<void>;
    onLLMStart(run: Run): Promise<void>;
    onLLMEnd(run: Run): Promise<void>;
    onLLMError(run: Run): Promise<void>;
    onChainStart(run: Run): Promise<void>;
    onChainEnd(run: Run): Promise<void>;
    onChainError(run: Run): Promise<void>;
    onToolStart(run: Run): Promise<void>;
    onToolEnd(run: Run): Promise<void>;
    onToolError(run: Run): Promise<void>;
}
