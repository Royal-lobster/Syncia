import { Prompt } from '../hooks/usePrompts'
import { defaultPrompts } from '../prompts/default'

export const getStoredPropts = () => {
  let prompts = defaultPrompts
  chrome.storage.local.get('PROMPTS', function (result) {
    prompts = (result.PROMPTS as Prompt[]) || defaultPrompts
  })
  return prompts
}
