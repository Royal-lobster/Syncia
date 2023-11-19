"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
const expr_eval_1 = require("expr-eval");
const base_js_1 = require("./base.cjs");
/**
 * The Calculator class is a tool used to evaluate mathematical
 * expressions. It extends the base Tool class.
 */
class Calculator extends base_js_1.Tool {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "calculator"
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `Useful for getting the result of a math expression. The input to this tool should be a valid mathematical expression that could be executed by a simple calculator.`
        });
    }
    static lc_name() {
        return "Calculator";
    }
    get lc_namespace() {
        return [...super.lc_namespace, "calculator"];
    }
    /** @ignore */
    async _call(input) {
        try {
            return expr_eval_1.Parser.evaluate(input).toString();
        }
        catch (error) {
            return "I don't know how to do that.";
        }
    }
}
exports.Calculator = Calculator;
