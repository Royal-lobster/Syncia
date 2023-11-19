import { Document } from "../../document.js";
import { LLMChain } from "../../chains/llm_chain.js";
import { PromptTemplate } from "../../prompts/index.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { BaseDocumentCompressor } from "./index.js";
/**
 * Interface for the arguments required to create an instance of
 * LLMChainExtractor.
 */
export interface LLMChainExtractorArgs {
    llmChain: LLMChain;
    getInput: (query: string, doc: Document) => Record<string, unknown>;
}
/**
 * A class that uses an LLM chain to extract relevant parts of documents.
 * It extends the BaseDocumentCompressor class.
 */
export declare class LLMChainExtractor extends BaseDocumentCompressor {
    llmChain: LLMChain;
    getInput: (query: string, doc: Document) => Record<string, unknown>;
    constructor({ llmChain, getInput }: LLMChainExtractorArgs);
    /**
     * Compresses a list of documents based on the output of an LLM chain.
     * @param documents The list of documents to be compressed.
     * @param query The query to be used for document compression.
     * @returns A list of compressed documents.
     */
    compressDocuments(documents: Document[], query: string): Promise<Document[]>;
    /**
     * Creates a new instance of LLMChainExtractor from a given LLM, prompt
     * template, and getInput function.
     * @param llm The BaseLanguageModel instance used for document extraction.
     * @param prompt The PromptTemplate instance used for document extraction.
     * @param getInput A function used for constructing the chain input from the query and a Document.
     * @returns A new instance of LLMChainExtractor.
     */
    static fromLLM(llm: BaseLanguageModel, prompt?: PromptTemplate, getInput?: (query: string, doc: Document) => Record<string, unknown>): LLMChainExtractor;
}
