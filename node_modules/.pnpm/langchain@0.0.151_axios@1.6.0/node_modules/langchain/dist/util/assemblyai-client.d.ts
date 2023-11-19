/// <reference types="node" resolution-mode="require"/>
import { CreateTranscriptParams, ParagraphsResponse, SentencesResponse, SubtitleFormat, Transcript } from "../types/assemblyai-types.js";
/**
 * A client for the AssemblyAI API.
 */
export declare class AssemblyAIClient {
    private readonly apiKey;
    private static readonly baseUrl;
    /**
     * @param apiKey The API key for the AssemblyAI API.
     */
    constructor(apiKey: string);
    /**
     * Uploads a file to AssemblyAI CDN.
     * The file will only be accessible to AssemblyAI and be removed after a period of time.
     * @param file Audio or video file to upload.
     * @returns The URL of the uploaded file.
     */
    uploadFile(file: Buffer): Promise<string>;
    /**
     * Creates a transcript in the AssemblyAI API. The transcript will be queued for processing,
     * but an empty transcript object is returned immediately.
     * @param fileUrl The URL of the audio or video file to transcribe.
     * @returns Empty transcript object
     */
    createTranscript(params: CreateTranscriptParams): Promise<Transcript>;
    /**
     * Gets the transcript by its ID.
     * @param id The ID of the transcript to retrieve.
     * @returns Transcript object
     */
    getTranscript(id: string): Promise<Transcript>;
    /**
     * Polls the transcript status until it is completed, then returns the completed transcript object.
     * @param id The ID of the transcript to retrieve.
     * @returns Transcript object
     */
    waitForTranscriptToComplete(id: string): Promise<Transcript>;
    /**
     * Gets the paragraphs of the transcript in the specified format.
     * @param id The ID of the transcript to retrieve paragraphs fors.
     * @returns Paragraphs for the transcript.
     */
    getParagraphs(id: string): Promise<ParagraphsResponse>;
    /**
     * Gets the paragraphs of the transcript in the specified format.
     * @param id The ID of the transcript to retrieve paragraphs fors.
     * @returns Paragraphs for the transcript.
     */
    getSentences(id: string): Promise<SentencesResponse>;
    /**
     * Gets the subtitles of the transcript in the specified format.
     * @param id The ID of the transcript to retrieve.
     * @param subtitleFormat Format of the subtitles to retrieve.
     * @returns Subtitles in the specified format as text.
     */
    getSubtitles(id: string, subtitleFormat?: (typeof SubtitleFormat)[keyof typeof SubtitleFormat]): Promise<string>;
    /**
     * Throws an error if the body is an error object.
     * @param body The response object returned by the AssemblyAI API to check.
     */
    private static throwIfError;
}
