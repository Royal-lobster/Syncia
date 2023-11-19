"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapOpenAIClientError = void 0;
const openai_1 = require("openai");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapOpenAIClientError(e) {
    let error;
    if (e.constructor.name === openai_1.APIConnectionTimeoutError.name) {
        error = new Error(e.message);
        error.name = "TimeoutError";
    }
    else if (e.constructor.name === openai_1.APIUserAbortError.name) {
        error = new Error(e.message);
        error.name = "AbortError";
    }
    else {
        error = e;
    }
    return error;
}
exports.wrapOpenAIClientError = wrapOpenAIClientError;
