import { ChatOpenAI } from "../../../chat_models/openai.js";
import { StructuredTool } from "../../../tools/base.js";
export type ConversationalRetrievalAgentOptions = {
    rememberIntermediateSteps?: boolean;
    memoryKey?: string;
    outputKey?: string;
    prefix?: string;
    verbose?: boolean;
};
/**
 * Asynchronous function that creates a conversational retrieval agent
 * using a language model, tools, and options. It initializes the buffer
 * memory based on the provided options and initializes the AgentExecutor
 * with the tools, language model, and memory.
 * @param llm Instance of ChatOpenAI used as the language model for the agent.
 * @param tools Array of StructuredTool instances used by the agent.
 * @param options Optional ConversationalRetrievalAgentOptions to customize the agent.
 * @returns A Promise that resolves to an initialized AgentExecutor.
 */
export declare function createConversationalRetrievalAgent(llm: ChatOpenAI, tools: StructuredTool[], options?: ConversationalRetrievalAgentOptions): Promise<import("../../executor.js").AgentExecutor>;
