import { Prompt } from '../hooks/usePrompts'
import { defaultPrompts } from '../prompts/default'

export const getStoredPrompts = () => {
  let prompts = null
  chrome.storage.local.get('PROMPTS', function (result) {
    prompts = (result.PROMPTS as Prompt[]) || defaultPrompts
  })
  if (!prompts) {
    chrome.storage.local.set({ PROMPTS: defaultPrompts }, function () {
      console.log('ℹ️ Default prompts stored from getStoredPrompts.ts')
    })
    prompts = defaultPrompts
  }
  return prompts
}
