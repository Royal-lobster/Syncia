import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
/**
 * Interface representing the parameters for configuring the
 * ConfluencePagesLoader.
 */
export interface ConfluencePagesLoaderParams {
    baseUrl: string;
    spaceKey: string;
    username: string;
    accessToken: string;
    limit?: number;
}
/**
 * Interface representing a Confluence page.
 */
export interface ConfluencePage {
    id: string;
    title: string;
    body: {
        storage: {
            value: string;
        };
    };
}
/**
 * Interface representing the response from the Confluence API.
 */
export interface ConfluenceAPIResponse {
    size: number;
    results: ConfluencePage[];
}
/**
 * Class representing a document loader for loading pages from Confluence.
 */
export declare class ConfluencePagesLoader extends BaseDocumentLoader {
    readonly baseUrl: string;
    readonly spaceKey: string;
    readonly username: string;
    readonly accessToken: string;
    readonly limit: number;
    constructor({ baseUrl, spaceKey, username, accessToken, limit, }: ConfluencePagesLoaderParams);
    /**
     * Fetches all the pages in the specified space and converts each page to
     * a Document instance.
     * @returns Promise resolving to an array of Document instances.
     */
    load(): Promise<Document[]>;
    /**
     * Fetches data from the Confluence API using the provided URL.
     * @param url The URL to fetch data from.
     * @returns Promise resolving to the JSON response from the API.
     */
    protected fetchConfluenceData(url: string): Promise<ConfluenceAPIResponse>;
    /**
     * Recursively fetches all the pages in the specified space.
     * @param start The start parameter to paginate through the results.
     * @returns Promise resolving to an array of ConfluencePage objects.
     */
    private fetchAllPagesInSpace;
    /**
     * Creates a Document instance from a ConfluencePage object.
     * @param page The ConfluencePage object to convert.
     * @returns A Document instance.
     */
    private createDocumentFromPage;
}
