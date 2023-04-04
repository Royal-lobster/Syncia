import { useOpenAIKey } from "../../../hooks/useOpenAIKey";
import Auth from "./auth";
import Chat from "./chat";
import Header from "./layout/header";
import "../../../index.css";

function Sidebar() {
  const [openAiKey] = useOpenAIKey();
  return (
    <div className="flex backdrop-blur-sm flex-col min-h-screen shadow-md border-l dark:!text-white dark:border-neutral-800 border-neutral-200 top-0 right-0 w-[400px] h-full dark:bg-neutral-950/90 bg-neutral-100/95">
      <Header />
      {openAiKey ? <Chat apiKey={openAiKey} /> : <Auth />}
    </div>
  );
}

export default Sidebar;
