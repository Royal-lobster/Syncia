export declare function readableStreamToAsyncIterable(stream: any, preventCancel?: boolean): any;
export declare class IterableReadableStream<T> extends ReadableStream<T> {
    reader: ReadableStreamDefaultReader<T>;
    ensureReader(): void;
    next(): Promise<ReadableStreamReadResult<T>>;
    return(): Promise<{
        done: boolean;
        value: undefined;
    }>;
    [Symbol.asyncIterator](): this;
    static fromReadableStream<T>(stream: ReadableStream<T>): IterableReadableStream<T>;
    static fromAsyncGenerator<T>(generator: AsyncGenerator<T>): IterableReadableStream<T>;
}
