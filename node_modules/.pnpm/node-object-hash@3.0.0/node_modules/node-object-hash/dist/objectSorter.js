"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectSorter = void 0;
const str = __importStar(require("./stringifiers"));
const typeGuess_1 = require("./typeGuess");
/**
 * Object sorter consturctor
 * @param options object transformation options
 * @return function that transforms object to strings
 */
const objectSorter = (options) => {
    const { sort, coerce, trim } = {
        sort: true,
        coerce: true,
        trim: false,
        ...options,
    };
    const sortOptions = {
        array: typeof sort === 'boolean' ? sort : sort?.array ?? false,
        typedArray: typeof sort === 'boolean' ? false : sort?.typedArray ?? false,
        object: typeof sort === 'boolean' ? sort : sort?.object ?? false,
        set: typeof sort === 'boolean' ? sort : sort?.set ?? false,
        map: typeof sort === 'boolean' ? sort : sort?.map ?? false,
    };
    const coerceOptions = {
        boolean: typeof coerce === 'boolean' ? coerce : coerce?.boolean ?? false,
        number: typeof coerce === 'boolean' ? coerce : coerce?.number ?? false,
        bigint: typeof coerce === 'boolean' ? coerce : coerce?.bigint ?? false,
        string: typeof coerce === 'boolean' ? coerce : coerce?.string ?? false,
        undefined: typeof coerce === 'boolean' ? coerce : coerce?.undefined ?? false,
        null: typeof coerce === 'boolean' ? coerce : coerce?.null ?? false,
        symbol: typeof coerce === 'boolean' ? coerce : coerce?.symbol ?? false,
        function: typeof coerce === 'boolean' ? coerce : coerce?.function ?? false,
        date: typeof coerce === 'boolean' ? coerce : coerce?.date ?? false,
        set: typeof coerce === 'boolean' ? coerce : coerce?.set ?? false,
    };
    const trimOptions = {
        string: typeof trim === 'boolean' ? trim : trim?.string ?? false,
        function: typeof trim === 'boolean' ? trim : trim?.function ?? false,
    };
    const stringifiers = {
        // eslint-disable-next-line @typescript-eslint/ban-types
        unknown: function _unknown(obj) {
            // `unknonw` - is a typo, saved for backward compatibility
            const constructorName = obj.constructor?.name ?? 'unknonw';
            const objectName = typeof obj.toString === 'function' ? obj.toString() : 'unknown';
            return `<:${constructorName}>:${objectName}`;
        },
    };
    stringifiers['hashable'] = str._hashable.bind(stringifiers);
    if (trimOptions.string) {
        stringifiers['string'] = coerceOptions.string
            ? str._stringTrimCoerce.bind(stringifiers)
            : str._stringTrim.bind(stringifiers);
    }
    else {
        stringifiers['string'] = coerceOptions.string
            ? str._stringCoerce.bind(stringifiers)
            : str._string.bind(stringifiers);
    }
    stringifiers['number'] = coerceOptions.number
        ? str._numberCoerce.bind(stringifiers)
        : str._number.bind(stringifiers);
    stringifiers['bigint'] = coerceOptions.bigint
        ? str._bigIntCoerce.bind(stringifiers)
        : str._bigInt.bind(stringifiers);
    stringifiers['boolean'] = coerceOptions.boolean
        ? str._booleanCoerce.bind(stringifiers)
        : str._boolean.bind(stringifiers);
    stringifiers['symbol'] = coerceOptions.symbol
        ? str._symbolCoerce.bind(stringifiers)
        : str._symbol.bind(stringifiers);
    stringifiers['undefined'] = coerceOptions.undefined
        ? str._undefinedCoerce.bind(stringifiers)
        : str._undefined.bind(stringifiers);
    stringifiers['null'] = coerceOptions.null
        ? str._nullCoerce.bind(stringifiers)
        : str._null.bind(stringifiers);
    if (trimOptions.function) {
        stringifiers['function'] = coerceOptions.function
            ? str._functionTrimCoerce.bind(stringifiers)
            : str._functionTrim.bind(stringifiers);
    }
    else {
        stringifiers['function'] = coerceOptions.function
            ? str._functionCoerce.bind(stringifiers)
            : str._function.bind(stringifiers);
    }
    stringifiers['date'] = coerceOptions.date
        ? str._dateCoerce.bind(stringifiers)
        : str._date.bind(stringifiers);
    stringifiers['array'] = sortOptions.array
        ? str._arraySort.bind(stringifiers)
        : str._array.bind(stringifiers);
    stringifiers['typedarray'] = sortOptions.typedArray
        ? str._typedArraySort.bind(stringifiers)
        : str._typedArray.bind(stringifiers);
    if (sortOptions.set) {
        stringifiers['set'] = coerceOptions.set
            ? str._setSortCoerce.bind(stringifiers)
            : str._setSort.bind(stringifiers);
    }
    else {
        stringifiers['set'] = coerceOptions.set
            ? str._setCoerce.bind(stringifiers)
            : str._set.bind(stringifiers);
    }
    stringifiers['object'] = sortOptions.object
        ? str._objectSort.bind(stringifiers)
        : str._object.bind(stringifiers);
    stringifiers['map'] = sortOptions.map
        ? str._mapSort.bind(stringifiers)
        : str._map.bind(stringifiers);
    /**
     * Serializes object to string
     * @param obj object
     */
    function objectToString(obj) {
        return stringifiers[(0, typeGuess_1.guessType)(obj)](obj);
    }
    return objectToString;
};
exports.objectSorter = objectSorter;
//# sourceMappingURL=objectSorter.js.map