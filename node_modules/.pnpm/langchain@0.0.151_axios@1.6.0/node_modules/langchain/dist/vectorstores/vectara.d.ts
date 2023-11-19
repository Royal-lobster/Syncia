import { Document } from "../document.js";
import { Embeddings } from "../embeddings/base.js";
import { VectorStore } from "./base.js";
/**
 * Interface for the arguments required to initialize a VectaraStore
 * instance.
 */
export interface VectaraLibArgs {
    customerId: number;
    corpusId: number | number[];
    apiKey: string;
    verbose?: boolean;
}
/**
 * Interface for the headers required for Vectara API calls.
 */
interface VectaraCallHeader {
    headers: {
        "x-api-key": string;
        "Content-Type": string;
        "customer-id": string;
    };
}
/**
 * Interface for the file objects to be uploaded to Vectara.
 */
export interface VectaraFile {
    blob: Blob;
    fileName: string;
}
/**
 * Interface for the filter options used in Vectara API calls.
 */
export interface VectaraFilter {
    filter?: string;
    lambda?: number;
    contextConfig?: VectaraContextConfig;
}
/**
 * Interface for the context configuration used in Vectara API calls.
 */
export interface VectaraContextConfig {
    sentencesBefore?: number;
    sentencesAfter?: number;
}
/**
 * Class for interacting with the Vectara API. Extends the VectorStore
 * class.
 */
export declare class VectaraStore extends VectorStore {
    get lc_secrets(): {
        [key: string]: string;
    };
    get lc_aliases(): {
        [key: string]: string;
    };
    FilterType: VectaraFilter;
    private apiEndpoint;
    private apiKey;
    private corpusId;
    private customerId;
    private verbose;
    private vectaraApiTimeoutSeconds;
    _vectorstoreType(): string;
    constructor(args: VectaraLibArgs);
    /**
     * Returns a header for Vectara API calls.
     * @returns A Promise that resolves to a VectaraCallHeader object.
     */
    getJsonHeader(): Promise<VectaraCallHeader>;
    /**
     * Throws an error, as this method is not implemented. Use addDocuments
     * instead.
     * @param _vectors Not used.
     * @param _documents Not used.
     * @returns Does not return a value.
     */
    addVectors(_vectors: number[][], _documents: Document[]): Promise<void>;
    /**
     * Adds documents to the Vectara store.
     * @param documents An array of Document objects to add to the Vectara store.
     * @returns A Promise that resolves when the documents have been added.
     */
    addDocuments(documents: Document[]): Promise<void>;
    /**
     * Vectara provides a way to add documents directly via their API. This API handles
     * pre-processing and chunking internally in an optimal manner. This method is a wrapper
     * to utilize that API within LangChain.
     *
     * @param files An array of VectaraFile objects representing the files and their respective file names to be uploaded to Vectara.
     * @param metadata Optional. An array of metadata objects corresponding to each file in the `filePaths` array.
     * @returns A Promise that resolves to the number of successfully uploaded files.
     */
    addFiles(files: VectaraFile[], metadatas?: Record<string, unknown> | undefined): Promise<number>;
    /**
     * Performs a similarity search and returns documents along with their
     * scores.
     * @param query The query string for the similarity search.
     * @param k Optional. The number of results to return. Default is 10.
     * @param filter Optional. A VectaraFilter object to refine the search results.
     * @returns A Promise that resolves to an array of tuples, each containing a Document and its score.
     */
    similaritySearchWithScore(query: string, k?: number, filter?: VectaraFilter | undefined): Promise<[Document, number][]>;
    /**
     * Performs a similarity search and returns documents.
     * @param query The query string for the similarity search.
     * @param k Optional. The number of results to return. Default is 10.
     * @param filter Optional. A VectaraFilter object to refine the search results.
     * @returns A Promise that resolves to an array of Document objects.
     */
    similaritySearch(query: string, k?: number, filter?: VectaraFilter | undefined): Promise<Document[]>;
    /**
     * Throws an error, as this method is not implemented. Use
     * similaritySearch or similaritySearchWithScore instead.
     * @param _query Not used.
     * @param _k Not used.
     * @param _filter Not used.
     * @returns Does not return a value.
     */
    similaritySearchVectorWithScore(_query: number[], _k: number, _filter?: VectaraFilter | undefined): Promise<[Document, number][]>;
    /**
     * Creates a VectaraStore instance from texts.
     * @param texts An array of text strings.
     * @param metadatas Metadata for the texts. Can be a single object or an array of objects.
     * @param _embeddings Not used.
     * @param args A VectaraLibArgs object for initializing the VectaraStore instance.
     * @returns A Promise that resolves to a VectaraStore instance.
     */
    static fromTexts(texts: string[], metadatas: object | object[], _embeddings: Embeddings, args: VectaraLibArgs): Promise<VectaraStore>;
    /**
     * Creates a VectaraStore instance from documents.
     * @param docs An array of Document objects.
     * @param _embeddings Not used.
     * @param args A VectaraLibArgs object for initializing the VectaraStore instance.
     * @returns A Promise that resolves to a VectaraStore instance.
     */
    static fromDocuments(docs: Document[], _embeddings: Embeddings, args: VectaraLibArgs): Promise<VectaraStore>;
}
export {};
