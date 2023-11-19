import { z } from "zod";
import { JsonSchema7Type } from "zod-to-json-schema/src/parseDef.js";
import { Validator } from "../../util/@cfworker/json-schema/index.js";
import { LLMChain, LLMChainInput } from "../llm_chain.js";
import { ChatOpenAI } from "../../chat_models/openai.js";
import { BasePromptTemplate } from "../../prompts/index.js";
import { BaseLLMOutputParser } from "../../schema/output_parser.js";
import { OutputFunctionsParser } from "../../output_parsers/openai_functions.js";
import { ChatGeneration } from "../../schema/index.js";
import { BaseChatModel } from "../../chat_models/base.js";
import { BaseFunctionCallOptions } from "../../base_language/index.js";
/**
 * Type representing the input for creating a structured output chain. It
 * extends the LLMChainInput type and includes an additional
 * 'outputSchema' field representing the JSON schema for the expected
 * output.
 */
export type StructuredOutputChainInput = Omit<LLMChainInput, "outputParser" | "llm"> & {
    outputSchema: JsonSchema7Type;
    prompt: BasePromptTemplate;
    llm?: BaseChatModel<BaseFunctionCallOptions>;
};
/**
 * Class that extends the BaseLLMOutputParser class. It provides
 * functionality for parsing the structured output based on a JSON schema.
 */
export declare class FunctionCallStructuredOutputParser<T extends z.AnyZodObject> extends BaseLLMOutputParser<z.infer<T>> {
    schema: JsonSchema7Type;
    lc_namespace: string[];
    protected functionOutputParser: OutputFunctionsParser;
    protected jsonSchemaValidator: Validator;
    constructor(schema: JsonSchema7Type);
    /**
     * Method to parse the result of chat generations. It first parses the
     * result using the functionOutputParser, then validates the parsed result
     * against the JSON schema. If the result is valid, it returns the parsed
     * result. Otherwise, it throws an OutputParserException.
     * @param generations Array of ChatGeneration instances to be parsed.
     * @returns The parsed result if it is valid according to the JSON schema.
     */
    parseResult(generations: ChatGeneration[]): Promise<any>;
}
/**
 * Create a chain that returns output matching a JSON Schema.
 * @param input Object that includes all LLMChainInput fields except "outputParser"
 * as well as an additional required "outputSchema" JSON Schema object.
 * @returns OpenAPIChain
 */
export declare function createStructuredOutputChain<T extends z.AnyZodObject = z.AnyZodObject>(input: StructuredOutputChainInput): LLMChain<any, ChatOpenAI | BaseChatModel<BaseFunctionCallOptions>>;
export declare function createStructuredOutputChainFromZod<T extends z.AnyZodObject>(zodSchema: T, input: Omit<StructuredOutputChainInput, "outputSchema">): LLMChain<any, ChatOpenAI | BaseChatModel<BaseFunctionCallOptions>>;
