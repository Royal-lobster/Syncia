console.log("\x1b[34m", "ChatDockX Script Loaded ✨");

// =================== //
// Sidebar Script
// =================== //

chrome.runtime.onMessage.addListener(function (msg) {
  if (msg.action === "open-sidebar") {
    toggle();
  }
});

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

document.body.appendChild(iframe);

function toggle() {
  if (iframe.style.width == "0px") {
    iframe.style.width = "400px";
  } else {
    iframe.style.width = "0px";
  }
}

// =================== //
// QuickMenu Script
// =================== //

let quickMenuIframe: null | HTMLIFrameElement = null;

document.addEventListener("selectionchange", function () {
  const selectedText = window.getSelection()?.toString().trim();
  if (!selectedText) {
    if (quickMenuIframe !== null) {
      removeIframe();
    }
  }
});

document.addEventListener("mouseup", function () {
  const selectedText = window.getSelection()?.toString().trim();
  if (!selectedText) return;

  if (selectedText.length > 0) {
    if (quickMenuIframe !== null) {
      removeIframe();
    }
    const range = window.getSelection()?.getRangeAt(0);

    if (!range) return;
    const rect = range.getBoundingClientRect();
    const x = rect.left + window.scrollX;
    const y = rect.bottom + window.scrollY;
    createIframe(x, y);
  }
});

const updateIframeDimensions = (event: MessageEvent) => {
  if (!quickMenuIframe) return;
  if (event.data.action === "update-quickmenu-dimensions") {
    quickMenuIframe.style.height = event.data.height + "px";
    quickMenuIframe.style.width = event.data.width + "px";
  }
};

function createIframe(x: number, y: number) {
  if (quickMenuIframe) removeIframe();
  quickMenuIframe = document.createElement("iframe");
  quickMenuIframe.src = chrome.runtime.getURL(
    "/src/pages/quickmenu/index.html"
  );
  quickMenuIframe.style.position = "absolute";
  quickMenuIframe.style.top = y + "px";
  quickMenuIframe.style.left = x + "px";
  quickMenuIframe.style.zIndex = "2147483640";
  quickMenuIframe.style.border = "0px";
  quickMenuIframe.style.background = "transparent";
  quickMenuIframe.style.colorScheme = "normal";

  document.body.appendChild(quickMenuIframe);

  window.addEventListener("message", updateIframeDimensions);
  window.addEventListener("scroll", updateIframePosition);
}

function removeIframe() {
  if (!quickMenuIframe) return;
  document.body.removeChild(quickMenuIframe);
  quickMenuIframe = null;
  window.removeEventListener("scroll", updateIframePosition);
  window.removeEventListener("message", updateIframeDimensions);
}

function updateIframePosition() {
  const range = window.getSelection()?.getRangeAt(0);
  if (!range || !quickMenuIframe) return;
  const rect = range.getBoundingClientRect();
  const x = rect.left + window.scrollX;
  const y = rect.bottom + window.scrollY;
  quickMenuIframe.style.top = y + "px";
  quickMenuIframe.style.left = x + "px";
}
