"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomListOutputParser = exports.CommaSeparatedListOutputParser = exports.ListOutputParser = void 0;
const output_parser_js_1 = require("../schema/output_parser.cjs");
/**
 * Class to parse the output of an LLM call to a list.
 * @augments BaseOutputParser
 */
class ListOutputParser extends output_parser_js_1.BaseOutputParser {
}
exports.ListOutputParser = ListOutputParser;
/**
 * Class to parse the output of an LLM call as a comma-separated list.
 * @augments ListOutputParser
 */
class CommaSeparatedListOutputParser extends ListOutputParser {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "output_parsers", "list"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    static lc_name() {
        return "CommaSeparatedListOutputParser";
    }
    /**
     * Parses the given text into an array of strings, using a comma as the
     * separator. If the parsing fails, throws an OutputParserException.
     * @param text The text to parse.
     * @returns An array of strings obtained by splitting the input text at each comma.
     */
    async parse(text) {
        try {
            return text
                .trim()
                .split(",")
                .map((s) => s.trim());
        }
        catch (e) {
            throw new output_parser_js_1.OutputParserException(`Could not parse output: ${text}`, text);
        }
    }
    /**
     * Provides instructions on the expected format of the response for the
     * CommaSeparatedListOutputParser.
     * @returns A string containing instructions on the expected format of the response.
     */
    getFormatInstructions() {
        return `Your response should be a list of comma separated values, eg: \`foo, bar, baz\``;
    }
}
exports.CommaSeparatedListOutputParser = CommaSeparatedListOutputParser;
/**
 * Class to parse the output of an LLM call to a list with a specific length and separator.
 * @augments ListOutputParser
 */
class CustomListOutputParser extends ListOutputParser {
    constructor({ length, separator }) {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "output_parsers", "list"]
        });
        Object.defineProperty(this, "length", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "separator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.length = length;
        this.separator = separator || ",";
    }
    /**
     * Parses the given text into an array of strings, using the specified
     * separator. If the parsing fails or the number of items in the list
     * doesn't match the expected length, throws an OutputParserException.
     * @param text The text to parse.
     * @returns An array of strings obtained by splitting the input text at each occurrence of the specified separator.
     */
    async parse(text) {
        try {
            const items = text
                .trim()
                .split(this.separator)
                .map((s) => s.trim());
            if (this.length !== undefined && items.length !== this.length) {
                throw new output_parser_js_1.OutputParserException(`Incorrect number of items. Expected ${this.length}, got ${items.length}.`);
            }
            return items;
        }
        catch (e) {
            if (Object.getPrototypeOf(e) === output_parser_js_1.OutputParserException.prototype) {
                throw e;
            }
            throw new output_parser_js_1.OutputParserException(`Could not parse output: ${text}`);
        }
    }
    /**
     * Provides instructions on the expected format of the response for the
     * CustomListOutputParser, including the number of items and the
     * separator.
     * @returns A string containing instructions on the expected format of the response.
     */
    getFormatInstructions() {
        return `Your response should be a list of ${this.length} items separated by "${this.separator}" (eg: \`foo${this.separator} bar${this.separator} baz\`)`;
    }
}
exports.CustomListOutputParser = CustomListOutputParser;
