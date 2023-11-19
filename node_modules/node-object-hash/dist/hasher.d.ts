/// <reference types="node" />
import type { BinaryToTextEncoding } from 'crypto';
import type { SorterOptions } from './objectSorter';
/**
 * Object hasher options
 */
export interface HasherOptions extends SorterOptions {
    /**
     * Hash algorithm to use
     * @default 'sha256'
     */
    alg?: string;
    /**
     * String encoding for hash
     * @default 'hex'
     */
    enc?: BinaryToTextEncoding;
}
/**
 * If object implements Hashable interface then value from toHash
 * will be used for hash function. It means that the different objects
 * with the function toHash that return the same value will have the same hash
 */
export interface Hashable {
    toHashableString: () => string;
}
export interface Hasher<T = unknown> {
    /**
     * Create hash of an object
     * @param object source object
     * @returns hash string of an object
     */
    hash(object: Hashable | T, opts?: HasherOptions): string;
    /**
     * Create sorted string from an object
     * @param object source object
     * @returns sorted string from an object
     */
    sort(object: T): string;
    /**
     * Create sorted string from an object
     * @param object source object
     * @returns sorted string from an object
     * @alias sort
     */
    sortObject(object: T): string;
}
/**
 * Hasher constructor
 * @param options hasher options
 * @return hasher instance
 */
export declare const hasher: (options?: HasherOptions) => Hasher;
//# sourceMappingURL=hasher.d.ts.map