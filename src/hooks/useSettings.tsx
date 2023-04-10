import { Dispatch, SetStateAction } from 'react'
import { useStorage } from './useStorage'
import { defaultPrompts } from '../prompts/list'

type Settings = {
  quickMenu: {
    enabled: boolean
    items: typeof defaultPrompts
    excludedSites: string[]
  }
  chat: {
    openAIKey: string | null
  }
}

const defaultSettings: Settings = {
  quickMenu: {
    enabled: true,
    items: defaultPrompts,
    excludedSites: [],
  },
  chat: {
    openAIKey: null,
  },
}

export function useSettings(): [Settings, Dispatch<SetStateAction<Settings>>] {
  return useStorage<Settings>('SETTINGS', defaultSettings, 'sync')
}
