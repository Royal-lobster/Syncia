import { BaseChatModelParams } from "../../chat_models/base.js";
import { CallbackManagerForLLMRun } from "../../callbacks/manager.js";
import { BaseMessage, ChatResult } from "../../schema/index.js";
import { ChatAnthropic, type AnthropicInput } from "../../chat_models/anthropic.js";
import { BaseFunctionCallOptions } from "../../base_language/index.js";
import { StructuredTool } from "../../tools/base.js";
export interface ChatAnthropicFunctionsCallOptions extends BaseFunctionCallOptions {
    tools?: StructuredTool[];
}
export declare class AnthropicFunctions extends ChatAnthropic<ChatAnthropicFunctionsCallOptions> {
    static lc_name(): string;
    constructor(fields?: Partial<AnthropicInput> & BaseChatModelParams);
    _generate(messages: BaseMessage[], options: this["ParsedCallOptions"], runManager?: CallbackManagerForLLMRun | undefined): Promise<ChatResult>;
    _llmType(): string;
    /** @ignore */
    _combineLLMOutput(): never[];
}
