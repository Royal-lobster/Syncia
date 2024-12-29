import type { Settings } from '../../config/settings'
import { getScreenshotImage } from '../../lib/getScreenshotImage'
import { contentScriptLog } from '../../logs'

contentScriptLog('Sidebar')

const iframe = document.createElement('iframe')
iframe.style.background = '#0000002a'
iframe.style.height = '100%'
iframe.style.width = '0px'
iframe.style.position = 'fixed'
iframe.style.top = '0px'
iframe.style.right = '0px'
iframe.style.zIndex = '9000000000000000000'
iframe.style.border = '0px'
iframe.style.colorScheme = 'auto'
iframe.src = chrome.runtime.getURL('/src/pages/sidebar/index.html')
iframe.id = 'syncia_sidebar'

document.body.appendChild(iframe)

/**
 * BG SCRIPT <-> CONTENT SCRIPT
 * Event listener for messages from the background script.
 * To open the sidebar, the background script sends a message with the action 'open-sidebar'.
 * The sidebar is opened by setting the width of the iframe to 400px.
 */
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'open-sidebar') {
    if (iframe.style.width === '0px') {
      iframe.style.width = '400px'
    } else {
      iframe.style.width = '0px'
    }
  }
})

/**
 * SIDEBAR <-> CONTENT SCRIPT
 * Event listener for messages from the sidebar.
 * To get the page content, the sidebar sends a message with the action 'get-page-content'.
 * The page content is sent back to the sidebar by posting a message with the action 'get-page-content'.
 */
window.addEventListener('message', async (event) => {
  const { action, _payload } = event.data as { action: string; _payload: any }

  // ACTION: get-page-content ==============================
  if (action === 'get-page-content') {
    const pageContent = document.body.innerText
    iframe.contentWindow?.postMessage(
      {
        action: 'get-page-content',
        payload: pageContent,
      },
      '*',
    )
  }

  // ACTION: copy-to-clipboard =============================
  if (action === 'copy-to-clipboard') {
    const { content } = _payload as { content: string }
    navigator.clipboard.writeText(content).catch((err) => {
      console.error('Clipboard write failed', err)
    })
  }

  // ACTION: get-screenshot-image ===========================
  if (action === 'get-screenshot-image') {
    iframe.style.width = '0px'
    const image = await getScreenshotImage()
    iframe.style.width = '400px'
    iframe.contentWindow?.postMessage(
      {
        action: 'get-screenshot-image',
        payload: image,
      },
      '*',
    )
  }
})
