import { Runnable } from "./base.js";
/**
 * A runnable that passes through the input.
 */
export class RunnablePassthrough extends Runnable {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    static lc_name() {
        return "RunnablePassthrough";
    }
    async invoke(input, options) {
        return this._callWithConfig((input) => Promise.resolve(input), input, options);
    }
}
