import { Dispatch, SetStateAction } from 'react'
import { Settings, defaultSettings } from '../config/settings'
import { useStorage } from './useStorage'

export function useSettings(): [Settings, Dispatch<SetStateAction<Settings>>] {
  return useStorage<Settings>('SETTINGS', defaultSettings, 'sync')
}
