import { z } from "zod";
import { PromptTemplate } from "../../prompts/prompt.js";
import { FunctionParameters } from "../../output_parsers/openai_functions.js";
import { LLMChain, LLMChainInput } from "../llm_chain.js";
import { BaseChatModel } from "../../chat_models/base.js";
import { BaseFunctionCallOptions } from "../../base_language/index.js";
/**
 * Type representing the options for creating a tagging chain.
 */
export type TaggingChainOptions = {
    prompt?: PromptTemplate;
} & Omit<LLMChainInput<object>, "prompt" | "llm">;
/**
 * Function that creates a tagging chain using the provided schema,
 * LLM, and options. It constructs the LLM with the necessary
 * functions, prompt, output parser, and tags.
 * @param schema The schema defining the structure of function parameters.
 * @param llm LLM to use in the chain. Must support function calling.
 * @param options Options for creating the tagging chain.
 * @returns A new instance of LLMChain configured for tagging.
 */
export declare function createTaggingChain(schema: FunctionParameters, llm: BaseChatModel<BaseFunctionCallOptions>, options?: TaggingChainOptions): LLMChain<object, BaseChatModel<BaseFunctionCallOptions>>;
/**
 * Function that creates a tagging chain from a Zod schema. It converts
 * the Zod schema to a JSON schema using the zodToJsonSchema function and
 * then calls createTaggingChain with the converted schema.
 * @param schema The Zod schema which extracted data should match.
 * @param llm LLM to use in the chain. Must support function calling.
 * @param options Options for creating the tagging chain.
 * @returns A new instance of LLMChain configured for tagging.
 */
export declare function createTaggingChainFromZod(schema: z.ZodObject<any, any, any, any>, llm: BaseChatModel<BaseFunctionCallOptions>, options?: TaggingChainOptions): LLMChain<object, BaseChatModel<BaseFunctionCallOptions>>;
