"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebGoogleAuth = void 0;
const google_1 = require("web-auth-library/google");
const env_js_1 = require("./env.cjs");
class WebGoogleAuth {
    constructor(options) {
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const credentials = options?.credentials ??
            (0, env_js_1.getEnvironmentVariable)("GOOGLE_VERTEX_AI_WEB_CREDENTIALS");
        if (credentials === undefined)
            throw new Error(`Credentials not found. Please set the GOOGLE_VERTEX_AI_WEB_CREDENTIALS or pass credentials into "authOptions.credentials".`);
        const scope = options?.scope ?? "https://www.googleapis.com/auth/cloud-platform";
        this.options = { ...options, credentials, scope };
    }
    async getProjectId() {
        const credentials = (0, google_1.getCredentials)(this.options.credentials);
        return credentials.project_id;
    }
    async request(opts) {
        const accessToken = await (0, google_1.getAccessToken)(this.options);
        if (opts.url == null)
            throw new Error("Missing URL");
        const fetchOptions = {
            method: opts.method,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        };
        if (opts.data !== undefined) {
            fetchOptions.body = JSON.stringify(opts.data);
        }
        const res = await fetch(opts.url, fetchOptions);
        if (!res.ok) {
            const error = new Error(`Could not get access token for Vertex AI with status code: ${res.status}`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            error.response = res;
            throw error;
        }
        return {
            data: await res.json(),
            config: {},
            status: res.status,
            statusText: res.statusText,
            headers: res.headers,
            request: { responseURL: res.url },
        };
    }
}
exports.WebGoogleAuth = WebGoogleAuth;
