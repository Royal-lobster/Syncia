import { BaseChain } from "../chains/base.js";
import { OutputParserException } from "../schema/output_parser.js";
import { Tool, ToolInputParsingException } from "../tools/base.js";
/**
 * Tool that just returns the query.
 * Used for exception tracking.
 */
export class ExceptionTool extends Tool {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "_Exception"
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Exception tool"
        });
    }
    async _call(query) {
        return query;
    }
}
/**
 * A chain managing an agent using tools.
 * @augments BaseChain
 */
export class AgentExecutor extends BaseChain {
    static lc_name() {
        return "AgentExecutor";
    }
    get lc_namespace() {
        return ["langchain", "agents", "executor"];
    }
    get inputKeys() {
        return this.agent.inputKeys;
    }
    get outputKeys() {
        return this.agent.returnValues;
    }
    constructor(input) {
        super(input);
        Object.defineProperty(this, "agent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnIntermediateSteps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "maxIterations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 15
        });
        Object.defineProperty(this, "earlyStoppingMethod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "force"
        });
        /**
         * How to handle errors raised by the agent's output parser.
          Defaults to `False`, which raises the error.
      
          If `true`, the error will be sent back to the LLM as an observation.
          If a string, the string itself will be sent to the LLM as an observation.
          If a callable function, the function will be called with the exception
          as an argument, and the result of that function will be passed to the agent
          as an observation.
         */
        Object.defineProperty(this, "handleParsingErrors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.agent = input.agent;
        this.tools = input.tools;
        this.handleParsingErrors =
            input.handleParsingErrors ?? this.handleParsingErrors;
        if (this.agent._agentActionType() === "multi") {
            for (const tool of this.tools) {
                if (tool.returnDirect) {
                    throw new Error(`Tool with return direct ${tool.name} not supported for multi-action agent.`);
                }
            }
        }
        this.returnIntermediateSteps =
            input.returnIntermediateSteps ?? this.returnIntermediateSteps;
        this.maxIterations = input.maxIterations ?? this.maxIterations;
        this.earlyStoppingMethod =
            input.earlyStoppingMethod ?? this.earlyStoppingMethod;
    }
    /** Create from agent and a list of tools. */
    static fromAgentAndTools(fields) {
        return new AgentExecutor(fields);
    }
    /**
     * Method that checks if the agent execution should continue based on the
     * number of iterations.
     * @param iterations The current number of iterations.
     * @returns A boolean indicating whether the agent execution should continue.
     */
    shouldContinue(iterations) {
        return this.maxIterations === undefined || iterations < this.maxIterations;
    }
    /** @ignore */
    async _call(inputs, runManager) {
        const toolsByName = Object.fromEntries(this.tools.map((t) => [t.name.toLowerCase(), t]));
        const steps = [];
        let iterations = 0;
        const getOutput = async (finishStep) => {
            const { returnValues } = finishStep;
            const additional = await this.agent.prepareForOutput(returnValues, steps);
            if (this.returnIntermediateSteps) {
                return { ...returnValues, intermediateSteps: steps, ...additional };
            }
            await runManager?.handleAgentEnd(finishStep);
            return { ...returnValues, ...additional };
        };
        while (this.shouldContinue(iterations)) {
            let output;
            try {
                output = await this.agent.plan(steps, inputs, runManager?.getChild());
            }
            catch (e) {
                // eslint-disable-next-line no-instanceof/no-instanceof
                if (e instanceof OutputParserException) {
                    let observation;
                    if (this.handleParsingErrors === true) {
                        observation = "Invalid or incomplete response";
                    }
                    else if (typeof this.handleParsingErrors === "string") {
                        observation = this.handleParsingErrors;
                    }
                    else if (typeof this.handleParsingErrors === "function") {
                        observation = this.handleParsingErrors(e);
                    }
                    else {
                        throw e;
                    }
                    output = {
                        tool: "_Exception",
                        toolInput: observation,
                        log: e.message,
                    };
                }
                else {
                    throw e;
                }
            }
            // Check if the agent has finished
            if ("returnValues" in output) {
                return getOutput(output);
            }
            let actions;
            if (Array.isArray(output)) {
                actions = output;
            }
            else {
                actions = [output];
            }
            const newSteps = await Promise.all(actions.map(async (action) => {
                await runManager?.handleAgentAction(action);
                const tool = action.tool === "_Exception"
                    ? new ExceptionTool()
                    : toolsByName[action.tool?.toLowerCase()];
                let observation;
                try {
                    observation = tool
                        ? await tool.call(action.toolInput, runManager?.getChild())
                        : `${action.tool} is not a valid tool, try another one.`;
                }
                catch (e) {
                    // eslint-disable-next-line no-instanceof/no-instanceof
                    if (e instanceof ToolInputParsingException) {
                        if (this.handleParsingErrors === true) {
                            observation =
                                "Invalid or incomplete tool input. Please try again.";
                        }
                        else if (typeof this.handleParsingErrors === "string") {
                            observation = this.handleParsingErrors;
                        }
                        else if (typeof this.handleParsingErrors === "function") {
                            observation = this.handleParsingErrors(e);
                        }
                        else {
                            throw e;
                        }
                        observation = await new ExceptionTool().call(observation, runManager?.getChild());
                        return { action, observation: observation ?? "" };
                    }
                }
                return { action, observation: observation ?? "" };
            }));
            steps.push(...newSteps);
            const lastStep = steps[steps.length - 1];
            const lastTool = toolsByName[lastStep.action.tool?.toLowerCase()];
            if (lastTool?.returnDirect) {
                return getOutput({
                    returnValues: { [this.agent.returnValues[0]]: lastStep.observation },
                    log: "",
                });
            }
            iterations += 1;
        }
        const finish = await this.agent.returnStoppedResponse(this.earlyStoppingMethod, steps, inputs);
        return getOutput(finish);
    }
    _chainType() {
        return "agent_executor";
    }
    serialize() {
        throw new Error("Cannot serialize an AgentExecutor");
    }
}
