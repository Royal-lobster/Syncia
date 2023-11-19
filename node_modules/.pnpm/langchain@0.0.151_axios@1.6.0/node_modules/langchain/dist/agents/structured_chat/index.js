import { zodToJsonSchema } from "zod-to-json-schema";
import { LLMChain } from "../../chains/llm_chain.js";
import { PromptTemplate } from "../../prompts/prompt.js";
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate, } from "../../prompts/chat.js";
import { Agent } from "../agent.js";
import { StructuredChatOutputParserWithRetries } from "./outputParser.js";
import { FORMAT_INSTRUCTIONS, PREFIX, SUFFIX } from "./prompt.js";
/**
 * Agent that interoperates with Structured Tools using React logic.
 * @augments Agent
 */
export class StructuredChatAgent extends Agent {
    static lc_name() {
        return "StructuredChatAgent";
    }
    constructor(input) {
        const outputParser = input?.outputParser ?? StructuredChatAgent.getDefaultOutputParser();
        super({ ...input, outputParser });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "agents", "structured_chat"]
        });
    }
    _agentType() {
        return "structured-chat-zero-shot-react-description";
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
    /**
     * Validates that all provided tools have a description. Throws an error
     * if any tool lacks a description.
     * @param tools Array of StructuredTool instances to validate.
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
     * Returns a default output parser for the StructuredChatAgent. If an LLM
     * is provided, it creates an output parser with retry logic from the LLM.
     * @param fields Optional fields to customize the output parser. Can include an LLM and a list of tool names.
     * @returns An instance of StructuredChatOutputParserWithRetries.
     */
    static getDefaultOutputParser(fields) {
        if (fields?.llm) {
            return StructuredChatOutputParserWithRetries.fromLLM(fields.llm, {
                toolNames: fields.toolNames,
            });
        }
        return new StructuredChatOutputParserWithRetries({
            toolNames: fields?.toolNames,
        });
    }
    /**
     * Constructs the agent's scratchpad from a list of steps. If the agent's
     * scratchpad is not empty, it prepends a message indicating that the
     * agent has not seen any previous work.
     * @param steps Array of AgentStep instances to construct the scratchpad from.
     * @returns A Promise that resolves to a string representing the agent's scratchpad.
     */
    async constructScratchPad(steps) {
        const agentScratchpad = await super.constructScratchPad(steps);
        if (agentScratchpad) {
            return `This was your previous work (but I haven't seen any of it! I only see what you return as final answer):\n${agentScratchpad}`;
        }
        return agentScratchpad;
    }
    /**
     * Creates a string representation of the schemas of the provided tools.
     * @param tools Array of StructuredTool instances to create the schemas string from.
     * @returns A string representing the schemas of the provided tools.
     */
    static createToolSchemasString(tools) {
        return tools
            .map((tool) => `${tool.name}: ${tool.description}, args: ${JSON.stringify(zodToJsonSchema(tool.schema).properties)}`)
            .join("\n");
    }
    /**
     * Create prompt in the style of the agent.
     *
     * @param tools - List of tools the agent will have access to, used to format the prompt.
     * @param args - Arguments to create the prompt with.
     * @param args.suffix - String to put after the list of tools.
     * @param args.prefix - String to put before the list of tools.
     * @param args.inputVariables List of input variables the final prompt will expect.
     * @param args.memoryPrompts List of historical prompts from memory.
     */
    static createPrompt(tools, args) {
        const { prefix = PREFIX, suffix = SUFFIX, inputVariables = ["input", "agent_scratchpad"], memoryPrompts = [], } = args ?? {};
        const template = [prefix, FORMAT_INSTRUCTIONS, suffix].join("\n\n");
        const humanMessageTemplate = "{input}\n\n{agent_scratchpad}";
        const messages = [
            new SystemMessagePromptTemplate(new PromptTemplate({
                template,
                inputVariables,
                partialVariables: {
                    tool_schemas: StructuredChatAgent.createToolSchemasString(tools),
                    tool_names: tools.map((tool) => tool.name).join(", "),
                },
            })),
            ...memoryPrompts,
            new HumanMessagePromptTemplate(new PromptTemplate({
                template: humanMessageTemplate,
                inputVariables,
            })),
        ];
        return ChatPromptTemplate.fromPromptMessages(messages);
    }
    /**
     * Creates a StructuredChatAgent from an LLM and a list of tools.
     * Validates the tools, creates a prompt, and sets up an LLM chain for the
     * agent.
     * @param llm BaseLanguageModel instance to create the agent from.
     * @param tools Array of StructuredTool instances to create the agent from.
     * @param args Optional arguments to customize the creation of the agent. Can include arguments for creating the prompt and AgentArgs.
     * @returns A new instance of StructuredChatAgent.
     */
    static fromLLMAndTools(llm, tools, args) {
        StructuredChatAgent.validateTools(tools);
        const prompt = StructuredChatAgent.createPrompt(tools, args);
        const outputParser = args?.outputParser ??
            StructuredChatAgent.getDefaultOutputParser({
                llm,
                toolNames: tools.map((tool) => tool.name),
            });
        const chain = new LLMChain({
            prompt,
            llm,
            callbacks: args?.callbacks,
        });
        return new StructuredChatAgent({
            llmChain: chain,
            outputParser,
            allowedTools: tools.map((t) => t.name),
        });
    }
}
