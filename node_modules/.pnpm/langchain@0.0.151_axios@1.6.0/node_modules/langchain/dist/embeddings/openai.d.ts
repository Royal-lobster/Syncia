import { type ClientOptions } from "openai";
import { AzureOpenAIInput, LegacyOpenAIInput } from "../types/openai-types.js";
import { Embeddings, EmbeddingsParams } from "./base.js";
/**
 * Interface for OpenAIEmbeddings parameters. Extends EmbeddingsParams and
 * defines additional parameters specific to the OpenAIEmbeddings class.
 */
export interface OpenAIEmbeddingsParams extends EmbeddingsParams {
    /** Model name to use */
    modelName: string;
    /**
     * Timeout to use when making requests to OpenAI.
     */
    timeout?: number;
    /**
     * The maximum number of documents to embed in a single request. This is
     * limited by the OpenAI API to a maximum of 2048.
     */
    batchSize?: number;
    /**
     * Whether to strip new lines from the input text. This is recommended by
     * OpenAI, but may not be suitable for all use cases.
     */
    stripNewLines?: boolean;
}
/**
 * Class for generating embeddings using the OpenAI API. Extends the
 * Embeddings class and implements OpenAIEmbeddingsParams and
 * AzureOpenAIInput.
 */
export declare class OpenAIEmbeddings extends Embeddings implements OpenAIEmbeddingsParams, AzureOpenAIInput {
    modelName: string;
    batchSize: number;
    stripNewLines: boolean;
    timeout?: number;
    azureOpenAIApiVersion?: string;
    azureOpenAIApiKey?: string;
    azureOpenAIApiInstanceName?: string;
    azureOpenAIApiDeploymentName?: string;
    azureOpenAIBasePath?: string;
    private client;
    private clientConfig;
    constructor(fields?: Partial<OpenAIEmbeddingsParams> & Partial<AzureOpenAIInput> & {
        verbose?: boolean;
        openAIApiKey?: string;
    }, configuration?: ClientOptions & LegacyOpenAIInput);
    /**
     * Method to generate embeddings for an array of documents. Splits the
     * documents into batches and makes requests to the OpenAI API to generate
     * embeddings.
     * @param texts Array of documents to generate embeddings for.
     * @returns Promise that resolves to a 2D array of embeddings for each document.
     */
    embedDocuments(texts: string[]): Promise<number[][]>;
    /**
     * Method to generate an embedding for a single document. Calls the
     * embeddingWithRetry method with the document as the input.
     * @param text Document to generate an embedding for.
     * @returns Promise that resolves to an embedding for the document.
     */
    embedQuery(text: string): Promise<number[]>;
    /**
     * Private method to make a request to the OpenAI API to generate
     * embeddings. Handles the retry logic and returns the response from the
     * API.
     * @param request Request to send to the OpenAI API.
     * @returns Promise that resolves to the response from the API.
     */
    private embeddingWithRetry;
}
