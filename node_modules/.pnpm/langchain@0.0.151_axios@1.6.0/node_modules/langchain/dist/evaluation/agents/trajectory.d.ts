import { BaseLLMOutputParser } from "../../schema/output_parser.js";
import { AgentTrajectoryEvaluator, EvalOutputType, LLMEvalChainInput, LLMTrajectoryEvaluatorArgs } from "../base.js";
import { AgentStep, ChainValues, ChatGeneration, Generation } from "../../schema/index.js";
import { Callbacks } from "../../callbacks/index.js";
import { BaseCallbackConfig } from "../../callbacks/manager.js";
import { BasePromptTemplate } from "../../prompts/index.js";
import { StructuredTool } from "../../tools/index.js";
import { BaseChatModel } from "../../chat_models/base.js";
/**
 * A parser for the output of the TrajectoryEvalChain.
 */
export declare class TrajectoryOutputParser extends BaseLLMOutputParser<EvalOutputType> {
    static lc_name(): string;
    lc_namespace: string[];
    parseResult(generations: Generation[] | ChatGeneration[], _callbacks: Callbacks | undefined): Promise<EvalOutputType>;
}
/**
 * A chain for evaluating ReAct style agents.
 *
 * This chain is used to evaluate ReAct style agents by reasoning about
 * the sequence of actions taken and their outcomes.
 */
export declare class TrajectoryEvalChain extends AgentTrajectoryEvaluator {
    static lc_name(): string;
    criterionName?: string;
    evaluationName?: string;
    requiresInput: boolean;
    requiresReference: boolean;
    outputParser: TrajectoryOutputParser;
    static resolveTrajectoryPrompt(prompt?: BasePromptTemplate | undefined, agentTools?: StructuredTool[]): import("../../prompts/chat.js").ChatPromptTemplate<any, any> | BasePromptTemplate<any, import("../../schema/index.js").BasePromptValue, any>;
    /**
     * Get the description of the agent tools.
     *
     * @returns The description of the agent tools.
     */
    static toolsDescription(agentTools: StructuredTool[]): string;
    /**
     * Create a new TrajectoryEvalChain.
     * @param llm
     * @param agentTools - The tools used by the agent.
     * @param chainOptions - The options for the chain.
     */
    static fromLLM(llm: BaseChatModel, agentTools?: StructuredTool[], chainOptions?: Partial<Omit<LLMEvalChainInput, "llm">>): Promise<TrajectoryEvalChain>;
    _prepareOutput(result: ChainValues): any;
    /**
     * Get the agent trajectory as a formatted string.
     *
     * @param steps - The agent trajectory.
     * @returns The formatted agent trajectory.
     */
    getAgentTrajectory(steps: AgentStep[]): string;
    formatReference(reference?: string): string;
    _evaluateAgentTrajectory(args: LLMTrajectoryEvaluatorArgs, callOptions: this["llm"]["CallOptions"], config?: Callbacks | BaseCallbackConfig): Promise<ChainValues>;
}
