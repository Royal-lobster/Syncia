import { Tool } from "../../../tools/base.js";
import { Toolkit } from "../base.js";
import { BaseLanguageModel } from "../../../base_language/index.js";
import { ZeroShotCreatePromptArgs } from "../../mrkl/index.js";
import { AgentExecutor } from "../../executor.js";
import { SqlDatabase } from "../../../sql_db.js";
/**
 * Interface that extends ZeroShotCreatePromptArgs and adds an optional
 * topK parameter for specifying the number of results to return.
 */
export interface SqlCreatePromptArgs extends ZeroShotCreatePromptArgs {
    /** Number of results to return. */
    topK?: number;
}
/**
 * Class that represents a toolkit for working with SQL databases. It
 * initializes SQL tools based on the provided SQL database.
 */
export declare class SqlToolkit extends Toolkit {
    tools: Tool[];
    db: SqlDatabase;
    dialect: string;
    constructor(db: SqlDatabase, llm?: BaseLanguageModel);
}
export declare function createSqlAgent(llm: BaseLanguageModel, toolkit: SqlToolkit, args?: SqlCreatePromptArgs): AgentExecutor;
