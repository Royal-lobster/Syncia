import { BaseCallbackConfig } from "../callbacks/manager.js";
import { BaseMessage, BaseMessageLike, BasePromptValue, InputValues, PartialValues } from "../schema/index.js";
import { Runnable } from "../schema/runnable/index.js";
import { BasePromptTemplate, BasePromptTemplateInput, BaseStringPromptTemplate, TypedPromptInputValues } from "./base.js";
/**
 * Abstract class that serves as a base for creating message prompt
 * templates. It defines how to format messages for different roles in a
 * conversation.
 */
export declare abstract class BaseMessagePromptTemplate<RunInput extends InputValues = any, RunOutput extends BaseMessage[] = BaseMessage[]> extends Runnable<RunInput, RunOutput> {
    lc_namespace: string[];
    lc_serializable: boolean;
    abstract inputVariables: Array<Extract<keyof RunInput, string>>;
    /**
     * Method that takes an object of TypedPromptInputValues and returns a
     * promise that resolves to an array of BaseMessage instances.
     * @param values Object of TypedPromptInputValues
     * @returns Formatted array of BaseMessages
     */
    abstract formatMessages(values: TypedPromptInputValues<RunInput>): Promise<RunOutput>;
    /**
     * Calls the formatMessages method with the provided input and options.
     * @param input Input for the formatMessages method
     * @param options Optional BaseCallbackConfig
     * @returns Formatted output messages
     */
    invoke(input: RunInput, options?: BaseCallbackConfig): Promise<RunOutput>;
}
/**
 * Interface for the fields of a ChatPromptValue.
 */
export interface ChatPromptValueFields {
    messages: BaseMessage[];
}
/**
 * Class that represents a chat prompt value. It extends the
 * BasePromptValue and includes an array of BaseMessage instances.
 */
export declare class ChatPromptValue extends BasePromptValue {
    lc_namespace: string[];
    lc_serializable: boolean;
    static lc_name(): string;
    messages: BaseMessage[];
    constructor(messages: BaseMessage[]);
    constructor(fields: ChatPromptValueFields);
    toString(): string;
    toChatMessages(): BaseMessage[];
}
/**
 * Interface for the fields of a MessagePlaceholder.
 */
export interface MessagePlaceholderFields<T extends string> {
    variableName: T;
}
/**
 * Class that represents a placeholder for messages in a chat prompt. It
 * extends the BaseMessagePromptTemplate.
 */
export declare class MessagesPlaceholder<RunInput extends InputValues = any> extends BaseMessagePromptTemplate<RunInput> {
    static lc_name(): string;
    variableName: Extract<keyof RunInput, string>;
    constructor(variableName: Extract<keyof RunInput, string>);
    constructor(fields: MessagePlaceholderFields<Extract<keyof RunInput, string>>);
    get inputVariables(): Extract<keyof RunInput, string>[];
    formatMessages(values: TypedPromptInputValues<RunInput>): Promise<BaseMessage[]>;
}
/**
 * Interface for the fields of a MessageStringPromptTemplate.
 */
export interface MessageStringPromptTemplateFields<T extends InputValues = any> {
    prompt: BaseStringPromptTemplate<T, string>;
}
/**
 * Abstract class that serves as a base for creating message string prompt
 * templates. It extends the BaseMessagePromptTemplate.
 */
export declare abstract class BaseMessageStringPromptTemplate<RunInput extends InputValues = any> extends BaseMessagePromptTemplate<RunInput> {
    prompt: BaseStringPromptTemplate<InputValues<Extract<keyof RunInput, string>>, string>;
    constructor(prompt: BaseStringPromptTemplate<InputValues<Extract<keyof RunInput, string>>>);
    constructor(fields: MessageStringPromptTemplateFields<InputValues<Extract<keyof RunInput, string>>>);
    get inputVariables(): Extract<Extract<keyof RunInput, string>, string>[];
    abstract format(values: TypedPromptInputValues<RunInput>): Promise<BaseMessage>;
    formatMessages(values: TypedPromptInputValues<RunInput>): Promise<BaseMessage[]>;
}
/**
 * Abstract class that serves as a base for creating chat prompt
 * templates. It extends the BasePromptTemplate.
 */
export declare abstract class BaseChatPromptTemplate<RunInput extends InputValues = any, PartialVariableName extends string = any> extends BasePromptTemplate<RunInput, ChatPromptValue, PartialVariableName> {
    constructor(input: BasePromptTemplateInput<RunInput, PartialVariableName>);
    abstract formatMessages(values: TypedPromptInputValues<RunInput>): Promise<BaseMessage[]>;
    format(values: TypedPromptInputValues<RunInput>): Promise<string>;
    formatPromptValue(values: TypedPromptInputValues<RunInput>): Promise<ChatPromptValue>;
}
/**
 * Interface for the fields of a ChatMessagePromptTemplate.
 */
export interface ChatMessagePromptTemplateFields<T extends InputValues = any> extends MessageStringPromptTemplateFields<T> {
    role: string;
}
/**
 * Class that represents a chat message prompt template. It extends the
 * BaseMessageStringPromptTemplate.
 */
export declare class ChatMessagePromptTemplate<RunInput extends InputValues = any> extends BaseMessageStringPromptTemplate<RunInput> {
    static lc_name(): string;
    role: string;
    constructor(prompt: BaseStringPromptTemplate<InputValues<Extract<keyof RunInput, string>>>, role: string);
    constructor(fields: ChatMessagePromptTemplateFields<InputValues<Extract<keyof RunInput, string>>>);
    format(values: RunInput): Promise<BaseMessage>;
    static fromTemplate(template: string, role: string): ChatMessagePromptTemplate<any>;
}
/**
 * Class that represents a human message prompt template. It extends the
 * BaseMessageStringPromptTemplate.
 */
export declare class HumanMessagePromptTemplate<RunInput extends InputValues = any> extends BaseMessageStringPromptTemplate<RunInput> {
    static lc_name(): string;
    format(values: RunInput): Promise<BaseMessage>;
    static fromTemplate(template: string): HumanMessagePromptTemplate<any>;
}
/**
 * Class that represents an AI message prompt template. It extends the
 * BaseMessageStringPromptTemplate.
 */
export declare class AIMessagePromptTemplate<RunInput extends InputValues = any> extends BaseMessageStringPromptTemplate<RunInput> {
    static lc_name(): string;
    format(values: RunInput): Promise<BaseMessage>;
    static fromTemplate(template: string): AIMessagePromptTemplate<any>;
}
/**
 * Class that represents a system message prompt template. It extends the
 * BaseMessageStringPromptTemplate.
 */
export declare class SystemMessagePromptTemplate<RunInput extends InputValues = any> extends BaseMessageStringPromptTemplate<RunInput> {
    static lc_name(): string;
    format(values: RunInput): Promise<BaseMessage>;
    static fromTemplate(template: string): SystemMessagePromptTemplate<any>;
}
/**
 * Interface for the input of a ChatPromptTemplate.
 */
export interface ChatPromptTemplateInput<RunInput extends InputValues = any, PartialVariableName extends string = any> extends BasePromptTemplateInput<RunInput, PartialVariableName> {
    /**
     * The prompt messages
     */
    promptMessages: Array<BaseMessagePromptTemplate | BaseMessage>;
    /**
     * Whether to try validating the template on initialization
     *
     * @defaultValue `true`
     */
    validateTemplate?: boolean;
}
export type BaseMessagePromptTemplateLike = BaseMessagePromptTemplate | BaseMessageLike;
/**
 * Class that represents a chat prompt. It extends the
 * BaseChatPromptTemplate and uses an array of BaseMessagePromptTemplate
 * instances to format a series of messages for a conversation.
 */
export declare class ChatPromptTemplate<RunInput extends InputValues = any, PartialVariableName extends string = any> extends BaseChatPromptTemplate<RunInput, PartialVariableName> implements ChatPromptTemplateInput<RunInput, PartialVariableName> {
    static lc_name(): string;
    get lc_aliases(): {
        promptMessages: string;
    };
    promptMessages: Array<BaseMessagePromptTemplate | BaseMessage>;
    validateTemplate: boolean;
    constructor(input: ChatPromptTemplateInput<RunInput, PartialVariableName>);
    _getPromptType(): "chat";
    formatMessages(values: TypedPromptInputValues<RunInput>): Promise<BaseMessage[]>;
    partial<NewPartialVariableName extends string>(values: PartialValues<NewPartialVariableName>): Promise<ChatPromptTemplate<InputValues<Exclude<Extract<keyof RunInput, string>, NewPartialVariableName>>, any>>;
    static fromPromptMessages<RunInput extends InputValues = any>(promptMessages: (ChatPromptTemplate<InputValues, string> | BaseMessagePromptTemplateLike)[]): ChatPromptTemplate<RunInput>;
}
