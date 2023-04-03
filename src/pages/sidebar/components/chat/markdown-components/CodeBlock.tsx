import { CodeProps } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = (props: CodeProps) => {
  const { children, lang, className, inline } = props;
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : lang || "javascript";

  const modClass = className + " text-sm";
  return !inline ? (
    <SyntaxHighlighter
      className={modClass}
      language={language}
      PreTag="div"
      style={atomDark}
    >
      {String(children)}
    </SyntaxHighlighter>
  ) : (
    <code
      className={
        modClass +
        "bg-gray-700 rounded outline outline-gray-600 outline-offset-1 break-words"
      }
      {...props}
    >
      {children}
    </code>
  );
};

export default CodeBlock;
