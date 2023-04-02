import { ChatMessageParams, ChatRole } from "@src/hooks/useOpenAI";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface SidebarInputProps {
  submitMessage: (messages: ChatMessageParams[]) => void;
}

export function SidebarInput({ submitMessage }: SidebarInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    console.log("submitting");
    submitMessage([{ content: text, role: ChatRole.USER }]);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-auto flex flex-col m-2 rounded-md border dark:border-slate-600 border-slate-200 dark:bg-slate-800/95 bg-slate-200/95 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50"
    >
      <TextareaAutosize
        minRows={2}
        maxLength={10000}
        placeholder="Type your message here..."
        value={text}
        className="p-3 text-base resize-none max-h-96 pb-0 bg-transparent !border-none focus:!outline-none"
        onChange={(e) => {
          e.preventDefault();
          setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="flex justify-between items-center p-3">
        <div>
          <span className="text-sm">{text.length} / 10,000</span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </div>
    </form>
  );
}
