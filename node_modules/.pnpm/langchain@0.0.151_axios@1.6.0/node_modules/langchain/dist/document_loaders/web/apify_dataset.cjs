"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApifyDatasetLoader = void 0;
const apify_client_1 = require("apify-client");
const base_js_1 = require("../base.cjs");
const env_js_1 = require("../../util/env.cjs");
/**
 * A class that extends the BaseDocumentLoader and implements the
 * DocumentLoader interface. It represents a document loader that loads
 * documents from an Apify dataset.
 */
class ApifyDatasetLoader extends base_js_1.BaseDocumentLoader {
    constructor(datasetId, config) {
        super();
        Object.defineProperty(this, "apifyClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "datasetId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "datasetMappingFunction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const apifyApiToken = ApifyDatasetLoader._getApifyApiToken(config.clientOptions);
        this.apifyClient = new apify_client_1.ApifyClient({
            ...config.clientOptions,
            token: apifyApiToken,
        });
        this.datasetId = datasetId;
        this.datasetMappingFunction = config.datasetMappingFunction;
    }
    static _getApifyApiToken(config) {
        return config?.token ?? (0, env_js_1.getEnvironmentVariable)("APIFY_API_TOKEN");
    }
    /**
     * Retrieves the dataset items from the Apify platform and applies the
     * datasetMappingFunction to each item to create an array of Document
     * instances.
     * @returns An array of Document instances.
     */
    async load() {
        const datasetItems = (await this.apifyClient.dataset(this.datasetId).listItems({ clean: true })).items;
        return datasetItems.map(this.datasetMappingFunction);
    }
    /**
     * Create an ApifyDatasetLoader by calling an Actor on the Apify platform and waiting for its results to be ready.
     * @param actorId The ID or name of the Actor on the Apify platform.
     * @param input The input object of the Actor that you're trying to run.
     * @param options Options specifying settings for the Actor run.
     * @param options.datasetMappingFunction A function that takes a single object (an Apify dataset item) and converts it to an instance of the Document class.
     * @returns An instance of `ApifyDatasetLoader` with the results from the Actor run.
     */
    static async fromActorCall(actorId, input, config) {
        const apifyApiToken = ApifyDatasetLoader._getApifyApiToken(config.clientOptions);
        const apifyClient = new apify_client_1.ApifyClient({ token: apifyApiToken });
        const actorCall = await apifyClient
            .actor(actorId)
            .call(input, config.callOptions ?? {});
        return new ApifyDatasetLoader(actorCall.defaultDatasetId, {
            datasetMappingFunction: config.datasetMappingFunction,
            clientOptions: { ...config.clientOptions, token: apifyApiToken },
        });
    }
    /**
     * Create an ApifyDatasetLoader by calling a saved Actor task on the Apify platform and waiting for its results to be ready.
     * @param taskId The ID or name of the task on the Apify platform.
     * @param input The input object of the task that you're trying to run. Overrides the task's saved input.
     * @param options Options specifying settings for the task run.
     * @param options.datasetMappingFunction A function that takes a single object (an Apify dataset item) and converts it to an instance of the Document class.
     * @returns An instance of `ApifyDatasetLoader` with the results from the task's run.
     */
    static async fromActorTaskCall(taskId, input, config) {
        const apifyApiToken = ApifyDatasetLoader._getApifyApiToken(config.clientOptions);
        const apifyClient = new apify_client_1.ApifyClient({ token: apifyApiToken });
        const taskCall = await apifyClient
            .task(taskId)
            .call(input, config.callOptions ?? {});
        return new ApifyDatasetLoader(taskCall.defaultDatasetId, {
            datasetMappingFunction: config.datasetMappingFunction,
            clientOptions: { ...config.clientOptions, token: apifyApiToken },
        });
    }
}
exports.ApifyDatasetLoader = ApifyDatasetLoader;
