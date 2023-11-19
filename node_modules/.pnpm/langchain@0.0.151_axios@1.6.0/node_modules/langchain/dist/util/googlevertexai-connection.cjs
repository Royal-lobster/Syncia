"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleVertexAILLMConnection = exports.GoogleVertexAIConnection = void 0;
class GoogleVertexAIConnection {
    constructor(fields, caller, client) {
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "endpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "us-central1-aiplatform.googleapis.com"
        });
        Object.defineProperty(this, "location", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "us-central1"
        });
        Object.defineProperty(this, "apiVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "v1"
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.caller = caller;
        this.endpoint = fields?.endpoint ?? this.endpoint;
        this.location = fields?.location ?? this.location;
        this.apiVersion = fields?.apiVersion ?? this.apiVersion;
        this.client = client;
    }
    buildMethod() {
        return "POST";
    }
    async _request(data, options) {
        const url = await this.buildUrl();
        const method = this.buildMethod();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const opts = {
            url,
            method,
        };
        if (data && method === "POST") {
            opts.data = data;
        }
        try {
            const callResponse = await this.caller.callWithOptions({ signal: options?.signal }, async () => this.client.request(opts));
            const response = callResponse; // Done for typecast safety, I guess
            return response;
        }
        catch (x) {
            console.error(JSON.stringify(x, null, 1));
            throw x;
        }
    }
}
exports.GoogleVertexAIConnection = GoogleVertexAIConnection;
class GoogleVertexAILLMConnection extends GoogleVertexAIConnection {
    constructor(fields, caller, client) {
        super(fields, caller, client);
        Object.defineProperty(this, "model", {
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
        this.client = client;
        this.model = fields?.model ?? this.model;
    }
    async buildUrl() {
        const projectId = await this.client.getProjectId();
        const url = `https://${this.endpoint}/v1/projects/${projectId}/locations/${this.location}/publishers/google/models/${this.model}:predict`;
        return url;
    }
    async request(instances, parameters, options) {
        const data = {
            instances,
            parameters,
        };
        const response = await this._request(data, options);
        return response;
    }
}
exports.GoogleVertexAILLMConnection = GoogleVertexAILLMConnection;
