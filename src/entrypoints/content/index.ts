import { getScreenshotImage } from '../../lib/getScreenshotImage'
import { contentScriptLog } from '../../logs'

function createSidebar() {
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
  iframe.src = chrome.runtime.getURL('/src/entrypoints/sidebar/index.html')
  iframe.id = 'syncia_sidebar'
  return iframe
}

function setupMessageListeners(iframe: HTMLIFrameElement) {
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === 'open-sidebar') {
      if (iframe.style.width === '0px') {
        iframe.style.width = '400px'
      } else {
        iframe.style.width = '0px'
      }
    }
  })
  window.addEventListener('message', async (event) => {
    const { action, _payload } = event.data as {
      action: string
      _payload: any
    }

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

    if (action === 'copy-to-clipboard') {
      const { content } = _payload as { content: string }
      navigator.clipboard.writeText(content).catch((err) => {
        console.error('Clipboard write failed', err)
      })
    }

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
}

export default defineContentScript({
  main() {
    contentScriptLog('Sidebar')
    const iframe = createSidebar()
    document.body.appendChild(iframe)
    setupMessageListeners(iframe)
  },
})
