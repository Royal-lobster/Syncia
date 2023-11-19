"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectaraStore = void 0;
const document_js_1 = require("../document.cjs");
const fake_js_1 = require("../embeddings/fake.cjs");
const env_js_1 = require("../util/env.cjs");
const base_js_1 = require("./base.cjs");
/**
 * Class for interacting with the Vectara API. Extends the VectorStore
 * class.
 */
class VectaraStore extends base_js_1.VectorStore {
    get lc_secrets() {
        return {
            apiKey: "VECTARA_API_KEY",
            corpusId: "VECTARA_CORPUS_ID",
            customerId: "VECTARA_CUSTOMER_ID",
        };
    }
    get lc_aliases() {
        return {
            apiKey: "vectara_api_key",
            corpusId: "vectara_corpus_id",
            customerId: "vectara_customer_id",
        };
    }
    _vectorstoreType() {
        return "vectara";
    }
    constructor(args) {
        // Vectara doesn't need embeddings, but we need to pass something to the parent constructor
        // The embeddings are abstracted out from the user in Vectara.
        super(new fake_js_1.FakeEmbeddings(), args);
        Object.defineProperty(this, "apiEndpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "api.vectara.io"
        });
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "corpusId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "customerId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "verbose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "vectaraApiTimeoutSeconds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 60
        });
        const apiKey = args.apiKey ?? (0, env_js_1.getEnvironmentVariable)("VECTARA_API_KEY");
        if (!apiKey) {
            throw new Error("Vectara api key is not provided.");
        }
        this.apiKey = apiKey;
        const corpusId = args.corpusId ??
            (0, env_js_1.getEnvironmentVariable)("VECTARA_CORPUS_ID")
                ?.split(",")
                .map((id) => {
                const num = Number(id);
                if (Number.isNaN(num))
                    throw new Error("Vectara corpus id is not a number.");
                return num;
            });
        if (!corpusId) {
            throw new Error("Vectara corpus id is not provided.");
        }
        if (typeof corpusId === "number") {
            this.corpusId = [corpusId];
        }
        else {
            if (corpusId.length === 0)
                throw new Error("Vectara corpus id is not provided.");
            this.corpusId = corpusId;
        }
        const customerId = args.customerId ?? (0, env_js_1.getEnvironmentVariable)("VECTARA_CUSTOMER_ID");
        if (!customerId) {
            throw new Error("Vectara customer id is not provided.");
        }
        this.customerId = customerId;
        this.verbose = args.verbose ?? false;
    }
    /**
     * Returns a header for Vectara API calls.
     * @returns A Promise that resolves to a VectaraCallHeader object.
     */
    async getJsonHeader() {
        return {
            headers: {
                "x-api-key": this.apiKey,
                "Content-Type": "application/json",
                "customer-id": this.customerId.toString(),
            },
        };
    }
    /**
     * Throws an error, as this method is not implemented. Use addDocuments
     * instead.
     * @param _vectors Not used.
     * @param _documents Not used.
     * @returns Does not return a value.
     */
    async addVectors(_vectors, _documents) {
        throw new Error("Method not implemented. Please call addDocuments instead.");
    }
    /**
     * Adds documents to the Vectara store.
     * @param documents An array of Document objects to add to the Vectara store.
     * @returns A Promise that resolves when the documents have been added.
     */
    async addDocuments(documents) {
        if (this.corpusId.length > 1)
            throw new Error("addDocuments does not support multiple corpus ids");
        const headers = await this.getJsonHeader();
        let countAdded = 0;
        for (const [index, document] of documents.entries()) {
            const data = {
                customer_id: this.customerId,
                corpus_id: this.corpusId[0],
                document: {
                    document_id: document.metadata?.document_id ?? `${Date.now()}${index}`,
                    title: document.metadata?.title ?? "",
                    metadata_json: JSON.stringify(document.metadata ?? {}),
                    section: [
                        {
                            text: document.pageContent,
                        },
                    ],
                },
            };
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), this.vectaraApiTimeoutSeconds * 1000);
                const response = await fetch(`https://${this.apiEndpoint}/v1/index`, {
                    method: "POST",
                    headers: headers?.headers,
                    body: JSON.stringify(data),
                    signal: controller.signal,
                });
                clearTimeout(timeout);
                const result = await response.json();
                if (result.status?.code !== "OK" &&
                    result.status?.code !== "ALREADY_EXISTS") {
                    const error = new Error(`Vectara API returned status code ${result.status?.code}: ${JSON.stringify(result.message)}`);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    error.code = 500;
                    throw error;
                }
                else {
                    countAdded += 1;
                }
            }
            catch (e) {
                const error = new Error(`Error ${e.message} while adding document`);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                error.code = 500;
                throw error;
            }
        }
        if (this.verbose) {
            console.log(`Added ${countAdded} documents to Vectara`);
        }
    }
    /**
     * Vectara provides a way to add documents directly via their API. This API handles
     * pre-processing and chunking internally in an optimal manner. This method is a wrapper
     * to utilize that API within LangChain.
     *
     * @param files An array of VectaraFile objects representing the files and their respective file names to be uploaded to Vectara.
     * @param metadata Optional. An array of metadata objects corresponding to each file in the `filePaths` array.
     * @returns A Promise that resolves to the number of successfully uploaded files.
     */
    async addFiles(files, metadatas = undefined) {
        if (this.corpusId.length > 1)
            throw new Error("addFiles does not support multiple corpus ids");
        let numDocs = 0;
        for (const [index, file] of files.entries()) {
            const md = metadatas ? metadatas[index] : {};
            const data = new FormData();
            data.append("file", file.blob, file.fileName);
            data.append("doc-metadata", JSON.stringify(md));
            const response = await fetch(`https://api.vectara.io/v1/upload?c=${this.customerId}&o=${this.corpusId[0]}`, {
                method: "POST",
                headers: {
                    "x-api-key": this.apiKey,
                },
                body: data,
            });
            const { status } = response;
            if (status === 409) {
                throw new Error(`File at index ${index} already exists in Vectara`);
            }
            else if (status !== 200) {
                throw new Error(`Vectara API returned status code ${status}`);
            }
            else {
                numDocs += 1;
            }
        }
        if (this.verbose) {
            console.log(`Uploaded ${files.length} files to Vectara`);
        }
        return numDocs;
    }
    /**
     * Performs a similarity search and returns documents along with their
     * scores.
     * @param query The query string for the similarity search.
     * @param k Optional. The number of results to return. Default is 10.
     * @param filter Optional. A VectaraFilter object to refine the search results.
     * @returns A Promise that resolves to an array of tuples, each containing a Document and its score.
     */
    async similaritySearchWithScore(query, k = 10, filter = undefined) {
        const headers = await this.getJsonHeader();
        const corpusKeys = this.corpusId.map((corpusId) => ({
            customerId: this.customerId,
            corpusId,
            metadataFilter: filter?.filter ?? "",
            lexicalInterpolationConfig: { lambda: filter?.lambda ?? 0.025 },
        }));
        const data = {
            query: [
                {
                    query,
                    numResults: k,
                    contextConfig: {
                        sentencesAfter: filter?.contextConfig?.sentencesAfter ?? 2,
                        sentencesBefore: filter?.contextConfig?.sentencesBefore ?? 2,
                    },
                    corpusKey: corpusKeys,
                },
            ],
        };
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.vectaraApiTimeoutSeconds * 1000);
        const response = await fetch(`https://${this.apiEndpoint}/v1/query`, {
            method: "POST",
            headers: headers?.headers,
            body: JSON.stringify(data),
            signal: controller.signal,
        });
        clearTimeout(timeout);
        if (response.status !== 200) {
            throw new Error(`Vectara API returned status code ${response.status}`);
        }
        const result = await response.json();
        const responses = result.responseSet[0].response;
        const documents = result.responseSet[0].document;
        for (let i = 0; i < responses.length; i += 1) {
            const responseMetadata = responses[i].metadata;
            const documentMetadata = documents[responses[i].documentIndex].metadata;
            const combinedMetadata = {};
            responseMetadata.forEach((item) => {
                combinedMetadata[item.name] = item.value;
            });
            documentMetadata.forEach((item) => {
                combinedMetadata[item.name] = item.value;
            });
            responses[i].metadata = combinedMetadata;
        }
        const documentsAndScores = responses.map((response) => [
            new document_js_1.Document({
                pageContent: response.text,
                metadata: response.metadata,
            }),
            response.score,
        ]);
        return documentsAndScores;
    }
    /**
     * Performs a similarity search and returns documents.
     * @param query The query string for the similarity search.
     * @param k Optional. The number of results to return. Default is 10.
     * @param filter Optional. A VectaraFilter object to refine the search results.
     * @returns A Promise that resolves to an array of Document objects.
     */
    async similaritySearch(query, k = 10, filter = undefined) {
        const resultWithScore = await this.similaritySearchWithScore(query, k, filter);
        return resultWithScore.map((result) => result[0]);
    }
    /**
     * Throws an error, as this method is not implemented. Use
     * similaritySearch or similaritySearchWithScore instead.
     * @param _query Not used.
     * @param _k Not used.
     * @param _filter Not used.
     * @returns Does not return a value.
     */
    async similaritySearchVectorWithScore(_query, _k, _filter) {
        throw new Error("Method not implemented. Please call similaritySearch or similaritySearchWithScore instead.");
    }
    /**
     * Creates a VectaraStore instance from texts.
     * @param texts An array of text strings.
     * @param metadatas Metadata for the texts. Can be a single object or an array of objects.
     * @param _embeddings Not used.
     * @param args A VectaraLibArgs object for initializing the VectaraStore instance.
     * @returns A Promise that resolves to a VectaraStore instance.
     */
    static fromTexts(texts, metadatas, _embeddings, args) {
        const docs = [];
        for (let i = 0; i < texts.length; i += 1) {
            const metadata = Array.isArray(metadatas) ? metadatas[i] : metadatas;
            const newDoc = new document_js_1.Document({
                pageContent: texts[i],
                metadata,
            });
            docs.push(newDoc);
        }
        return VectaraStore.fromDocuments(docs, new fake_js_1.FakeEmbeddings(), args);
    }
    /**
     * Creates a VectaraStore instance from documents.
     * @param docs An array of Document objects.
     * @param _embeddings Not used.
     * @param args A VectaraLibArgs object for initializing the VectaraStore instance.
     * @returns A Promise that resolves to a VectaraStore instance.
     */
    static async fromDocuments(docs, _embeddings, args) {
        const instance = new this(args);
        await instance.addDocuments(docs);
        return instance;
    }
}
exports.VectaraStore = VectaraStore;
