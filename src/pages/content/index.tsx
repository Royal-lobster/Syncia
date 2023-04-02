console.log("side-panel script loaded");

chrome.runtime.onMessage.addListener(function (msg) {
  console.log("message received", msg);
  if (msg.action === "open-sidebar") {
    console.log("message received");
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
iframe.src = chrome.runtime.getURL("/src/pages/sidebar/index.html");

document.body.appendChild(iframe);

function toggle() {
  if (iframe.style.width == "0px") {
    iframe.style.width = "400px";
  } else {
    iframe.style.width = "0px";
  }
}
