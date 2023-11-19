import { AxiosRequestConfig } from "axios";
import { BaseLanguageModel } from "../base_language/index.js";
import { TextSplitter } from "../text_splitter.js";
import { Tool, ToolParams } from "./base.js";
import { CallbackManager, CallbackManagerForToolRun } from "../callbacks/manager.js";
import { Embeddings } from "../embeddings/base.js";
export declare const parseInputs: (inputs: string) => [string, string];
export declare const getText: (html: string, baseUrl: string, summary: boolean) => string;
type Headers = Record<string, any>;
/**
 * Defines the arguments that can be passed to the WebBrowser constructor.
 * It extends the ToolParams interface and includes properties for a
 * language model, embeddings, HTTP headers, an Axios configuration, a
 * callback manager, and a text splitter.
 */
export interface WebBrowserArgs extends ToolParams {
    model: BaseLanguageModel;
    embeddings: Embeddings;
    headers?: Headers;
    axiosConfig?: Omit<AxiosRequestConfig, "url">;
    /** @deprecated */
    callbackManager?: CallbackManager;
    textSplitter?: TextSplitter;
}
/**
 * A class designed to interact with web pages, either to extract
 * information from them or to summarize their content. It uses the axios
 * library to send HTTP requests and the cheerio library to parse the
 * returned HTML.
 */
export declare class WebBrowser extends Tool {
    static lc_name(): string;
    get lc_namespace(): string[];
    private model;
    private embeddings;
    private headers;
    private axiosConfig;
    private textSplitter;
    constructor({ model, headers, embeddings, axiosConfig, textSplitter, }: WebBrowserArgs);
    /** @ignore */
    _call(inputs: string, runManager?: CallbackManagerForToolRun): Promise<string>;
    name: string;
    description: string;
}
export {};
