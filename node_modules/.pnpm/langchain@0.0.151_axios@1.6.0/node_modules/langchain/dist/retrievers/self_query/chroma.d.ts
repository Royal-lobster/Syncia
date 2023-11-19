import { Chroma } from "../../vectorstores/chroma.js";
import { BasicTranslator } from "./base.js";
/**
 * Specialized translator for the Chroma vector database. It extends the
 * BasicTranslator class and translates internal query language elements
 * to valid filters. The class defines a subset of allowed logical
 * operators and comparators that can be used in the translation process.
 */
export declare class ChromaTranslator<T extends Chroma> extends BasicTranslator<T> {
    constructor();
}
