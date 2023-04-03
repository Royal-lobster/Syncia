import { ChatMessageParams, ChatRole } from "@src/hooks/useOpenAI";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { GiMagicBroom } from "react-icons/gi";
import { IoSend } from "react-icons/io5";
import { HiHand } from "react-icons/hi";

interface SidebarInputProps {
  loading: boolean;
  submitMessage: (messages: ChatMessageParams[]) => void;
  clearMessages: () => void;
  chatIsEmpty: boolean;
  cancelRequest: () => void;
}

export function SidebarInput({
  loading,
  submitMessage,
  clearMessages,
  chatIsEmpty,
  cancelRequest,
}: SidebarInputProps) {
  const [text, setText] = useState("");
  const [delayedLoading, setDelayedLoading] = useState(false);

  useEffect(() => {
    const handleLoadingTimeout = setTimeout(() => {
      setDelayedLoading(loading);
    }, 2000);
    return () => {
      clearTimeout(handleLoadingTimeout);
    };
  }, [loading]);

  const handleSubmit = () => {
    submitMessage([{ content: text, role: ChatRole.USER }]);
    setText("");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col ">
      <div className="flex items-center justify-between">
        {!chatIsEmpty && (
          <button
            onClick={clearMessages}
            className="rounded-full h-10 w-10 grid place-items-center text-center bg-blue-500 hover:bg-blue-700 text-white font-bold m-2"
          >
            <GiMagicBroom size={18} className="mx-auto" />
          </button>
        )}
      </div>

      <div className="m-2 rounded-md border dark:border-neutral-800 border-neutral-300 dark:bg-neutral-900/90 bg-neutral-200/95 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50">
        <TextareaAutosize
          minRows={2}
          maxLength={10000}
          placeholder="Type your message here..."
          value={text}
          disabled={loading}
          className="p-3 w-full text-sm resize-none max-h-96 pb-0 bg-transparent !border-none focus:!outline-none"
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
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-200">
              {text.length} / 10,000
            </span>
          </div>
          {!delayedLoading ? (
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="flex gap-2 disabled:bg-slate-500 disabled:text-slate-400 items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <span>Send</span> <IoSend size={10} />
            </button>
          ) : (
            <button
              onClick={cancelRequest}
              className="flex gap-2 disabled:bg-slate-500 disabled:text-slate-400 items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              <HiHand size={18} /> <span>Stop</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
