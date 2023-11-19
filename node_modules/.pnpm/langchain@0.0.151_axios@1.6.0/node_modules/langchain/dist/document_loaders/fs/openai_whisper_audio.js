import { OpenAI as OpenAIClient, toFile } from "openai";
import { Document } from "../../document.js";
import { BufferLoader } from "./buffer.js";
const MODEL_NAME = "whisper-1";
export class OpenAIWhisperAudio extends BufferLoader {
    constructor(filePathOrBlob, fields) {
        super(filePathOrBlob);
        Object.defineProperty(this, "openAIClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.openAIClient = new OpenAIClient(fields?.clientOptions);
    }
    async parse(raw, metadata) {
        const fileName = metadata.source === "blob" ? metadata.blobType : metadata.source;
        const transcriptionResponse = await this.openAIClient.audio.transcriptions.create({
            file: await toFile(raw, fileName),
            model: MODEL_NAME,
        });
        const document = new Document({
            pageContent: transcriptionResponse.text,
            metadata,
        });
        return [document];
    }
}
