import { backgroundLog } from '../../logs'

backgroundLog()

// =========================== //
// Sidebar Background Script
// =========================== //

const toggleSidebar = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'open-sidebar' })
    }
  })
}

export const initSidebarListeners = () => {
  chrome.commands.getAll(function (commands) {
    const shortcut = commands.find((c) => c.name === 'open-sidebar')?.shortcut
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0].id)
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'sidebar-shortcut',
          shortcut,
        })
    })
  })

  chrome.commands.onCommand.addListener(function (command) {
    console.log(`🚚 [Command Received] ${command}`)
    if (command === 'open-sidebar') {
      toggleSidebar()
    }
  })

  chrome.action.onClicked.addListener(toggleSidebar)

  chrome.runtime.onMessage.addListener(function (
    message,
    _sender,
    sendResponse,
  ) {
    if (
      message.action === 'close-sidebar' ||
      message.action === 'open-sidebar'
    ) {
      toggleSidebar()
    }
    if (message.action === 'generate') {
      message.prompt
    }
    sendResponse({ action: 'close-sidebar' })
  })
}

initSidebarListeners()
