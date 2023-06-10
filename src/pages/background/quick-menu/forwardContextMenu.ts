export const forwardContextMenuClicks = () => {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log('info', info)
    if (info.menuItemId === 'settings') {
      chrome.tabs.create({
        url: chrome.runtime.getURL('/src/pages/settings/index.html'),
      })
    } else {
      const selectedText = info.selectionText
      if (tab?.id) chrome.tabs.sendMessage(tab.id, { selectedText })
    }
  })
}
