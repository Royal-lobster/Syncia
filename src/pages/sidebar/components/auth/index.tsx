import { useOpenAIKey } from "@src/hooks/useOpenAIKey";
import React from "react";

const Auth = () => {
  const [, setOpenAiKey] = useOpenAIKey();
  const handleOpenAiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const key = data.get("openAiKey");
    if (key) {
      setOpenAiKey(key as string);
    }
  };
  return (
    <form
      onSubmit={handleOpenAiKeySubmit}
      className="flex flex-col p-6 text-center justify-center items-center h-full"
    >
      <div className="text-xl mt-48">
        Please enter your OpenAI API key to continue
      </div>
      <div className="text-sm text-gray-400 mt-2">
        You can get one{" "}
        <a
          href="https://beta.openai.com/account/api-keys"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400"
        >
          here
        </a>
      </div>
      <div className="text-sm text-gray-400 mt-2">
        It should look something like this:
      </div>
      <div className="text-sm text-gray-400 mt-2">
        sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </div>
      <input
        name="openAiKey"
        placeholder="Enter your OpenAI API key"
        className="mt-4 text-center p-2 w-full rounded-md border dark:border-neutral-600 border-neutral-200 dark:bg-neutral-800/95 bg-neutral-200/95 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50"
        pattern="sk-[a-zA-Z0-9]{48}"
      />
      <button
        type="submit"
        className="mt-4 p-2 w-full rounded-md border dark:border-neutral-600 border-neutral-200 dark:bg-neutral-800/95 bg-neutral-200/95 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50"
      >
        Submit
      </button>
      <div className="text-sm text-gray-400 mt-2">
        (Note: we only store your key locally. We do not send it anywhere. You
        can check the{" "}
        <a
          href="https://github.com/Royal-lobster/ChatDockX"
          className="text-blue-400"
        >
          source code
        </a>{" "}
        and inspect network tab to verify this.)
      </div>
    </form>
  );
};

export default Auth;
