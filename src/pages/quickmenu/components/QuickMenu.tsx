import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useCallback, useEffect, useRef } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import { QuickMenuOptions } from "./QuickMenuOptions";

const QuickMenu = () => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    console.log("Resizing...");
    const height =
      (buttonRef.current?.scrollHeight || 0) +
      (menuRef.current?.scrollHeight || 0) +
      10;
    const width =
      (buttonRef.current?.scrollWidth || 0) +
      (menuRef.current?.scrollWidth || 0);
    if (width && height)
      window.parent.postMessage(
        {
          action: "update-quickmenu-dimensions",
          height,
          width,
        },
        "*"
      );

    console.log("Resized! (height: " + height + ", width: " + width + " )");
  }, [buttonRef.current?.scrollHeight, buttonRef.current?.scrollWidth]);

  useEffect(() => {
    handleResize();
  }, [buttonRef.current?.scrollHeight, buttonRef.current?.scrollWidth]);

  return (
    <div
      ref={buttonRef}
      style={{
        width: "max-content",
        height: "max-content",
        position: "absolute",
        top: "0px",
        left: "0px",
        overflow: "scroll",
      }}
    >
      <DropdownMenu.Root onOpenChange={handleResize}>
        <DropdownMenu.Trigger asChild>
          <button
            className="rounded-md overflow-hidden dark:text-white inline-flex dark:bg-neutral-800 bg-neutral-300 items-center justify-center outline-none"
            aria-label="ChatDockX Quick Menu"
          >
            <span className="bg-blue-400 h-full p-1">
              <RxMagnifyingGlass size={18} />
            </span>
            <span className="px-2 py-1">
              ChatDock <span className="text-blue-300 font-semibold">X</span>
            </span>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            ref={menuRef}
            className="p-3 mt-2 rounded-md dark:text-white dark:bg-neutral-800 bg-neutral-300 border dark:border-neutral-700 border-neutral-400"
          >
            <QuickMenuOptions />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default QuickMenu;
