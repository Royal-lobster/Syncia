import { Dispatch, SetStateAction } from 'react'
import { useStorage } from './useStorage'

export function useOpenAIKey(): [
  string | null,
  Dispatch<SetStateAction<string | null>>,
] {
  return useStorage<string | null>('OPEN_AI_KEY', null, 'sync')
}
