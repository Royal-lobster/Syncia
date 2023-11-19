"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiPromptChain = void 0;
const zod_1 = require("zod");
const multi_route_js_1 = require("./multi_route.cjs");
const multi_prompt_prompt_js_1 = require("./multi_prompt_prompt.cjs");
const template_js_1 = require("../../prompts/template.cjs");
const llm_chain_js_1 = require("../../chains/llm_chain.cjs");
const prompt_js_1 = require("../../prompts/prompt.cjs");
const llm_router_js_1 = require("./llm_router.cjs");
const conversation_js_1 = require("../../chains/conversation.cjs");
const utils_js_1 = require("./utils.cjs");
const router_js_1 = require("../../output_parsers/router.cjs");
/**
 * A class that represents a multi-prompt chain in the LangChain
 * framework. It extends the MultiRouteChain class and provides additional
 * functionality specific to multi-prompt chains.
 */
class MultiPromptChain extends multi_route_js_1.MultiRouteChain {
    /**
     * @deprecated Use `fromLLMAndPrompts` instead
     */
    static fromPrompts(llm, promptNames, promptDescriptions, promptTemplates, defaultChain, options) {
        return MultiPromptChain.fromLLMAndPrompts(llm, {
            promptNames,
            promptDescriptions,
            promptTemplates,
            defaultChain,
            multiRouteChainOpts: options,
        });
    }
    /**
     * A static method that creates an instance of MultiPromptChain from a
     * BaseLanguageModel and a set of prompts. It takes in optional parameters
     * for the default chain and additional options.
     * @param llm A BaseLanguageModel instance.
     * @param promptNames An array of prompt names.
     * @param promptDescriptions An array of prompt descriptions.
     * @param promptTemplates An array of prompt templates.
     * @param defaultChain An optional BaseChain instance to be used as the default chain.
     * @param llmChainOpts Optional parameters for the LLMChainInput, excluding 'llm' and 'prompt'.
     * @param conversationChainOpts Optional parameters for the LLMChainInput, excluding 'llm' and 'outputKey'.
     * @param multiRouteChainOpts Optional parameters for the MultiRouteChainInput, excluding 'defaultChain'.
     * @returns An instance of MultiPromptChain.
     */
    static fromLLMAndPrompts(llm, { promptNames, promptDescriptions, promptTemplates, defaultChain, llmChainOpts, conversationChainOpts, multiRouteChainOpts, }) {
        const destinations = (0, utils_js_1.zipEntries)(promptNames, promptDescriptions).map(([name, desc]) => `${name}: ${desc}`);
        const structuredOutputParserSchema = zod_1.z.object({
            destination: zod_1.z
                .string()
                .optional()
                .describe('name of the question answering system to use or "DEFAULT"'),
            next_inputs: zod_1.z
                .object({
                input: zod_1.z
                    .string()
                    .describe("a potentially modified version of the original input"),
            })
                .describe("input to be fed to the next model"),
        });
        const outputParser = new router_js_1.RouterOutputParser(structuredOutputParserSchema);
        const destinationsStr = destinations.join("\n");
        const routerTemplate = (0, template_js_1.interpolateFString)((0, multi_prompt_prompt_js_1.STRUCTURED_MULTI_PROMPT_ROUTER_TEMPLATE)(outputParser.getFormatInstructions({ interpolationDepth: 4 })), {
            destinations: destinationsStr,
        });
        const routerPrompt = new prompt_js_1.PromptTemplate({
            template: routerTemplate,
            inputVariables: ["input"],
            outputParser,
        });
        const routerChain = llm_router_js_1.LLMRouterChain.fromLLM(llm, routerPrompt);
        const destinationChains = (0, utils_js_1.zipEntries)(promptNames, promptTemplates).reduce((acc, [name, template]) => {
            let myPrompt;
            if (typeof template === "object") {
                myPrompt = template;
            }
            else if (typeof template === "string") {
                myPrompt = new prompt_js_1.PromptTemplate({
                    template: template,
                    inputVariables: ["input"],
                });
            }
            else {
                throw new Error("Invalid prompt template");
            }
            acc[name] = new llm_chain_js_1.LLMChain({
                ...llmChainOpts,
                llm,
                prompt: myPrompt,
            });
            return acc;
        }, {});
        const convChain = new conversation_js_1.ConversationChain({
            ...conversationChainOpts,
            llm,
            outputKey: "text",
        });
        return new MultiPromptChain({
            ...multiRouteChainOpts,
            routerChain,
            destinationChains,
            defaultChain: defaultChain ?? convChain,
        });
    }
    _chainType() {
        return "multi_prompt_chain";
    }
}
exports.MultiPromptChain = MultiPromptChain;
