import type { Dispatch, SetStateAction } from 'react'
import { atom } from 'jotai'
import { useStorage } from './useStorage'
import { defaultSettings, type Settings } from '../config/settings'

const settingsAtom = atom<Settings>(defaultSettings)
export function useSettings(): [Settings, Dispatch<SetStateAction<Settings>>] {
  return useStorage<Settings>('SETTINGS', settingsAtom, 'sync')
}
