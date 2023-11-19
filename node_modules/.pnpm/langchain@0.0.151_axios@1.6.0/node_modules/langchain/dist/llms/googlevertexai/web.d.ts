import { WebGoogleAuthOptions } from "../../util/googlevertexai-webauth.js";
import { GoogleVertexAIBaseLLMInput } from "../../types/googlevertexai-types.js";
import { BaseGoogleVertexAI } from "./common.js";
/**
 * Interface representing the input to the Google Vertex AI model.
 */
export interface GoogleVertexAITextInput extends GoogleVertexAIBaseLLMInput<WebGoogleAuthOptions> {
}
/**
 * Enables calls to the Google Cloud's Vertex AI API to access
 * Large Language Models.
 *
 * This entrypoint and class are intended to be used in web environments like Edge
 * functions where you do not have access to the file system. It supports passing
 * service account credentials directly as a "GOOGLE_VERTEX_AI_WEB_CREDENTIALS"
 * environment variable or directly as "authOptions.credentials".
 */
export declare class GoogleVertexAI extends BaseGoogleVertexAI<WebGoogleAuthOptions> {
    static lc_name(): string;
    get lc_secrets(): {
        [key: string]: string;
    };
    constructor(fields?: GoogleVertexAITextInput);
}
