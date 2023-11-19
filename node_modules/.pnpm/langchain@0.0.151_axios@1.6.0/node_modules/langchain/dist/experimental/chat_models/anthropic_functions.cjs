"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnthropicFunctions = void 0;
const fast_xml_parser_1 = require("fast-xml-parser");
const index_js_1 = require("../../schema/index.cjs");
const anthropic_js_1 = require("../../chat_models/anthropic.cjs");
const prompt_js_1 = require("../../prompts/prompt.cjs");
const convert_to_openai_js_1 = require("../../tools/convert_to_openai.cjs");
const TOOL_SYSTEM_PROMPT = 
/* #__PURE__ */
prompt_js_1.PromptTemplate.fromTemplate(`In addition to responding, you can use tools.
You have access to the following tools.

{tools}

In order to use a tool, you can use <tool></tool> to specify the name,
and the <tool_input></tool_input> tags to specify the parameters.
Each parameter should be passed in as <$param_name>$value</$param_name>,
Where $param_name is the name of the specific parameter, and $value
is the value for that parameter.

You will then get back a response in the form <observation></observation>
For example, if you have a tool called 'search' that accepts a single
parameter 'query' that could run a google search, in order to search
for the weather in SF you would respond:

<tool>search</tool><tool_input><query>weather in SF</query></tool_input>
<observation>64 degrees</observation>`);
class AnthropicFunctions extends anthropic_js_1.ChatAnthropic {
    static lc_name() {
        return "AnthropicFunctions";
    }
    constructor(fields) {
        super(fields ?? {});
    }
    async _generate(messages, options, runManager) {
        let promptMessages = messages;
        let forced = false;
        let functionCall;
        if (options.tools) {
            // eslint-disable-next-line no-param-reassign
            options.functions = (options.functions ?? []).concat(options.tools.map(convert_to_openai_js_1.formatToOpenAIFunction));
        }
        if (options.functions !== undefined && options.functions.length > 0) {
            const content = await TOOL_SYSTEM_PROMPT.format({
                tools: JSON.stringify(options.functions, null, 2),
            });
            const systemMessage = new index_js_1.SystemMessage({ content });
            promptMessages = [systemMessage].concat(promptMessages);
            const stopSequences = options?.stop?.concat(anthropic_js_1.DEFAULT_STOP_SEQUENCES) ??
                this.stopSequences ??
                anthropic_js_1.DEFAULT_STOP_SEQUENCES;
            // eslint-disable-next-line no-param-reassign
            options.stop = stopSequences.concat(["</tool_input>"]);
            if (options.function_call) {
                if (typeof options.function_call === "string") {
                    functionCall = JSON.parse(options.function_call).name;
                }
                else {
                    functionCall = options.function_call.name;
                }
                forced = true;
                const matchingFunction = options.functions.find((tool) => tool.name === functionCall);
                if (!matchingFunction) {
                    throw new Error(`No matching function found for passed "function_call"`);
                }
                promptMessages = promptMessages.concat([
                    new index_js_1.AIMessage({
                        content: `<tool>${functionCall}</tool>`,
                    }),
                ]);
                // eslint-disable-next-line no-param-reassign
                delete options.function_call;
            }
            // eslint-disable-next-line no-param-reassign
            delete options.functions;
        }
        else if (options.function_call !== undefined) {
            throw new Error(`If "function_call" is provided, "functions" must also be.`);
        }
        const chatResult = await super._generate(promptMessages, options, runManager);
        const chatGenerationContent = chatResult.generations[0].message.content;
        if (forced) {
            const parser = new fast_xml_parser_1.XMLParser();
            const result = parser.parse(`${chatGenerationContent}</tool_input>`);
            if (functionCall === undefined) {
                throw new Error(`Could not parse called function from model output.`);
            }
            const responseMessageWithFunctions = new index_js_1.AIMessage({
                content: "",
                additional_kwargs: {
                    function_call: {
                        name: functionCall,
                        arguments: result.tool_input
                            ? JSON.stringify(result.tool_input)
                            : "",
                    },
                },
            });
            return {
                generations: [{ message: responseMessageWithFunctions, text: "" }],
            };
        }
        else if (chatGenerationContent.includes("<tool>")) {
            const parser = new fast_xml_parser_1.XMLParser();
            const result = parser.parse(`${chatGenerationContent}</tool_input>`);
            const responseMessageWithFunctions = new index_js_1.AIMessage({
                content: chatGenerationContent.split("<tool>")[0],
                additional_kwargs: {
                    function_call: {
                        name: result.tool,
                        arguments: result.tool_input
                            ? JSON.stringify(result.tool_input)
                            : "",
                    },
                },
            });
            return {
                generations: [{ message: responseMessageWithFunctions, text: "" }],
            };
        }
        return chatResult;
    }
    _llmType() {
        return "anthropic_functions";
    }
    /** @ignore */
    _combineLLMOutput() {
        return [];
    }
}
exports.AnthropicFunctions = AnthropicFunctions;
