console.log("background script loaded");

const toggleSidebar = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "open-sidebar" });
    }
  });
};

chrome.commands.onCommand.addListener(function (command) {
  if (command === "open-sidebar") {
    toggleSidebar();
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "close-sidebar") {
    toggleSidebar();
  }
  sendResponse({ action: "close-sidebar" });
});
