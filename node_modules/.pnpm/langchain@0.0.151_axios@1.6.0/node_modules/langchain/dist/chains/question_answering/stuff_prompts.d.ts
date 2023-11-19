import { PromptTemplate } from "../../prompts/prompt.js";
import { ConditionalPromptSelector } from "../../prompts/selectors/conditional.js";
export declare const DEFAULT_QA_PROMPT: PromptTemplate<{
    context: any;
    question: any;
}, any>;
export declare const QA_PROMPT_SELECTOR: ConditionalPromptSelector;
