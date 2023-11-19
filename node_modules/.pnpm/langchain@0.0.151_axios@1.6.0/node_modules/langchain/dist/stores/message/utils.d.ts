import { BaseMessage, StoredMessage } from "../../schema/index.js";
interface StoredMessageV1 {
    type: string;
    role: string | undefined;
    text: string;
}
/**
 * Maps messages from an older format (V1) to the current `StoredMessage`
 * format. If the message is already in the `StoredMessage` format, it is
 * returned as is. Otherwise, it transforms the V1 message into a
 * `StoredMessage`. This function is important for maintaining
 * compatibility with older message formats.
 */
export declare function mapV1MessageToStoredMessage(message: StoredMessage | StoredMessageV1): StoredMessage;
/**
 * Transforms an array of `StoredMessage` instances into an array of
 * `BaseMessage` instances. It uses the `mapV1MessageToStoredMessage`
 * function to ensure all messages are in the `StoredMessage` format, then
 * creates new instances of the appropriate `BaseMessage` subclass based
 * on the type of each message. This function is used to prepare stored
 * messages for use in a chat context.
 */
export declare function mapStoredMessagesToChatMessages(messages: StoredMessage[]): BaseMessage[];
/**
 * Transforms an array of `BaseMessage` instances into an array of
 * `StoredMessage` instances. It does this by calling the `toDict` method
 * on each `BaseMessage`, which returns a `StoredMessage`. This function
 * is used to prepare chat messages for storage.
 */
export declare function mapChatMessagesToStoredMessages(messages: BaseMessage[]): StoredMessage[];
export {};
