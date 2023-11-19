import { OpenAI as OpenAIClient } from "openai";
import { getModelNameForTiktoken } from "../base_language/count_tokens.js";
import { AIMessage, AIMessageChunk, ChatGenerationChunk, ChatMessage, ChatMessageChunk, FunctionMessageChunk, HumanMessage, HumanMessageChunk, SystemMessage, SystemMessageChunk, } from "../schema/index.js";
import { formatToOpenAIFunction } from "../tools/convert_to_openai.js";
import { getEndpoint } from "../util/azure.js";
import { getEnvironmentVariable } from "../util/env.js";
import { promptLayerTrackRequest } from "../util/prompt-layer.js";
import { BaseChatModel } from "./base.js";
import { wrapOpenAIClientError } from "../util/openai.js";
function extractGenericMessageCustomRole(message) {
    if (message.role !== "system" &&
        message.role !== "assistant" &&
        message.role !== "user" &&
        message.role !== "function") {
        console.warn(`Unknown message role: ${message.role}`);
    }
    return message.role;
}
function messageToOpenAIRole(message) {
    const type = message._getType();
    switch (type) {
        case "system":
            return "system";
        case "ai":
            return "assistant";
        case "human":
            return "user";
        case "function":
            return "function";
        case "generic": {
            if (!ChatMessage.isInstance(message))
                throw new Error("Invalid generic chat message");
            return extractGenericMessageCustomRole(message);
        }
        default:
            throw new Error(`Unknown message type: ${type}`);
    }
}
function openAIResponseToChatMessage(message) {
    switch (message.role) {
        case "user":
            return new HumanMessage(message.content || "");
        case "assistant":
            return new AIMessage(message.content || "", {
                function_call: message.function_call,
            });
        case "system":
            return new SystemMessage(message.content || "");
        default:
            return new ChatMessage(message.content || "", message.role ?? "unknown");
    }
}
function _convertDeltaToMessageChunk(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delta, defaultRole) {
    const role = delta.role ?? defaultRole;
    const content = delta.content ?? "";
    let additional_kwargs;
    if (delta.function_call) {
        additional_kwargs = {
            function_call: delta.function_call,
        };
    }
    else {
        additional_kwargs = {};
    }
    if (role === "user") {
        return new HumanMessageChunk({ content });
    }
    else if (role === "assistant") {
        return new AIMessageChunk({ content, additional_kwargs });
    }
    else if (role === "system") {
        return new SystemMessageChunk({ content });
    }
    else if (role === "function") {
        return new FunctionMessageChunk({
            content,
            additional_kwargs,
            name: delta.name,
        });
    }
    else {
        return new ChatMessageChunk({ content, role });
    }
}
/**
 * Wrapper around OpenAI large language models that use the Chat endpoint.
 *
 * To use you should have the `openai` package installed, with the
 * `OPENAI_API_KEY` environment variable set.
 *
 * To use with Azure you should have the `openai` package installed, with the
 * `AZURE_OPENAI_API_KEY`,
 * `AZURE_OPENAI_API_INSTANCE_NAME`,
 * `AZURE_OPENAI_API_DEPLOYMENT_NAME`
 * and `AZURE_OPENAI_API_VERSION` environment variable set.
 * `AZURE_OPENAI_BASE_PATH` is optional and will override `AZURE_OPENAI_API_INSTANCE_NAME` if you need to use a custom endpoint.
 *
 * @remarks
 * Any parameters that are valid to be passed to {@link
 * https://platform.openai.com/docs/api-reference/chat/create |
 * `openai.createChatCompletion`} can be passed through {@link modelKwargs}, even
 * if not explicitly available on this class.
 */
export class ChatOpenAI extends BaseChatModel {
    static lc_name() {
        return "ChatOpenAI";
    }
    get callKeys() {
        return [
            ...super.callKeys,
            "options",
            "function_call",
            "functions",
            "tools",
            "promptIndex",
        ];
    }
    get lc_secrets() {
        return {
            openAIApiKey: "OPENAI_API_KEY",
            azureOpenAIApiKey: "AZURE_OPENAI_API_KEY",
            organization: "OPENAI_ORGANIZATION",
        };
    }
    get lc_aliases() {
        return {
            modelName: "model",
            openAIApiKey: "openai_api_key",
            azureOpenAIApiVersion: "azure_openai_api_version",
            azureOpenAIApiKey: "azure_openai_api_key",
            azureOpenAIApiInstanceName: "azure_openai_api_instance_name",
            azureOpenAIApiDeploymentName: "azure_openai_api_deployment_name",
        };
    }
    constructor(fields, 
    /** @deprecated */
    configuration) {
        super(fields ?? {});
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "topP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "frequencyPenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "presencePenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "n", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "logitBias", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "gpt-3.5-turbo"
        });
        Object.defineProperty(this, "modelKwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "user", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "streaming", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "maxTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "openAIApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiInstanceName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiDeploymentName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIBasePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "organization", {
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
        Object.defineProperty(this, "clientConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.openAIApiKey =
            fields?.openAIApiKey ?? getEnvironmentVariable("OPENAI_API_KEY");
        this.azureOpenAIApiKey =
            fields?.azureOpenAIApiKey ??
                getEnvironmentVariable("AZURE_OPENAI_API_KEY");
        if (!this.azureOpenAIApiKey && !this.openAIApiKey) {
            throw new Error("OpenAI or Azure OpenAI API key not found");
        }
        this.azureOpenAIApiInstanceName =
            fields?.azureOpenAIApiInstanceName ??
                getEnvironmentVariable("AZURE_OPENAI_API_INSTANCE_NAME");
        this.azureOpenAIApiDeploymentName =
            fields?.azureOpenAIApiDeploymentName ??
                getEnvironmentVariable("AZURE_OPENAI_API_DEPLOYMENT_NAME");
        this.azureOpenAIApiVersion =
            fields?.azureOpenAIApiVersion ??
                getEnvironmentVariable("AZURE_OPENAI_API_VERSION");
        this.azureOpenAIBasePath =
            fields?.azureOpenAIBasePath ??
                getEnvironmentVariable("AZURE_OPENAI_BASE_PATH");
        this.organization =
            fields?.configuration?.organization ??
                getEnvironmentVariable("OPENAI_ORGANIZATION");
        this.modelName = fields?.modelName ?? this.modelName;
        this.modelKwargs = fields?.modelKwargs ?? {};
        this.timeout = fields?.timeout;
        this.temperature = fields?.temperature ?? this.temperature;
        this.topP = fields?.topP ?? this.topP;
        this.frequencyPenalty = fields?.frequencyPenalty ?? this.frequencyPenalty;
        this.presencePenalty = fields?.presencePenalty ?? this.presencePenalty;
        this.maxTokens = fields?.maxTokens;
        this.n = fields?.n ?? this.n;
        this.logitBias = fields?.logitBias;
        this.stop = fields?.stop;
        this.user = fields?.user;
        this.streaming = fields?.streaming ?? false;
        if (this.azureOpenAIApiKey) {
            if (!this.azureOpenAIApiInstanceName && !this.azureOpenAIBasePath) {
                throw new Error("Azure OpenAI API instance name not found");
            }
            if (!this.azureOpenAIApiDeploymentName) {
                throw new Error("Azure OpenAI API deployment name not found");
            }
            if (!this.azureOpenAIApiVersion) {
                throw new Error("Azure OpenAI API version not found");
            }
            this.openAIApiKey = this.openAIApiKey ?? "";
        }
        this.clientConfig = {
            apiKey: this.openAIApiKey,
            organization: this.organization,
            baseURL: configuration?.basePath ?? fields?.configuration?.basePath,
            dangerouslyAllowBrowser: true,
            defaultHeaders: configuration?.baseOptions?.headers ??
                fields?.configuration?.baseOptions?.headers,
            defaultQuery: configuration?.baseOptions?.params ??
                fields?.configuration?.baseOptions?.params,
            ...configuration,
            ...fields?.configuration,
        };
    }
    /**
     * Get the parameters used to invoke the model
     */
    invocationParams(options) {
        return {
            model: this.modelName,
            temperature: this.temperature,
            top_p: this.topP,
            frequency_penalty: this.frequencyPenalty,
            presence_penalty: this.presencePenalty,
            max_tokens: this.maxTokens === -1 ? undefined : this.maxTokens,
            n: this.n,
            logit_bias: this.logitBias,
            stop: options?.stop ?? this.stop,
            user: this.user,
            stream: this.streaming,
            functions: options?.functions ??
                (options?.tools
                    ? options?.tools.map(formatToOpenAIFunction)
                    : undefined),
            function_call: options?.function_call,
            ...this.modelKwargs,
        };
    }
    /** @ignore */
    _identifyingParams() {
        return {
            model_name: this.modelName,
            ...this.invocationParams(),
            ...this.clientConfig,
        };
    }
    async *_streamResponseChunks(messages, options, runManager) {
        const messagesMapped = messages.map((message) => ({
            role: messageToOpenAIRole(message),
            content: message.content,
            name: message.name,
            function_call: message.additional_kwargs
                .function_call,
        }));
        const params = {
            ...this.invocationParams(options),
            messages: messagesMapped,
            stream: true,
        };
        let defaultRole;
        const streamIterable = await this.completionWithRetry(params, options);
        for await (const data of streamIterable) {
            const choice = data?.choices[0];
            if (!choice) {
                continue;
            }
            const { delta } = choice;
            const chunk = _convertDeltaToMessageChunk(delta, defaultRole);
            defaultRole = delta.role ?? defaultRole;
            const newTokenIndices = {
                prompt: options.promptIndex ?? 0,
                completion: choice.index ?? 0,
            };
            const generationChunk = new ChatGenerationChunk({
                message: chunk,
                text: chunk.content,
                generationInfo: newTokenIndices,
            });
            yield generationChunk;
            // eslint-disable-next-line no-void
            void runManager?.handleLLMNewToken(generationChunk.text ?? "", newTokenIndices, undefined, undefined, undefined, { chunk: generationChunk });
        }
        if (options.signal?.aborted) {
            throw new Error("AbortError");
        }
    }
    /**
     * Get the identifying parameters for the model
     */
    identifyingParams() {
        return this._identifyingParams();
    }
    /** @ignore */
    async _generate(messages, options, runManager) {
        const tokenUsage = {};
        const params = this.invocationParams(options);
        const messagesMapped = messages.map((message) => ({
            role: messageToOpenAIRole(message),
            content: message.content,
            name: message.name,
            function_call: message.additional_kwargs
                .function_call,
        }));
        if (params.stream) {
            const stream = await this._streamResponseChunks(messages, options, runManager);
            const finalChunks = {};
            for await (const chunk of stream) {
                const index = chunk.generationInfo?.completion ?? 0;
                if (finalChunks[index] === undefined) {
                    finalChunks[index] = chunk;
                }
                else {
                    finalChunks[index] = finalChunks[index].concat(chunk);
                }
            }
            const generations = Object.entries(finalChunks)
                .sort(([aKey], [bKey]) => parseInt(aKey, 10) - parseInt(bKey, 10))
                .map(([_, value]) => value);
            return { generations };
        }
        else {
            const data = await this.completionWithRetry({
                ...params,
                stream: false,
                messages: messagesMapped,
            }, {
                signal: options?.signal,
                ...options?.options,
            });
            const { completion_tokens: completionTokens, prompt_tokens: promptTokens, total_tokens: totalTokens, } = data?.usage ?? {};
            if (completionTokens) {
                tokenUsage.completionTokens =
                    (tokenUsage.completionTokens ?? 0) + completionTokens;
            }
            if (promptTokens) {
                tokenUsage.promptTokens = (tokenUsage.promptTokens ?? 0) + promptTokens;
            }
            if (totalTokens) {
                tokenUsage.totalTokens = (tokenUsage.totalTokens ?? 0) + totalTokens;
            }
            const generations = [];
            for (const part of data?.choices ?? []) {
                const text = part.message?.content ?? "";
                const generation = {
                    text,
                    message: openAIResponseToChatMessage(part.message ?? { role: "assistant" }),
                };
                if (part.finish_reason) {
                    generation.generationInfo = { finish_reason: part.finish_reason };
                }
                generations.push(generation);
            }
            return {
                generations,
                llmOutput: { tokenUsage },
            };
        }
    }
    async getNumTokensFromMessages(messages) {
        let totalCount = 0;
        let tokensPerMessage = 0;
        let tokensPerName = 0;
        // From: https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb
        if (getModelNameForTiktoken(this.modelName) === "gpt-3.5-turbo") {
            tokensPerMessage = 4;
            tokensPerName = -1;
        }
        else if (getModelNameForTiktoken(this.modelName).startsWith("gpt-4")) {
            tokensPerMessage = 3;
            tokensPerName = 1;
        }
        const countPerMessage = await Promise.all(messages.map(async (message) => {
            const textCount = await this.getNumTokens(message.content);
            const roleCount = await this.getNumTokens(messageToOpenAIRole(message));
            const nameCount = message.name !== undefined
                ? tokensPerName + (await this.getNumTokens(message.name))
                : 0;
            const count = textCount + tokensPerMessage + roleCount + nameCount;
            totalCount += count;
            return count;
        }));
        totalCount += 3; // every reply is primed with <|start|>assistant<|message|>
        return { totalCount, countPerMessage };
    }
    async completionWithRetry(request, options) {
        const requestOptions = this._getClientOptions(options);
        return this.caller.call(async () => {
            try {
                const res = await this.client.chat.completions.create(request, requestOptions);
                return res;
            }
            catch (e) {
                const error = wrapOpenAIClientError(e);
                throw error;
            }
        });
    }
    _getClientOptions(options) {
        if (!this.client) {
            const openAIEndpointConfig = {
                azureOpenAIApiDeploymentName: this.azureOpenAIApiDeploymentName,
                azureOpenAIApiInstanceName: this.azureOpenAIApiInstanceName,
                azureOpenAIApiKey: this.azureOpenAIApiKey,
                azureOpenAIBasePath: this.azureOpenAIBasePath,
                baseURL: this.clientConfig.baseURL,
            };
            const endpoint = getEndpoint(openAIEndpointConfig);
            const params = {
                ...this.clientConfig,
                baseURL: endpoint,
                timeout: this.timeout,
                maxRetries: 0,
            };
            if (!params.baseURL) {
                delete params.baseURL;
            }
            this.client = new OpenAIClient(params);
        }
        const requestOptions = {
            ...this.clientConfig,
            ...options,
        };
        if (this.azureOpenAIApiKey) {
            requestOptions.headers = {
                "api-key": this.azureOpenAIApiKey,
                ...requestOptions.headers,
            };
            requestOptions.query = {
                "api-version": this.azureOpenAIApiVersion,
                ...requestOptions.query,
            };
        }
        return requestOptions;
    }
    _llmType() {
        return "openai";
    }
    /** @ignore */
    _combineLLMOutput(...llmOutputs) {
        return llmOutputs.reduce((acc, llmOutput) => {
            if (llmOutput && llmOutput.tokenUsage) {
                acc.tokenUsage.completionTokens +=
                    llmOutput.tokenUsage.completionTokens ?? 0;
                acc.tokenUsage.promptTokens += llmOutput.tokenUsage.promptTokens ?? 0;
                acc.tokenUsage.totalTokens += llmOutput.tokenUsage.totalTokens ?? 0;
            }
            return acc;
        }, {
            tokenUsage: {
                completionTokens: 0,
                promptTokens: 0,
                totalTokens: 0,
            },
        });
    }
}
export class PromptLayerChatOpenAI extends ChatOpenAI {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "promptLayerApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "plTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnPromptLayerId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.promptLayerApiKey =
            fields?.promptLayerApiKey ??
                (typeof process !== "undefined"
                    ? // eslint-disable-next-line no-process-env
                        process.env?.PROMPTLAYER_API_KEY
                    : undefined);
        this.plTags = fields?.plTags ?? [];
        this.returnPromptLayerId = fields?.returnPromptLayerId ?? false;
    }
    async _generate(messages, options, runManager) {
        const requestStartTime = Date.now();
        let parsedOptions;
        if (Array.isArray(options)) {
            parsedOptions = { stop: options };
        }
        else if (options?.timeout && !options.signal) {
            parsedOptions = {
                ...options,
                signal: AbortSignal.timeout(options.timeout),
            };
        }
        else {
            parsedOptions = options ?? {};
        }
        const generatedResponses = await super._generate(messages, parsedOptions, runManager);
        const requestEndTime = Date.now();
        const _convertMessageToDict = (message) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let messageDict;
            if (message._getType() === "human") {
                messageDict = { role: "user", content: message.content };
            }
            else if (message._getType() === "ai") {
                messageDict = { role: "assistant", content: message.content };
            }
            else if (message._getType() === "function") {
                messageDict = { role: "assistant", content: message.content };
            }
            else if (message._getType() === "system") {
                messageDict = { role: "system", content: message.content };
            }
            else if (message._getType() === "generic") {
                messageDict = {
                    role: message.role,
                    content: message.content,
                };
            }
            else {
                throw new Error(`Got unknown type ${message}`);
            }
            return messageDict;
        };
        const _createMessageDicts = (messages, callOptions) => {
            const params = {
                ...this.invocationParams(),
                model: this.modelName,
            };
            if (callOptions?.stop) {
                if (Object.keys(params).includes("stop")) {
                    throw new Error("`stop` found in both the input and default params.");
                }
            }
            const messageDicts = messages.map((message) => _convertMessageToDict(message));
            return messageDicts;
        };
        for (let i = 0; i < generatedResponses.generations.length; i += 1) {
            const generation = generatedResponses.generations[i];
            const messageDicts = _createMessageDicts(messages, parsedOptions);
            let promptLayerRequestId;
            const parsedResp = [
                {
                    content: generation.text,
                    role: messageToOpenAIRole(generation.message),
                },
            ];
            const promptLayerRespBody = await promptLayerTrackRequest(this.caller, "langchain.PromptLayerChatOpenAI", { ...this._identifyingParams(), messages: messageDicts, stream: false }, this.plTags, parsedResp, requestStartTime, requestEndTime, this.promptLayerApiKey);
            if (this.returnPromptLayerId === true) {
                if (promptLayerRespBody.success === true) {
                    promptLayerRequestId = promptLayerRespBody.request_id;
                }
                if (!generation.generationInfo ||
                    typeof generation.generationInfo !== "object") {
                    generation.generationInfo = {};
                }
                generation.generationInfo.promptLayerRequestId = promptLayerRequestId;
            }
        }
        return generatedResponses;
    }
}
