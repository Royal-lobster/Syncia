import type { OpenAI as OpenAIClient } from "openai";
import { Document } from "../document.js";
import { Serializable } from "../load/serializable.js";
export declare const RUN_KEY = "__run";
export type Example = Record<string, string>;
export type InputValues<K extends string = string> = Record<K, any>;
export type PartialValues<K extends string = string> = Record<K, string | (() => Promise<string>) | (() => string)>;
/**
 * Output of a single generation.
 */
export interface Generation {
    /**
     * Generated text output
     */
    text: string;
    /**
     * Raw generation info response from the provider.
     * May include things like reason for finishing (e.g. in {@link OpenAI})
     */
    generationInfo?: Record<string, any>;
}
export type GenerationChunkFields = {
    text: string;
    generationInfo?: Record<string, any>;
};
/**
 * Chunk of a single generation. Used for streaming.
 */
export declare class GenerationChunk implements Generation {
    text: string;
    generationInfo?: Record<string, any>;
    constructor(fields: GenerationChunkFields);
    concat(chunk: GenerationChunk): GenerationChunk;
}
/**
 * Contains all relevant information returned by an LLM.
 */
export type LLMResult = {
    /**
     * List of the things generated. Each input could have multiple {@link Generation | generations}, hence this is a list of lists.
     */
    generations: Generation[][];
    /**
     * Dictionary of arbitrary LLM-provider specific output.
     */
    llmOutput?: Record<string, any>;
    /**
     * Dictionary of run metadata
     */
    [RUN_KEY]?: Record<string, any>;
};
export interface StoredMessageData {
    content: string;
    role: string | undefined;
    name: string | undefined;
    additional_kwargs?: Record<string, any>;
}
export interface StoredMessage {
    type: string;
    data: StoredMessageData;
}
export type MessageType = "human" | "ai" | "generic" | "system" | "function";
export interface BaseMessageFields {
    content: string;
    name?: string;
    additional_kwargs?: {
        function_call?: OpenAIClient.Chat.ChatCompletionMessage.FunctionCall;
        [key: string]: unknown;
    };
}
export interface ChatMessageFieldsWithRole extends BaseMessageFields {
    role: string;
}
export interface FunctionMessageFieldsWithName extends BaseMessageFields {
    name: string;
}
/**
 * Base class for all types of messages in a conversation. It includes
 * properties like `content`, `name`, and `additional_kwargs`. It also
 * includes methods like `toDict()` and `_getType()`.
 */
export declare abstract class BaseMessage extends Serializable implements BaseMessageFields {
    lc_namespace: string[];
    lc_serializable: boolean;
    /**
     * @deprecated
     * Use {@link BaseMessage.content} instead.
     */
    get text(): string;
    /** The text of the message. */
    content: string;
    /** The name of the message sender in a multi-user chat. */
    name?: string;
    /** Additional keyword arguments */
    additional_kwargs: NonNullable<BaseMessageFields["additional_kwargs"]>;
    /** The type of the message. */
    abstract _getType(): MessageType;
    constructor(fields: string | BaseMessageFields, 
    /** @deprecated */
    kwargs?: Record<string, unknown>);
    toDict(): StoredMessage;
}
/**
 * Represents a chunk of a message, which can be concatenated with other
 * message chunks. It includes a method `_merge_kwargs_dict()` for merging
 * additional keyword arguments from another `BaseMessageChunk` into this
 * one. It also overrides the `__add__()` method to support concatenation
 * of `BaseMessageChunk` instances.
 */
export declare abstract class BaseMessageChunk extends BaseMessage {
    abstract concat(chunk: BaseMessageChunk): BaseMessageChunk;
    static _mergeAdditionalKwargs(left: NonNullable<BaseMessageFields["additional_kwargs"]>, right: NonNullable<BaseMessageFields["additional_kwargs"]>): NonNullable<BaseMessageFields["additional_kwargs"]>;
}
/**
 * Represents a human message in a conversation.
 */
export declare class HumanMessage extends BaseMessage {
    static lc_name(): string;
    _getType(): MessageType;
}
/**
 * Represents a chunk of a human message, which can be concatenated with
 * other human message chunks.
 */
export declare class HumanMessageChunk extends BaseMessageChunk {
    static lc_name(): string;
    _getType(): MessageType;
    concat(chunk: HumanMessageChunk): HumanMessageChunk;
}
/**
 * Represents an AI message in a conversation.
 */
export declare class AIMessage extends BaseMessage {
    static lc_name(): string;
    _getType(): MessageType;
}
/**
 * Represents a chunk of an AI message, which can be concatenated with
 * other AI message chunks.
 */
export declare class AIMessageChunk extends BaseMessageChunk {
    static lc_name(): string;
    _getType(): MessageType;
    concat(chunk: AIMessageChunk): AIMessageChunk;
}
/**
 * Represents a system message in a conversation.
 */
export declare class SystemMessage extends BaseMessage {
    static lc_name(): string;
    _getType(): MessageType;
}
/**
 * Represents a chunk of a system message, which can be concatenated with
 * other system message chunks.
 */
export declare class SystemMessageChunk extends BaseMessageChunk {
    static lc_name(): string;
    _getType(): MessageType;
    concat(chunk: SystemMessageChunk): SystemMessageChunk;
}
/**
 * @deprecated
 * Use {@link BaseMessage} instead.
 */
export declare const BaseChatMessage: typeof BaseMessage;
/**
 * @deprecated
 * Use {@link HumanMessage} instead.
 */
export declare const HumanChatMessage: typeof HumanMessage;
/**
 * @deprecated
 * Use {@link AIMessage} instead.
 */
export declare const AIChatMessage: typeof AIMessage;
/**
 * @deprecated
 * Use {@link SystemMessage} instead.
 */
export declare const SystemChatMessage: typeof SystemMessage;
/**
 * Represents a function message in a conversation.
 */
export declare class FunctionMessage extends BaseMessage {
    static lc_name(): string;
    constructor(fields: FunctionMessageFieldsWithName);
    constructor(fields: string | BaseMessageFields, 
    /** @deprecated */
    name: string);
    _getType(): MessageType;
}
/**
 * Represents a chunk of a function message, which can be concatenated
 * with other function message chunks.
 */
export declare class FunctionMessageChunk extends BaseMessageChunk {
    static lc_name(): string;
    _getType(): MessageType;
    concat(chunk: FunctionMessageChunk): FunctionMessageChunk;
}
/**
 * Represents a chat message in a conversation.
 */
export declare class ChatMessage extends BaseMessage implements ChatMessageFieldsWithRole {
    static lc_name(): string;
    role: string;
    constructor(content: string, role: string);
    constructor(fields: ChatMessageFieldsWithRole);
    _getType(): MessageType;
    static isInstance(message: BaseMessage): message is ChatMessage;
}
export type BaseMessageLike = BaseMessage | [
    MessageType | "user" | "assistant" | (string & Record<never, never>),
    string
] | string;
export declare function isBaseMessage(messageLike: BaseMessageLike): messageLike is BaseMessage;
export declare function coerceMessageLikeToMessage(messageLike: BaseMessageLike): BaseMessage;
/**
 * Represents a chunk of a chat message, which can be concatenated with
 * other chat message chunks.
 */
export declare class ChatMessageChunk extends BaseMessageChunk {
    static lc_name(): string;
    role: string;
    constructor(content: string, role: string);
    constructor(fields: ChatMessageFieldsWithRole);
    _getType(): MessageType;
    concat(chunk: ChatMessageChunk): ChatMessageChunk;
}
export interface ChatGeneration extends Generation {
    message: BaseMessage;
}
export type ChatGenerationChunkFields = GenerationChunkFields & {
    message: BaseMessageChunk;
};
export declare class ChatGenerationChunk extends GenerationChunk implements ChatGeneration {
    message: BaseMessageChunk;
    constructor(fields: ChatGenerationChunkFields);
    concat(chunk: ChatGenerationChunk): ChatGenerationChunk;
}
export interface ChatResult {
    generations: ChatGeneration[];
    llmOutput?: Record<string, any>;
}
/**
 * Base PromptValue class. All prompt values should extend this class.
 */
export declare abstract class BasePromptValue extends Serializable {
    abstract toString(): string;
    abstract toChatMessages(): BaseMessage[];
}
export type AgentAction = {
    tool: string;
    toolInput: string;
    log: string;
};
export type AgentFinish = {
    returnValues: Record<string, any>;
    log: string;
};
export type AgentStep = {
    action: AgentAction;
    observation: string;
};
export type ChainValues = Record<string, any>;
/**
 * Base class for all chat message histories. All chat message histories
 * should extend this class.
 */
export declare abstract class BaseChatMessageHistory extends Serializable {
    abstract getMessages(): Promise<BaseMessage[]>;
    abstract addMessage(message: BaseMessage): Promise<void>;
    abstract addUserMessage(message: string): Promise<void>;
    abstract addAIChatMessage(message: string): Promise<void>;
    abstract clear(): Promise<void>;
}
/**
 * Base class for all list chat message histories. All list chat message
 * histories should extend this class.
 */
export declare abstract class BaseListChatMessageHistory extends Serializable {
    abstract addMessage(message: BaseMessage): Promise<void>;
    addUserMessage(message: string): Promise<void>;
    addAIChatMessage(message: string): Promise<void>;
}
/**
 * Base class for all caches. All caches should extend this class.
 */
export declare abstract class BaseCache<T = Generation[]> {
    abstract lookup(prompt: string, llmKey: string): Promise<T | null>;
    abstract update(prompt: string, llmKey: string, value: T): Promise<void>;
}
/**
 * Base class for all file stores. All file stores should extend this
 * class.
 */
export declare abstract class BaseFileStore extends Serializable {
    abstract readFile(path: string): Promise<string>;
    abstract writeFile(path: string, contents: string): Promise<void>;
}
/**
 * Base class for all entity stores. All entity stores should extend this
 * class.
 */
export declare abstract class BaseEntityStore extends Serializable {
    abstract get(key: string, defaultValue?: string): Promise<string | undefined>;
    abstract set(key: string, value?: string): Promise<void>;
    abstract delete(key: string): Promise<void>;
    abstract exists(key: string): Promise<boolean>;
    abstract clear(): Promise<void>;
}
/**
 * Abstract class for a document store. All document stores should extend
 * this class.
 */
export declare abstract class Docstore {
    abstract search(search: string): Promise<Document>;
    abstract add(texts: Record<string, Document>): Promise<void>;
}
