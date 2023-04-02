declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const content: string;
  export default content;
}

declare module "sse" {
  class SSE {
    constructor(
      url: string,
      options?: {
        headers: Record<string, string>;
        method: "POST";
        payload: string;
      }
    );
    addEventListener(
      event: string,
      listener: (event: { data: string; readyState: number }) => void
    ): void;
    stream(): void;
    close(): void;
  }

  export { SSE };
}
