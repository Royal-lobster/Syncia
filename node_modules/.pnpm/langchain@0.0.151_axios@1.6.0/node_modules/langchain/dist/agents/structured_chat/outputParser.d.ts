import { AgentActionOutputParser } from "../types.js";
import { OutputFixingParser } from "../../output_parsers/fix.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { AgentAction, AgentFinish } from "../../schema/index.js";
import { Callbacks } from "../../callbacks/manager.js";
/**
 * A class that provides a custom implementation for parsing the output of
 * a StructuredChatAgent action. It extends the `AgentActionOutputParser`
 * class and extracts the action and action input from the text output,
 * returning an `AgentAction` or `AgentFinish` object.
 */
export declare class StructuredChatOutputParser extends AgentActionOutputParser {
    lc_namespace: string[];
    private toolNames;
    constructor(fields: {
        toolNames: string[];
    });
    /**
     * Parses the given text and returns an `AgentAction` or `AgentFinish`
     * object. If an `OutputFixingParser` is provided, it is used for parsing;
     * otherwise, the base parser is used.
     * @param text The text to parse.
     * @param callbacks Optional callbacks for asynchronous operations.
     * @returns A Promise that resolves to an `AgentAction` or `AgentFinish` object.
     */
    parse(text: string): Promise<AgentAction | AgentFinish>;
    /**
     * Returns the format instructions for parsing the output of an agent
     * action in the style of the StructuredChatAgent.
     * @returns A string representing the format instructions.
     */
    getFormatInstructions(): string;
}
/**
 * An interface for the arguments used to construct a
 * `StructuredChatOutputParserWithRetries` instance.
 */
export interface StructuredChatOutputParserArgs {
    baseParser?: StructuredChatOutputParser;
    outputFixingParser?: OutputFixingParser<AgentAction | AgentFinish>;
    toolNames?: string[];
}
/**
 * A class that provides a wrapper around the `StructuredChatOutputParser`
 * and `OutputFixingParser` classes. It extends the
 * `AgentActionOutputParser` class and allows for retrying the output
 * parsing using the `OutputFixingParser` if it is provided.
 */
export declare class StructuredChatOutputParserWithRetries extends AgentActionOutputParser {
    lc_namespace: string[];
    private baseParser;
    private outputFixingParser?;
    private toolNames;
    constructor(fields: StructuredChatOutputParserArgs);
    /**
     * Parses the given text and returns an `AgentAction` or `AgentFinish`
     * object. Throws an `OutputParserException` if the parsing fails.
     * @param text The text to parse.
     * @returns A Promise that resolves to an `AgentAction` or `AgentFinish` object.
     */
    parse(text: string, callbacks?: Callbacks): Promise<AgentAction | AgentFinish>;
    /**
     * Returns the format instructions for parsing the output of an agent
     * action in the style of the StructuredChatAgent.
     * @returns A string representing the format instructions.
     */
    getFormatInstructions(): string;
    /**
     * Creates a new `StructuredChatOutputParserWithRetries` instance from a
     * `BaseLanguageModel` and options. The options can include a base parser
     * and tool names.
     * @param llm A `BaseLanguageModel` instance.
     * @param options Options for creating a `StructuredChatOutputParserWithRetries` instance.
     * @returns A new `StructuredChatOutputParserWithRetries` instance.
     */
    static fromLLM(llm: BaseLanguageModel, options: Omit<StructuredChatOutputParserArgs, "outputFixingParser">): StructuredChatOutputParserWithRetries;
}
