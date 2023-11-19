/// <reference types="node" resolution-mode="require"/>
import { type ClientOptions } from "openai";
import { Document } from "../../document.js";
import { BufferLoader } from "./buffer.js";
export declare class OpenAIWhisperAudio extends BufferLoader {
    private readonly openAIClient;
    constructor(filePathOrBlob: string | Blob, fields?: {
        clientOptions?: ClientOptions;
    });
    protected parse(raw: Buffer, metadata: Record<string, string>): Promise<Document[]>;
}
