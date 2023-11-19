import type { launch, WaitForOptions, Page, Browser, PuppeteerLaunchOptions } from "puppeteer";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
import type { DocumentLoader } from "../base.js";
export { Page, Browser };
export type PuppeteerGotoOptions = WaitForOptions & {
    referer?: string;
    referrerPolicy?: string;
};
/**
 * Type representing a function for evaluating JavaScript code on a web
 * page using Puppeteer. It takes a Page and Browser object as parameters
 * and returns a Promise that resolves to a string.
 */
export type PuppeteerEvaluate = (page: Page, browser: Browser) => Promise<string>;
export type PuppeteerWebBaseLoaderOptions = {
    launchOptions?: PuppeteerLaunchOptions;
    gotoOptions?: PuppeteerGotoOptions;
    evaluate?: PuppeteerEvaluate;
};
/**
 * Class that extends the BaseDocumentLoader class and implements the
 * DocumentLoader interface. It represents a document loader for scraping
 * web pages using Puppeteer.
 */
export declare class PuppeteerWebBaseLoader extends BaseDocumentLoader implements DocumentLoader {
    webPath: string;
    options: PuppeteerWebBaseLoaderOptions | undefined;
    constructor(webPath: string, options?: PuppeteerWebBaseLoaderOptions);
    static _scrape(url: string, options?: PuppeteerWebBaseLoaderOptions): Promise<string>;
    /**
     * Method that calls the _scrape method to perform the scraping of the web
     * page specified by the webPath property.
     * @returns Promise that resolves to the scraped HTML content of the web page.
     */
    scrape(): Promise<string>;
    /**
     * Method that calls the scrape method and returns the scraped HTML
     * content as a Document object.
     * @returns Promise that resolves to an array of Document objects.
     */
    load(): Promise<Document[]>;
    /**
     * Static method that imports the necessary Puppeteer modules. It returns
     * a Promise that resolves to an object containing the imported modules.
     * @returns Promise that resolves to an object containing the imported Puppeteer modules.
     */
    static imports(): Promise<{
        launch: typeof launch;
    }>;
}
