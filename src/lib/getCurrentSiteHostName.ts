export const getCurrentSiteHostName = (): Promise<string> =>
  new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0] as any
      const url = tab.url
      const title = new URL(url!).hostname
      resolve(title)
    })
  })
