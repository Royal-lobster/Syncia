import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { useEffect } from "react";
import { BsRobot } from "react-icons/bs";

import { RecursiveItem } from "./RecursiveItem";

import "./index.css";
import useThemeSync from "~hooks/useThemeSync";
import { usePrompts } from "~hooks/usePrompts";
import { generatePromptInSidebar } from "~lib/generatePromptInSidebar";

export const ContentClassNames =
  "cdx-flex cdx-flex-col cdx-min-w-[150px] cdx-gap-2 cdx-backdrop-blur-sm !cdx-font-sans cdx-m-2 cdx-bg-neutral-50 cdx-shadow-md cdx-p-2 cdx-rounded dark:cdx-bg-neutral-800 cdx-text-neutral-800 dark:cdx-text-neutral-100";

export const ItemClassNames =
  "cdx-p-1 cdx-rounded cdx-border-0 cdx-select-none cdx-outline-0 cdx-text-sm cdx-flex cdx-items-center cdx-justify-between data-[highlighted]:cdx-bg-neutral-200 data-[highlighted]:dark:cdx-bg-neutral-600";

interface QuickMenuProps {
  selectedText: string;
  setMenuOpen: (open: boolean) => void;
}

export const QuickMenu = ({ selectedText, setMenuOpen }: QuickMenuProps) => {
  useThemeSync();
  const [prompts] = usePrompts();

  useEffect(() => {
    const highlightMenu = document.getElementById(
      "react-highlight-menu-container"
    ) as HTMLDivElement | null;
    if (highlightMenu) highlightMenu.style.zIndex = "2147483647";
  }, []);

  const noCategoryPrompts = prompts.filter((i) => !!i.prompt);

  const handleGenerate = (prompt: string) => {
    generatePromptInSidebar(prompt, selectedText);
  };

  return (
    <DropdownMenu.Root
      onOpenChange={(e) => {
        setMenuOpen(e.valueOf());
      }}
    >
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          style={{ zIndex: 2147483647 }}
          className="cdx-flex cdx-items-stretch cdx-rounded cdx-shadow-md cdx-leading-none cdx-cursor-pointer hover:!cdx-brightness-95 cdx-overflow-hidden cdx-p-0 cdx-m-0 cdx-border-none cdx-bg-neutral-50 dark:cdx-bg-neutral-800 cdx-text-neutral-950 dark:cdx-text-neutral-100"
        >
          <div className="cdx-py-1 cdx-px-1.5 cdx-bg-neutral-200 dark:cdx-bg-neutral-700">
            <BsRobot
              size={15}
              className="cdx-mt-0.5 cdx-fill-neutral-800 dark:cdx-fill-white"
            />
          </div>
          <span className="cdx-py-1 cdx-text-sm !cdx-font-sans cdx-px-1.5 cdx-mt-0.5">
            Syncia
          </span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          style={{ zIndex: 2147483647 }}
          className={ContentClassNames}
        >
          <DropdownMenu.Group>
            {prompts
              .filter((i) => !i.prompt)
              .map((item) => (
                <React.Fragment key={item.id}>
                  <DropdownMenu.Label className="cdx-text-[10px] cdx-m-1 cdx-text-neutral-500 cdx-uppercase">
                    {item.name}
                  </DropdownMenu.Label>
                  {item.children?.map((item) => (
                    <RecursiveItem
                      key={item.id}
                      item={item}
                      handleGenerate={handleGenerate}
                    />
                  ))}
                </React.Fragment>
              ))}

            {noCategoryPrompts.length > 0 && (
              <DropdownMenu.Label className="cdx-text-[10px] cdx-m-1 cdx-text-neutral-500 cdx-uppercase">
                Uncategorized
              </DropdownMenu.Label>
            )}
            {noCategoryPrompts.map((item) => (
              <RecursiveItem item={item} handleGenerate={handleGenerate} />
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
