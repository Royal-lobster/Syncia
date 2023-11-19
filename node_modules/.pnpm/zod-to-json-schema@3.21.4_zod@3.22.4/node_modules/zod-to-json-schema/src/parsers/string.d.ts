import { ZodStringDef } from "zod";
import { ErrorMessages } from "../errorMessages";
import { Refs } from "../Refs";
export declare const emailPattern = "^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\])|(\\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\\.[A-Za-z]{2,})+))$";
export declare const cuidPattern = "^c[^\\s-]{8,}$";
export declare const cuid2Pattern = "^[a-z][a-z0-9]*$";
export declare const ulidPattern = "/[0-9A-HJKMNP-TV-Z]{26}/";
export declare const emojiPattern = "/^(p{Extended_Pictographic}|p{Emoji_Component})+$/u";
export type JsonSchema7StringType = {
    type: "string";
    minLength?: number;
    maxLength?: number;
    format?: "email" | "idn-email" | "uri" | "uuid" | "date-time" | "ipv4" | "ipv6";
    pattern?: string;
    allOf?: {
        pattern: string;
        errorMessage?: ErrorMessages<{
            pattern: string;
        }>;
    }[];
    anyOf?: {
        format: string;
        errorMessage?: ErrorMessages<{
            format: string;
        }>;
    }[];
    errorMessage?: ErrorMessages<JsonSchema7StringType>;
};
export declare function parseStringDef(def: ZodStringDef, refs: Refs): JsonSchema7StringType;
