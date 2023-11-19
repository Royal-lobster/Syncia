"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIAgent = exports._formatIntermediateSteps = void 0;
const index_js_1 = require("../../schema/index.cjs");
const agent_js_1 = require("../agent.cjs");
const prompt_js_1 = require("./prompt.cjs");
const chat_js_1 = require("../../prompts/chat.cjs");
const llm_chain_js_1 = require("../../chains/llm_chain.cjs");
const output_parser_js_1 = require("../../schema/output_parser.cjs");
/**
 * Parses the output message into a FunctionsAgentAction or AgentFinish
 * object.
 * @param message The BaseMessage to parse.
 * @returns A FunctionsAgentAction or AgentFinish object.
 */
function parseOutput(message) {
    if (message.additional_kwargs.function_call) {
        // eslint-disable-next-line prefer-destructuring
        const function_call = message.additional_kwargs.function_call;
        try {
            const toolInput = function_call.arguments
                ? JSON.parse(function_call.arguments)
                : {};
            return {
                tool: function_call.name,
                toolInput,
                log: `Invoking "${function_call.name}" with ${function_call.arguments ?? "{}"}\n${message.content}`,
                messageLog: [message],
            };
        }
        catch (error) {
            throw new output_parser_js_1.OutputParserException(`Failed to parse function arguments from chat model response. Text: "${function_call.arguments}". ${error}`);
        }
    }
    else {
        return { returnValues: { output: message.content }, log: message.content };
    }
}
/**
 * Checks if the given action is a FunctionsAgentAction.
 * @param action The action to check.
 * @returns True if the action is a FunctionsAgentAction, false otherwise.
 */
function isFunctionsAgentAction(action) {
    return action.messageLog !== undefined;
}
function _convertAgentStepToMessages(action, observation) {
    if (isFunctionsAgentAction(action) && action.messageLog !== undefined) {
        return action.messageLog?.concat(new index_js_1.FunctionMessage(observation, action.tool));
    }
    else {
        return [new index_js_1.AIMessage(action.log)];
    }
}
function _formatIntermediateSteps(intermediateSteps) {
    return intermediateSteps.flatMap(({ action, observation }) => _convertAgentStepToMessages(action, observation));
}
exports._formatIntermediateSteps = _formatIntermediateSteps;
/**
 * Class representing an agent for the OpenAI chat model in LangChain. It
 * extends the Agent class and provides additional functionality specific
 * to the OpenAIAgent type.
 */
class OpenAIAgent extends agent_js_1.Agent {
    static lc_name() {
        return "OpenAIAgent";
    }
    _agentType() {
        return "openai-functions";
    }
    observationPrefix() {
        return "Observation: ";
    }
    llmPrefix() {
        return "Thought:";
    }
    _stop() {
        return ["Observation:"];
    }
    constructor(input) {
        super({ ...input, outputParser: undefined });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "agents", "openai"]
        });
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tools = input.tools;
    }
    /**
     * Creates a prompt for the OpenAIAgent using the provided tools and
     * fields.
     * @param _tools The tools to be used in the prompt.
     * @param fields Optional fields for creating the prompt.
     * @returns A BasePromptTemplate object representing the created prompt.
     */
    static createPrompt(_tools, fields) {
        const { prefix = prompt_js_1.PREFIX } = fields || {};
        return chat_js_1.ChatPromptTemplate.fromPromptMessages([
            chat_js_1.SystemMessagePromptTemplate.fromTemplate(prefix),
            new chat_js_1.MessagesPlaceholder("chat_history"),
            chat_js_1.HumanMessagePromptTemplate.fromTemplate("{input}"),
            new chat_js_1.MessagesPlaceholder("agent_scratchpad"),
        ]);
    }
    /**
     * Creates an OpenAIAgent from a BaseLanguageModel and a list of tools.
     * @param llm The BaseLanguageModel to use.
     * @param tools The tools to be used by the agent.
     * @param args Optional arguments for creating the agent.
     * @returns An instance of OpenAIAgent.
     */
    static fromLLMAndTools(llm, tools, args) {
        OpenAIAgent.validateTools(tools);
        if (llm._modelType() !== "base_chat_model" || llm._llmType() !== "openai") {
            throw new Error("OpenAIAgent requires an OpenAI chat model");
        }
        const prompt = OpenAIAgent.createPrompt(tools, args);
        const chain = new llm_chain_js_1.LLMChain({
            prompt,
            llm,
            callbacks: args?.callbacks,
        });
        return new OpenAIAgent({
            llmChain: chain,
            allowedTools: tools.map((t) => t.name),
            tools,
        });
    }
    /**
     * Constructs a scratch pad from a list of agent steps.
     * @param steps The steps to include in the scratch pad.
     * @returns A string or a list of BaseMessages representing the constructed scratch pad.
     */
    async constructScratchPad(steps) {
        return _formatIntermediateSteps(steps);
    }
    /**
     * Plans the next action or finish state of the agent based on the
     * provided steps, inputs, and optional callback manager.
     * @param steps The steps to consider in planning.
     * @param inputs The inputs to consider in planning.
     * @param callbackManager Optional CallbackManager to use in planning.
     * @returns A Promise that resolves to an AgentAction or AgentFinish object representing the planned action or finish state.
     */
    async plan(steps, inputs, callbackManager) {
        // Add scratchpad and stop to inputs
        const thoughts = await this.constructScratchPad(steps);
        const newInputs = {
            ...inputs,
            agent_scratchpad: thoughts,
        };
        if (this._stop().length !== 0) {
            newInputs.stop = this._stop();
        }
        // Split inputs between prompt and llm
        const llm = this.llmChain.llm;
        const valuesForPrompt = { ...newInputs };
        const valuesForLLM = {
            tools: this.tools,
        };
        for (const key of this.llmChain.llm.callKeys) {
            if (key in inputs) {
                valuesForLLM[key] = inputs[key];
                delete valuesForPrompt[key];
            }
        }
        const promptValue = await this.llmChain.prompt.formatPromptValue(valuesForPrompt);
        const message = await llm.predictMessages(promptValue.toChatMessages(), valuesForLLM, callbackManager);
        return parseOutput(message);
    }
}
exports.OpenAIAgent = OpenAIAgent;
