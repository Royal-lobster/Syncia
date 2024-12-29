import type { Dispatch, SetStateAction } from 'react'
import { atom } from 'jotai'
import { useStorage } from './useStorage'
import { type Settings, defaultSettings } from '../config/settings'

const settingsAtom = atom<Settings>(defaultSettings)
export function useSettings(): [Settings, Dispatch<SetStateAction<Settings>>] {
  return useStorage<Settings>('SETTINGS', settingsAtom, 'sync')
}
