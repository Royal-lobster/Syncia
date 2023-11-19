import { Embeddings, EmbeddingsParams } from "./base.js";
export interface HuggingFaceTransformersEmbeddingsParams extends EmbeddingsParams {
    /** Model name to use */
    modelName: string;
    /**
     * Timeout to use when making requests to OpenAI.
     */
    timeout?: number;
    /**
     * The maximum number of documents to embed in a single request.
     */
    batchSize?: number;
    /**
     * Whether to strip new lines from the input text. This is recommended by
     * OpenAI, but may not be suitable for all use cases.
     */
    stripNewLines?: boolean;
}
export declare class HuggingFaceTransformersEmbeddings extends Embeddings implements HuggingFaceTransformersEmbeddingsParams {
    modelName: string;
    batchSize: number;
    stripNewLines: boolean;
    timeout?: number;
    private pipelinePromise;
    constructor(fields?: Partial<HuggingFaceTransformersEmbeddingsParams>);
    embedDocuments(texts: string[]): Promise<number[][]>;
    embedQuery(text: string): Promise<number[]>;
    private runEmbedding;
}
