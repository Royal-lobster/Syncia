import type { AppOptions } from "firebase-admin";
import { BaseMessage, BaseListChatMessageHistory } from "../../schema/index.js";
/**
 * Interface for FirestoreDBChatMessageHistory. It includes the collection
 * name, session ID, user ID, and optionally, the app index and
 * configuration for the Firebase app.
 */
export interface FirestoreDBChatMessageHistory {
    collectionName: string;
    sessionId: string;
    userId: string;
    appIdx?: number;
    config?: AppOptions;
}
/**
 * Class for managing chat message history using Google's Firestore as a
 * storage backend. Extends the BaseListChatMessageHistory class.
 */
export declare class FirestoreChatMessageHistory extends BaseListChatMessageHistory {
    lc_namespace: string[];
    private collectionName;
    private sessionId;
    private userId;
    private appIdx;
    private config;
    private firestoreClient;
    private document;
    constructor({ collectionName, sessionId, userId, appIdx, config, }: FirestoreDBChatMessageHistory);
    private ensureFirestore;
    /**
     * Method to retrieve all messages from the Firestore collection
     * associated with the current session. Returns an array of BaseMessage
     * objects.
     * @returns Array of stored messages
     */
    getMessages(): Promise<BaseMessage[]>;
    /**
     * Method to add a new message to the Firestore collection. The message is
     * passed as a BaseMessage object.
     * @param message The message to be added as a BaseMessage object.
     */
    addMessage(message: BaseMessage): Promise<void>;
    private upsertMessage;
    /**
     * Method to delete all messages from the Firestore collection associated
     * with the current session.
     */
    clear(): Promise<void>;
}
