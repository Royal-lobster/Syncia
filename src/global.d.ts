declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.json' {
  const content: string
  export default content
}

declare module 'sse' {
  class SSE {
    constructor(
      url: string,
      options?: {
        headers: Record<string, string>
        method: 'POST'
        payload: string
      },
    )
    addEventListener(
      event: string,
      listener: (event: { data: string; readyState: number }) => void,
    ): void
    stream(): void
    close(): void
  }

  export { SSE }
}

declare module 'react-highlight-menu' {
  import React = require('react')

  interface HighlightMenuProps {
    target: string
    placement?:
      | 'auto'
      | 'auto-start'
      | 'auto-end'
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'right'
      | 'right-start'
      | 'right-end'
      | 'left'
      | 'left-start'
      | 'left-end'
    styles?: React.CSSProperties
    menu: (props: {
      selectedText: string
      setClipboard: (text: string) => void
      setMenuOpen: (open: boolean) => void
    }) => React.ReactNode
  }

  export default class HighlightMenu extends React.Component<HighlightMenuProps> {}
}

declare module 'redirect-whitelister' {
  export default class RedirectWhitelister {
    allowedProtocols: string[]
    constructor(allowedDomains: string | string[])
    verify(url: string): boolean
  }
}
