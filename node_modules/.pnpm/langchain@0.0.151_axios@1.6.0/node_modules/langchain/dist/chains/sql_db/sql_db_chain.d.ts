import { BaseChain, ChainInputs } from "../base.js";
import type { SqlDatabase } from "../../sql_db.js";
import { ChainValues } from "../../schema/index.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { CallbackManagerForChainRun } from "../../callbacks/manager.js";
import { PromptTemplate } from "../../prompts/index.js";
/**
 * Interface that extends the ChainInputs interface and defines additional
 * fields specific to a SQL database chain. It represents the input fields
 * for a SQL database chain.
 */
export interface SqlDatabaseChainInput extends ChainInputs {
    llm: BaseLanguageModel;
    database: SqlDatabase;
    topK?: number;
    inputKey?: string;
    outputKey?: string;
    sqlOutputKey?: string;
    prompt?: PromptTemplate;
}
/**
 * Class that represents a SQL database chain in the LangChain framework.
 * It extends the BaseChain class and implements the functionality
 * specific to a SQL database chain.
 */
export declare class SqlDatabaseChain extends BaseChain {
    static lc_name(): string;
    llm: BaseLanguageModel;
    database: SqlDatabase;
    prompt: PromptTemplate<{
        input: any;
        top_k: any;
        dialect: any;
        table_info: any;
    }, any>;
    topK: number;
    inputKey: string;
    outputKey: string;
    sqlOutputKey: string | undefined;
    returnDirect: boolean;
    constructor(fields: SqlDatabaseChainInput);
    /** @ignore */
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    _chainType(): "sql_database_chain";
    get inputKeys(): string[];
    get outputKeys(): string[];
    /**
     * Private method that verifies the number of tokens in the input text and
     * table information. It throws an error if the number of tokens exceeds
     * the maximum allowed by the language model.
     * @param inputText The input text.
     * @param tableinfo The table information.
     * @returns A promise that resolves when the verification is complete.
     */
    private verifyNumberOfTokens;
}
