import { HiX } from "react-icons/hi";

const Header = () => {
  const onToggle = () => {
    chrome.runtime.sendMessage({ action: "close-sidebar" });
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

export default Header;
