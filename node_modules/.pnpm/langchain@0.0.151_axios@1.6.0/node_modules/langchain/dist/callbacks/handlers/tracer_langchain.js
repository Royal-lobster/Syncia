import { Client } from "langsmith";
import { getEnvironmentVariable, getRuntimeEnvironment, } from "../../util/env.js";
import { BaseTracer } from "./tracer.js";
export class LangChainTracer extends BaseTracer {
    constructor(fields = {}) {
        super(fields);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "langchain_tracer"
        });
        Object.defineProperty(this, "projectName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "exampleId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { exampleId, projectName, client } = fields;
        this.projectName =
            projectName ??
                getEnvironmentVariable("LANGCHAIN_PROJECT") ??
                getEnvironmentVariable("LANGCHAIN_SESSION");
        this.exampleId = exampleId;
        this.client = client ?? new Client({});
    }
    async _convertToCreate(run, example_id = undefined) {
        return {
            ...run,
            extra: {
                ...run.extra,
                runtime: await getRuntimeEnvironment(),
            },
            child_runs: undefined,
            session_name: this.projectName,
            reference_example_id: run.parent_run_id ? undefined : example_id,
        };
    }
    async persistRun(_run) { }
    async _persistRunSingle(run) {
        const persistedRun = await this._convertToCreate(run, this.exampleId);
        await this.client.createRun(persistedRun);
    }
    async _updateRunSingle(run) {
        const runUpdate = {
            end_time: run.end_time,
            error: run.error,
            outputs: run.outputs,
            events: run.events,
            inputs: run.inputs,
        };
        await this.client.updateRun(run.id, runUpdate);
    }
    async onRetrieverStart(run) {
        await this._persistRunSingle(run);
    }
    async onRetrieverEnd(run) {
        await this._updateRunSingle(run);
    }
    async onRetrieverError(run) {
        await this._updateRunSingle(run);
    }
    async onLLMStart(run) {
        await this._persistRunSingle(run);
    }
    async onLLMEnd(run) {
        await this._updateRunSingle(run);
    }
    async onLLMError(run) {
        await this._updateRunSingle(run);
    }
    async onChainStart(run) {
        await this._persistRunSingle(run);
    }
    async onChainEnd(run) {
        await this._updateRunSingle(run);
    }
    async onChainError(run) {
        await this._updateRunSingle(run);
    }
    async onToolStart(run) {
        await this._persistRunSingle(run);
    }
    async onToolEnd(run) {
        await this._updateRunSingle(run);
    }
    async onToolError(run) {
        await this._updateRunSingle(run);
    }
}
