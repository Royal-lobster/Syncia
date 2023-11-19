import { InputValues, PartialValues } from "../schema/index.js";
import { BasePromptTemplate, BasePromptTemplateInput } from "./base.js";
import { SerializedBasePromptTemplate } from "./serde.js";
/**
 * Type that includes the name of the prompt and the prompt itself.
 */
export type PipelinePromptParams<PromptTemplateType extends BasePromptTemplate> = {
    name: string;
    prompt: PromptTemplateType;
};
/**
 * Type that extends the BasePromptTemplateInput type, excluding the
 * inputVariables property. It includes an array of pipelinePrompts and a
 * finalPrompt.
 */
export type PipelinePromptTemplateInput<PromptTemplateType extends BasePromptTemplate> = Omit<BasePromptTemplateInput, "inputVariables"> & {
    pipelinePrompts: PipelinePromptParams<PromptTemplateType>[];
    finalPrompt: PromptTemplateType;
};
/**
 * Class that handles a sequence of prompts, each of which may require
 * different input variables. Includes methods for formatting these
 * prompts, extracting required input values, and handling partial
 * prompts.
 */
export declare class PipelinePromptTemplate<PromptTemplateType extends BasePromptTemplate> extends BasePromptTemplate {
    static lc_name(): string;
    pipelinePrompts: PipelinePromptParams<PromptTemplateType>[];
    finalPrompt: PromptTemplateType;
    constructor(input: PipelinePromptTemplateInput<PromptTemplateType>);
    /**
     * Computes the input values required by the pipeline prompts.
     * @returns Array of input values required by the pipeline prompts.
     */
    protected computeInputValues(): string[];
    protected static extractRequiredInputValues(allValues: InputValues, requiredValueNames: string[]): InputValues;
    /**
     * Formats the pipeline prompts based on the provided input values.
     * @param values Input values to format the pipeline prompts.
     * @returns Promise that resolves with the formatted input values.
     */
    protected formatPipelinePrompts(values: InputValues): Promise<InputValues>;
    /**
     * Formats the final prompt value based on the provided input values.
     * @param values Input values to format the final prompt value.
     * @returns Promise that resolves with the formatted final prompt value.
     */
    formatPromptValue(values: InputValues): Promise<PromptTemplateType["PromptValueReturnType"]>;
    format(values: InputValues): Promise<string>;
    /**
     * Handles partial prompts, which are prompts that have been partially
     * filled with input values.
     * @param values Partial input values.
     * @returns Promise that resolves with a new PipelinePromptTemplate instance with updated input variables.
     */
    partial(values: PartialValues): Promise<PipelinePromptTemplate<PromptTemplateType>>;
    serialize(): SerializedBasePromptTemplate;
    _getPromptType(): string;
}
