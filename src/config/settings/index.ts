import { defaultPrompts } from '../prompts/default'

export enum ThemeOptions {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export enum AvailableModels {
  GPT_4_VISION = 'gpt-4-vision-preview',
  GPT_4_TURBO = 'gpt-4-0125-preview',
  GPT_4 = 'gpt-4',
  GPT_3_5_TURBO = 'gpt-3.5-turbo-0125',
}

export enum Mode {
  HIGHLY_PRECISE = 0,
  PRECISE = 0.5,
  BALANCED = 1,
  CREATIVE = 1.5,
}

export type Settings = {
  quickMenu: {
    enabled: boolean
    items: typeof defaultPrompts
    excludedSites: string[]
  }
  chat: {
    openAIKey: string | null
    model: AvailableModels
    mode: Mode
    showLocalModels: boolean
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
    model: AvailableModels.GPT_4_VISION,
    mode: Mode.BALANCED,
    showLocalModels: false,
  },
  general: {
    theme: ThemeOptions.SYSTEM,
    webpageContext: false,
  },
}
