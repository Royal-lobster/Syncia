/**
 * This function is used to capture the current tab screen.
 * It is used in the sidebar to capture the screen after
 * user snipes the screen.
 */
export const captureScreenListener = async () => {
  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.action === 'captureVisibleTab') {
      chrome.tabs.captureVisibleTab((dataUrl) => {
        sendResponse(dataUrl)
      })
      return true // This will keep the message channel open until `sendResponse` is called.
    }
  })
}
