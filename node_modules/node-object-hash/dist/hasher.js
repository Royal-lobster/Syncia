"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasher = void 0;
const node_crypto_1 = require("node:crypto");
const objectSorter_1 = require("./objectSorter");
/**
 * Default hash algorithm
 */
const DEFAULT_ALG = 'sha256';
/**
 * Default hash string enoding
 */
const DEFAULT_ENC = 'hex';
/**
 * Hasher constructor
 * @param options hasher options
 * @return hasher instance
 */
const hasher = (options) => {
    const sortObject = (0, objectSorter_1.objectSorter)(options);
    /**
     * Object hash function
     * @param obj object to hash
     * @param opts hasher options
     * @returns hash string
     */
    const hash = (obj, opts) => {
        const alg = opts?.alg || options?.alg || DEFAULT_ALG;
        const enc = opts?.enc || options?.enc || DEFAULT_ENC;
        const sorted = sortObject(obj);
        return (0, node_crypto_1.createHash)(alg).update(sorted).digest(enc);
    };
    return {
        hash,
        sort: sortObject,
        sortObject,
    };
};
exports.hasher = hasher;
//# sourceMappingURL=hasher.js.map