"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunnablePassthrough = void 0;
const base_js_1 = require("./base.cjs");
/**
 * A runnable that passes through the input.
 */
class RunnablePassthrough extends base_js_1.Runnable {
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
exports.RunnablePassthrough = RunnablePassthrough;
