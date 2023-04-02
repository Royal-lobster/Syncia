import { useEffect, useState } from "react";
import * as Portal from "@radix-ui/react-portal";
import SideBarHeader from "./components/SideBarHeader";
import TextareaAutosize from "react-textarea-autosize";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("sidebar adding listener");
    chrome.runtime.onMessage.addListener(handleMessage);
    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, []);

  const handleMessage = (message: { action: string }) => {
    console.log("sidebar received message", message);
    if (message.action === "open-sidebar") {
      setIsOpen((p) => !p);
    }
  };

  return (
    <Portal.Root
      className={`fixed z-[999999999] backdrop-blur-xl shadow-md border-l dark:!text-white dark:border-slate-700 border-slate-200 top-0 right-0 w-[400px] h-full dark:bg-slate-900/95 bg-slate-100/95 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <SideBarHeader setIsOpen={setIsOpen} />
      <div className="flex flex-col h-full">
        <div className="grow"></div>
        <TextareaAutosize
          className="mt-auto m-5 mb-36 dark:bg-slate-700/95 bg-slate-200/95"
          minRows={4}
        />
      </div>
    </Portal.Root>
  );
}

export default Sidebar;
