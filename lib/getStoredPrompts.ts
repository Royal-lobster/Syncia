import type { Prompt } from '../hooks/usePrompts'
import { defaultPrompts } from '../config/prompts/default'

export const getStoredPrompts = async () => {
  const storedPrompts = await getStoredLocalPrompts()
  if (!storedPrompts) {
    chrome.storage.local.set({ PROMPTS: defaultPrompts }, () => {
      console.log('ℹ️ Default prompts stored from getStoredPrompts.ts')
    })
  }
  return storedPrompts ?? defaultPrompts
}

const getStoredLocalPrompts = async () => {
  const storedLocalPrompts = await new Promise((resolve) => {
    chrome.storage.local.get('PROMPTS', (result) => {
      resolve(result.PROMPTS)
    })
  })
  return storedLocalPrompts as Prompt[] | null
}
