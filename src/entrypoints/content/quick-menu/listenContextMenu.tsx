import { findPrompt } from '../../../lib/findPrompt'
import { generatePromptInSidebar } from '../../../lib/generatePromptInSidebar'

/**
 * Background script sends
 * chrome.tabs.sendMessage(tab.id, { selectedText, id })
 *
 * We listen to this message and generate the prompt in the sidebar.
 */

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
