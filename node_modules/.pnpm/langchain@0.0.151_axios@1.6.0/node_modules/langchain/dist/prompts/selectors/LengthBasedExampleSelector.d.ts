import { Example } from "../../schema/index.js";
import { BaseExampleSelector } from "../base.js";
import { PromptTemplate } from "../prompt.js";
/**
 * Interface for the input parameters of the LengthBasedExampleSelector
 * class.
 */
export interface LengthBasedExampleSelectorInput {
    examplePrompt: PromptTemplate;
    maxLength?: number;
    getTextLength?: (text: string) => number;
}
/**
 * A specialized example selector that selects examples based on their
 * length, ensuring that the total length of the selected examples does
 * not exceed a specified maximum length.
 */
export declare class LengthBasedExampleSelector extends BaseExampleSelector {
    protected examples: Example[];
    examplePrompt: PromptTemplate;
    getTextLength: (text: string) => number;
    maxLength: number;
    exampleTextLengths: number[];
    constructor(data: LengthBasedExampleSelectorInput);
    /**
     * Adds an example to the list of examples and calculates its length.
     * @param example The example to be added.
     * @returns Promise that resolves when the example has been added and its length calculated.
     */
    addExample(example: Example): Promise<void>;
    /**
     * Calculates the lengths of the examples.
     * @param v Array of lengths of the examples.
     * @param values Instance of LengthBasedExampleSelector.
     * @returns Promise that resolves with an array of lengths of the examples.
     */
    calculateExampleTextLengths(v: number[], values: LengthBasedExampleSelector): Promise<number[]>;
    /**
     * Selects examples until the total length of the selected examples
     * reaches the maxLength.
     * @param inputVariables The input variables for the examples.
     * @returns Promise that resolves with an array of selected examples.
     */
    selectExamples(inputVariables: Example): Promise<Example[]>;
    /**
     * Creates a new instance of LengthBasedExampleSelector and adds a list of
     * examples to it.
     * @param examples Array of examples to be added.
     * @param args Input parameters for the LengthBasedExampleSelector.
     * @returns Promise that resolves with a new instance of LengthBasedExampleSelector with the examples added.
     */
    static fromExamples(examples: Example[], args: LengthBasedExampleSelectorInput): Promise<LengthBasedExampleSelector>;
}
