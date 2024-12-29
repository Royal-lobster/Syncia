import { getStoredPrompts } from './getStoredPrompts'

/**
 * Find a prompt by its id. It uses depth-first search to get the
 * first prompt with the given id.
 */
export const findPrompt = async (id: string) => {
  const prompts = await getStoredPrompts()

  const find = (prompts: any): any => {
    for (const prompt of prompts) {
      if (prompt.id === id) {
        return prompt
      }
      if (prompt.children) {
        const found = find(prompt.children)
        if (found) {
          return found
        }
      }
    }
  }

  return find(prompts)
}
