import { useStorage } from "@plasmohq/storage/hook";
import HighlightMenu from "react-highlight-menu";
import Whitelister from "redirect-whitelister";
import { QuickMenu } from "~components/QuickMenu";
import type { Settings } from "~config/settings";

/**
 * Initializes the visual quick menu. (when the user selects text)
 * It is only initialized if the user has enabled it in the settings.
 * If the user has excluded the current site, it is not initialized.
 */
export const initQuickMenu = () => {
  const [settings] = useStorage<Settings>("SETTINGS");

  let isEnabled = false;
  const quickMenuSettings = settings?.quickMenu;
  if (quickMenuSettings?.enabled) {
    if (quickMenuSettings.excludedSites.length === 0) isEnabled = true;
    else {
      const whitelister = new Whitelister(
        quickMenuSettings.excludedSites || "*"
      );
      const isExcluded = whitelister.verify(window.location.href);
      if (!isExcluded) isEnabled = true;
    }
  }

  if (!isEnabled) return;
  return (
    <HighlightMenu
      target=".syncia_body"
      menu={({ selectedText, setMenuOpen }) => (
        <QuickMenu selectedText={selectedText} setMenuOpen={setMenuOpen} />
      )}
      placement="bottom-start"
      styles={{
        borderColor: "none",
        background: "transparent",
        boxShadow: "none",
        zIndex: 2147483647,
        borderRadius: "0",
        padding: "0",
        margin: "10px",
      }}
    />
  );
};
