export const forwardContextMenuClicks = () => {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'settings') {
      chrome.tabs.create({
        url: chrome.runtime.getURL('/src/pages/settings/index.html'),
      })
    } else {
      const selectedText = info.selectionText
      const id = info.menuItemId
      if (tab?.id)
        chrome.tabs.sendMessage(tab.id, {
          action: 'forward-context-menu-click',
          payload: { selectedText, id },
        })
    }
  })
}
