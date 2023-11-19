import { AgentActionOutputParser } from "../types.js";
export declare const FINAL_ANSWER_ACTION = "Final Answer:";
/**
 * A class that extends the AgentActionOutputParser to parse the output of
 * the ChatAgent in LangChain. It checks if the output text contains the
 * final answer action or a JSON response, and parses it accordingly.
 */
export declare class ChatAgentOutputParser extends AgentActionOutputParser {
    lc_namespace: string[];
    /**
     * Parses the output text from the MRKL chain into an agent action or
     * agent finish. If the text contains the final answer action or does not
     * contain an action, it returns an AgentFinish with the output and log.
     * If the text contains a JSON response, it returns the tool, toolInput,
     * and log.
     * @param text The output text from the MRKL chain.
     * @returns An object that satisfies the AgentFinish interface or an object with the tool, toolInput, and log.
     */
    parse(text: string): Promise<{
        returnValues: {
            output: string;
        };
        log: string;
        tool?: undefined;
        toolInput?: undefined;
    } | {
        tool: any;
        toolInput: any;
        log: string;
        returnValues?: undefined;
    }>;
    /**
     * Returns the format instructions used in the output parser for the
     * ChatAgent class.
     * @returns The format instructions as a string.
     */
    getFormatInstructions(): string;
}
