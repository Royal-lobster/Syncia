import { BaseCallbackConfig, CallbackManager } from "../../callbacks/manager.js";
export type RunnableConfig = BaseCallbackConfig;
export declare function getCallbackMangerForConfig(config?: RunnableConfig): Promise<CallbackManager | undefined>;
