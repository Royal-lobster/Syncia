import { Embeddings } from "../../embeddings/base.js";
import { VectorStore } from "../../vectorstores/base.js";
import { Example } from "../../schema/index.js";
import { BaseExampleSelector } from "../base.js";
/**
 * Interface for the input data of the SemanticSimilarityExampleSelector
 * class.
 */
export interface SemanticSimilarityExampleSelectorInput {
    vectorStore: VectorStore;
    k?: number;
    exampleKeys?: string[];
    inputKeys?: string[];
}
/**
 * Class that selects examples based on semantic similarity. It extends
 * the BaseExampleSelector class.
 */
export declare class SemanticSimilarityExampleSelector extends BaseExampleSelector {
    vectorStore: VectorStore;
    k: number;
    exampleKeys?: string[];
    inputKeys?: string[];
    constructor(data: SemanticSimilarityExampleSelectorInput);
    /**
     * Method that adds a new example to the vectorStore. The example is
     * converted to a string and added to the vectorStore as a document.
     * @param example The example to be added to the vectorStore.
     * @returns Promise that resolves when the example has been added to the vectorStore.
     */
    addExample(example: Example): Promise<void>;
    /**
     * Method that selects which examples to use based on semantic similarity.
     * It performs a similarity search in the vectorStore using the input
     * variables and returns the examples with the highest similarity.
     * @param inputVariables The input variables used for the similarity search.
     * @returns Promise that resolves with an array of the selected examples.
     */
    selectExamples<T>(inputVariables: Record<string, T>): Promise<Example[]>;
    /**
     * Static method that creates a new instance of
     * SemanticSimilarityExampleSelector. It takes a list of examples, an
     * instance of Embeddings, a VectorStore class, and an options object as
     * parameters. It converts the examples to strings, creates a VectorStore
     * from the strings and the embeddings, and returns a new
     * SemanticSimilarityExampleSelector with the created VectorStore and the
     * options provided.
     * @param examples The list of examples to be used.
     * @param embeddings The instance of Embeddings to be used.
     * @param vectorStoreCls The VectorStore class to be used.
     * @param options The options object for the SemanticSimilarityExampleSelector.
     * @returns Promise that resolves with a new instance of SemanticSimilarityExampleSelector.
     */
    static fromExamples<C extends typeof VectorStore>(examples: Record<string, string>[], embeddings: Embeddings, vectorStoreCls: C, options?: {
        k?: number;
        inputKeys?: string[];
    } & Parameters<C["fromTexts"]>[3]): Promise<SemanticSimilarityExampleSelector>;
}
