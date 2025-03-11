import { findPrompt } from '../../lib/findPrompt'
import { generatePromptInSidebar } from '../../lib/generatePromptInSidebar'

/**
 * Background script sends
 * chrome.tabs.sendMessage(tab.id, { selectedText, id })
 *
 * We listen to this message and generate the prompt in the sidebar.
 */
