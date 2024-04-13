import { type Settings, defaultSettings } from '../config/settings'

export const getStoredSettings = async () => {
  const storedSettings = await getStoredLocalSettings()
  if (!storedSettings) {
    chrome.storage.local.set({ SETTINGS: defaultSettings }, () => {
      console.log('ℹ️ Default settings stored from getStoredPrompts.ts')
    })
  }
  return storedSettings || defaultSettings
}

const getStoredLocalSettings = async () => {
  const storedLocalSettings = await new Promise((resolve) => {
    chrome.storage.local.get('SETTINGS', (result) => {
      resolve(result.SETTINGS)
    })
  })
  return storedLocalSettings as Settings | null
}
