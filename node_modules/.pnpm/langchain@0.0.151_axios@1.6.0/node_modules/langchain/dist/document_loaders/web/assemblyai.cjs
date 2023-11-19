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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioSubtitleLoader = exports.AudioTranscriptSentencesLoader = exports.AudioTranscriptParagraphsLoader = exports.AudioTranscriptLoader = void 0;
const node_fs_1 = require("node:fs");
const document_js_1 = require("../../document.cjs");
const base_js_1 = require("../base.cjs");
const env_js_1 = require("../../util/env.cjs");
const assemblyai_client_js_1 = require("../../util/assemblyai-client.cjs");
const assemblyai_types_js_1 = require("../../types/assemblyai-types.cjs");
__exportStar(require("../../types/assemblyai-types.cjs"), exports);
/**
 * Base class for AssemblyAI loaders.
 */
class AssemblyAILoader extends base_js_1.BaseDocumentLoader {
    /**
     * Creates a new AssemblyAI loader.
     * @param assemblyAIOptions The options to configure the AssemblyAI loader.
     * Configure the `assemblyAIOptions.apiKey` with your AssemblyAI API key, or configure it as the `ASSEMBLYAI_API_KEY` environment variable.
     */
    constructor(assemblyAIOptions) {
        super();
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const apiKey = assemblyAIOptions?.apiKey ?? (0, env_js_1.getEnvironmentVariable)("ASSEMBLYAI_API_KEY");
        this.client = new assemblyai_client_js_1.AssemblyAIClient(apiKey);
    }
    /**
     * Attempts to upload the file to AssemblyAI if it is a local file.
     * If `audio_url` starts with `http://` or `https://`, it is assumed to be a remote file.
     * Otherwise, it is assumed to be a local file and is uploaded to AssemblyAI.
     * @param createTranscriptOptions
     */
    async uploadFile(createTranscriptOptions) {
        let path = createTranscriptOptions.audio_url;
        if (path.startsWith("http://") || path.startsWith("https://"))
            return;
        if (path.startsWith("file://"))
            path = path.slice("file://".length);
        const file = await node_fs_1.promises.readFile(path);
        const uploadUrl = await this.client.uploadFile(file);
        // eslint-disable-next-line no-param-reassign
        createTranscriptOptions.audio_url = uploadUrl;
    }
}
/**
 * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
 * and loads the transcript as a document using AssemblyAI.
 */
class AudioTranscriptLoader extends AssemblyAILoader {
    /**
     * Creates a new AudioTranscriptLoader.
     * @param createTranscriptParams The parameters to create the transcript.
     * @param assemblyAIOptions The options to configure the AssemblyAI loader.
     * Configure the `assemblyAIOptions.apiKey` with your AssemblyAI API key, or configure it as the `ASSEMBLYAI_API_KEY` environment variable.
     */
    constructor(createTranscriptParams, assemblyAIOptions) {
        super(assemblyAIOptions);
        Object.defineProperty(this, "createTranscriptParams", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createTranscriptParams
        });
    }
    /**
     * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
     * and loads the transcript as a document using AssemblyAI.
     * @returns A promise that resolves to a single document containing the transcript text
     * as the page content, and the transcript object as the metadata.
     */
    async load() {
        await this.uploadFile(this.createTranscriptParams);
        let transcript = await this.client.createTranscript(this.createTranscriptParams);
        transcript = await this.client.waitForTranscriptToComplete(transcript.id);
        return [
            new document_js_1.Document({
                pageContent: transcript.text,
                metadata: transcript,
            }),
        ];
    }
}
exports.AudioTranscriptLoader = AudioTranscriptLoader;
/**
 * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
 * and loads the paragraphs of the transcript, creating a document for each paragraph.
 */
class AudioTranscriptParagraphsLoader extends AssemblyAILoader {
    /**
     * Creates a new AudioTranscriptParagraphsLoader.
     * @param createTranscriptParams The parameters to create the transcript.
     * @param assemblyAIOptions The options to configure the AssemblyAI loader.
     * Configure the `assemblyAIOptions.apiKey` with your AssemblyAI API key, or configure it as the `ASSEMBLYAI_API_KEY` environment variable.
     */
    constructor(createTranscriptParams, assemblyAIOptions) {
        super(assemblyAIOptions);
        Object.defineProperty(this, "createTranscriptParams", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createTranscriptParams
        });
    }
    /**
     * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
     * and loads the paragraphs of the transcript, creating a document for each paragraph.
     * @returns A promise that resolves to an array of documents, each containing a paragraph of the transcript.
     */
    async load() {
        let transcript = await this.client.createTranscript(this.createTranscriptParams);
        transcript = await this.client.waitForTranscriptToComplete(transcript.id);
        const paragraphsResponse = await this.client.getParagraphs(transcript.id);
        return paragraphsResponse.paragraphs.map((p) => new document_js_1.Document({
            pageContent: p.text,
            metadata: p,
        }));
    }
}
exports.AudioTranscriptParagraphsLoader = AudioTranscriptParagraphsLoader;
/**
 * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
 * and loads the sentences of the transcript, creating a document for each sentence.
 */
class AudioTranscriptSentencesLoader extends AssemblyAILoader {
    /**
     * Creates a new AudioTranscriptSentencesLoader.
     * @param createTranscriptParams The parameters to create the transcript.
     * @param assemblyAIOptions The options to configure the AssemblyAI loader.
     * Configure the `assemblyAIOptions.apiKey` with your AssemblyAI API key, or configure it as the `ASSEMBLYAI_API_KEY` environment variable.
     */
    constructor(createTranscriptParams, assemblyAIOptions) {
        super(assemblyAIOptions);
        Object.defineProperty(this, "createTranscriptParams", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createTranscriptParams
        });
    }
    /**
     * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
     * and loads the sentences of the transcript, creating a document for each sentence.
     * @returns A promise that resolves to an array of documents, each containing a sentence of the transcript.
     */
    async load() {
        let transcript = await this.client.createTranscript(this.createTranscriptParams);
        transcript = await this.client.waitForTranscriptToComplete(transcript.id);
        const sentencesResponse = await this.client.getSentences(transcript.id);
        return sentencesResponse.sentences.map((p) => new document_js_1.Document({
            pageContent: p.text,
            metadata: p,
        }));
    }
}
exports.AudioTranscriptSentencesLoader = AudioTranscriptSentencesLoader;
/**
 * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
 * and loads subtitles for the transcript as `srt` or `vtt` format.
 */
class AudioSubtitleLoader extends AssemblyAILoader {
    /**
     * Creates a new AudioSubtitleLoader.
     * @param createTranscriptParams The parameters to create the transcript.
     * @param subtitleFormat The format of the subtitles, either `srt` or `vtt`.
     * @param assemblyAIOptions The options to configure the AssemblyAI loader.
     * Configure the `assemblyAIOptions.apiKey` with your AssemblyAI API key, or configure it as the `ASSEMBLYAI_API_KEY` environment variable.
     */
    constructor(createTranscriptParams, subtitleFormat = assemblyai_types_js_1.SubtitleFormat.Srt, assemblyAIOptions) {
        super(assemblyAIOptions);
        Object.defineProperty(this, "createTranscriptParams", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: createTranscriptParams
        });
        Object.defineProperty(this, "subtitleFormat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: subtitleFormat
        });
        this.subtitleFormat = subtitleFormat;
    }
    /**
     * Creates a transcript for the given `CreateTranscriptParams.audio_url`,
     * and loads subtitles for the transcript as `srt` or `vtt` format.
     * @returns A promise that resolves a document containing the subtitles as the page content.
     */
    async load() {
        let transcript = await this.client.createTranscript(this.createTranscriptParams);
        transcript = await this.client.waitForTranscriptToComplete(transcript.id);
        const subtitles = await this.client.getSubtitles(transcript.id, this.subtitleFormat);
        return [
            new document_js_1.Document({
                pageContent: subtitles,
            }),
        ];
    }
}
exports.AudioSubtitleLoader = AudioSubtitleLoader;
