import { BaseLanguageModelCallOptions } from "../base_language/index.js";
import { AsyncCaller, AsyncCallerCallOptions } from "./async_caller.js";
import type { GoogleVertexAIBaseLLMInput, GoogleVertexAIBasePrediction, GoogleVertexAIConnectionParams, GoogleVertexAILLMResponse, GoogleVertexAIModelParams, GoogleVertexAIResponse, GoogleVertexAIAbstractedClient } from "../types/googlevertexai-types.js";
export declare abstract class GoogleVertexAIConnection<CallOptions extends AsyncCallerCallOptions, ResponseType extends GoogleVertexAIResponse, AuthOptions> implements GoogleVertexAIConnectionParams<AuthOptions> {
    caller: AsyncCaller;
    endpoint: string;
    location: string;
    apiVersion: string;
    client: GoogleVertexAIAbstractedClient;
    constructor(fields: GoogleVertexAIConnectionParams<AuthOptions> | undefined, caller: AsyncCaller, client: GoogleVertexAIAbstractedClient);
    abstract buildUrl(): Promise<string>;
    buildMethod(): string;
    _request(data: unknown | undefined, options: CallOptions): Promise<ResponseType>;
}
export declare class GoogleVertexAILLMConnection<CallOptions extends BaseLanguageModelCallOptions, InstanceType, PredictionType extends GoogleVertexAIBasePrediction, AuthOptions> extends GoogleVertexAIConnection<CallOptions, PredictionType, AuthOptions> implements GoogleVertexAIBaseLLMInput<AuthOptions> {
    model: string;
    client: GoogleVertexAIAbstractedClient;
    constructor(fields: GoogleVertexAIBaseLLMInput<AuthOptions> | undefined, caller: AsyncCaller, client: GoogleVertexAIAbstractedClient);
    buildUrl(): Promise<string>;
    request(instances: InstanceType[], parameters: GoogleVertexAIModelParams, options: CallOptions): Promise<GoogleVertexAILLMResponse<PredictionType>>;
}
