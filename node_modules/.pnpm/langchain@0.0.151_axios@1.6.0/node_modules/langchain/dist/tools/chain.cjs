"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainTool = void 0;
const dynamic_js_1 = require("./dynamic.cjs");
/**
 * Class that extends DynamicTool for creating tools that can run chains.
 * Takes an instance of a class that extends BaseChain as a parameter in
 * its constructor and uses it to run the chain when its 'func' method is
 * called.
 */
class ChainTool extends dynamic_js_1.DynamicTool {
    static lc_name() {
        return "ChainTool";
    }
    constructor({ chain, ...rest }) {
        super({
            ...rest,
            func: async (input, runManager) => chain.run(input, runManager?.getChild()),
        });
        Object.defineProperty(this, "chain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.chain = chain;
    }
}
exports.ChainTool = ChainTool;
