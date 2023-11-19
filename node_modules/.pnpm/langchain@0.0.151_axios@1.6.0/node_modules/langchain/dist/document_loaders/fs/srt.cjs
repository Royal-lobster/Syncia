"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SRTLoader = void 0;
const text_js_1 = require("./text.cjs");
/**
 * A class that extends the `TextLoader` class. It represents a document
 * loader that loads documents from SRT (SubRip) subtitle files. It has a
 * constructor that takes a `filePathOrBlob` parameter representing the
 * path to the SRT file or a `Blob` object. The `parse()` method is
 * implemented to parse the SRT file and extract the text content of each
 * subtitle.
 */
class SRTLoader extends text_js_1.TextLoader {
    constructor(filePathOrBlob) {
        super(filePathOrBlob);
    }
    /**
     * A protected method that takes a `raw` string as a parameter and returns
     * a promise that resolves to an array of strings. It parses the raw SRT
     * string using the `SRTParser2` class from the `srt-parser-2` module. It
     * retrieves the subtitle objects from the parsed SRT data and extracts
     * the text content from each subtitle object. It filters out any empty
     * text content and joins the non-empty text content with a space
     * separator.
     * @param raw The raw SRT string to be parsed.
     * @returns A promise that resolves to an array of strings representing the text content of each subtitle.
     */
    async parse(raw) {
        const { SRTParser2 } = await SRTLoaderImports();
        const parser = new SRTParser2();
        const srts = parser.fromSrt(raw);
        return [
            srts
                .map((srt) => srt.text)
                .filter(Boolean)
                .join(" "),
        ];
    }
}
exports.SRTLoader = SRTLoader;
async function SRTLoaderImports() {
    try {
        const SRTParser2 = (await import("srt-parser-2")).default.default;
        return { SRTParser2 };
    }
    catch (e) {
        throw new Error("Please install srt-parser-2 as a dependency with, e.g. `yarn add srt-parser-2`");
    }
}
