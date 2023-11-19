import monitor from "llmonitor";
import { getEnvironmentVariable } from "../../util/env.js";
import { BaseCallbackHandler } from "../base.js";
// Langchain Helpers
// Input can be either a single message, an array of message, or an array of array of messages (batch requests)
const parseRole = (id) => {
    const roleHint = id[id.length - 1];
    if (roleHint.includes("Human"))
        return "user";
    if (roleHint.includes("System"))
        return "system";
    if (roleHint.includes("AI"))
        return "ai";
    if (roleHint.includes("Function"))
        return "function";
    return "ai";
};
export const convertToLLMonitorMessages = (input) => {
    const parseMessage = (raw) => {
        if (typeof raw === "string")
            return raw;
        // sometimes the message is nested in a "message" property
        if ("message" in raw)
            return parseMessage(raw.message);
        // Serialize
        const message = JSON.parse(JSON.stringify(raw));
        try {
            // "id" contains an array describing the constructor, with last item actual schema type
            const role = parseRole(message.id);
            const obj = message.kwargs;
            const text = message.text ?? obj.content;
            const functionCall = obj.additional_kwargs?.function_call;
            return {
                role,
                text,
                functionCall,
            };
        }
        catch (e) {
            // if parsing fails, return the original message
            return message.text ?? message;
        }
    };
    if (Array.isArray(input)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Confuses the compiler
        return input.length === 1
            ? convertToLLMonitorMessages(input[0])
            : input.map(convertToLLMonitorMessages);
    }
    return parseMessage(input);
};
const parseInput = (rawInput) => {
    if (!rawInput)
        return null;
    const { input, inputs, question } = rawInput;
    if (input)
        return input;
    if (inputs)
        return inputs;
    if (question)
        return question;
    return rawInput;
};
const parseOutput = (rawOutput) => {
    if (!rawOutput)
        return null;
    const { text, output, answer } = rawOutput;
    if (text)
        return text;
    if (answer)
        return answer;
    if (output)
        return output;
    return rawOutput;
};
export class LLMonitorHandler extends BaseCallbackHandler {
    constructor(fields = {}) {
        super(fields);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "llmonitor_handler"
        });
        Object.defineProperty(this, "monitor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.monitor = monitor;
        if (fields) {
            const { appId, apiUrl, verbose } = fields;
            this.monitor.init({
                verbose,
                appId: appId ?? getEnvironmentVariable("LLMONITOR_APP_ID"),
                apiUrl: apiUrl ?? getEnvironmentVariable("LLMONITOR_API_URL"),
            });
        }
    }
    async handleLLMStart(llm, prompts, runId, parentRunId, extraParams, tags, metadata) {
        const params = {
            ...(extraParams?.invocation_params || {}),
            ...(metadata || {}),
        };
        const name = params?.model || params?.name || params?.model_name || llm.id.at(-1);
        const userId = params?.userId || undefined;
        const userProps = params?.userProps || undefined;
        await this.monitor.trackEvent("llm", "start", {
            runId,
            parentRunId,
            name,
            input: convertToLLMonitorMessages(prompts),
            extra: params,
            userId,
            userProps,
            tags,
            runtime: "langchain-js",
        });
    }
    async handleChatModelStart(llm, messages, runId, parentRunId, extraParams, tags, metadata) {
        const params = {
            ...(extraParams?.invocation_params || {}),
            ...(metadata || {}),
        };
        const name = params?.model || params?.name || params?.model_name || llm.id.at(-1);
        const userId = params?.userId || undefined;
        const userProps = params?.userProps || undefined;
        await this.monitor.trackEvent("llm", "start", {
            runId,
            parentRunId,
            name,
            input: convertToLLMonitorMessages(messages),
            extra: params,
            userId,
            userProps,
            tags,
            runtime: "langchain-js",
        });
    }
    async handleLLMEnd(output, runId) {
        const { generations, llmOutput } = output;
        await this.monitor.trackEvent("llm", "end", {
            runId,
            output: convertToLLMonitorMessages(generations),
            tokensUsage: {
                completion: llmOutput?.tokenUsage?.completionTokens,
                prompt: llmOutput?.tokenUsage?.promptTokens,
            },
        });
    }
    async handleLLMError(error, runId) {
        await this.monitor.trackEvent("llm", "error", {
            runId,
            error,
        });
    }
    async handleChainStart(chain, inputs, runId, parentRunId, tags, metadata) {
        // allow the user to specify an agent name
        const chainName = chain.id.at(-1);
        const name = (metadata?.agentName ?? chainName);
        // Attempt to automatically detect if this is an agent or chain
        const runType = metadata?.agentName ||
            ["AgentExecutor", "PlanAndExecute"].includes(chainName)
            ? "agent"
            : "chain";
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { agentName, ...rest } = metadata || {};
        await this.monitor.trackEvent(runType, "start", {
            runId,
            parentRunId,
            name,
            input: parseInput(inputs),
            extra: rest,
            tags,
            runtime: "langchain-js",
        });
    }
    async handleChainEnd(outputs, runId) {
        await this.monitor.trackEvent("chain", "end", {
            runId,
            output: parseOutput(outputs),
        });
    }
    async handleChainError(error, runId) {
        await this.monitor.trackEvent("chain", "error", {
            runId,
            error,
        });
    }
    async handleToolStart(tool, input, runId, parentRunId, tags, metadata) {
        await this.monitor.trackEvent("tool", "start", {
            runId,
            parentRunId,
            name: tool.id[tool.id.length - 1],
            input,
            extra: metadata,
            tags,
            runtime: "langchain-js",
        });
    }
    async handleToolEnd(output, runId) {
        await this.monitor.trackEvent("tool", "end", {
            runId,
            output,
        });
    }
    async handleToolError(error, runId) {
        await this.monitor.trackEvent("tool", "error", {
            runId,
            error,
        });
    }
}
