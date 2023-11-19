import { BaseOutputParser } from "../schema/output_parser.js";
import { BasePromptTemplate } from "../prompts/base.js";
import { LLMChain } from "../chains/llm_chain.js";
import { BaseLanguageModel } from "../base_language/index.js";
import { Callbacks } from "../callbacks/manager.js";
/**
 * Class that extends the BaseOutputParser to handle situations where the
 * initial parsing attempt fails. It contains a retryChain for retrying
 * the parsing process in case of a failure.
 */
export declare class OutputFixingParser<T> extends BaseOutputParser<T> {
    static lc_name(): string;
    lc_namespace: string[];
    lc_serializable: boolean;
    parser: BaseOutputParser<T>;
    retryChain: LLMChain;
    /**
     * Static method to create a new instance of OutputFixingParser using a
     * given language model, parser, and optional fields.
     * @param llm The language model to be used.
     * @param parser The parser to be used.
     * @param fields Optional fields which may contain a prompt.
     * @returns A new instance of OutputFixingParser.
     */
    static fromLLM<T>(llm: BaseLanguageModel, parser: BaseOutputParser<T>, fields?: {
        prompt?: BasePromptTemplate;
    }): OutputFixingParser<T>;
    constructor({ parser, retryChain, }: {
        parser: BaseOutputParser<T>;
        retryChain: LLMChain;
    });
    /**
     * Method to parse the completion using the parser. If the initial parsing
     * fails, it uses the retryChain to attempt to fix the output and retry
     * the parsing process.
     * @param completion The completion to be parsed.
     * @param callbacks Optional callbacks to be used during parsing.
     * @returns The parsed output.
     */
    parse(completion: string, callbacks?: Callbacks): Promise<T>;
    /**
     * Method to get the format instructions for the parser.
     * @returns The format instructions for the parser.
     */
    getFormatInstructions(): string;
}
