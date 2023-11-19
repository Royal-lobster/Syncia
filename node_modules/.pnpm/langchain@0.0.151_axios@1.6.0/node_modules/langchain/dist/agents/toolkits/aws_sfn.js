import { StartExecutionAWSSfnTool, DescribeExecutionAWSSfnTool, SendTaskSuccessAWSSfnTool, } from "../../tools/aws_sfn.js";
import { Toolkit } from "./base.js";
import { renderTemplate } from "../../prompts/template.js";
import { LLMChain } from "../../chains/llm_chain.js";
import { ZeroShotAgent } from "../mrkl/index.js";
import { AgentExecutor } from "../executor.js";
export const SFN_PREFIX = `You are an agent designed to interact with AWS Step Functions state machines to execute and coordinate asynchronous workflows and tasks.
Given an input question, command, or task use the appropriate tool to execute a command to interact with AWS Step Functions and return the result.
You have access to tools for interacting with AWS Step Functions.
Given an input question, command, or task use the correct tool to complete the task.
Only use the below tools. Only use the information returned by the below tools to construct your final answer.

If the question does not seem related to AWS Step Functions or an existing state machine, just return "I don't know" as the answer.`;
export const SFN_SUFFIX = `Begin!

Question: {input}
Thought: I should look at state machines within AWS Step Functions to see what actions I can perform.
{agent_scratchpad}`;
/**
 * Class representing a toolkit for interacting with AWS Step Functions.
 * It initializes the AWS Step Functions tools and provides them as tools
 * for the agent.
 */
export class AWSSfnToolkit extends Toolkit {
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
            new StartExecutionAWSSfnTool({
                name: args.name,
                description: StartExecutionAWSSfnTool.formatDescription(args.name, args.description),
                stateMachineArn: args.stateMachineArn,
            }),
            new DescribeExecutionAWSSfnTool(Object.assign(args.region ? { region: args.region } : {}, args.accessKeyId && args.secretAccessKey
                ? {
                    accessKeyId: args.accessKeyId,
                    secretAccessKey: args.secretAccessKey,
                }
                : {})),
            new SendTaskSuccessAWSSfnTool(Object.assign(args.region ? { region: args.region } : {}, args.accessKeyId && args.secretAccessKey
                ? {
                    accessKeyId: args.accessKeyId,
                    secretAccessKey: args.secretAccessKey,
                }
                : {})),
        ];
    }
}
export function createAWSSfnAgent(llm, toolkit, args) {
    const { prefix = SFN_PREFIX, suffix = SFN_SUFFIX, inputVariables = ["input", "agent_scratchpad"], } = args ?? {};
    const { tools } = toolkit;
    const formattedPrefix = renderTemplate(prefix, "f-string", {});
    const prompt = ZeroShotAgent.createPrompt(tools, {
        prefix: formattedPrefix,
        suffix,
        inputVariables,
    });
    const chain = new LLMChain({ prompt, llm });
    const agent = new ZeroShotAgent({
        llmChain: chain,
        allowedTools: tools.map((t) => t.name),
    });
    return AgentExecutor.fromAgentAndTools({
        agent,
        tools,
        returnIntermediateSteps: true,
    });
}
