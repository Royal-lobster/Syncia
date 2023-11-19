import type { Response } from 'openai/_shims/fetch';
export declare class Stream<Item> implements AsyncIterable<Item> {
  controller: AbortController;
  private response;
  private decoder;
  constructor(response: Response, controller: AbortController);
  private iterMessages;
  [Symbol.asyncIterator](): AsyncIterator<Item, any, undefined>;
}
//# sourceMappingURL=streaming.d.ts.map
