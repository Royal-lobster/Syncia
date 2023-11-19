import { BaseChain, ChainInputs } from "./base.js";
import { BaseLanguageModel } from "../base_language/index.js";
import { SerializedVectorDBQAChain } from "./serde.js";
import { ChainValues } from "../schema/index.js";
import { BaseRetriever } from "../schema/retriever.js";
import { StuffQAChainParams } from "./question_answering/load.js";
import { CallbackManagerForChainRun } from "../callbacks/manager.js";
export type LoadValues = Record<string, any>;
/**
 * Interface for the input parameters of the RetrievalQAChain class.
 */
export interface RetrievalQAChainInput extends Omit<ChainInputs, "memory"> {
    retriever: BaseRetriever;
    combineDocumentsChain: BaseChain;
    inputKey?: string;
    returnSourceDocuments?: boolean;
}
/**
 * Class representing a chain for performing question-answering tasks with
 * a retrieval component.
 */
export declare class RetrievalQAChain extends BaseChain implements RetrievalQAChainInput {
    static lc_name(): string;
    inputKey: string;
    get inputKeys(): string[];
    get outputKeys(): string[];
    retriever: BaseRetriever;
    combineDocumentsChain: BaseChain;
    returnSourceDocuments: boolean;
    constructor(fields: RetrievalQAChainInput);
    /** @ignore */
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    _chainType(): "retrieval_qa";
    static deserialize(_data: SerializedVectorDBQAChain, _values: LoadValues): Promise<RetrievalQAChain>;
    serialize(): SerializedVectorDBQAChain;
    /**
     * Creates a new instance of RetrievalQAChain using a BaseLanguageModel
     * and a BaseRetriever.
     * @param llm The BaseLanguageModel used to generate a new question.
     * @param retriever The BaseRetriever used to retrieve relevant documents.
     * @param options Optional parameters for the RetrievalQAChain.
     * @returns A new instance of RetrievalQAChain.
     */
    static fromLLM(llm: BaseLanguageModel, retriever: BaseRetriever, options?: Partial<Omit<RetrievalQAChainInput, "retriever" | "combineDocumentsChain" | "index">> & StuffQAChainParams): RetrievalQAChain;
}
