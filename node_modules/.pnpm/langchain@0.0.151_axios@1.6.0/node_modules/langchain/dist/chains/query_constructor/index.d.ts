import { z } from "zod";
import { QueryTransformer, TraverseType } from "./parser.js";
import { Comparator, Operator, StructuredQuery } from "./ir.js";
import { InputValues } from "../../schema/index.js";
import { DEFAULT_EXAMPLES, DEFAULT_PREFIX, DEFAULT_SCHEMA, DEFAULT_SUFFIX, EXAMPLE_PROMPT } from "./prompt.js";
import { LLMChain } from "../llm_chain.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { AsymmetricStructuredOutputParser } from "../../output_parsers/structured.js";
import { AttributeInfo } from "../../schema/query_constructor.js";
export { QueryTransformer, TraverseType };
export { DEFAULT_EXAMPLES, DEFAULT_PREFIX, DEFAULT_SCHEMA, DEFAULT_SUFFIX, EXAMPLE_PROMPT, };
declare const queryInputSchema: z.ZodObject<{
    query: z.ZodString;
    filter: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    query: string;
    filter?: string | undefined;
}, {
    query: string;
    filter?: string | undefined;
}>;
/**
 * A class that extends AsymmetricStructuredOutputParser to parse
 * structured query output.
 */
export declare class StructuredQueryOutputParser extends AsymmetricStructuredOutputParser<typeof queryInputSchema, StructuredQuery> {
    lc_namespace: string[];
    queryTransformer: QueryTransformer;
    constructor(fields: {
        allowedComparators: Comparator[];
        allowedOperators: Operator[];
    });
    /**
     * Processes the output of a structured query.
     * @param query The query string.
     * @param filter The filter condition.
     * @returns A Promise that resolves to a StructuredQuery instance.
     */
    outputProcessor({ query, filter, }: z.infer<typeof queryInputSchema>): Promise<StructuredQuery>;
    /**
     * Creates a new StructuredQueryOutputParser instance from the provided
     * components.
     * @param allowedComparators An array of allowed Comparator instances.
     * @param allowedOperators An array of allowed Operator instances.
     * @returns A new StructuredQueryOutputParser instance.
     */
    static fromComponents(allowedComparators?: Comparator[], allowedOperators?: Operator[]): StructuredQueryOutputParser;
}
export declare function formatAttributeInfo(info: AttributeInfo[]): string;
/**
 * A type that represents options for the query constructor chain.
 */
export type QueryConstructorChainOptions = {
    llm: BaseLanguageModel;
    documentContents: string;
    attributeInfo: AttributeInfo[];
    examples?: InputValues[];
    allowedComparators?: Comparator[];
    allowedOperators?: Operator[];
};
export declare function loadQueryConstructorChain(opts: QueryConstructorChainOptions): LLMChain<string, BaseLanguageModel<any, import("../../base_language/index.js").BaseLanguageModelCallOptions>>;
