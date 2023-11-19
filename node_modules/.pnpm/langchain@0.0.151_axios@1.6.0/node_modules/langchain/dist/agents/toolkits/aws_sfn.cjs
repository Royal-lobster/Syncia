"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAWSSfnAgent = exports.AWSSfnToolkit = exports.SFN_SUFFIX = exports.SFN_PREFIX = void 0;
const aws_sfn_js_1 = require("../../tools/aws_sfn.cjs");
const base_js_1 = require("./base.cjs");
const template_js_1 = require("../../prompts/template.cjs");
const llm_chain_js_1 = require("../../chains/llm_chain.cjs");
const index_js_1 = require("../mrkl/index.cjs");
const executor_js_1 = require("../executor.cjs");
exports.SFN_PREFIX = `You are an agent designed to interact with AWS Step Functions state machines to execute and coordinate asynchronous workflows and tasks.
Given an input question, command, or task use the appropriate tool to execute a command to interact with AWS Step Functions and return the result.
You have access to tools for interacting with AWS Step Functions.
Given an input question, command, or task use the correct tool to complete the task.
Only use the below tools. Only use the information returned by the below tools to construct your final answer.

If the question does not seem related to AWS Step Functions or an existing state machine, just return "I don't know" as the answer.`;
exports.SFN_SUFFIX = `Begin!

Question: {input}
Thought: I should look at state machines within AWS Step Functions to see what actions I can perform.
{agent_scratchpad}`;
/**
 * Class representing a toolkit for interacting with AWS Step Functions.
 * It initializes the AWS Step Functions tools and provides them as tools
 * for the agent.
 */
class AWSSfnToolkit extends base_js_1.Toolkit {
    constructor(args) {
        super();
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stateMachineArn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "asl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.stateMachineArn = args.stateMachineArn;
        if (args.asl) {
            this.asl = args.asl;
        }
        this.tools = [
            new aws_sfn_js_1.StartExecutionAWSSfnTool({
                name: args.name,
                description: aws_sfn_js_1.StartExecutionAWSSfnTool.formatDescription(args.name, args.description),
                stateMachineArn: args.stateMachineArn,
            }),
            new aws_sfn_js_1.DescribeExecutionAWSSfnTool(Object.assign(args.region ? { region: args.region } : {}, args.accessKeyId && args.secretAccessKey
                ? {
                    accessKeyId: args.accessKeyId,
                    secretAccessKey: args.secretAccessKey,
                }
                : {})),
            new aws_sfn_js_1.SendTaskSuccessAWSSfnTool(Object.assign(args.region ? { region: args.region } : {}, args.accessKeyId && args.secretAccessKey
                ? {
                    accessKeyId: args.accessKeyId,
                    secretAccessKey: args.secretAccessKey,
                }
                : {})),
        ];
    }
}
exports.AWSSfnToolkit = AWSSfnToolkit;
function createAWSSfnAgent(llm, toolkit, args) {
    const { prefix = exports.SFN_PREFIX, suffix = exports.SFN_SUFFIX, inputVariables = ["input", "agent_scratchpad"], } = args ?? {};
    const { tools } = toolkit;
    const formattedPrefix = (0, template_js_1.renderTemplate)(prefix, "f-string", {});
    const prompt = index_js_1.ZeroShotAgent.createPrompt(tools, {
        prefix: formattedPrefix,
        suffix,
        inputVariables,
    });
    const chain = new llm_chain_js_1.LLMChain({ prompt, llm });
    const agent = new index_js_1.ZeroShotAgent({
        llmChain: chain,
        allowedTools: tools.map((t) => t.name),
    });
    return executor_js_1.AgentExecutor.fromAgentAndTools({
        agent,
        tools,
        returnIntermediateSteps: true,
    });
}
exports.createAWSSfnAgent = createAWSSfnAgent;
