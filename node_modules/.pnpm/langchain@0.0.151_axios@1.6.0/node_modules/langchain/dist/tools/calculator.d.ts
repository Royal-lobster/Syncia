import { Tool } from "./base.js";
/**
 * The Calculator class is a tool used to evaluate mathematical
 * expressions. It extends the base Tool class.
 */
export declare class Calculator extends Tool {
    static lc_name(): string;
    get lc_namespace(): string[];
    name: string;
    /** @ignore */
    _call(input: string): Promise<string>;
    description: string;
}
