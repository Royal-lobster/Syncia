"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZapierToolKit = void 0;
const base_js_1 = require("../base.cjs");
const zapier_js_1 = require("../../../tools/zapier.cjs");
/**
 * Represents a toolkit for working with Zapier actions. It extends the
 * Toolkit class and provides functionality for managing Zapier tools.
 */
class ZapierToolKit extends base_js_1.Toolkit {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    /**
     * Creates a ZapierToolKit instance based on a ZapierNLAWrapper instance.
     * It retrieves the list of available actions from the ZapierNLAWrapper
     * and creates a ZapierNLARunAction tool for each action. The created
     * tools are added to the tools property of the ZapierToolKit instance.
     * @param zapierNLAWrapper The ZapierNLAWrapper instance to create the ZapierToolKit from.
     * @returns A Promise that resolves to a ZapierToolKit instance.
     */
    static async fromZapierNLAWrapper(zapierNLAWrapper) {
        const toolkit = new ZapierToolKit();
        const actions = await zapierNLAWrapper.listActions();
        for (const action of actions) {
            const tool = new zapier_js_1.ZapierNLARunAction(zapierNLAWrapper, action.id, action.description, action.params);
            toolkit.tools.push(tool);
        }
        return toolkit;
    }
}
exports.ZapierToolKit = ZapierToolKit;
