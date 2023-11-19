"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallbackMangerForConfig = void 0;
const manager_js_1 = require("../../callbacks/manager.cjs");
async function getCallbackMangerForConfig(config) {
    return manager_js_1.CallbackManager.configure(config?.callbacks, undefined, config?.tags, undefined, config?.metadata);
}
exports.getCallbackMangerForConfig = getCallbackMangerForConfig;
