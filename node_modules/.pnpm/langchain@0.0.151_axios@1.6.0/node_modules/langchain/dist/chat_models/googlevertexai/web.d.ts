import { WebGoogleAuthOptions } from "../../util/googlevertexai-webauth.js";
import { BaseChatGoogleVertexAI, GoogleVertexAIChatInput } from "./common.js";
/**
 * Enables calls to the Google Cloud's Vertex AI API to access
 * Large Language Models in a chat-like fashion.
 *
 * This entrypoint and class are intended to be used in web environments like Edge
 * functions where you do not have access to the file system. It supports passing
 * service account credentials directly as a "GOOGLE_VERTEX_AI_WEB_CREDENTIALS"
 * environment variable or directly as "authOptions.credentials".
 */
export declare class ChatGoogleVertexAI extends BaseChatGoogleVertexAI<WebGoogleAuthOptions> {
    static lc_name(): string;
    get lc_secrets(): {
        [key: string]: string;
    };
    constructor(fields?: GoogleVertexAIChatInput<WebGoogleAuthOptions>);
}
export { ChatExample, GoogleVertexAIChatAuthor, GoogleVertexAIChatInput, GoogleVertexAIChatInstance, GoogleVertexAIChatMessage, GoogleVertexAIChatMessageFields, GoogleVertexAIChatPrediction, } from "./common.js";
