import React from "react";
import { HiX } from "react-icons/hi";

interface SideBarHeaderProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarHeader = ({ setIsOpen }: SideBarHeaderProps) => {
  return (
    <div className="flex justify-between p-3.5 border-b dark:border-slate-700 border-slate-200">
      <div className="flex flex-col">
        <h1 className="text-2xl m-0 p-0">
          ChatDock <span className="text-blue-300">X</span>
        </h1>
      </div>
      <button className="text-xl" onClick={() => setIsOpen((p) => !p)}>
        <HiX />
      </button>
    </div>
  );
};

export default SideBarHeader;
