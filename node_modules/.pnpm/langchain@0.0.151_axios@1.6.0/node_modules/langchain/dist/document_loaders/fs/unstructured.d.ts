/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import type { basename as BasenameT } from "node:path";
import type { readFile as ReadFileT } from "node:fs/promises";
import { DirectoryLoader, UnknownHandling } from "./directory.js";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
/**
 * Represents an element returned by the Unstructured API. It has
 * properties for the element type, text content, and metadata.
 */
type Element = {
    type: string;
    text: string;
    metadata: {
        [key: string]: unknown;
    };
};
/**
 * Represents the available strategies for the UnstructuredLoader. It can
 * be one of "hi_res", "fast", "ocr_only", or "auto".
 */
export type UnstructuredLoaderStrategy = "hi_res" | "fast" | "ocr_only" | "auto";
/**
 * Represents a string value with autocomplete suggestions. It is used for
 * the `strategy` property in the UnstructuredLoaderOptions.
 */
type StringWithAutocomplete<T> = T | (string & Record<never, never>);
export type UnstructuredLoaderOptions = {
    apiKey?: string;
    apiUrl?: string;
    strategy?: StringWithAutocomplete<UnstructuredLoaderStrategy>;
    encoding?: string;
    ocrLanguages?: Array<string>;
    coordinates?: boolean;
    pdfInferTableStructure?: boolean;
    xmlKeepTags?: boolean;
};
type UnstructuredDirectoryLoaderOptions = UnstructuredLoaderOptions & {
    recursive?: boolean;
    unknown?: UnknownHandling;
};
/**
 * A document loader that uses the Unstructured API to load unstructured
 * documents. It supports both the new syntax with options object and the
 * legacy syntax for backward compatibility. The load() method sends a
 * partitioning request to the Unstructured API and retrieves the
 * partitioned elements. It creates a Document instance for each element
 * and returns an array of Document instances.
 */
export declare class UnstructuredLoader extends BaseDocumentLoader {
    filePath: string;
    private apiUrl;
    private apiKey?;
    private strategy;
    private encoding?;
    private ocrLanguages;
    private coordinates?;
    private pdfInferTableStructure?;
    private xmlKeepTags?;
    constructor(filePathOrLegacyApiUrl: string, optionsOrLegacyFilePath?: UnstructuredLoaderOptions | string);
    _partition(): Promise<Element[]>;
    load(): Promise<Document[]>;
    imports(): Promise<{
        readFile: typeof ReadFileT;
        basename: typeof BasenameT;
    }>;
}
/**
 * A document loader that loads unstructured documents from a directory
 * using the UnstructuredLoader. It creates a UnstructuredLoader instance
 * for each supported file type and passes it to the DirectoryLoader
 * constructor.
 */
export declare class UnstructuredDirectoryLoader extends DirectoryLoader {
    constructor(directoryPathOrLegacyApiUrl: string, optionsOrLegacyDirectoryPath: UnstructuredDirectoryLoaderOptions | string, legacyOptionRecursive?: boolean, legacyOptionUnknown?: UnknownHandling);
}
export { UnknownHandling };
