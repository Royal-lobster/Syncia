import { z } from "zod";
import { CallbackManagerForToolRun, Callbacks } from "../callbacks/manager.js";
import { BaseLangChain, BaseLangChainParams } from "../base_language/index.js";
import { RunnableConfig } from "../schema/runnable/config.js";
/**
 * Parameters for the Tool classes.
 */
export interface ToolParams extends BaseLangChainParams {
}
/**
 * Custom error class used to handle exceptions related to tool input parsing.
 * It extends the built-in `Error` class and adds an optional `output`
 * property that can hold the output that caused the exception.
 */
export declare class ToolInputParsingException extends Error {
    output?: string;
    constructor(message: string, output?: string);
}
/**
 * Base class for Tools that accept input of any shape defined by a Zod schema.
 */
export declare abstract class StructuredTool<T extends z.ZodObject<any, any, any, any> = z.ZodObject<any, any, any, any>> extends BaseLangChain<(z.output<T> extends string ? string : never) | z.input<T>, string> {
    abstract schema: T | z.ZodEffects<T>;
    get lc_namespace(): string[];
    constructor(fields?: ToolParams);
    protected abstract _call(arg: z.output<T>, runManager?: CallbackManagerForToolRun): Promise<string>;
    /**
     * Invokes the tool with the provided input and configuration.
     * @param input The input for the tool.
     * @param config Optional configuration for the tool.
     * @returns A Promise that resolves with a string.
     */
    invoke(input: (z.output<T> extends string ? string : never) | z.input<T>, config?: RunnableConfig): Promise<string>;
    /**
     * Calls the tool with the provided argument, configuration, and tags. It
     * parses the input according to the schema, handles any errors, and
     * manages callbacks.
     * @param arg The input argument for the tool.
     * @param configArg Optional configuration or callbacks for the tool.
     * @param tags Optional tags for the tool.
     * @returns A Promise that resolves with a string.
     */
    call(arg: (z.output<T> extends string ? string : never) | z.input<T>, configArg?: Callbacks | RunnableConfig, 
    /** @deprecated */
    tags?: string[]): Promise<string>;
    abstract name: string;
    abstract description: string;
    returnDirect: boolean;
}
/**
 * Base class for Tools that accept input as a string.
 */
export declare abstract class Tool extends StructuredTool {
    schema: z.ZodEffects<z.ZodObject<{
        input: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        input?: string | undefined;
    }, {
        input?: string | undefined;
    }>, string | undefined, {
        input?: string | undefined;
    }>;
    constructor(fields?: ToolParams);
    /**
     * Calls the tool with the provided argument and callbacks. It handles
     * string inputs specifically.
     * @param arg The input argument for the tool, which can be a string, undefined, or an input of the tool's schema.
     * @param callbacks Optional callbacks for the tool.
     * @returns A Promise that resolves with a string.
     */
    call(arg: string | undefined | z.input<this["schema"]>, callbacks?: Callbacks): Promise<string>;
}
