import { z } from "zod";
import { FunctionParameters } from "../../output_parsers/openai_functions.js";
import { LLMChain } from "../llm_chain.js";
import { BaseChatModel } from "../../chat_models/base.js";
import { BaseFunctionCallOptions } from "../../base_language/index.js";
/**
 * Function that creates an extraction chain using the provided JSON schema.
 * It sets up the necessary components, such as the prompt, output parser, and tags.
 * @param schema JSON schema of the function parameters.
 * @param llm Must be a ChatOpenAI or AnthropicFunctions model that supports function calling.
 * @returns A LLMChain instance configured to return data matching the schema.
 */
export declare function createExtractionChain(schema: FunctionParameters, llm: BaseChatModel<BaseFunctionCallOptions>): LLMChain<object, BaseChatModel<BaseFunctionCallOptions>>;
/**
 * Function that creates an extraction chain from a Zod schema. It
 * converts the Zod schema to a JSON schema using zod-to-json-schema
 * before creating the extraction chain.
 * @param schema The Zod schema which extracted data should match
 * @param llm Must be a ChatOpenAI or AnthropicFunctions model that supports function calling.
 * @returns A LLMChain instance configured to return data matching the schema.
 */
export declare function createExtractionChainFromZod(schema: z.ZodObject<any, any, any, any>, llm: BaseChatModel<BaseFunctionCallOptions>): LLMChain<object, BaseChatModel<BaseFunctionCallOptions>>;
