import { Prompt } from '../../../hooks/usePrompts'
import { defaultPrompts } from '../../../prompts/default'

/**
 * Creates the native context menu for the quick menu.
 * This will allow users to right click on any selected text and see the prompt
 * actions on the text.
 *
 * @see https://developer.chrome.com/docs/extensions/reference/contextMenus/
 *
 */
export const CreateContextMenu = () => {
  let prompts = defaultPrompts
  chrome.storage.local.get('PROMPTS', function (result) {
    prompts = (result.PROMPTS as Prompt[]) || defaultPrompts
  })

  const createChildContextMenu = (prompts: Prompt[], parentId: string) => {
    for (const prompt of prompts) {
      const id = parentId + prompt.id
      chrome.contextMenus.create({
        id,
        title: prompt.name,
        contexts: ['selection'],
        parentId,
      })
      if (prompt.children) createChildContextMenu(prompt.children, id)
    }
  }

  // Create root context menu
  chrome.contextMenus.create({
    id: 'quick-menu',
    title: 'Quick Menu',
    contexts: ['selection'],
  })

  // Create child context menus
  createChildContextMenu(prompts, 'quick-menu')
}
