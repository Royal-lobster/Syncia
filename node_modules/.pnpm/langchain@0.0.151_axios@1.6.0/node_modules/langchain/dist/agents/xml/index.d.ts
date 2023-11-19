import { Tool } from "../../tools/base.js";
import { LLMChain } from "../../chains/llm_chain.js";
import { AgentStep, AgentAction, AgentFinish, ChainValues } from "../../schema/index.js";
import { ChatPromptTemplate } from "../../prompts/chat.js";
import { AgentArgs, BaseSingleActionAgent } from "../agent.js";
import { CallbackManager } from "../../callbacks/manager.js";
import { BaseLanguageModel } from "../../base_language/index.js";
/**
 * Interface for the input to the XMLAgent class.
 */
export interface XMLAgentInput {
    tools: Tool[];
    llmChain: LLMChain;
}
/**
 * Parses the output text from the agent and returns an AgentAction or
 * AgentFinish object.
 * @param text The output text from the agent.
 * @returns An AgentAction or AgentFinish object.
 */
export declare function parseOutput(text: string): Promise<AgentAction | AgentFinish>;
/**
 * Class that represents an agent that uses XML tags.
 */
export declare class XMLAgent extends BaseSingleActionAgent implements XMLAgentInput {
    static lc_name(): string;
    lc_namespace: string[];
    tools: Tool[];
    llmChain: LLMChain;
    _agentType(): "xml";
    constructor(fields: XMLAgentInput);
    get inputKeys(): string[];
    static createPrompt(): ChatPromptTemplate<any, any>;
    /**
     * Plans the next action or finish state of the agent based on the
     * provided steps, inputs, and optional callback manager.
     * @param steps The steps to consider in planning.
     * @param inputs The inputs to consider in planning.
     * @param callbackManager Optional CallbackManager to use in planning.
     * @returns A Promise that resolves to an AgentAction or AgentFinish object representing the planned action or finish state.
     */
    plan(steps: AgentStep[], inputs: ChainValues, callbackManager?: CallbackManager): Promise<AgentAction | AgentFinish>;
    /**
     * Creates an XMLAgent from a BaseLanguageModel and a list of tools.
     * @param llm The BaseLanguageModel to use.
     * @param tools The tools to be used by the agent.
     * @param args Optional arguments for creating the agent.
     * @returns An instance of XMLAgent.
     */
    static fromLLMAndTools(llm: BaseLanguageModel, tools: Tool[], args?: XMLAgentInput & Pick<AgentArgs, "callbacks">): XMLAgent;
}
