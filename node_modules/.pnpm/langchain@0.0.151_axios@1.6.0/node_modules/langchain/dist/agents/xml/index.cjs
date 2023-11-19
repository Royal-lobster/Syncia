"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLAgent = exports.parseOutput = void 0;
const llm_chain_js_1 = require("../../chains/llm_chain.cjs");
const chat_js_1 = require("../../prompts/chat.cjs");
const agent_js_1 = require("../agent.cjs");
const output_parser_js_1 = require("../../schema/output_parser.cjs");
const prompt_js_1 = require("./prompt.cjs");
/**
 * Parses the output text from the agent and returns an AgentAction or
 * AgentFinish object.
 * @param text The output text from the agent.
 * @returns An AgentAction or AgentFinish object.
 */
async function parseOutput(text) {
    if (text.includes("</tool>")) {
        const [tool, toolInput] = text.split("</tool>");
        const _tool = tool.split("<tool>")[1];
        const _toolInput = toolInput.split("<tool_input>")[1];
        return { tool: _tool, toolInput: _toolInput, log: text };
    }
    else if (text.includes("<final_answer>")) {
        const [, answer] = text.split("<final_answer>");
        return { returnValues: { output: answer }, log: text };
    }
    else {
        throw new output_parser_js_1.OutputParserException(`Could not parse LLM output: ${text}`);
    }
}
exports.parseOutput = parseOutput;
/**
 * Class that represents an agent that uses XML tags.
 */
class XMLAgent extends agent_js_1.BaseSingleActionAgent {
    static lc_name() {
        return "XMLAgent";
    }
    _agentType() {
        return "xml";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "agents", "xml"]
        });
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tools = fields.tools;
        this.llmChain = fields.llmChain;
    }
    get inputKeys() {
        return ["input"];
    }
    static createPrompt() {
        return chat_js_1.ChatPromptTemplate.fromPromptMessages([
            chat_js_1.HumanMessagePromptTemplate.fromTemplate(prompt_js_1.AGENT_INSTRUCTIONS),
            chat_js_1.AIMessagePromptTemplate.fromTemplate("{intermediate_steps}"),
        ]);
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
        let log = "";
        for (const { action, observation } of steps) {
            log += `<tool>${action.tool}</tool><tool_input>${action.toolInput}</tool_input><observation>${observation}</observation>`;
        }
        let tools = "";
        for (const tool of this.tools) {
            tools += `${tool.name}: ${tool.description}\n`;
        }
        const _inputs = {
            intermediate_steps: log,
            tools,
            question: inputs.input,
            stop: ["</tool_input>", "</final_answer>"],
        };
        const response = await this.llmChain.call(_inputs, callbackManager);
        return parseOutput(response[this.llmChain.outputKey]);
    }
    /**
     * Creates an XMLAgent from a BaseLanguageModel and a list of tools.
     * @param llm The BaseLanguageModel to use.
     * @param tools The tools to be used by the agent.
     * @param args Optional arguments for creating the agent.
     * @returns An instance of XMLAgent.
     */
    static fromLLMAndTools(llm, tools, args) {
        const prompt = XMLAgent.createPrompt();
        const chain = new llm_chain_js_1.LLMChain({
            prompt,
            llm,
            callbacks: args?.callbacks,
        });
        return new XMLAgent({
            llmChain: chain,
            tools,
        });
    }
}
exports.XMLAgent = XMLAgent;
