/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
export declare class Readable {
  readable: boolean;
  readonly readableEnded: boolean;
  readonly readableFlowing: boolean | null;
  readonly readableHighWaterMark: number;
  readonly readableLength: number;
  readonly readableObjectMode: boolean;
  destroyed: boolean;
  read(size?: number): any;
  pause(): this;
  resume(): this;
  isPaused(): boolean;
  destroy(error?: Error): this;
  [Symbol.asyncIterator](): AsyncIterableIterator<any>;
}
export declare class FsReadStream extends Readable {
  path: {};
}
export declare function isFsReadStream(value: any): value is FsReadStream;
//# sourceMappingURL=node-readable.d.ts.map
