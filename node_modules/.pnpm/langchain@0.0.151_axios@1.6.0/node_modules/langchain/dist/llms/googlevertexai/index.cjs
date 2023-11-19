"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleVertexAI = void 0;
const google_auth_library_1 = require("google-auth-library");
const googlevertexai_connection_js_1 = require("../../util/googlevertexai-connection.cjs");
const common_js_1 = require("./common.cjs");
/**
 * Enables calls to the Google Cloud's Vertex AI API to access
 * Large Language Models.
 *
 * To use, you will need to have one of the following authentication
 * methods in place:
 * - You are logged into an account permitted to the Google Cloud project
 *   using Vertex AI.
 * - You are running this on a machine using a service account permitted to
 *   the Google Cloud project using Vertex AI.
 * - The `GOOGLE_APPLICATION_CREDENTIALS` environment variable is set to the
 *   path of a credentials file for a service account permitted to the
 *   Google Cloud project using Vertex AI.
 */
class GoogleVertexAI extends common_js_1.BaseGoogleVertexAI {
    static lc_name() {
        return "VertexAI";
    }
    constructor(fields) {
        super(fields);
        const client = new google_auth_library_1.GoogleAuth({
            scopes: "https://www.googleapis.com/auth/cloud-platform",
            ...fields?.authOptions,
        });
        this.connection = new googlevertexai_connection_js_1.GoogleVertexAILLMConnection({ ...fields, ...this }, this.caller, client);
    }
}
exports.GoogleVertexAI = GoogleVertexAI;
