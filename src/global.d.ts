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
  