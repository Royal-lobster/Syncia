import { BaseLanguageModel } from "../../../base_language/index.js";
import { Tool } from "../../../tools/base.js";
import { JsonSpec } from "../../../tools/json.js";
import { ZeroShotCreatePromptArgs } from "../../mrkl/index.js";
import { Toolkit } from "../base.js";
import { AgentExecutor } from "../../executor.js";
/**
 * Represents a toolkit for working with JSON data. It initializes the
 * JSON tools based on the provided JSON specification.
 */
export declare class JsonToolkit extends Toolkit {
    jsonSpec: JsonSpec;
    tools: Tool[];
    constructor(jsonSpec: JsonSpec);
}
/**
 * Creates a JSON agent using a language model, a JSON toolkit, and
 * optional prompt arguments. It creates a prompt for the agent using the
 * JSON tools and the provided prefix and suffix. It then creates a
 * ZeroShotAgent with the prompt and the JSON tools, and returns an
 * AgentExecutor for executing the agent with the tools.
 * @param llm The language model used to create the JSON agent.
 * @param toolkit The JSON toolkit used to create the JSON agent.
 * @param args Optional prompt arguments used to create the JSON agent.
 * @returns An AgentExecutor for executing the created JSON agent with the tools.
 */
export declare function createJsonAgent(llm: BaseLanguageModel, toolkit: JsonToolkit, args?: ZeroShotCreatePromptArgs): AgentExecutor;
