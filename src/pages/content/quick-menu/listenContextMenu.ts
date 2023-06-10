import { deepFind } from '../../../lib/deepFind'
import { generatePromptInSidebar } from '../../../lib/generatePromptInSidebar'
import { getStoredPropts } from '../../../lib/getStoredPrompts'

/**
 * Background script sends
 * chrome.tabs.sendMessage(tab.id, { selectedText })
 *
 * We listen to this message and generate the prompt in the sidebar.
 */

console.log('listenContextMenu.ts: chrome.runtime.onMessage.addListener')

chrome.runtime.onMessage.addListener((request) => {
  console.log('listenContextMenu.ts: chrome.runtime.onMessage.addListener')
  if (request.selectedText) {
    const prompts = getStoredPropts()
    const prompt = deepFind(prompts, 'id', Number(request.prompt.id))
    if (prompt) {
      generatePromptInSidebar(prompt, request.selectedText)
    }
  }
})
