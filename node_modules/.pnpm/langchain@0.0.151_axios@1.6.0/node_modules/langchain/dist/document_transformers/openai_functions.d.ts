import { z } from "zod";
import type { JsonSchema7ObjectType } from "zod-to-json-schema/src/parsers/object.js";
import { Document } from "../document.js";
import { BaseChain } from "../chains/base.js";
import { MappingDocumentTransformer } from "../schema/document.js";
import { TaggingChainOptions } from "../chains/openai_functions/index.js";
import { ChatOpenAI } from "../chat_models/openai.js";
/**
 * A transformer that tags metadata to a document using a tagging chain.
 */
export declare class MetadataTagger extends MappingDocumentTransformer {
    static lc_name(): string;
    protected taggingChain: BaseChain;
    constructor(fields: {
        taggingChain: BaseChain;
    });
    _transformDocument(document: Document): Promise<Document>;
}
export declare function createMetadataTagger(schema: JsonSchema7ObjectType, options: TaggingChainOptions & {
    llm?: ChatOpenAI;
}): MetadataTagger;
export declare function createMetadataTaggerFromZod(schema: z.AnyZodObject, options: TaggingChainOptions & {
    llm?: ChatOpenAI;
}): MetadataTagger;
