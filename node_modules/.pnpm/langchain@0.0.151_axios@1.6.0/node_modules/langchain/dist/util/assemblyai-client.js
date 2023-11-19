import { SubtitleFormat, } from "../types/assemblyai-types.js";
/**
 * A client for the AssemblyAI API.
 */
class AssemblyAIClient {
    /**
     * @param apiKey The API key for the AssemblyAI API.
     */
    constructor(apiKey) {
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: apiKey
        });
        if (!apiKey)
            throw new Error("No AssemblyAI API key provided");
    }
    /**
     * Uploads a file to AssemblyAI CDN.
     * The file will only be accessible to AssemblyAI and be removed after a period of time.
     * @param file Audio or video file to upload.
     * @returns The URL of the uploaded file.
     */
    async uploadFile(file) {
        const response = await fetch(`${AssemblyAIClient.baseUrl}/upload`, {
            method: "POST",
            headers: {
                authorization: this.apiKey,
            },
            body: file,
        });
        const json = (await response.json());
        AssemblyAIClient.throwIfError(json);
        return json.upload_url;
    }
    /**
     * Creates a transcript in the AssemblyAI API. The transcript will be queued for processing,
     * but an empty transcript object is returned immediately.
     * @param fileUrl The URL of the audio or video file to transcribe.
     * @returns Empty transcript object
     */
    async createTranscript(params) {
        const response = await fetch(`${AssemblyAIClient.baseUrl}/transcript`, {
            method: "POST",
            headers: {
                authorization: this.apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });
        const transcript = (await response.json());
        AssemblyAIClient.throwIfError(transcript);
        return transcript;
    }
    /**
     * Gets the transcript by its ID.
     * @param id The ID of the transcript to retrieve.
     * @returns Transcript object
     */
    async getTranscript(id) {
        const response = await fetch(`${AssemblyAIClient.baseUrl}/transcript/${id}`, {
            headers: {
                authorization: this.apiKey,
            },
        });
        const transcript = (await response.json());
        AssemblyAIClient.throwIfError(transcript);
        return transcript;
    }
    /**
     * Polls the transcript status until it is completed, then returns the completed transcript object.
     * @param id The ID of the transcript to retrieve.
     * @returns Transcript object
     */
    async waitForTranscriptToComplete(id) {
        const pollingEndpoint = `${AssemblyAIClient.baseUrl}/transcript/${id}`;
        // infinite loop, same as while(true) but linter doesn't like using true constant
        for (;;) {
            const pollingResponse = await fetch(pollingEndpoint, {
                headers: {
                    authorization: this.apiKey,
                },
            });
            const transcript = (await pollingResponse.json());
            AssemblyAIClient.throwIfError(transcript);
            switch (transcript.status) {
                case "queued":
                case "processing":
                    await new Promise((resolve) => {
                        setTimeout(resolve, 3000);
                    });
                    break;
                case "completed":
                    return transcript;
                default:
                    throw new Error(`Unexpected transcript status: ${transcript.status}`);
            }
        }
    }
    /**
     * Gets the paragraphs of the transcript in the specified format.
     * @param id The ID of the transcript to retrieve paragraphs fors.
     * @returns Paragraphs for the transcript.
     */
    async getParagraphs(id) {
        const response = await fetch(`${AssemblyAIClient.baseUrl}/transcript/${id}/paragraphs`, {
            headers: {
                authorization: this.apiKey,
            },
        });
        const paragraphs = (await response.json());
        AssemblyAIClient.throwIfError(paragraphs);
        return paragraphs;
    }
    /**
     * Gets the paragraphs of the transcript in the specified format.
     * @param id The ID of the transcript to retrieve paragraphs fors.
     * @returns Paragraphs for the transcript.
     */
    async getSentences(id) {
        const response = await fetch(`${AssemblyAIClient.baseUrl}/transcript/${id}/sentences`, {
            headers: {
                authorization: this.apiKey,
            },
        });
        const sentences = (await response.json());
        AssemblyAIClient.throwIfError(sentences);
        return sentences;
    }
    /**
     * Gets the subtitles of the transcript in the specified format.
     * @param id The ID of the transcript to retrieve.
     * @param subtitleFormat Format of the subtitles to retrieve.
     * @returns Subtitles in the specified format as text.
     */
    async getSubtitles(id, subtitleFormat = SubtitleFormat.Srt) {
        const response = await fetch(`${AssemblyAIClient.baseUrl}/transcript/${id}/${subtitleFormat}`, {
            headers: {
                authorization: this.apiKey,
            },
        });
        if (response.status !== 200) {
            if (response.headers.get("content-type")?.startsWith("application/json")) {
                const errorBody = (await response.json());
                AssemblyAIClient.throwIfError(errorBody);
            }
            else {
                throw new Error(`Get Subtitle request returned status ${response.status} ${response.statusText}`);
            }
        }
        const subtitles = await response.text();
        return subtitles;
    }
    /**
     * Throws an error if the body is an error object.
     * @param body The response object returned by the AssemblyAI API to check.
     */
    static throwIfError(body) {
        if ("error" in body)
            throw new Error(body.error);
    }
}
Object.defineProperty(AssemblyAIClient, "baseUrl", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "https://api.assemblyai.com/v2"
});
export { AssemblyAIClient };
