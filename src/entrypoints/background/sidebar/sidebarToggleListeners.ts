/**
 * This file contains all the listeners that toggle the sidebar.
 * The sidebar can be toggled by:
 * 1) Clicking on the extension icon
 * 2) Pressing the keyboard shortcut
 * 3) Programmatically via the chrome.runtime.onMessage listener
 *    (used by the close button in the sidebar)
 */
export const sidebarToggleListeners = () => {
  // Toggle sidebar when user performs a keyboard shortcut
  chrome.commands.onCommand.addListener((command) => {
    console.log(`🚚 [Command Received] ${command}`)
    if (command === 'open-sidebar') {
      toggleSidebar()
    }
  })

  // Toggle sidebar when user clicks on the extension icon
  chrome.action.onClicked.addListener(toggleSidebar)

  // Toggle sidebar programmatically
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (
      message.action === 'close-sidebar' ||
      message.action === 'open-sidebar'
    ) {
      toggleSidebar()
    }
    if (message.action === 'generate') {
      message.prompt
    }
    if (message.action === 'close-sidebar') {
      sendResponse({ action: 'close-sidebar' })
    }
  })
}

const toggleSidebar = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'open-sidebar' })
    }
  })
}
