import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'

type Table =
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

export const Table: Table = (props) => {
  return (
    <div className="ChatDockX_table-container">
      <table {...props} />
    </div>
  )
}
