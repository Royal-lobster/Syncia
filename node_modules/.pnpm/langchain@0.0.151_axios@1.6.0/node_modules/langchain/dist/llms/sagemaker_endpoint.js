import { SageMakerRuntimeClient, InvokeEndpointCommand, } from "@aws-sdk/client-sagemaker-runtime";
import { LLM } from "./base.js";
/**
 * A handler class to transform input from LLM to a format that SageMaker
 * endpoint expects. Similarily, the class also handles transforming output from
 * the SageMaker endpoint to a format that LLM class expects.
 *
 * Example:
 * ```
 * class ContentHandler implements ContentHandlerBase<string, string> {
 *   contentType = "application/json"
 *   accepts = "application/json"
 *
 *   transformInput(prompt: string, modelKwargs: Record<string, unknown>) {
 *     const inputString = JSON.stringify({
 *       prompt,
 *      ...modelKwargs
 *     })
 *     return Buffer.from(inputString)
 *   }
 *
 *   transformOutput(output: Uint8Array) {
 *     const responseJson = JSON.parse(Buffer.from(output).toString("utf-8"))
 *     return responseJson[0].generated_text
 *   }
 *
 * }
 * ```
 */
export class BaseSageMakerContentHandler {
    constructor() {
        /** The MIME type of the input data passed to endpoint */
        Object.defineProperty(this, "contentType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "text/plain"
        });
        /** The MIME type of the response data returned from endpoint */
        Object.defineProperty(this, "accepts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "text/plain"
        });
    }
}
/**
 * The SageMakerEndpoint class is used to interact with SageMaker
 * Inference Endpoint models. It extends the LLM class and overrides the
 * _call method to transform the input and output between the LLM and the
 * SageMaker endpoint using the provided content handler. The class uses
 * AWS client for authentication, which automatically loads credentials.
 * If a specific credential profile is to be used, the name of the profile
 * from the ~/.aws/credentials file must be passed. The credentials or
 * roles used should have the required policies to access the SageMaker
 * endpoint.
 */
export class SageMakerEndpoint extends LLM {
    get lc_secrets() {
        return {
            "clientOptions.credentials.accessKeyId": "AWS_ACCESS_KEY_ID",
            "clientOptions.credentials.secretAccessKey": "AWS_SECRET_ACCESS_KEY",
            "clientOptions.credentials.sessionToken": "AWS_SESSION_TOKEN",
        };
    }
    constructor(fields) {
        super(fields ?? {});
        Object.defineProperty(this, "endpointName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "contentHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelKwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "endpointKwargs", {
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
        const regionName = fields.clientOptions.region;
        if (!regionName) {
            throw new Error(`Please pass a "clientOptions" object with a "region" field to the constructor`);
        }
        const endpointName = fields?.endpointName;
        if (!endpointName) {
            throw new Error(`Please pass an "endpointName" field to the constructor`);
        }
        const contentHandler = fields?.contentHandler;
        if (!contentHandler) {
            throw new Error(`Please pass a "contentHandler" field to the constructor`);
        }
        this.endpointName = fields.endpointName;
        this.contentHandler = fields.contentHandler;
        this.endpointKwargs = fields.endpointKwargs;
        this.modelKwargs = fields.modelKwargs;
        this.client = new SageMakerRuntimeClient(fields.clientOptions);
    }
    _llmType() {
        return "sagemaker_endpoint";
    }
    /** @ignore */
    async _call(prompt, options) {
        const body = await this.contentHandler.transformInput(prompt, this.modelKwargs ?? {});
        const { contentType, accepts } = this.contentHandler;
        const response = await this.caller.call(() => this.client.send(new InvokeEndpointCommand({
            EndpointName: this.endpointName,
            Body: body,
            ContentType: contentType,
            Accept: accepts,
            ...this.endpointKwargs,
        }), { abortSignal: options.signal }));
        if (response.Body === undefined) {
            throw new Error("Inference result missing Body");
        }
        return this.contentHandler.transformOutput(response.Body);
    }
}
