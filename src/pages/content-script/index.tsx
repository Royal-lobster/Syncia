import { contentScriptLog } from "../../logs";

contentScriptLog();

// =================== //
// Sidebar Script
// =================== //

const createSidebar = () => {
  const iframe = document.createElement("iframe");
  iframe.style.background = "transparent";
  iframe.style.height = "100%";
  iframe.style.width = "0px";
  iframe.style.position = "fixed";
  iframe.style.top = "0px";
  iframe.style.right = "0px";
  iframe.style.zIndex = "9000000000000000000";
  iframe.style.border = "0px";
  iframe.style.colorScheme = "normal";
  iframe.src = chrome.runtime.getURL("/src/pages/sidebar/index.html");

  return iframe;
};

const toggleSidebar = (iframe: HTMLIFrameElement) => {
  if (iframe.style.width == "0px") {
    iframe.style.width = "400px";
  } else {
    iframe.style.width = "0px";
  }
};

const iframe = createSidebar();
document.body.appendChild(iframe);

chrome.runtime.onMessage.addListener(function (msg) {
  if (msg.action === "open-sidebar") {
    toggleSidebar(iframe);
  }
});
