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
      className="flex flex-col p-6 justify-center items-center h-full"
    >
      <div className="text-xl mt-48">Please enter your OpenAI API key</div>
      <input
        name="openAiKey"
        className="mt-4 p-2 w-full rounded-md border dark:border-slate-600 border-slate-200 dark:bg-slate-800/95 bg-slate-200/95 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50"
        pattern="sk-[a-zA-Z0-9]{48}"
      />
    </form>
  );
};

export default Auth;
