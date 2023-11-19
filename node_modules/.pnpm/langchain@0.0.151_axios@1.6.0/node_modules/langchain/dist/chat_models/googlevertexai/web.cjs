"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleVertexAIChatMessage = exports.ChatGoogleVertexAI = void 0;
const googlevertexai_connection_js_1 = require("../../util/googlevertexai-connection.cjs");
const googlevertexai_webauth_js_1 = require("../../util/googlevertexai-webauth.cjs");
const common_js_1 = require("./common.cjs");
/**
 * Enables calls to the Google Cloud's Vertex AI API to access
 * Large Language Models in a chat-like fashion.
 *
 * This entrypoint and class are intended to be used in web environments like Edge
 * functions where you do not have access to the file system. It supports passing
 * service account credentials directly as a "GOOGLE_VERTEX_AI_WEB_CREDENTIALS"
 * environment variable or directly as "authOptions.credentials".
 */
class ChatGoogleVertexAI extends common_js_1.BaseChatGoogleVertexAI {
    static lc_name() {
        return "ChatVertexAI";
    }
    get lc_secrets() {
        return {
            "authOptions.credentials": "GOOGLE_VERTEX_AI_WEB_CREDENTIALS",
        };
    }
    constructor(fields) {
        super(fields);
        const client = new googlevertexai_webauth_js_1.WebGoogleAuth(fields?.authOptions);
        this.connection = new googlevertexai_connection_js_1.GoogleVertexAILLMConnection({ ...fields, ...this }, this.caller, client);
    }
}
exports.ChatGoogleVertexAI = ChatGoogleVertexAI;
var common_js_2 = require("./common.cjs");
Object.defineProperty(exports, "GoogleVertexAIChatMessage", { enumerable: true, get: function () { return common_js_2.GoogleVertexAIChatMessage; } });
