"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJsonAgent = exports.JsonToolkit = void 0;
const json_js_1 = require("../../../tools/json.cjs");
const prompt_js_1 = require("./prompt.cjs");
const llm_chain_js_1 = require("../../../chains/llm_chain.cjs");
const index_js_1 = require("../../mrkl/index.cjs");
const base_js_1 = require("../base.cjs");
const executor_js_1 = require("../../executor.cjs");
/**
 * Represents a toolkit for working with JSON data. It initializes the
 * JSON tools based on the provided JSON specification.
 */
class JsonToolkit extends base_js_1.Toolkit {
    constructor(jsonSpec) {
        super();
        Object.defineProperty(this, "jsonSpec", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: jsonSpec
        });
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tools = [
            new json_js_1.JsonListKeysTool(jsonSpec),
            new json_js_1.JsonGetValueTool(jsonSpec),
        ];
    }
}
exports.JsonToolkit = JsonToolkit;
/**
 * Creates a JSON agent using a language model, a JSON toolkit, and
 * optional prompt arguments. It creates a prompt for the agent using the
 * JSON tools and the provided prefix and suffix. It then creates a
 * ZeroShotAgent with the prompt and the JSON tools, and returns an
 * AgentExecutor for executing the agent with the tools.
 * @param llm The language model used to create the JSON agent.
 * @param toolkit The JSON toolkit used to create the JSON agent.
 * @param args Optional prompt arguments used to create the JSON agent.
 * @returns An AgentExecutor for executing the created JSON agent with the tools.
 */
function createJsonAgent(llm, toolkit, args) {
    const { prefix = prompt_js_1.JSON_PREFIX, suffix = prompt_js_1.JSON_SUFFIX, inputVariables = ["input", "agent_scratchpad"], } = args ?? {};
    const { tools } = toolkit;
    const prompt = index_js_1.ZeroShotAgent.createPrompt(tools, {
        prefix,
        suffix,
        inputVariables,
    });
    const chain = new llm_chain_js_1.LLMChain({ prompt, llm });
    const agent = new index_js_1.ZeroShotAgent({
        llmChain: chain,
        allowedTools: tools.map((t) => t.name),
    });
    return executor_js_1.AgentExecutor.fromAgentAndTools({
        agent,
        tools,
        returnIntermediateSteps: true,
    });
}
exports.createJsonAgent = createJsonAgent;
