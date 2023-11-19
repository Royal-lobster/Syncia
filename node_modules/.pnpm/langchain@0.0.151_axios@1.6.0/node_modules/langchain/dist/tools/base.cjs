"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tool = exports.StructuredTool = exports.ToolInputParsingException = void 0;
const zod_1 = require("zod");
const manager_js_1 = require("../callbacks/manager.cjs");
const index_js_1 = require("../base_language/index.cjs");
/**
 * Custom error class used to handle exceptions related to tool input parsing.
 * It extends the built-in `Error` class and adds an optional `output`
 * property that can hold the output that caused the exception.
 */
class ToolInputParsingException extends Error {
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
exports.ToolInputParsingException = ToolInputParsingException;
/**
 * Base class for Tools that accept input of any shape defined by a Zod schema.
 */
class StructuredTool extends index_js_1.BaseLangChain {
    get lc_namespace() {
        return ["langchain", "tools"];
    }
    constructor(fields) {
        super(fields ?? {});
        Object.defineProperty(this, "returnDirect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    /**
     * Invokes the tool with the provided input and configuration.
     * @param input The input for the tool.
     * @param config Optional configuration for the tool.
     * @returns A Promise that resolves with a string.
     */
    async invoke(input, config) {
        return this.call(input, config);
    }
    /**
     * Calls the tool with the provided argument, configuration, and tags. It
     * parses the input according to the schema, handles any errors, and
     * manages callbacks.
     * @param arg The input argument for the tool.
     * @param configArg Optional configuration or callbacks for the tool.
     * @param tags Optional tags for the tool.
     * @returns A Promise that resolves with a string.
     */
    async call(arg, configArg, 
    /** @deprecated */
    tags) {
        let parsed;
        try {
            parsed = await this.schema.parseAsync(arg);
        }
        catch (e) {
            throw new ToolInputParsingException(`Received tool input did not match expected schema`, JSON.stringify(arg));
        }
        const config = (0, manager_js_1.parseCallbackConfigArg)(configArg);
        const callbackManager_ = await manager_js_1.CallbackManager.configure(config.callbacks, this.callbacks, config.tags || tags, this.tags, config.metadata, this.metadata, { verbose: this.verbose });
        const runManager = await callbackManager_?.handleToolStart(this.toJSON(), typeof parsed === "string" ? parsed : JSON.stringify(parsed));
        let result;
        try {
            result = await this._call(parsed, runManager);
        }
        catch (e) {
            await runManager?.handleToolError(e);
            throw e;
        }
        await runManager?.handleToolEnd(result);
        return result;
    }
}
exports.StructuredTool = StructuredTool;
/**
 * Base class for Tools that accept input as a string.
 */
class Tool extends StructuredTool {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: zod_1.z
                .object({ input: zod_1.z.string().optional() })
                .transform((obj) => obj.input)
        });
    }
    /**
     * Calls the tool with the provided argument and callbacks. It handles
     * string inputs specifically.
     * @param arg The input argument for the tool, which can be a string, undefined, or an input of the tool's schema.
     * @param callbacks Optional callbacks for the tool.
     * @returns A Promise that resolves with a string.
     */
    call(arg, callbacks) {
        return super.call(typeof arg === "string" || !arg ? { input: arg } : arg, callbacks);
    }
}
exports.Tool = Tool;
