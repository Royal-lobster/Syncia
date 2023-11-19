import { BaseChatModel } from "../../chat_models/base.js";
import { BasePromptTemplate } from "../base.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { BaseLLM } from "../../llms/base.js";
import { PartialValues } from "../../schema/index.js";
export type BaseGetPromptAsyncOptions = {
    partialVariables?: PartialValues;
};
/**
 * Abstract class that defines the interface for selecting a prompt for a
 * given language model.
 */
export declare abstract class BasePromptSelector {
    /**
     * Abstract method that must be implemented by any class that extends
     * `BasePromptSelector`. It takes a language model as an argument and
     * returns a prompt template.
     * @param llm The language model for which to get a prompt.
     * @returns A prompt template.
     */
    abstract getPrompt(llm: BaseLanguageModel): BasePromptTemplate;
    /**
     * Asynchronous version of `getPrompt` that also accepts an options object
     * for partial variables.
     * @param llm The language model for which to get a prompt.
     * @param options Optional object for partial variables.
     * @returns A Promise that resolves to a prompt template.
     */
    getPromptAsync(llm: BaseLanguageModel, options?: BaseGetPromptAsyncOptions): Promise<BasePromptTemplate>;
}
/**
 * Concrete implementation of `BasePromptSelector` that selects a prompt
 * based on a set of conditions. It has a default prompt that it returns
 * if none of the conditions are met.
 */
export declare class ConditionalPromptSelector extends BasePromptSelector {
    defaultPrompt: BasePromptTemplate;
    conditionals: Array<[
        condition: (llm: BaseLanguageModel) => boolean,
        prompt: BasePromptTemplate
    ]>;
    constructor(default_prompt: BasePromptTemplate, conditionals?: Array<[
        condition: (llm: BaseLanguageModel) => boolean,
        prompt: BasePromptTemplate
    ]>);
    /**
     * Method that selects a prompt based on a set of conditions. If none of
     * the conditions are met, it returns the default prompt.
     * @param llm The language model for which to get a prompt.
     * @returns A prompt template.
     */
    getPrompt(llm: BaseLanguageModel): BasePromptTemplate;
}
/**
 * Type guard function that checks if a given language model is of type
 * `BaseLLM`.
 */
export declare function isLLM(llm: BaseLanguageModel): llm is BaseLLM;
/**
 * Type guard function that checks if a given language model is of type
 * `BaseChatModel`.
 */
export declare function isChatModel(llm: BaseLanguageModel): llm is BaseChatModel;
