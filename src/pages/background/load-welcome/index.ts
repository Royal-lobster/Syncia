export const loadWelcomePageOnInstall = () => {
  chrome.runtime.onInstalled.addListener(function (details) {
    const externalUrl = 'http://example.com/'

    if (details.reason === 'install') {
      const internalUrl = chrome.runtime.getURL('/src/pages/welcome/index.html')
      const fullUrl = externalUrl + internalUrl

      chrome.tabs.create({ url: fullUrl }, function (tab) {
        console.log(`New tab launched with combined URL: ${fullUrl} in ${tab}`)
      })
    }
  })
}
