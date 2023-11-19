import type { Anthropic } from "./index.js";
export declare class APIResource {
    protected client: Anthropic;
    constructor(client: Anthropic);
    protected get: Anthropic['get'];
    protected post: Anthropic['post'];
    protected patch: Anthropic['patch'];
    protected put: Anthropic['put'];
    protected delete: Anthropic['delete'];
    protected getAPIList: Anthropic['getAPIList'];
}
//# sourceMappingURL=resource.d.ts.map