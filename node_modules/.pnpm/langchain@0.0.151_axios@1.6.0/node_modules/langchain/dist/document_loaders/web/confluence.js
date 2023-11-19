import { htmlToText } from "html-to-text";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
/**
 * Class representing a document loader for loading pages from Confluence.
 */
export class ConfluencePagesLoader extends BaseDocumentLoader {
    constructor({ baseUrl, spaceKey, username, accessToken, limit = 25, }) {
        super();
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "spaceKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "username", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "accessToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "limit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.baseUrl = baseUrl;
        this.spaceKey = spaceKey;
        this.username = username;
        this.accessToken = accessToken;
        this.limit = limit;
    }
    /**
     * Fetches all the pages in the specified space and converts each page to
     * a Document instance.
     * @returns Promise resolving to an array of Document instances.
     */
    async load() {
        try {
            const pages = await this.fetchAllPagesInSpace();
            return pages.map((page) => this.createDocumentFromPage(page));
        }
        catch (error) {
            console.error("Error:", error);
            return [];
        }
    }
    /**
     * Fetches data from the Confluence API using the provided URL.
     * @param url The URL to fetch data from.
     * @returns Promise resolving to the JSON response from the API.
     */
    async fetchConfluenceData(url) {
        try {
            const authToken = Buffer.from(`${this.username}:${this.accessToken}`).toString("base64");
            const response = await fetch(url, {
                headers: {
                    Authorization: `Basic ${authToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url} from Confluence: ${response.status}`);
            }
            return await response.json();
        }
        catch (error) {
            throw new Error(`Failed to fetch ${url} from Confluence: ${error}`);
        }
    }
    /**
     * Recursively fetches all the pages in the specified space.
     * @param start The start parameter to paginate through the results.
     * @returns Promise resolving to an array of ConfluencePage objects.
     */
    async fetchAllPagesInSpace(start = 0) {
        const url = `${this.baseUrl}/rest/api/content?spaceKey=${this.spaceKey}&limit=${this.limit}&start=${start}&expand=body.storage`;
        const data = await this.fetchConfluenceData(url);
        if (data.size === 0) {
            return [];
        }
        const nextPageStart = start + data.size;
        const nextPageResults = await this.fetchAllPagesInSpace(nextPageStart);
        return data.results.concat(nextPageResults);
    }
    /**
     * Creates a Document instance from a ConfluencePage object.
     * @param page The ConfluencePage object to convert.
     * @returns A Document instance.
     */
    createDocumentFromPage(page) {
        // Convert the HTML content to plain text
        const plainTextContent = htmlToText(page.body.storage.value, {
            wordwrap: false,
            preserveNewlines: false,
        });
        // Remove empty lines
        const textWithoutEmptyLines = plainTextContent.replace(/^\s*[\r\n]/gm, "");
        // Generate the URL
        const pageUrl = `${this.baseUrl}/spaces/${this.spaceKey}/pages/${page.id}`;
        // Return a langchain document
        return new Document({
            pageContent: textWithoutEmptyLines,
            metadata: {
                title: page.title,
                url: pageUrl,
            },
        });
    }
}
