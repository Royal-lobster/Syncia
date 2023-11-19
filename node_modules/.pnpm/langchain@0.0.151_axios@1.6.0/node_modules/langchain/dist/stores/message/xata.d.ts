import { BaseClient, BaseClientOptions } from "@xata.io/client";
import { BaseMessage, BaseListChatMessageHistory } from "../../schema/index.js";
/**
 * An object type that represents the input for the XataChatMessageHistory
 * class.
 */
export type XataChatMessageHistoryInput<XataClient> = {
    sessionId: string;
    config?: BaseClientOptions;
    client?: XataClient;
    table?: string;
    createTable?: boolean;
    apiKey?: string;
};
/**
 * A class for managing chat message history using Xata.io client. It
 * extends the BaseListChatMessageHistory class and provides methods to
 * get, add, and clear messages. It also ensures the existence of a table
 * where the chat messages are stored.
 */
export declare class XataChatMessageHistory<XataClient extends BaseClient> extends BaseListChatMessageHistory {
    lc_namespace: string[];
    client: XataClient;
    private sessionId;
    private table;
    private tableInitialized;
    private createTable;
    private apiClient;
    constructor(fields: XataChatMessageHistoryInput<XataClient>);
    /**
     * Retrieves all messages associated with the session ID, ordered by
     * creation time.
     * @returns A promise that resolves to an array of BaseMessage instances.
     */
    getMessages(): Promise<BaseMessage[]>;
    /**
     * Adds a new message to the database.
     * @param message The BaseMessage instance to be added.
     * @returns A promise that resolves when the message has been added.
     */
    addMessage(message: BaseMessage): Promise<void>;
    /**
     * Deletes all messages associated with the session ID.
     * @returns A promise that resolves when the messages have been deleted.
     */
    clear(): Promise<void>;
    /**
     * Checks if the table exists and creates it if it doesn't. This method is
     * called before any operation on the table.
     * @returns A promise that resolves when the table has been ensured.
     */
    private ensureTable;
}
