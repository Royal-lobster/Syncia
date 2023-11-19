import { BaseLanguageModel } from "../../base_language/index.js";
import { BaseMessagePromptTemplate, ChatPromptTemplate } from "../../prompts/chat.js";
import { AgentStep } from "../../schema/index.js";
import { StructuredTool } from "../../tools/base.js";
import { Optional } from "../../types/type-utils.js";
import { Agent, AgentArgs, OutputParserArgs } from "../agent.js";
import { AgentInput } from "../types.js";
import { StructuredChatOutputParserWithRetries } from "./outputParser.js";
/**
 * Interface for arguments used to create a prompt for a
 * StructuredChatAgent.
 */
export interface StructuredChatCreatePromptArgs {
    /** String to put after the list of tools. */
    suffix?: string;
    /** String to put before the list of tools. */
    prefix?: string;
    /** List of input variables the final prompt will expect. */
    inputVariables?: string[];
    /** List of historical prompts from memory.  */
    memoryPrompts?: BaseMessagePromptTemplate[];
}
/**
 * Type for input data for creating a StructuredChatAgent, with the
 * 'outputParser' property made optional.
 */
export type StructuredChatAgentInput = Optional<AgentInput, "outputParser">;
/**
 * Agent that interoperates with Structured Tools using React logic.
 * @augments Agent
 */
export declare class StructuredChatAgent extends Agent {
    static lc_name(): string;
    lc_namespace: string[];
    constructor(input: StructuredChatAgentInput);
    _agentType(): "structured-chat-zero-shot-react-description";
    observationPrefix(): string;
    llmPrefix(): string;
    _stop(): string[];
    /**
     * Validates that all provided tools have a description. Throws an error
     * if any tool lacks a description.
     * @param tools Array of StructuredTool instances to validate.
     */
    static validateTools(tools: StructuredTool[]): void;
    /**
     * Returns a default output parser for the StructuredChatAgent. If an LLM
     * is provided, it creates an output parser with retry logic from the LLM.
     * @param fields Optional fields to customize the output parser. Can include an LLM and a list of tool names.
     * @returns An instance of StructuredChatOutputParserWithRetries.
     */
    static getDefaultOutputParser(fields?: OutputParserArgs & {
        toolNames: string[];
    }): StructuredChatOutputParserWithRetries;
    /**
     * Constructs the agent's scratchpad from a list of steps. If the agent's
     * scratchpad is not empty, it prepends a message indicating that the
     * agent has not seen any previous work.
     * @param steps Array of AgentStep instances to construct the scratchpad from.
     * @returns A Promise that resolves to a string representing the agent's scratchpad.
     */
    constructScratchPad(steps: AgentStep[]): Promise<string>;
    /**
     * Creates a string representation of the schemas of the provided tools.
     * @param tools Array of StructuredTool instances to create the schemas string from.
     * @returns A string representing the schemas of the provided tools.
     */
    static createToolSchemasString(tools: StructuredTool[]): string;
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
    static createPrompt(tools: StructuredTool[], args?: StructuredChatCreatePromptArgs): ChatPromptTemplate<any, any>;
    /**
     * Creates a StructuredChatAgent from an LLM and a list of tools.
     * Validates the tools, creates a prompt, and sets up an LLM chain for the
     * agent.
     * @param llm BaseLanguageModel instance to create the agent from.
     * @param tools Array of StructuredTool instances to create the agent from.
     * @param args Optional arguments to customize the creation of the agent. Can include arguments for creating the prompt and AgentArgs.
     * @returns A new instance of StructuredChatAgent.
     */
    static fromLLMAndTools(llm: BaseLanguageModel, tools: StructuredTool[], args?: StructuredChatCreatePromptArgs & AgentArgs): StructuredChatAgent;
}
