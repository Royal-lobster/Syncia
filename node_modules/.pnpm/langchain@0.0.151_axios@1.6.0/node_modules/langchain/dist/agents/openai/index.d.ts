import { CallbackManager } from "../../callbacks/manager.js";
import { BasePromptTemplate } from "../../prompts/base.js";
import { AgentAction, AgentFinish, AgentStep, BaseMessage, ChainValues, SystemMessage } from "../../schema/index.js";
import { StructuredTool } from "../../tools/base.js";
import { Agent, AgentArgs } from "../agent.js";
import { AgentInput } from "../types.js";
import { BaseLanguageModel } from "../../base_language/index.js";
export declare function _formatIntermediateSteps(intermediateSteps: AgentStep[]): BaseMessage[];
/**
 * Interface for the input data required to create an OpenAIAgent.
 */
export interface OpenAIAgentInput extends AgentInput {
    tools: StructuredTool[];
}
/**
 * Interface for the arguments required to create a prompt for an
 * OpenAIAgent.
 */
export interface OpenAIAgentCreatePromptArgs {
    prefix?: string;
    systemMessage?: SystemMessage;
}
/**
 * Class representing an agent for the OpenAI chat model in LangChain. It
 * extends the Agent class and provides additional functionality specific
 * to the OpenAIAgent type.
 */
export declare class OpenAIAgent extends Agent {
    static lc_name(): string;
    lc_namespace: string[];
    _agentType(): "openai-functions";
    observationPrefix(): string;
    llmPrefix(): string;
    _stop(): string[];
    tools: StructuredTool[];
    constructor(input: Omit<OpenAIAgentInput, "outputParser">);
    /**
     * Creates a prompt for the OpenAIAgent using the provided tools and
     * fields.
     * @param _tools The tools to be used in the prompt.
     * @param fields Optional fields for creating the prompt.
     * @returns A BasePromptTemplate object representing the created prompt.
     */
    static createPrompt(_tools: StructuredTool[], fields?: OpenAIAgentCreatePromptArgs): BasePromptTemplate;
    /**
     * Creates an OpenAIAgent from a BaseLanguageModel and a list of tools.
     * @param llm The BaseLanguageModel to use.
     * @param tools The tools to be used by the agent.
     * @param args Optional arguments for creating the agent.
     * @returns An instance of OpenAIAgent.
     */
    static fromLLMAndTools(llm: BaseLanguageModel, tools: StructuredTool[], args?: OpenAIAgentCreatePromptArgs & Pick<AgentArgs, "callbacks">): OpenAIAgent;
    /**
     * Constructs a scratch pad from a list of agent steps.
     * @param steps The steps to include in the scratch pad.
     * @returns A string or a list of BaseMessages representing the constructed scratch pad.
     */
    constructScratchPad(steps: AgentStep[]): Promise<string | BaseMessage[]>;
    /**
     * Plans the next action or finish state of the agent based on the
     * provided steps, inputs, and optional callback manager.
     * @param steps The steps to consider in planning.
     * @param inputs The inputs to consider in planning.
     * @param callbackManager Optional CallbackManager to use in planning.
     * @returns A Promise that resolves to an AgentAction or AgentFinish object representing the planned action or finish state.
     */
    plan(steps: Array<AgentStep>, inputs: ChainValues, callbackManager?: CallbackManager): Promise<AgentAction | AgentFinish>;
}
