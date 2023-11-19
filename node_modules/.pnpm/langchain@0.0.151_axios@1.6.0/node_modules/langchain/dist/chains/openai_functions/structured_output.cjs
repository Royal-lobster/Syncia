"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStructuredOutputChainFromZod = exports.createStructuredOutputChain = exports.FunctionCallStructuredOutputParser = void 0;
const zod_to_json_schema_1 = require("zod-to-json-schema");
const index_js_1 = require("../../util/@cfworker/json-schema/index.cjs");
const llm_chain_js_1 = require("../llm_chain.cjs");
const openai_js_1 = require("../../chat_models/openai.cjs");
const output_parser_js_1 = require("../../schema/output_parser.cjs");
const openai_functions_js_1 = require("../../output_parsers/openai_functions.cjs");
/**
 * Class that extends the BaseLLMOutputParser class. It provides
 * functionality for parsing the structured output based on a JSON schema.
 */
class FunctionCallStructuredOutputParser extends output_parser_js_1.BaseLLMOutputParser {
    constructor(schema) {
        super();
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: schema
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "chains", "openai_functions"]
        });
        Object.defineProperty(this, "functionOutputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new openai_functions_js_1.OutputFunctionsParser()
        });
        Object.defineProperty(this, "jsonSchemaValidator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.jsonSchemaValidator = new index_js_1.Validator(schema, "7");
    }
    /**
     * Method to parse the result of chat generations. It first parses the
     * result using the functionOutputParser, then validates the parsed result
     * against the JSON schema. If the result is valid, it returns the parsed
     * result. Otherwise, it throws an OutputParserException.
     * @param generations Array of ChatGeneration instances to be parsed.
     * @returns The parsed result if it is valid according to the JSON schema.
     */
    async parseResult(generations) {
        const initialResult = await this.functionOutputParser.parseResult(generations);
        const parsedResult = JSON.parse(initialResult, (_, value) => {
            if (value === null) {
                return undefined;
            }
            return value;
        });
        const result = this.jsonSchemaValidator.validate(parsedResult);
        if (result.valid) {
            return parsedResult;
        }
        else {
            throw new output_parser_js_1.OutputParserException(`Failed to parse. Text: "${initialResult}". Error: ${JSON.stringify(result.errors)}`, initialResult);
        }
    }
}
exports.FunctionCallStructuredOutputParser = FunctionCallStructuredOutputParser;
/**
 * Create a chain that returns output matching a JSON Schema.
 * @param input Object that includes all LLMChainInput fields except "outputParser"
 * as well as an additional required "outputSchema" JSON Schema object.
 * @returns OpenAPIChain
 */
function createStructuredOutputChain(input) {
    const { outputSchema, llm = new openai_js_1.ChatOpenAI({ modelName: "gpt-3.5-turbo-0613", temperature: 0 }), outputKey = "output", llmKwargs = {}, ...rest } = input;
    const functionName = "output_formatter";
    return new llm_chain_js_1.LLMChain({
        llm,
        llmKwargs: {
            ...llmKwargs,
            functions: [
                {
                    name: functionName,
                    description: `Output formatter. Should always be used to format your response to the user.`,
                    parameters: outputSchema,
                },
            ],
            function_call: {
                name: functionName,
            },
        },
        outputKey,
        outputParser: new FunctionCallStructuredOutputParser(outputSchema),
        ...rest,
    });
}
exports.createStructuredOutputChain = createStructuredOutputChain;
function createStructuredOutputChainFromZod(zodSchema, input) {
    return createStructuredOutputChain({
        ...input,
        outputSchema: (0, zod_to_json_schema_1.zodToJsonSchema)(zodSchema),
    });
}
exports.createStructuredOutputChainFromZod = createStructuredOutputChainFromZod;
