console.log("background script loaded");

chrome.commands.onCommand.addListener(function (command) {
  console.log("Command:", command);
  if (command === "open-sidebar") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log("tabs", tabs);
      if (tabs[0].id) {
        console.log("sending message");
        chrome.tabs.sendMessage(tabs[0].id, { action: "open-sidebar" });
      }
    });
  }
});
