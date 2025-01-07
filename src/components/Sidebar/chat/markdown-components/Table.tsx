import type { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'

type TableType =
  | keyof JSX.IntrinsicElements
  | React.ComponentType<
    Omit<
      React.DetailedHTMLProps<
        React.TableHTMLAttributes<HTMLTableElement>,
        HTMLTableElement
      >,
      'ref'
    > &
    ReactMarkdownProps
  >

export const Table: TableType = (props) => {
  return (
    <div className="deepchat_table-container">
      <table {...props} />
    </div>
  )
}
