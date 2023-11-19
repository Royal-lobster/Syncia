import { PairwiseStringEvaluator, PairwiseStringEvaluatorArgs, StringEvaluator, StringEvaluatorArgs } from "../base.js";
import { ChainValues } from "../../schema/index.js";
import { CallbackManagerForChainRun, Callbacks } from "../../callbacks/index.js";
import { BaseCallbackConfig } from "../../callbacks/manager.js";
import { Embeddings } from "../../embeddings/base.js";
/**
 *
 * Embedding Distance Metric.
 *
 * COSINE: Cosine distance metric.
 * EUCLIDEAN: Euclidean distance metric.
 * MANHATTAN: Manhattan distance metric.
 * CHEBYSHEV: Chebyshev distance metric.
 * HAMMING: Hamming distance metric.
 */
export type EmbeddingDistanceType = "cosine" | "euclidean" | "manhattan" | "chebyshev";
/**
 * Embedding Distance Evaluation Chain Input.
 */
export interface EmbeddingDistanceEvalChainInput {
    /**
     * The embedding objects to vectorize the outputs.
     */
    embedding?: Embeddings;
    /**
     * The distance metric to use
     * for comparing the embeddings.
     */
    distanceMetric?: EmbeddingDistanceType;
}
type VectorFunction = (xVector: number[], yVector: number[]) => number;
/**
 * Get the distance function for the given distance type.
 * @param distance The distance type.
 * @return The distance function.
 */
export declare function getDistanceCalculationFunction(distanceType: EmbeddingDistanceType): VectorFunction;
/**
 * Compute the score based on the distance metric.
 * @param vectors The input vectors.
 * @param distanceMetric The distance metric.
 * @return The computed score.
 */
export declare function computeEvaluationScore(vectors: number[][], distanceMetric: EmbeddingDistanceType): number;
/**
 * Use embedding distances to score semantic difference between
 * a prediction and reference.
 */
export declare class EmbeddingDistanceEvalChain extends StringEvaluator implements EmbeddingDistanceEvalChainInput {
    requiresReference: boolean;
    requiresInput: boolean;
    outputKey: string;
    embedding?: Embeddings;
    distanceMetric: EmbeddingDistanceType;
    constructor(fields: EmbeddingDistanceEvalChainInput);
    _chainType(): "embedding_cosine_distance" | "embedding_euclidean_distance" | "embedding_manhattan_distance" | "embedding_chebyshev_distance";
    _evaluateStrings(args: StringEvaluatorArgs, config: Callbacks | BaseCallbackConfig | undefined): Promise<ChainValues>;
    get inputKeys(): string[];
    get outputKeys(): string[];
    _call(values: ChainValues, _runManager: CallbackManagerForChainRun | undefined): Promise<ChainValues>;
}
/**
 * Use embedding distances to score semantic difference between two predictions.
 */
export declare class PairwiseEmbeddingDistanceEvalChain extends PairwiseStringEvaluator implements EmbeddingDistanceEvalChainInput {
    requiresReference: boolean;
    requiresInput: boolean;
    outputKey: string;
    embedding?: Embeddings;
    distanceMetric: EmbeddingDistanceType;
    constructor(fields: EmbeddingDistanceEvalChainInput);
    _chainType(): "pairwise_embedding_cosine_distance" | "pairwise_embedding_euclidean_distance" | "pairwise_embedding_manhattan_distance" | "pairwise_embedding_chebyshev_distance";
    _evaluateStringPairs(args: PairwiseStringEvaluatorArgs, config?: Callbacks | BaseCallbackConfig): Promise<ChainValues>;
    get inputKeys(): string[];
    get outputKeys(): string[];
    _call(values: ChainValues, _runManager: CallbackManagerForChainRun | undefined): Promise<ChainValues>;
}
export {};
