import { SignatureV4 } from "@aws-sdk/signature-v4";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { EventStreamCodec } from "@smithy/eventstream-codec";
import { fromUtf8, toUtf8 } from "@smithy/util-utf8";
import { Sha256 } from "@aws-crypto/sha256-js";
import { getEnvironmentVariable } from "../util/env.js";
import { LLM } from "./base.js";
import { GenerationChunk } from "../schema/index.js";
/**
 * A helper class used within the `Bedrock` class. It is responsible for
 * preparing the input and output for the Bedrock service. It formats the
 * input prompt based on the provider (e.g., "anthropic", "ai21",
 * "amazon") and extracts the generated text from the service response.
 */
class BedrockLLMInputOutputAdapter {
    /** Adapter class to prepare the inputs from Langchain to a format
    that LLM model expects. Also, provides a helper function to extract
    the generated text from the model response. */
    static prepareInput(provider, prompt, maxTokens = 50, temperature = 0) {
        const inputBody = {};
        if (provider === "anthropic") {
            inputBody.prompt = prompt;
            inputBody.max_tokens_to_sample = maxTokens;
            inputBody.temperature = temperature;
        }
        else if (provider === "ai21") {
            inputBody.prompt = prompt;
            inputBody.maxTokens = maxTokens;
            inputBody.temperature = temperature;
        }
        else if (provider === "amazon") {
            inputBody.inputText = prompt;
            inputBody.textGenerationConfig = {
                maxTokenCount: maxTokens,
                temperature,
            };
        }
        return inputBody;
    }
    /**
     * Extracts the generated text from the service response.
     * @param provider The provider name.
     * @param responseBody The response body from the service.
     * @returns The generated text.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static prepareOutput(provider, responseBody) {
        if (provider === "anthropic") {
            return responseBody.completion;
        }
        else if (provider === "ai21") {
            return responseBody.data.text;
        }
        return responseBody.outputText;
    }
}
/**
 * A type of Large Language Model (LLM) that interacts with the Bedrock
 * service. It extends the base `LLM` class and implements the
 * `BedrockInput` interface. The class is designed to authenticate and
 * interact with the Bedrock service, which is a part of Amazon Web
 * Services (AWS). It uses AWS credentials for authentication and can be
 * configured with various parameters such as the model to use, the AWS
 * region, and the maximum number of tokens to generate.
 */
export class Bedrock extends LLM {
    get lc_secrets() {
        return {};
    }
    _llmType() {
        return "bedrock";
    }
    constructor(fields) {
        super(fields ?? {});
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "amazon.titan-tg1-large"
        });
        Object.defineProperty(this, "region", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "credentials", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "maxTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "fetchFn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "endpointUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "codec", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new EventStreamCodec(toUtf8, fromUtf8)
        });
        this.model = fields?.model ?? this.model;
        const allowedModels = ["ai21", "anthropic", "amazon"];
        if (!allowedModels.includes(this.model.split(".")[0])) {
            throw new Error(`Unknown model: '${this.model}', only these are supported: ${allowedModels}`);
        }
        const region = fields?.region ?? getEnvironmentVariable("AWS_DEFAULT_REGION");
        if (!region) {
            throw new Error("Please set the AWS_DEFAULT_REGION environment variable or pass it to the constructor as the region field.");
        }
        this.region = region;
        this.credentials = fields?.credentials ?? defaultProvider();
        this.temperature = fields?.temperature ?? this.temperature;
        this.maxTokens = fields?.maxTokens ?? this.maxTokens;
        this.fetchFn = fields?.fetchFn ?? fetch;
        this.endpointUrl = fields?.endpointUrl;
    }
    /** Call out to Bedrock service model.
      Arguments:
        prompt: The prompt to pass into the model.
  
      Returns:
        The string generated by the model.
  
      Example:
        response = model.call("Tell me a joke.")
    */
    async _call(prompt, options, runManager) {
        const chunks = [];
        for await (const chunk of this._streamResponseChunks(prompt, options, runManager)) {
            chunks.push(chunk);
        }
        return chunks.map((chunk) => chunk.text).join("");
    }
    async *_streamResponseChunks(prompt, options, runManager) {
        const provider = this.model.split(".")[0];
        const service = "bedrock";
        const inputBody = BedrockLLMInputOutputAdapter.prepareInput(provider, prompt, this.maxTokens, this.temperature);
        const endpointUrl = this.endpointUrl ?? `${service}.${this.region}.amazonaws.com`;
        const url = new URL(`https://${endpointUrl}/model/${this.model}/invoke-with-response-stream`);
        const request = new HttpRequest({
            hostname: url.hostname,
            path: url.pathname,
            protocol: url.protocol,
            method: "POST",
            body: JSON.stringify(inputBody),
            query: Object.fromEntries(url.searchParams.entries()),
            headers: {
                // host is required by AWS Signature V4: https://docs.aws.amazon.com/general/latest/gr/sigv4-create-canonical-request.html
                host: url.host,
                accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        const signer = new SignatureV4({
            credentials: this.credentials,
            service,
            region: this.region,
            sha256: Sha256,
        });
        const signedRequest = await signer.sign(request);
        // Send request to AWS using the low-level fetch API
        const response = await this.caller.callWithOptions({ signal: options.signal }, async () => this.fetchFn(url, {
            headers: signedRequest.headers,
            body: signedRequest.body,
            method: signedRequest.method,
        }));
        if (response.status < 200 || response.status >= 300) {
            throw Error(`Failed to access underlying url '${url}': got ${response.status} ${response.statusText}: ${await response.text()}`);
        }
        const reader = response.body?.getReader();
        for await (const chunk of this._readChunks(reader)) {
            const event = this.codec.decode(chunk);
            if (event.headers[":event-type"].value !== "chunk" ||
                event.headers[":content-type"].value !== "application/json") {
                throw Error(`Failed to get event chunk: got ${chunk}`);
            }
            const body = JSON.parse(Buffer.from(JSON.parse(new TextDecoder("utf-8").decode(event.body)).bytes, "base64").toString());
            const text = BedrockLLMInputOutputAdapter.prepareOutput(provider, body);
            yield new GenerationChunk({
                text,
                generationInfo: {},
            });
            await runManager?.handleLLMNewToken(text);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _readChunks(reader) {
        return {
            async *[Symbol.asyncIterator]() {
                let readResult = await reader.read();
                while (!readResult.done) {
                    yield readResult.value;
                    readResult = await reader.read();
                }
            },
        };
    }
}
