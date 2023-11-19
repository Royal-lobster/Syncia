import { Document } from "../../document.js";
import { RemoteRetriever, RemoteRetrieverParams, RemoteRetrieverValues } from "./base.js";
/**
 * Interface for the filter parameters used when querying the
 * ChatGPTRetrievalPlugin server.
 */
export interface ChatGPTPluginRetrieverFilter {
    document_id?: string;
    source?: string;
    source_id?: string;
    author?: string;
    start_date?: string;
    end_date?: string;
}
export interface ChatGPTPluginRetrieverParams extends RemoteRetrieverParams {
    /**
     * The number of results to request from the ChatGPTRetrievalPlugin server
     */
    topK?: number;
    /**
     * The filter to use when querying the ChatGPTRetrievalPlugin server
     */
    filter?: ChatGPTPluginRetrieverFilter;
}
/**
 * Class that connects ChatGPT to third-party applications via plugins. It
 * extends the RemoteRetriever class and implements the
 * ChatGPTPluginRetrieverParams interface.
 */
export declare class ChatGPTPluginRetriever extends RemoteRetriever implements ChatGPTPluginRetrieverParams {
    lc_namespace: string[];
    topK: number;
    filter?: ChatGPTPluginRetrieverFilter;
    constructor({ topK, filter, ...rest }: ChatGPTPluginRetrieverParams);
    /**
     * Creates a JSON body for the request to the ChatGPTRetrievalPlugin
     * server.
     * @param query The query to send to the server.
     * @returns A JSON object representing the body of the request.
     */
    createJsonBody(query: string): RemoteRetrieverValues;
    /**
     * Processes the JSON response from the ChatGPTRetrievalPlugin server and
     * returns an array of Document instances.
     * @param json The JSON response from the server.
     * @returns An array of Document instances.
     */
    processJsonResponse(json: RemoteRetrieverValues): Document[];
}
