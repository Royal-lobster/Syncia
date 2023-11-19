import { VectorStore } from "../vectorstores/base.js";
import { BaseLanguageModel } from "../base_language/index.js";
import { VectorDBQAChain } from "../chains/vector_db_qa.js";
import { Tool } from "./base.js";
/**
 * Interface for tools that interact with a Vector Store.
 */
interface VectorStoreTool {
    vectorStore: VectorStore;
    llm: BaseLanguageModel;
}
/**
 * A tool for the VectorDBQA chain to interact with a Vector Store. It is
 * used to answer questions about a specific topic. The input to this tool
 * should be a fully formed question.
 */
export declare class VectorStoreQATool extends Tool implements VectorStoreTool {
    static lc_name(): string;
    vectorStore: VectorStore;
    llm: BaseLanguageModel;
    name: string;
    description: string;
    chain: VectorDBQAChain;
    constructor(name: string, description: string, fields: VectorStoreTool);
    /**
     * Returns a string that describes what the tool does.
     * @param name The name of the tool.
     * @param description A description of what the tool does.
     * @returns A string that describes what the tool does.
     */
    static getDescription(name: string, description: string): string;
    /** @ignore */
    _call(input: string): Promise<string>;
}
export {};
