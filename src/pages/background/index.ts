console.log("background script loaded");

const toggleSidebar = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log("tabs", tabs);
    if (tabs[0].id) {
      console.log("sending message");
      chrome.tabs.sendMessage(tabs[0].id, { action: "open-sidebar" });
    }
  });
};

chrome.commands.onCommand.addListener(function (command) {
  console.log("Command:", command);
  if (command === "open-sidebar") {
    toggleSidebar();
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("message received", message, sender);
  if (message.action === "close-sidebar") {
    toggleSidebar();
  }
  sendResponse({ action: "close-sidebar" });
});
