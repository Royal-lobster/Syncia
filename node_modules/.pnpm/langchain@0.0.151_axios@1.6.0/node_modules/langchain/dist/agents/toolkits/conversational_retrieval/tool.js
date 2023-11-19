import { z } from "zod";
import { DynamicStructuredTool, } from "../../../tools/dynamic.js";
export function createRetrieverTool(retriever, input) {
    const func = async ({ input }, runManager) => {
        const docs = await retriever.getRelevantDocuments(input, runManager?.getChild("retriever"));
        return docs.map((doc) => doc.pageContent).join("\n");
    };
    const schema = z.object({
        input: z
            .string()
            .describe("Natural language query used as input to the retriever"),
    });
    return new DynamicStructuredTool({ ...input, func, schema });
}
