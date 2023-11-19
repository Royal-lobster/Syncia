"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeroShotAgent = void 0;
const llm_chain_js_1 = require("../../chains/llm_chain.cjs");
const prompt_js_1 = require("../../prompts/prompt.cjs");
const template_js_1 = require("../../prompts/template.cjs");
const agent_js_1 = require("../agent.cjs");
const helpers_js_1 = require("../helpers.cjs");
const outputParser_js_1 = require("./outputParser.cjs");
const prompt_js_2 = require("./prompt.cjs");
/**
 * Agent for the MRKL chain.
 * @augments Agent
 */
class ZeroShotAgent extends agent_js_1.Agent {
    static lc_name() {
        return "ZeroShotAgent";
    }
    constructor(input) {
        const outputParser = input?.outputParser ?? ZeroShotAgent.getDefaultOutputParser();
        super({ ...input, outputParser });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "agents", "mrkl"]
        });
    }
    _agentType() {
        return "zero-shot-react-description";
    }
    observationPrefix() {
        return "Observation: ";
    }
    llmPrefix() {
        return "Thought:";
    }
    /**
     * Returns the default output parser for the ZeroShotAgent.
     * @param fields Optional arguments for the output parser.
     * @returns An instance of ZeroShotAgentOutputParser.
     */
    static getDefaultOutputParser(fields) {
        return new outputParser_js_1.ZeroShotAgentOutputParser(fields);
    }
    /**
     * Validates the tools for the ZeroShotAgent. Throws an error if any tool
     * does not have a description.
     * @param tools List of tools to validate.
     */
    static validateTools(tools) {
        const descriptionlessTool = tools.find((tool) => !tool.description);
        if (descriptionlessTool) {
            const msg = `Got a tool ${descriptionlessTool.name} without a description.` +
                ` This agent requires descriptions for all tools.`;
            throw new Error(msg);
        }
    }
    /**
     * Create prompt in the style of the zero shot agent.
     *
     * @param tools - List of tools the agent will have access to, used to format the prompt.
     * @param args - Arguments to create the prompt with.
     * @param args.suffix - String to put after the list of tools.
     * @param args.prefix - String to put before the list of tools.
     * @param args.inputVariables - List of input variables the final prompt will expect.
     */
    static createPrompt(tools, args) {
        const { prefix = prompt_js_2.PREFIX, suffix = prompt_js_2.SUFFIX, inputVariables = ["input", "agent_scratchpad"], } = args ?? {};
        const toolStrings = tools
            .map((tool) => `${tool.name}: ${tool.description}`)
            .join("\n");
        const toolNames = tools.map((tool) => tool.name);
        const formatInstructions = (0, template_js_1.renderTemplate)(prompt_js_2.FORMAT_INSTRUCTIONS, "f-string", {
            tool_names: toolNames,
        });
        const template = [prefix, toolStrings, formatInstructions, suffix].join("\n\n");
        return new prompt_js_1.PromptTemplate({
            template,
            inputVariables,
        });
    }
    /**
     * Creates a ZeroShotAgent from a Large Language Model and a set of tools.
     * @param llm The Large Language Model to use.
     * @param tools The tools for the agent to use.
     * @param args Optional arguments for creating the agent.
     * @returns A new instance of ZeroShotAgent.
     */
    static fromLLMAndTools(llm, tools, args) {
        ZeroShotAgent.validateTools(tools);
        const prompt = ZeroShotAgent.createPrompt(tools, args);
        const outputParser = args?.outputParser ?? ZeroShotAgent.getDefaultOutputParser();
        const chain = new llm_chain_js_1.LLMChain({
            prompt,
            llm,
            callbacks: args?.callbacks ?? args?.callbackManager,
        });
        return new ZeroShotAgent({
            llmChain: chain,
            allowedTools: tools.map((t) => t.name),
            outputParser,
        });
    }
    static async deserialize(data) {
        const { llm, tools, ...rest } = data;
        return (0, helpers_js_1.deserializeHelper)(llm, tools, rest, (llm, tools, args) => ZeroShotAgent.fromLLMAndTools(llm, tools, {
            prefix: args.prefix,
            suffix: args.suffix,
            inputVariables: args.input_variables,
        }), (args) => new ZeroShotAgent(args));
    }
}
exports.ZeroShotAgent = ZeroShotAgent;
