import { BaseCallbackConfig, Callbacks } from "../callbacks/manager.js";
import { BasePromptValue, Generation, ChatGeneration, BaseMessage } from "./index.js";
import { Runnable } from "./runnable/index.js";
import { RunnableConfig } from "./runnable/config.js";
/**
 * Options for formatting instructions.
 */
export interface FormatInstructionsOptions {
}
/**
 * Abstract base class for parsing the output of a Large Language Model
 * (LLM) call. It provides methods for parsing the result of an LLM call
 * and invoking the parser with a given input.
 */
export declare abstract class BaseLLMOutputParser<T = unknown> extends Runnable<string | BaseMessage, T> {
    /**
     * Parses the result of an LLM call. This method is meant to be
     * implemented by subclasses to define how the output from the LLM should
     * be parsed.
     * @param generations The generations from an LLM call.
     * @param callbacks Optional callbacks.
     * @returns A promise of the parsed output.
     */
    abstract parseResult(generations: Generation[] | ChatGeneration[], callbacks?: Callbacks): Promise<T>;
    /**
     * Parses the result of an LLM call with a given prompt. By default, it
     * simply calls `parseResult`.
     * @param generations The generations from an LLM call.
     * @param _prompt The prompt used in the LLM call.
     * @param callbacks Optional callbacks.
     * @returns A promise of the parsed output.
     */
    parseResultWithPrompt(generations: Generation[] | ChatGeneration[], _prompt: BasePromptValue, callbacks?: Callbacks): Promise<T>;
    /**
     * Calls the parser with a given input and optional configuration options.
     * If the input is a string, it creates a generation with the input as
     * text and calls `parseResult`. If the input is a `BaseMessage`, it
     * creates a generation with the input as a message and the content of the
     * input as text, and then calls `parseResult`.
     * @param input The input to the parser, which can be a string or a `BaseMessage`.
     * @param options Optional configuration options.
     * @returns A promise of the parsed output.
     */
    invoke(input: string | BaseMessage, options?: RunnableConfig): Promise<T>;
}
/**
 * Class to parse the output of an LLM call.
 */
export declare abstract class BaseOutputParser<T = unknown> extends BaseLLMOutputParser<T> {
    parseResult(generations: Generation[] | ChatGeneration[], callbacks?: Callbacks): Promise<T>;
    /**
     * Parse the output of an LLM call.
     *
     * @param text - LLM output to parse.
     * @returns Parsed output.
     */
    abstract parse(text: string, callbacks?: Callbacks): Promise<T>;
    parseWithPrompt(text: string, _prompt: BasePromptValue, callbacks?: Callbacks): Promise<T>;
    /**
     * Return a string describing the format of the output.
     * @returns Format instructions.
     * @param options - Options for formatting instructions.
     * @example
     * ```json
     * {
     *  "foo": "bar"
     * }
     * ```
     */
    abstract getFormatInstructions(options?: FormatInstructionsOptions): string;
    /**
     * Return the string type key uniquely identifying this class of parser
     */
    _type(): string;
}
/**
 * Class to parse the output of an LLM call that also allows streaming inputs.
 */
export declare abstract class BaseTransformOutputParser<T = unknown> extends BaseOutputParser<T> {
    _transform(inputGenerator: AsyncGenerator<string | BaseMessage>): AsyncGenerator<T>;
    /**
     * Transforms an asynchronous generator of input into an asynchronous
     * generator of parsed output.
     * @param inputGenerator An asynchronous generator of input.
     * @param options A configuration object.
     * @returns An asynchronous generator of parsed output.
     */
    transform(inputGenerator: AsyncGenerator<string | BaseMessage>, options: BaseCallbackConfig): AsyncGenerator<T>;
}
/**
 * OutputParser that parses LLMResult into the top likely string.
 */
export declare class StringOutputParser extends BaseTransformOutputParser<string> {
    static lc_name(): string;
    lc_namespace: string[];
    lc_serializable: boolean;
    /**
     * Parses a string output from an LLM call. This method is meant to be
     * implemented by subclasses to define how a string output from an LLM
     * should be parsed.
     * @param text The string output from an LLM call.
     * @param callbacks Optional callbacks.
     * @returns A promise of the parsed output.
     */
    parse(text: string): Promise<string>;
    getFormatInstructions(): string;
}
/**
 * OutputParser that parses LLMResult into the top likely string and
 * encodes it into bytes.
 */
export declare class BytesOutputParser extends BaseTransformOutputParser<Uint8Array> {
    static lc_name(): string;
    lc_namespace: string[];
    lc_serializable: boolean;
    protected textEncoder: TextEncoder;
    parse(text: string): Promise<Uint8Array>;
    getFormatInstructions(): string;
}
/**
 * Custom error class used to handle exceptions related to output parsing.
 * It extends the built-in `Error` class and adds an optional `output`
 * property that can hold the output that caused the exception.
 */
export declare class OutputParserException extends Error {
    output?: string;
    constructor(message: string, output?: string);
}
