"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputParserException = exports.BytesOutputParser = exports.StringOutputParser = exports.BaseTransformOutputParser = exports.BaseOutputParser = exports.BaseLLMOutputParser = void 0;
const index_js_1 = require("./runnable/index.cjs");
/**
 * Abstract base class for parsing the output of a Large Language Model
 * (LLM) call. It provides methods for parsing the result of an LLM call
 * and invoking the parser with a given input.
 */
class BaseLLMOutputParser extends index_js_1.Runnable {
    /**
     * Parses the result of an LLM call with a given prompt. By default, it
     * simply calls `parseResult`.
     * @param generations The generations from an LLM call.
     * @param _prompt The prompt used in the LLM call.
     * @param callbacks Optional callbacks.
     * @returns A promise of the parsed output.
     */
    parseResultWithPrompt(generations, _prompt, callbacks) {
        return this.parseResult(generations, callbacks);
    }
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
    async invoke(input, options) {
        if (typeof input === "string") {
            return this._callWithConfig(async (input) => this.parseResult([{ text: input }]), input, { ...options, runType: "parser" });
        }
        else {
            return this._callWithConfig(async (input) => this.parseResult([{ message: input, text: input.content }]), input, { ...options, runType: "parser" });
        }
    }
}
exports.BaseLLMOutputParser = BaseLLMOutputParser;
/**
 * Class to parse the output of an LLM call.
 */
class BaseOutputParser extends BaseLLMOutputParser {
    parseResult(generations, callbacks) {
        return this.parse(generations[0].text, callbacks);
    }
    async parseWithPrompt(text, _prompt, callbacks) {
        return this.parse(text, callbacks);
    }
    /**
     * Return the string type key uniquely identifying this class of parser
     */
    _type() {
        throw new Error("_type not implemented");
    }
}
exports.BaseOutputParser = BaseOutputParser;
/**
 * Class to parse the output of an LLM call that also allows streaming inputs.
 */
class BaseTransformOutputParser extends BaseOutputParser {
    async *_transform(inputGenerator) {
        for await (const chunk of inputGenerator) {
            if (typeof chunk === "string") {
                yield this.parseResult([{ text: chunk }]);
            }
            else {
                yield this.parseResult([{ message: chunk, text: chunk.content }]);
            }
        }
    }
    /**
     * Transforms an asynchronous generator of input into an asynchronous
     * generator of parsed output.
     * @param inputGenerator An asynchronous generator of input.
     * @param options A configuration object.
     * @returns An asynchronous generator of parsed output.
     */
    async *transform(inputGenerator, options) {
        yield* this._transformStreamWithConfig(inputGenerator, this._transform.bind(this), {
            ...options,
            runType: "parser",
        });
    }
}
exports.BaseTransformOutputParser = BaseTransformOutputParser;
/**
 * OutputParser that parses LLMResult into the top likely string.
 */
class StringOutputParser extends BaseTransformOutputParser {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "output_parser"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    static lc_name() {
        return "StrOutputParser";
    }
    /**
     * Parses a string output from an LLM call. This method is meant to be
     * implemented by subclasses to define how a string output from an LLM
     * should be parsed.
     * @param text The string output from an LLM call.
     * @param callbacks Optional callbacks.
     * @returns A promise of the parsed output.
     */
    parse(text) {
        return Promise.resolve(text);
    }
    getFormatInstructions() {
        return "";
    }
}
exports.StringOutputParser = StringOutputParser;
/**
 * OutputParser that parses LLMResult into the top likely string and
 * encodes it into bytes.
 */
class BytesOutputParser extends BaseTransformOutputParser {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "output_parser"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "textEncoder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new TextEncoder()
        });
    }
    static lc_name() {
        return "BytesOutputParser";
    }
    parse(text) {
        return Promise.resolve(this.textEncoder.encode(text));
    }
    getFormatInstructions() {
        return "";
    }
}
exports.BytesOutputParser = BytesOutputParser;
/**
 * Custom error class used to handle exceptions related to output parsing.
 * It extends the built-in `Error` class and adds an optional `output`
 * property that can hold the output that caused the exception.
 */
class OutputParserException extends Error {
    constructor(message, output) {
        super(message);
        Object.defineProperty(this, "output", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.output = output;
    }
}
exports.OutputParserException = OutputParserException;
