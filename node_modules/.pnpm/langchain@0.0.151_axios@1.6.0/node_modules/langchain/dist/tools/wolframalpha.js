import { Tool } from "./base.js";
export class WolframAlphaTool extends Tool {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "appid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "wolfram_alpha"
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `A wrapper around Wolfram Alpha. Useful for when you need to answer questions about Math, Science, Technology, Culture, Society and Everyday Life. Input should be a search query.`
        });
        this.appid = fields.appid;
    }
    get lc_namespace() {
        return [...super.lc_namespace, "wolframalpha"];
    }
    static lc_name() {
        return "WolframAlphaTool";
    }
    async _call(query) {
        const url = `https://www.wolframalpha.com/api/v1/llm-api?appid=${this.appid}&input=${query}`;
        const res = await fetch(url);
        return res.text();
    }
}
