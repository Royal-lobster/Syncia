"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIEmbeddings = void 0;
const openai_1 = require("openai");
const env_js_1 = require("../util/env.cjs");
const chunk_js_1 = require("../util/chunk.cjs");
const base_js_1 = require("./base.cjs");
const azure_js_1 = require("../util/azure.cjs");
const openai_js_1 = require("../util/openai.cjs");
/**
 * Class for generating embeddings using the OpenAI API. Extends the
 * Embeddings class and implements OpenAIEmbeddingsParams and
 * AzureOpenAIInput.
 */
class OpenAIEmbeddings extends base_js_1.Embeddings {
    constructor(fields, configuration) {
        const fieldsWithDefaults = { maxConcurrency: 2, ...fields };
        super(fieldsWithDefaults);
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "text-embedding-ada-002"
        });
        Object.defineProperty(this, "batchSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 512
        });
        Object.defineProperty(this, "stripNewLines", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiInstanceName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiDeploymentName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIBasePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clientConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        let apiKey = fieldsWithDefaults?.openAIApiKey ??
            (0, env_js_1.getEnvironmentVariable)("OPENAI_API_KEY");
        const azureApiKey = fieldsWithDefaults?.azureOpenAIApiKey ??
            (0, env_js_1.getEnvironmentVariable)("AZURE_OPENAI_API_KEY");
        if (!azureApiKey && !apiKey) {
            throw new Error("OpenAI or Azure OpenAI API key not found");
        }
        const azureApiInstanceName = fieldsWithDefaults?.azureOpenAIApiInstanceName ??
            (0, env_js_1.getEnvironmentVariable)("AZURE_OPENAI_API_INSTANCE_NAME");
        const azureApiDeploymentName = (fieldsWithDefaults?.azureOpenAIApiEmbeddingsDeploymentName ||
            fieldsWithDefaults?.azureOpenAIApiDeploymentName) ??
            ((0, env_js_1.getEnvironmentVariable)("AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME") ||
                (0, env_js_1.getEnvironmentVariable)("AZURE_OPENAI_API_DEPLOYMENT_NAME"));
        const azureApiVersion = fieldsWithDefaults?.azureOpenAIApiVersion ??
            (0, env_js_1.getEnvironmentVariable)("AZURE_OPENAI_API_VERSION");
        this.azureOpenAIBasePath =
            fieldsWithDefaults?.azureOpenAIBasePath ??
                (0, env_js_1.getEnvironmentVariable)("AZURE_OPENAI_BASE_PATH");
        this.modelName = fieldsWithDefaults?.modelName ?? this.modelName;
        this.batchSize =
            fieldsWithDefaults?.batchSize ?? (azureApiKey ? 1 : this.batchSize);
        this.stripNewLines =
            fieldsWithDefaults?.stripNewLines ?? this.stripNewLines;
        this.timeout = fieldsWithDefaults?.timeout;
        this.azureOpenAIApiVersion = azureApiVersion;
        this.azureOpenAIApiKey = azureApiKey;
        this.azureOpenAIApiInstanceName = azureApiInstanceName;
        this.azureOpenAIApiDeploymentName = azureApiDeploymentName;
        if (this.azureOpenAIApiKey) {
            if (!this.azureOpenAIApiInstanceName && !this.azureOpenAIBasePath) {
                throw new Error("Azure OpenAI API instance name not found");
            }
            if (!this.azureOpenAIApiDeploymentName) {
                throw new Error("Azure OpenAI API deployment name not found");
            }
            if (!this.azureOpenAIApiVersion) {
                throw new Error("Azure OpenAI API version not found");
            }
            apiKey = apiKey ?? "";
        }
        this.clientConfig = {
            apiKey,
            baseURL: configuration?.basePath,
            dangerouslyAllowBrowser: true,
            defaultHeaders: configuration?.baseOptions?.headers,
            defaultQuery: configuration?.baseOptions?.params,
            ...configuration,
        };
    }
    /**
     * Method to generate embeddings for an array of documents. Splits the
     * documents into batches and makes requests to the OpenAI API to generate
     * embeddings.
     * @param texts Array of documents to generate embeddings for.
     * @returns Promise that resolves to a 2D array of embeddings for each document.
     */
    async embedDocuments(texts) {
        const batches = (0, chunk_js_1.chunkArray)(this.stripNewLines ? texts.map((t) => t.replace(/\n/g, " ")) : texts, this.batchSize);
        const batchRequests = batches.map((batch) => this.embeddingWithRetry({
            model: this.modelName,
            input: batch,
        }));
        const batchResponses = await Promise.all(batchRequests);
        const embeddings = [];
        for (let i = 0; i < batchResponses.length; i += 1) {
            const batch = batches[i];
            const { data: batchResponse } = batchResponses[i];
            for (let j = 0; j < batch.length; j += 1) {
                embeddings.push(batchResponse[j].embedding);
            }
        }
        return embeddings;
    }
    /**
     * Method to generate an embedding for a single document. Calls the
     * embeddingWithRetry method with the document as the input.
     * @param text Document to generate an embedding for.
     * @returns Promise that resolves to an embedding for the document.
     */
    async embedQuery(text) {
        const { data } = await this.embeddingWithRetry({
            model: this.modelName,
            input: this.stripNewLines ? text.replace(/\n/g, " ") : text,
        });
        return data[0].embedding;
    }
    /**
     * Private method to make a request to the OpenAI API to generate
     * embeddings. Handles the retry logic and returns the response from the
     * API.
     * @param request Request to send to the OpenAI API.
     * @returns Promise that resolves to the response from the API.
     */
    async embeddingWithRetry(request) {
        if (!this.client) {
            const openAIEndpointConfig = {
                azureOpenAIApiDeploymentName: this.azureOpenAIApiDeploymentName,
                azureOpenAIApiInstanceName: this.azureOpenAIApiInstanceName,
                azureOpenAIApiKey: this.azureOpenAIApiKey,
                azureOpenAIBasePath: this.azureOpenAIBasePath,
                baseURL: this.clientConfig.baseURL,
            };
            const endpoint = (0, azure_js_1.getEndpoint)(openAIEndpointConfig);
            const params = {
                ...this.clientConfig,
                baseURL: endpoint,
                timeout: this.timeout,
                maxRetries: 0,
            };
            if (!params.baseURL) {
                delete params.baseURL;
            }
            this.client = new openai_1.OpenAI(params);
        }
        const requestOptions = {};
        if (this.azureOpenAIApiKey) {
            requestOptions.headers = {
                "api-key": this.azureOpenAIApiKey,
                ...requestOptions.headers,
            };
            requestOptions.query = {
                "api-version": this.azureOpenAIApiVersion,
                ...requestOptions.query,
            };
        }
        return this.caller.call(async () => {
            try {
                const res = await this.client.embeddings.create(request, requestOptions);
                return res;
            }
            catch (e) {
                const error = (0, openai_js_1.wrapOpenAIClientError)(e);
                throw error;
            }
        });
    }
}
exports.OpenAIEmbeddings = OpenAIEmbeddings;
