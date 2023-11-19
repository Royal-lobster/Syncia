"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfHashable = exports.guessType = exports.guessObjectType = exports.TYPE_MAP = void 0;
/**
 * Type mapping rules.
 */
exports.TYPE_MAP = {
    Array: 'array',
    Int8Array: 'typedarray',
    Uint8Array: 'typedarray',
    Uint8ClampedArray: 'typedarray',
    Int16Array: 'typedarray',
    Uint16Array: 'typedarray',
    Int32Array: 'typedarray',
    Uint32Array: 'typedarray',
    Float32Array: 'typedarray',
    Float64Array: 'typedarray',
    BigUint64Array: 'typedarray',
    BigInt64Array: 'typedarray',
    Buffer: 'typedarray',
    Map: 'map',
    Set: 'set',
    Date: 'date',
    String: 'string',
    Number: 'number',
    BigInt: 'bigint',
    Boolean: 'boolean',
    Object: 'object',
};
/**
 * Guess object type
 * @param obj analyzed object
 * @return object type
 */
const guessObjectType = (obj) => {
    if (obj === null) {
        return 'null';
    }
    if ((0, exports.instanceOfHashable)(obj)) {
        return 'hashable';
    }
    const type = obj?.constructor?.name ?? 'unknown';
    return exports.TYPE_MAP[type] || 'unknown';
};
exports.guessObjectType = guessObjectType;
/**
 * Guess variable type
 * @param obj analyzed variable
 * @return variable type
 */
const guessType = (obj) => {
    const type = typeof obj;
    return type !== 'object' ? type : (0, exports.guessObjectType)(obj);
};
exports.guessType = guessType;
/**
 * Identify if object is instance of Hashable interface
 * @param object analyzed variable
 * @return true if object has toHashableString property and this property is function
 * otherwise return false
 */
const instanceOfHashable = (object) => {
    return typeof object.toHashableString === 'function';
};
exports.instanceOfHashable = instanceOfHashable;
//# sourceMappingURL=typeGuess.js.map