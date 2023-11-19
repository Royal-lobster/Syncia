import { Runnable } from "./base.js";
import type { RunnableConfig } from "./config.js";
/**
 * A runnable that passes through the input.
 */
export declare class RunnablePassthrough<RunInput> extends Runnable<RunInput, RunInput> {
    static lc_name(): string;
    lc_namespace: string[];
    lc_serializable: boolean;
    invoke(input: RunInput, options?: Partial<RunnableConfig>): Promise<RunInput>;
}
