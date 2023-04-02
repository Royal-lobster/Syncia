import { useOpenAIKey } from "@src/hooks/useOpenAIKey";
import Auth from "./auth";
import Chat from "./chat";
import Header from "./layout/header";

function Sidebar() {
  const [openAiKey] = useOpenAIKey();
  return (
    <div className="flex backdrop-blur-sm flex-col min-h-screen shadow-md border-l dark:!text-white dark:border-slate-700 border-slate-200 top-0 right-0 w-[400px] h-full dark:bg-slate-900/95 bg-slate-100/95">
      <Header />
      {openAiKey ? <Chat apiKey={openAiKey} /> : <Auth />}
    </div>
  );
}

export default Sidebar;
