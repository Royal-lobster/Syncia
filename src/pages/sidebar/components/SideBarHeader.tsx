import React from "react";
import { HiX } from "react-icons/hi";

const SideBarHeader = () => {
  const onToggle = () => {
    console.log("toggle SENDING");
    chrome.runtime.sendMessage({ action: "open-sidebar" }, (response) => {
      console.log(response);
    });
  };

  return (
    <div className="flex justify-between p-3.5 border-b dark:border-slate-700 border-slate-200">
      <h1 className="text-2xl m-0 p-0">
        ChatDock <span className="text-blue-300">X</span>
      </h1>
      <button className="text-xl" onClick={onToggle}>
        <HiX />
      </button>
    </div>
  );
};

export default SideBarHeader;
