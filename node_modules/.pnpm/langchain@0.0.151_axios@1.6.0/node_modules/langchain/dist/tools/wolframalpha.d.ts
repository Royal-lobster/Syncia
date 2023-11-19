import { Tool, ToolParams } from "./base.js";
export declare class WolframAlphaTool extends Tool {
    appid: string;
    name: string;
    description: string;
    constructor(fields: ToolParams & {
        appid: string;
    });
    get lc_namespace(): string[];
    static lc_name(): string;
    _call(query: string): Promise<string>;
}
