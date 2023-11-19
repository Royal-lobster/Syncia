import { CallbackManagerForChainRun, Callbacks } from "../callbacks/manager.js";
import { ChainValues } from "../schema/index.js";
import { ChainInputs, BaseChain } from "./base.js";
/**
 * Interface that extends the `ChainInputs` interface and defines the
 * fields required for a transform chain. It includes the `transform`
 * function, `inputVariables`, and `outputVariables` properties.
 */
export interface TransformChainFields<I extends ChainValues, O extends ChainValues> extends ChainInputs {
    transform: (values: I, callbacks?: Callbacks) => O | Promise<O>;
    inputVariables: (keyof I extends string ? keyof I : never)[];
    outputVariables: (keyof O extends string ? keyof O : never)[];
}
/**
 * Class that represents a transform chain. It extends the `BaseChain`
 * class and implements the `TransformChainFields` interface. It provides
 * a way to transform input values to output values using a specified
 * transform function.
 */
export declare class TransformChain<I extends ChainValues, O extends ChainValues> extends BaseChain {
    static lc_name(): string;
    transformFunc: (values: I, callbacks?: Callbacks) => O | Promise<O>;
    inputVariables: (keyof I extends string ? keyof I : never)[];
    outputVariables: (keyof O extends string ? keyof O : never)[];
    _chainType(): "transform";
    get inputKeys(): (keyof I extends string ? keyof I : never)[];
    get outputKeys(): (keyof O extends string ? keyof O : never)[];
    constructor(fields: TransformChainFields<I, O>);
    _call(values: I, runManager?: CallbackManagerForChainRun): Promise<O>;
}
