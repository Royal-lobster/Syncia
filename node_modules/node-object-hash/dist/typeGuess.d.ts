import type { Hashable } from './hasher';
/**
 * Type mapping rules.
 */
export declare const TYPE_MAP: {
    [type: string]: string;
};
/**
 * Guess object type
 * @param obj analyzed object
 * @return object type
 */
export declare const guessObjectType: <T>(obj: T) => string;
/**
 * Guess variable type
 * @param obj analyzed variable
 * @return variable type
 */
export declare const guessType: <T>(obj: T) => string;
/**
 * Identify if object is instance of Hashable interface
 * @param object analyzed variable
 * @return true if object has toHashableString property and this property is function
 * otherwise return false
 */
export declare const instanceOfHashable: <T>(object: T | Hashable) => boolean;
//# sourceMappingURL=typeGuess.d.ts.map