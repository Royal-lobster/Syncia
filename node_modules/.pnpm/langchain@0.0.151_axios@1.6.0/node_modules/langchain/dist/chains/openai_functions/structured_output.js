import { zodToJsonSchema } from "zod-to-json-schema";
import { Validator } from "../../util/@cfworker/json-schema/index.js";
import { LLMChain } from "../llm_chain.js";
import { ChatOpenAI } from "../../chat_models/openai.js";
import { BaseLLMOutputParser, OutputParserException, } from "../../schema/output_parser.js";
import { OutputFunctionsParser } from "../../output_parsers/openai_functions.js";
/**
 * Class that extends the BaseLLMOutputParser class. It provides
 * functionality for parsing the structured output based on a JSON schema.
 */
export class FunctionCallStructuredOutputParser extends BaseLLMOutputParser {
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
            value: new OutputFunctionsParser()
        });
        Object.defineProperty(this, "jsonSchemaValidator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.jsonSchemaValidator = new Validator(schema, "7");
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
            throw new OutputParserException(`Failed to parse. Text: "${initialResult}". Error: ${JSON.stringify(result.errors)}`, initialResult);
        }
    }
}
/**
 * Create a chain that returns output matching a JSON Schema.
 * @param input Object that includes all LLMChainInput fields except "outputParser"
 * as well as an additional required "outputSchema" JSON Schema object.
 * @returns OpenAPIChain
 */
export function createStructuredOutputChain(input) {
    const { outputSchema, llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo-0613", temperature: 0 }), outputKey = "output", llmKwargs = {}, ...rest } = input;
    const functionName = "output_formatter";
    return new LLMChain({
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
export function createStructuredOutputChainFromZod(zodSchema, input) {
    return createStructuredOutputChain({
        ...input,
        outputSchema: zodToJsonSchema(zodSchema),
    });
}
