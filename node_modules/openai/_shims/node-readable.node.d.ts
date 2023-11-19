/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
export type { Readable } from 'node:stream';
import { ReadStream as FsReadStream } from 'node:fs';
export type { FsReadStream };
export declare function isFsReadStream(value: any): value is FsReadStream;
//# sourceMappingURL=node-readable.node.d.ts.map
