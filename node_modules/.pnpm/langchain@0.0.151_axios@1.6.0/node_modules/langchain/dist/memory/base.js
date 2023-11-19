/**
 * Abstract base class for memory in LangChain's Chains. Memory refers to
 * the state in Chains. It can be used to store information about past
 * executions of a Chain and inject that information into the inputs of
 * future executions of the Chain.
 */
export class BaseMemory {
}
const getValue = (values, key) => {
    if (key !== undefined) {
        return values[key];
    }
    const keys = Object.keys(values);
    if (keys.length === 1) {
        return values[keys[0]];
    }
};
/**
 * This function is used by memory classes to select the input value
 * to use for the memory. If there is only one input value, it is used.
 * If there are multiple input values, the inputKey must be specified.
 */
export const getInputValue = (inputValues, inputKey) => {
    const value = getValue(inputValues, inputKey);
    if (!value) {
        const keys = Object.keys(inputValues);
        throw new Error(`input values have ${keys.length} keys, you must specify an input key or pass only 1 key as input`);
    }
    return value;
};
/**
 * This function is used by memory classes to select the output value
 * to use for the memory. If there is only one output value, it is used.
 * If there are multiple output values, the outputKey must be specified.
 * If no outputKey is specified, an error is thrown.
 */
export const getOutputValue = (outputValues, outputKey) => {
    const value = getValue(outputValues, outputKey);
    if (!value) {
        const keys = Object.keys(outputValues);
        throw new Error(`output values have ${keys.length} keys, you must specify an output key or pass only 1 key as output`);
    }
    return value;
};
/**
 * This function is used by memory classes to get a string representation
 * of the chat message history, based on the message content and role.
 */
export function getBufferString(messages, humanPrefix = "Human", aiPrefix = "AI") {
    const string_messages = [];
    for (const m of messages) {
        let role;
        if (m._getType() === "human") {
            role = humanPrefix;
        }
        else if (m._getType() === "ai") {
            role = aiPrefix;
        }
        else if (m._getType() === "system") {
            role = "System";
        }
        else if (m._getType() === "function") {
            role = "Function";
        }
        else if (m._getType() === "generic") {
            role = m.role;
        }
        else {
            throw new Error(`Got unsupported message type: ${m}`);
        }
        const nameStr = m.name ? `${m.name}, ` : "";
        string_messages.push(`${role}: ${nameStr}${m.content}`);
    }
    return string_messages.join("\n");
}
/**
 * Function used by memory classes to get the key of the prompt input,
 * excluding any keys that are memory variables or the "stop" key. If
 * there is not exactly one prompt input key, an error is thrown.
 */
export function getPromptInputKey(inputs, memoryVariables) {
    const promptInputKeys = Object.keys(inputs).filter((key) => !memoryVariables.includes(key) && key !== "stop");
    if (promptInputKeys.length !== 1) {
        throw new Error(`One input key expected, but got ${promptInputKeys.length}`);
    }
    return promptInputKeys[0];
}
