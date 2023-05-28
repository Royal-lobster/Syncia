import { Prompt } from '../../../hooks/usePrompts'
import { defaultPrompts } from '../../../prompts/default'

/**
 * Creates the native context menu for the quick menu.
 * This will allow users to right click on any selected text and see the prompt
 * actions on the text.
 *
 * @see https://developer.chrome.com/docs/extensions/reference/contextMenus/
 *
 * It performs the following steps:
 * 1. Get the prompts from storage
 * 2. Create the text actions at start
 * 3. Create the menu for rest of the items
 *
 */

export const CreateContextMenu = () => {
  let prompts = defaultPrompts
  chrome.storage.local.get('PROMPTS', function (result) {
    prompts = (result.PROMPTS as Prompt[]) || defaultPrompts
  })

  const contextMenuItems: chrome.contextMenus.CreateProperties[] = []

  // Create text actions context menu
  const createChildContextMenu = (prompts: Prompt[], parentId?: string) => {
    for (const prompt of prompts) {
      const id = parentId + prompt.id
      contextMenuItems.push({
        id,
        title: prompt.name,
        contexts: ['selection'],
        parentId,
      })
      if (prompt.children) createChildContextMenu(prompt.children, id)
    }
  }
  createChildContextMenu(prompts)

  // Create Settings context menu
  contextMenuItems.push(
    {
      id: 'separator',
      type: 'separator',
      contexts: ['selection'],
    },
    {
      id: 'settings',
      title: 'Settings',
      contexts: ['selection'],
    },
  )

  // Create context menu
  for (const item of contextMenuItems) {
    chrome.contextMenus.create(item)
  }
}
