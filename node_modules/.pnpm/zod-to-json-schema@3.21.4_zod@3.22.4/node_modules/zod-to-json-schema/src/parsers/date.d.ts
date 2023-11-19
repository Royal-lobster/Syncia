import { ZodDateDef } from "zod";
import { Refs } from "../Refs";
import { ErrorMessages } from "../errorMessages";
import { JsonSchema7NumberType } from "./number";
export type JsonSchema7DateType = {
    type: "integer" | "string";
    format: "unix-time" | "date-time";
    minimum?: number;
    maximum?: number;
    errorMessage?: ErrorMessages<JsonSchema7NumberType>;
};
export declare function parseDateDef(def: ZodDateDef, refs: Refs): JsonSchema7DateType;
