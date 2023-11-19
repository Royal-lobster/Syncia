import { PromptTemplate } from "../../prompts/index.js";
export declare const CRITERIA_PROMPT: PromptTemplate<{
    output: any;
    input: any;
    criteria: any;
}, any>;
export declare const PROMPT_WITH_REFERENCES: PromptTemplate<{
    output: any;
    input: any;
    criteria: any;
    reference: any;
}, any>;
