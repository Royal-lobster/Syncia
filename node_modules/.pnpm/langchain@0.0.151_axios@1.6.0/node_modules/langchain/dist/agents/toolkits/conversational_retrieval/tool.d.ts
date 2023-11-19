import { z } from "zod";
import { BaseRetriever } from "../../../schema/retriever.js";
import { DynamicStructuredTool, DynamicStructuredToolInput } from "../../../tools/dynamic.js";
export declare function createRetrieverTool(retriever: BaseRetriever, input: Omit<DynamicStructuredToolInput, "func" | "schema">): DynamicStructuredTool<z.ZodObject<{
    input: z.ZodString;
}, "strip", z.ZodTypeAny, {
    input: string;
}, {
    input: string;
}>>;
