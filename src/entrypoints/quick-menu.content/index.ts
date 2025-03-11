import { findPrompt } from '../../lib/findPrompt'
import { generatePromptInSidebar } from '../../lib/generatePromptInSidebar'
import Whitelister from 'redirect-whitelister'
import type { Settings } from '../../config/settings'
import initQuickMenu from './initQuickMenu'

export default defineContentScript({
  matches: ['http://*/*', 'https://*/*', '<all_urls>'],
  allFrames: true,
  main() {
    chrome.storage.sync.get(['SETTINGS'], (result) => {
      const quickMenuSettings = result.SETTINGS
        ?.quickMenu as Settings['quickMenu']
      if (quickMenuSettings) {
        if (quickMenuSettings.enabled) {
          if (quickMenuSettings.excludedSites.length === 0) initQuickMenu()
          else {
            const whitelister = new Whitelister(
              quickMenuSettings.excludedSites || '*',
            )
            const isExcluded = whitelister.verify(window.location.href)
            if (!isExcluded) initQuickMenu()
          }
        }
      } else {
        initQuickMenu()
      }
    })
    chrome.runtime.onMessage.addListener(async (request) => {
      const { payload } = request
      const { selectedText, id } = payload || {}
      if (selectedText && id) {
        const prompt = (await findPrompt(id)).prompt
        if (prompt) {
          generatePromptInSidebar(prompt, selectedText)
        }
      }
    })
  },
})
