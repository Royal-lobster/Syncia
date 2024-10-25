import { defaultPrompts } from '../prompts/default'

export enum ThemeOptions {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export enum Mode {
  HIGHLY_PRECISE = 0,
  PRECISE = 0.5,
  BALANCED = 1,
  CREATIVE = 1.5,
}

export type ModelCapabilities = {
  completion_chat: boolean
  function_calling: boolean
  vision: boolean
  fine_tuning: boolean
  completion_fim: boolean
}

export type ModelInfo = {
  id: string
  name: string
  description: string
  capabilities: ModelCapabilities
  max_context_length: number
  owned_by: string
}

export type Settings = {
  quickMenu: {
    enabled: boolean
    items: typeof defaultPrompts
    excludedSites: string[]
  }
  chat: {
    openAIKey: string | null
    model: ModelInfo | null
    mode: Mode
    openAiBaseUrl: string | null
  }
  general: {
    theme: ThemeOptions
    webpageContext: boolean
  }
}

export const defaultSettings: Settings = {
  quickMenu: {
    enabled: true,
    items: defaultPrompts,
    excludedSites: [],
  },
  chat: {
    openAIKey: null,
    model: null,
    mode: Mode.BALANCED,
    openAiBaseUrl: null,
  },
  general: {
    theme: ThemeOptions.SYSTEM,
    webpageContext: false,
  },
}
