import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
import { AssemblyAIClient } from "../../util/assemblyai-client.js";
import { AssemblyAIOptions, CreateTranscriptParams, SubtitleFormat, Transcript, TranscriptSegment } from "../../types/assemblyai-types.js";
export * from "../../types/assemblyai-types.js";
/**
 * Base class for AssemblyAI loaders.
 */
declare abstract class AssemblyAILoader extends BaseDocumentLoader {
    protected client: AssemblyAIClient;
    /**
     * Creates a new AssemblyAI loader.
     * @param assemblyAIOptions The options to configure the AssemblyAI loader.
     * Configure the `assemblyAIOptions.apiKey` with your AssemblyAI API key, or configure it as the `ASSEMBLYAI_API_KEY` environment variable.
     */
    constructor(assemblyAIOptions?: AssemblyAIOptions);
    /**
     * Attempts to upload the file to AssemblyAI if it is a local file.
     * If `audio_url` starts with `http://` or `https://`, it is assumed to be a remote file.
     * Otherwise, it is assumed to be a local file and is uploaded to AssemblyAI.
     * @param createTranscriptOptions
     */
    protected uploadFile(createTranscriptOptions: CreateTranscriptParams): Promise<void>;
}
/**
 * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
 * and loads the transcript as a document using AssemblyAI.
 */
export declare class AudioTranscriptLoader extends AssemblyAILoader {
    private createTranscriptParams;
    /**
     * Creates a new AudioTranscriptLoader.
     * @param createTranscriptParams The parameters to create the transcript.
     * @param assemblyAIOptions The options to configure the AssemblyAI loader.
     * Configure the `assemblyAIOptions.apiKey` with your AssemblyAI API key, or configure it as the `ASSEMBLYAI_API_KEY` environment variable.
     */
    constructor(createTranscriptParams: CreateTranscriptParams, assemblyAIOptions?: AssemblyAIOptions);
    /**
     * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
     * and loads the transcript as a document using AssemblyAI.
     * @returns A promise that resolves to a single document containing the transcript text
     * as the page content, and the transcript object as the metadata.
     */
    load(): Promise<Document<Transcript>[]>;
}
/**
 * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
 * and loads the paragraphs of the transcript, creating a document for each paragraph.
 */
export declare class AudioTranscriptParagraphsLoader extends AssemblyAILoader {
    private createTranscriptParams;
    /**
     * Creates a new AudioTranscriptParagraphsLoader.
     * @param createTranscriptParams The parameters to create the transcript.
     * @param assemblyAIOptions The options to configure the AssemblyAI loader.
     * Configure the `assemblyAIOptions.apiKey` with your AssemblyAI API key, or configure it as the `ASSEMBLYAI_API_KEY` environment variable.
     */
    constructor(createTranscriptParams: CreateTranscriptParams, assemblyAIOptions?: AssemblyAIOptions);
    /**
     * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
     * and loads the paragraphs of the transcript, creating a document for each paragraph.
     * @returns A promise that resolves to an array of documents, each containing a paragraph of the transcript.
     */
    load(): Promise<Document<TranscriptSegment>[]>;
}
/**
 * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
 * and loads the sentences of the transcript, creating a document for each sentence.
 */
export declare class AudioTranscriptSentencesLoader extends AssemblyAILoader {
    private createTranscriptParams;
    /**
     * Creates a new AudioTranscriptSentencesLoader.
     * @param createTranscriptParams The parameters to create the transcript.
     * @param assemblyAIOptions The options to configure the AssemblyAI loader.
     * Configure the `assemblyAIOptions.apiKey` with your AssemblyAI API key, or configure it as the `ASSEMBLYAI_API_KEY` environment variable.
     */
    constructor(createTranscriptParams: CreateTranscriptParams, assemblyAIOptions?: AssemblyAIOptions);
    /**
     * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
     * and loads the sentences of the transcript, creating a document for each sentence.
     * @returns A promise that resolves to an array of documents, each containing a sentence of the transcript.
     */
    load(): Promise<Document<TranscriptSegment>[]>;
}
/**
 * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
 * and loads subtitles for the transcript as `srt` or `vtt` format.
 */
export declare class AudioSubtitleLoader extends AssemblyAILoader {
    private createTranscriptParams;
    private subtitleFormat;
    /**
     * Creates a new AudioSubtitleLoader.
     * @param createTranscriptParams The parameters to create the transcript.
     * @param subtitleFormat The format of the subtitles, either `srt` or `vtt`.
     * @param assemblyAIOptions The options to configure the AssemblyAI loader.
     * Configure the `assemblyAIOptions.apiKey` with your AssemblyAI API key, or configure it as the `ASSEMBLYAI_API_KEY` environment variable.
     */
    constructor(createTranscriptParams: CreateTranscriptParams, subtitleFormat?: (typeof SubtitleFormat)[keyof typeof SubtitleFormat], assemblyAIOptions?: AssemblyAIOptions);
    /**
     * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
     * and loads subtitles for the transcript as `srt` or `vtt` format.
     * @returns A promise that resolves a document containing the subtitles as the page content.
     */
    load(): Promise<Document[]>;
}
