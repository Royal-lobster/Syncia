import { GPT35, useChatCompletion } from "@src/hooks/useOpenAI";
import { SidebarInput } from "./SidebarInput";

import SideBarChat from "./SideBarChat";
import SideBarHeader from "./SideBarHeader";
import { useOpenAIKey } from "@src/hooks/useOpenAiKey";

function Sidebar() {
  const [openAiKey, setOpenAiKey] = useOpenAIKey();
  const [messages, submitMessage] = useChatCompletion({
    model: GPT35.TURBO,
    apiKey: openAiKey as string,
  });

  console.log({ openAiKey });

  const handleOpenAiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const key = data.get("openAiKey");
    if (key) {
      setOpenAiKey(key as string);
    }
  };

  return (
    <div className="flex backdrop-blur-sm flex-col min-h-screen shadow-md border-l dark:!text-white dark:border-slate-700 border-slate-200 top-0 right-0 w-[400px] h-full dark:bg-slate-900/95 bg-slate-100/95">
      <SideBarHeader />
      {openAiKey ? (
        <>
          <SideBarChat messages={messages} />
          <SidebarInput submitMessage={submitMessage} />
        </>
      ) : (
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
      )}
    </div>
  );
}

export default Sidebar;
