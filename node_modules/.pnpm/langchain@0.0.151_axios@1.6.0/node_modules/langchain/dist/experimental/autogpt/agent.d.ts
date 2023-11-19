import { LLMChain } from "../../chains/llm_chain.js";
import { BaseChatModel } from "../../chat_models/base.js";
import { VectorStoreRetriever } from "../../vectorstores/base.js";
import { Tool } from "../../tools/base.js";
import { AutoGPTOutputParser } from "./output_parser.js";
import { BaseMessage } from "../../schema/index.js";
import { ObjectTool } from "./schema.js";
import { TokenTextSplitter } from "../../text_splitter.js";
/**
 * Interface for the input parameters of the AutoGPT class.
 */
export interface AutoGPTInput {
    aiName: string;
    aiRole: string;
    memory: VectorStoreRetriever;
    humanInTheLoop?: boolean;
    outputParser?: AutoGPTOutputParser;
    maxIterations?: number;
}
/**
 * Class representing the AutoGPT concept with LangChain primitives. It is
 * designed to be used with a set of tools such as a search tool,
 * write-file tool, and a read-file tool.
 */
export declare class AutoGPT {
    aiName: string;
    memory: VectorStoreRetriever;
    fullMessageHistory: BaseMessage[];
    nextActionCount: number;
    chain: LLMChain;
    outputParser: AutoGPTOutputParser;
    tools: ObjectTool[];
    feedbackTool?: Tool;
    maxIterations: number;
    textSplitter: TokenTextSplitter;
    constructor({ aiName, memory, chain, outputParser, tools, feedbackTool, maxIterations, }: Omit<Required<AutoGPTInput>, "aiRole" | "humanInTheLoop"> & {
        chain: LLMChain;
        tools: ObjectTool[];
        feedbackTool?: Tool;
    });
    /**
     * Creates a new AutoGPT instance from a given LLM and a set of tools.
     * @param llm A BaseChatModel object.
     * @param tools An array of ObjectTool objects.
     * @param options.aiName The name of the AI.
     * @param options.aiRole The role of the AI.
     * @param options.memory A VectorStoreRetriever object that represents the memory of the AI.
     * @param options.maxIterations The maximum number of iterations the AI can perform.
     * @param options.outputParser An AutoGPTOutputParser object that parses the output of the AI.
     * @returns A new instance of the AutoGPT class.
     */
    static fromLLMAndTools(llm: BaseChatModel, tools: ObjectTool[], { aiName, aiRole, memory, maxIterations, outputParser, }: AutoGPTInput): AutoGPT;
    /**
     * Runs the AI with a given set of goals.
     * @param goals An array of strings representing the goals.
     * @returns A string representing the result of the run or undefined if the maximum number of iterations is reached without a result.
     */
    run(goals: string[]): Promise<string | undefined>;
}
