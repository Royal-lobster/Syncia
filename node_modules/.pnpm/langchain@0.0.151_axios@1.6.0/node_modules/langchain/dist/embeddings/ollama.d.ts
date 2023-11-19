import { OllamaInput, OllamaRequestParams } from "../util/ollama.js";
import { Embeddings, EmbeddingsParams } from "./base.js";
type CamelCasedRequestOptions = Omit<OllamaInput, "baseUrl" | "model">;
/**
 * Interface for OllamaEmbeddings parameters. Extends EmbeddingsParams and
 * defines additional parameters specific to the OllamaEmbeddings class.
 */
interface OllamaEmbeddingsParams extends EmbeddingsParams {
    /** The Ollama model to use, e.g: "llama2:13b" */
    model?: string;
    /** Base URL of the Ollama server, defaults to "http://localhost:11434" */
    baseUrl?: string;
    /** Advanced Ollama API request parameters in camelCase, see
     * https://github.com/jmorganca/ollama/blob/main/docs/modelfile.md#valid-parameters-and-values
     * for details of the available parameters.
     */
    requestOptions?: CamelCasedRequestOptions;
}
export declare class OllamaEmbeddings extends Embeddings {
    model: string;
    baseUrl: string;
    requestOptions?: OllamaRequestParams["options"];
    constructor(params?: OllamaEmbeddingsParams);
    /** convert camelCased Ollama request options like "useMMap" to
     * the snake_cased equivalent which the ollama API actually uses.
     * Used only for consistency with the llms/Ollama and chatModels/Ollama classes
     */
    _convertOptions(requestOptions: CamelCasedRequestOptions): Record<string, unknown>;
    _request(prompt: string): Promise<number[]>;
    _embed(strings: string[]): Promise<number[][]>;
    embedDocuments(documents: string[]): Promise<number[][]>;
    embedQuery(document: string): Promise<number[]>;
}
export {};
