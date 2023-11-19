import { CallbackManager, } from "../../callbacks/manager.js";
export async function getCallbackMangerForConfig(config) {
    return CallbackManager.configure(config?.callbacks, undefined, config?.tags, undefined, config?.metadata);
}
