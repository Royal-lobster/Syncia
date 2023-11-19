import { Toolkit } from "../base.js";
import { Tool } from "../../../tools/base.js";
import { ZapierNLAWrapper } from "../../../tools/zapier.js";
/**
 * Represents a toolkit for working with Zapier actions. It extends the
 * Toolkit class and provides functionality for managing Zapier tools.
 */
export declare class ZapierToolKit extends Toolkit {
    tools: Tool[];
    /**
     * Creates a ZapierToolKit instance based on a ZapierNLAWrapper instance.
     * It retrieves the list of available actions from the ZapierNLAWrapper
     * and creates a ZapierNLARunAction tool for each action. The created
     * tools are added to the tools property of the ZapierToolKit instance.
     * @param zapierNLAWrapper The ZapierNLAWrapper instance to create the ZapierToolKit from.
     * @returns A Promise that resolves to a ZapierToolKit instance.
     */
    static fromZapierNLAWrapper(zapierNLAWrapper: ZapierNLAWrapper): Promise<ZapierToolKit>;
}
