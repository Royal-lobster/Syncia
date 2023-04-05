import { CodeProps } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	atomDark,
	materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const isDarkMode = () => {
	if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
		return true;
	} else {
		return false;
	}
};

const CodeBlock = (props: CodeProps) => {
	const { children, className, inline } = props;
	const match = /language-(\w+)/.exec(className || "");
	const language = match ? match[1] : "javascript";
	const modClass = `${className} text-sm`;
	return !inline ? (
		<SyntaxHighlighter
			className={modClass}
			language={language}
			PreTag="div"
			style={isDarkMode() ? atomDark : materialLight}
			showLineNumbers
		>
			{String(children)}
		</SyntaxHighlighter>
	) : (
		<code
			className={`${modClass} bg-gray-200 dark:bg-gray-700 outline-gray-200 dark:outline-gray-700 rounded outline break-words`}
			{...props}
		>
			{children}
		</code>
	);
};

export default CodeBlock;
