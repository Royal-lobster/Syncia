import { Serializable } from "../load/serializable.js";
export const RUN_KEY = "__run";
/**
 * Chunk of a single generation. Used for streaming.
 */
export class GenerationChunk {
    constructor(fields) {
        Object.defineProperty(this, "text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "generationInfo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.text = fields.text;
        this.generationInfo = fields.generationInfo;
    }
    concat(chunk) {
        return new GenerationChunk({
            text: this.text + chunk.text,
            generationInfo: {
                ...this.generationInfo,
                ...chunk.generationInfo,
            },
        });
    }
}
/**
 * Base class for all types of messages in a conversation. It includes
 * properties like `content`, `name`, and `additional_kwargs`. It also
 * includes methods like `toDict()` and `_getType()`.
 */
export class BaseMessage extends Serializable {
    /**
     * @deprecated
     * Use {@link BaseMessage.content} instead.
     */
    get text() {
        return this.content;
    }
    constructor(fields, 
    /** @deprecated */
    kwargs) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign
            fields = { content: fields, additional_kwargs: kwargs };
        }
        // Make sure the default value for additional_kwargs is passed into super() for serialization
        if (!fields.additional_kwargs) {
            // eslint-disable-next-line no-param-reassign
            fields.additional_kwargs = {};
        }
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /** The text of the message. */
        Object.defineProperty(this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** The name of the message sender in a multi-user chat. */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** Additional keyword arguments */
        Object.defineProperty(this, "additional_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = fields.name;
        this.content = fields.content;
        this.additional_kwargs = fields.additional_kwargs;
    }
    toDict() {
        return {
            type: this._getType(),
            data: this.toJSON()
                .kwargs,
        };
    }
}
/**
 * Represents a chunk of a message, which can be concatenated with other
 * message chunks. It includes a method `_merge_kwargs_dict()` for merging
 * additional keyword arguments from another `BaseMessageChunk` into this
 * one. It also overrides the `__add__()` method to support concatenation
 * of `BaseMessageChunk` instances.
 */
export class BaseMessageChunk extends BaseMessage {
    static _mergeAdditionalKwargs(left, right) {
        const merged = { ...left };
        for (const [key, value] of Object.entries(right)) {
            if (merged[key] === undefined) {
                merged[key] = value;
            }
            else if (typeof merged[key] !== typeof value) {
                throw new Error(`additional_kwargs[${key}] already exists in the message chunk, but with a different type.`);
            }
            else if (typeof merged[key] === "string") {
                merged[key] = merged[key] + value;
            }
            else if (!Array.isArray(merged[key]) &&
                typeof merged[key] === "object") {
                merged[key] = this._mergeAdditionalKwargs(merged[key], value);
            }
            else {
                throw new Error(`additional_kwargs[${key}] already exists in this message chunk.`);
            }
        }
        return merged;
    }
}
/**
 * Represents a human message in a conversation.
 */
export class HumanMessage extends BaseMessage {
    static lc_name() {
        return "HumanMessage";
    }
    _getType() {
        return "human";
    }
}
/**
 * Represents a chunk of a human message, which can be concatenated with
 * other human message chunks.
 */
export class HumanMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "HumanMessageChunk";
    }
    _getType() {
        return "human";
    }
    concat(chunk) {
        return new HumanMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: HumanMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs),
        });
    }
}
/**
 * Represents an AI message in a conversation.
 */
export class AIMessage extends BaseMessage {
    static lc_name() {
        return "AIMessage";
    }
    _getType() {
        return "ai";
    }
}
/**
 * Represents a chunk of an AI message, which can be concatenated with
 * other AI message chunks.
 */
export class AIMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "AIMessageChunk";
    }
    _getType() {
        return "ai";
    }
    concat(chunk) {
        return new AIMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: AIMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs),
        });
    }
}
/**
 * Represents a system message in a conversation.
 */
export class SystemMessage extends BaseMessage {
    static lc_name() {
        return "SystemMessage";
    }
    _getType() {
        return "system";
    }
}
/**
 * Represents a chunk of a system message, which can be concatenated with
 * other system message chunks.
 */
export class SystemMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "SystemMessageChunk";
    }
    _getType() {
        return "system";
    }
    concat(chunk) {
        return new SystemMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: SystemMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs),
        });
    }
}
/**
 * @deprecated
 * Use {@link BaseMessage} instead.
 */
export const BaseChatMessage = BaseMessage;
/**
 * @deprecated
 * Use {@link HumanMessage} instead.
 */
export const HumanChatMessage = HumanMessage;
/**
 * @deprecated
 * Use {@link AIMessage} instead.
 */
export const AIChatMessage = AIMessage;
/**
 * @deprecated
 * Use {@link SystemMessage} instead.
 */
export const SystemChatMessage = SystemMessage;
/**
 * Represents a function message in a conversation.
 */
export class FunctionMessage extends BaseMessage {
    static lc_name() {
        return "FunctionMessage";
    }
    constructor(fields, 
    /** @deprecated */
    name) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = { content: fields, name: name };
        }
        super(fields);
    }
    _getType() {
        return "function";
    }
}
/**
 * Represents a chunk of a function message, which can be concatenated
 * with other function message chunks.
 */
export class FunctionMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "FunctionMessageChunk";
    }
    _getType() {
        return "function";
    }
    concat(chunk) {
        return new FunctionMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: FunctionMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs),
            name: this.name ?? "",
        });
    }
}
/**
 * Represents a chat message in a conversation.
 */
export class ChatMessage extends BaseMessage {
    static lc_name() {
        return "ChatMessage";
    }
    constructor(fields, role) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = { content: fields, role: role };
        }
        super(fields);
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.role = fields.role;
    }
    _getType() {
        return "generic";
    }
    static isInstance(message) {
        return message._getType() === "generic";
    }
}
export function isBaseMessage(messageLike) {
    return typeof messageLike._getType === "function";
}
export function coerceMessageLikeToMessage(messageLike) {
    if (typeof messageLike === "string") {
        return new HumanMessage(messageLike);
    }
    else if (isBaseMessage(messageLike)) {
        return messageLike;
    }
    const [type, content] = messageLike;
    if (type === "human" || type === "user") {
        return new HumanMessage({ content });
    }
    else if (type === "ai" || type === "assistant") {
        return new AIMessage({ content });
    }
    else if (type === "system") {
        return new SystemMessage({ content });
    }
    else {
        throw new Error(`Unable to coerce message from array: only human, AI, or system message coercion is currently supported.`);
    }
}
/**
 * Represents a chunk of a chat message, which can be concatenated with
 * other chat message chunks.
 */
export class ChatMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "ChatMessageChunk";
    }
    constructor(fields, role) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = { content: fields, role: role };
        }
        super(fields);
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.role = fields.role;
    }
    _getType() {
        return "generic";
    }
    concat(chunk) {
        return new ChatMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: ChatMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs),
            role: this.role,
        });
    }
}
export class ChatGenerationChunk extends GenerationChunk {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.message = fields.message;
    }
    concat(chunk) {
        return new ChatGenerationChunk({
            text: this.text + chunk.text,
            generationInfo: {
                ...this.generationInfo,
                ...chunk.generationInfo,
            },
            message: this.message.concat(chunk.message),
        });
    }
}
/**
 * Base PromptValue class. All prompt values should extend this class.
 */
export class BasePromptValue extends Serializable {
}
/**
 * Base class for all chat message histories. All chat message histories
 * should extend this class.
 */
export class BaseChatMessageHistory extends Serializable {
}
/**
 * Base class for all list chat message histories. All list chat message
 * histories should extend this class.
 */
export class BaseListChatMessageHistory extends Serializable {
    addUserMessage(message) {
        return this.addMessage(new HumanMessage(message));
    }
    addAIChatMessage(message) {
        return this.addMessage(new AIMessage(message));
    }
}
/**
 * Base class for all caches. All caches should extend this class.
 */
export class BaseCache {
}
/**
 * Base class for all file stores. All file stores should extend this
 * class.
 */
export class BaseFileStore extends Serializable {
}
/**
 * Base class for all entity stores. All entity stores should extend this
 * class.
 */
export class BaseEntityStore extends Serializable {
}
/**
 * Abstract class for a document store. All document stores should extend
 * this class.
 */
export class Docstore {
}
