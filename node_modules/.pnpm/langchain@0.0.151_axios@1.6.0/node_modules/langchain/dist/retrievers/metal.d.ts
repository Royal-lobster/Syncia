import Metal from "@getmetal/metal-sdk";
import { BaseRetriever, BaseRetrieverInput } from "../schema/retriever.js";
import { Document } from "../document.js";
/**
 * Interface for the fields required during the initialization of a
 * `MetalRetriever` instance. It extends the `BaseRetrieverInput`
 * interface and adds a `client` field of type `Metal`.
 */
export interface MetalRetrieverFields extends BaseRetrieverInput {
    client: Metal;
}
/**
 * Class used to interact with the Metal service, a managed retrieval &
 * memory platform. It allows you to index your data into Metal and run
 * semantic search and retrieval on it. It extends the `BaseRetriever`
 * class and requires a `Metal` instance and a dictionary of parameters to
 * pass to the Metal API during its initialization.
 */
export declare class MetalRetriever extends BaseRetriever {
    static lc_name(): string;
    lc_namespace: string[];
    private client;
    constructor(fields: MetalRetrieverFields);
    _getRelevantDocuments(query: string): Promise<Document[]>;
}
