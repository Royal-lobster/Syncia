/**
 * We fetch the shortcut assigned to sidebar from chrome.commands.getAll
 * and send it to client via chrome.tabs.sendMessage.
 *
 * We are doing this because we cannot directly access the chrome.commands
 * from the content script.
 */
export const sendSidebarShortcut = () => {
  chrome.commands.getAll((commands) => {
    // Get shortcut
    const shortcut = commands.find((c) => c.name === 'open-sidebar')?.shortcut

    // Send shortcut to client
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (info.status === 'complete' && tabId === tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: 'sidebar-shortcut',
              shortcut,
            })
            chrome.tabs.onUpdated.removeListener(listener)
          }
        })
      }
    })
  })
}
