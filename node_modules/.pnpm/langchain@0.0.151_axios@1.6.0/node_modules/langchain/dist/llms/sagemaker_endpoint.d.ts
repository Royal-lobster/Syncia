import { SageMakerRuntimeClient, SageMakerRuntimeClientConfig } from "@aws-sdk/client-sagemaker-runtime";
import { LLM, BaseLLMParams } from "./base.js";
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
export declare abstract class BaseSageMakerContentHandler<InputType, OutputType> {
    /** The MIME type of the input data passed to endpoint */
    contentType: string;
    /** The MIME type of the response data returned from endpoint */
    accepts: string;
    /**
     * Transforms the input to a format that model can accept as the request Body.
     * Should return bytes or seekable file like object in the format specified in
     * the contentType request header.
     */
    abstract transformInput(prompt: InputType, modelKwargs: Record<string, unknown>): Promise<Uint8Array>;
    /**
     * Transforms the output from the model to string that the LLM class expects.
     */
    abstract transformOutput(output: Uint8Array): Promise<OutputType>;
}
/** Content handler for LLM class. */
export type SageMakerLLMContentHandler = BaseSageMakerContentHandler<string, string>;
/**
 * The SageMakerEndpointInput interface defines the input parameters for
 * the SageMakerEndpoint class, which includes the endpoint name, client
 * options for the SageMaker client, the content handler, and optional
 * keyword arguments for the model and the endpoint.
 */
export interface SageMakerEndpointInput extends BaseLLMParams {
    /**
     * The name of the endpoint from the deployed SageMaker model. Must be unique
     * within an AWS Region.
     */
    endpointName: string;
    /**
     * Options passed to the SageMaker client.
     */
    clientOptions: SageMakerRuntimeClientConfig;
    /**
     * The content handler class that provides an input and output transform
     * functions to handle formats between LLM and the endpoint.
     */
    contentHandler: SageMakerLLMContentHandler;
    /**
     * Key word arguments to pass to the model.
     */
    modelKwargs?: Record<string, unknown>;
    /**
     * Optional attributes passed to the InvokeEndpointCommand
     */
    endpointKwargs?: Record<string, unknown>;
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
export declare class SageMakerEndpoint extends LLM {
    get lc_secrets(): {
        [key: string]: string;
    } | undefined;
    endpointName: string;
    contentHandler: SageMakerLLMContentHandler;
    modelKwargs?: Record<string, unknown>;
    endpointKwargs?: Record<string, unknown>;
    client: SageMakerRuntimeClient;
    constructor(fields: SageMakerEndpointInput);
    _llmType(): string;
    /** @ignore */
    _call(prompt: string, options: this["ParsedCallOptions"]): Promise<string>;
}
