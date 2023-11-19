import { BaseLanguageModel } from "../base_language/index.js";
import { SerializedChatVectorDBQAChain } from "./serde.js";
import { ChainValues, BaseMessage } from "../schema/index.js";
import { BaseRetriever } from "../schema/retriever.js";
import { BaseChain, ChainInputs } from "./base.js";
import { LLMChain } from "./llm_chain.js";
import { QAChainParams } from "./question_answering/load.js";
import { CallbackManagerForChainRun } from "../callbacks/manager.js";
export type LoadValues = Record<string, any>;
/**
 * Interface for the input parameters of the
 * ConversationalRetrievalQAChain class.
 */
export interface ConversationalRetrievalQAChainInput extends ChainInputs {
    retriever: BaseRetriever;
    combineDocumentsChain: BaseChain;
    questionGeneratorChain: LLMChain;
    returnSourceDocuments?: boolean;
    inputKey?: string;
}
/**
 * Class for conducting conversational question-answering tasks with a
 * retrieval component. Extends the BaseChain class and implements the
 * ConversationalRetrievalQAChainInput interface.
 */
export declare class ConversationalRetrievalQAChain extends BaseChain implements ConversationalRetrievalQAChainInput {
    static lc_name(): string;
    inputKey: string;
    chatHistoryKey: string;
    get inputKeys(): string[];
    get outputKeys(): string[];
    retriever: BaseRetriever;
    combineDocumentsChain: BaseChain;
    questionGeneratorChain: LLMChain;
    returnSourceDocuments: boolean;
    constructor(fields: ConversationalRetrievalQAChainInput);
    /**
     * Static method to convert the chat history input into a formatted
     * string.
     * @param chatHistory Chat history input which can be a string, an array of BaseMessage instances, or an array of string arrays.
     * @returns A formatted string representing the chat history.
     */
    static getChatHistoryString(chatHistory: string | BaseMessage[] | string[][]): string;
    /** @ignore */
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    _chainType(): string;
    static deserialize(_data: SerializedChatVectorDBQAChain, _values: LoadValues): Promise<ConversationalRetrievalQAChain>;
    serialize(): SerializedChatVectorDBQAChain;
    /**
     * Static method to create a new ConversationalRetrievalQAChain from a
     * BaseLanguageModel and a BaseRetriever.
     * @param llm {@link BaseLanguageModel} instance used to generate a new question.
     * @param retriever {@link BaseRetriever} instance used to retrieve relevant documents.
     * @param options.returnSourceDocuments Whether to return source documents in the final output
     * @param options.questionGeneratorChainOptions Options to initialize the standalone question generation chain used as the first internal step
     * @param options.qaChainOptions {@link QAChainParams} used to initialize the QA chain used as the second internal step
     * @returns A new instance of ConversationalRetrievalQAChain.
     */
    static fromLLM(llm: BaseLanguageModel, retriever: BaseRetriever, options?: {
        outputKey?: string;
        returnSourceDocuments?: boolean;
        /** @deprecated Pass in questionGeneratorChainOptions.template instead */
        questionGeneratorTemplate?: string;
        /** @deprecated Pass in qaChainOptions.prompt instead */
        qaTemplate?: string;
        questionGeneratorChainOptions?: {
            llm?: BaseLanguageModel;
            template?: string;
        };
        qaChainOptions?: QAChainParams;
    } & Omit<ConversationalRetrievalQAChainInput, "retriever" | "combineDocumentsChain" | "questionGeneratorChain">): ConversationalRetrievalQAChain;
}
