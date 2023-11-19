import type { Dispatch, SetStateAction } from 'react'
import { useStorage } from './useStorage'
import { defaultPrompts } from '../config/prompts/default'
import { atom } from 'jotai'

export type PromptWithChildren = {
  id: string
  name: string
  children: Prompt[]
  prompt?: undefined
}

export type Prompt =
  | {
      id: string
      name: string
      children?: never
      prompt: string
    }
  | PromptWithChildren

const promptsAtom = atom<Prompt[]>(defaultPrompts)

export function usePrompts(): [Prompt[], Dispatch<SetStateAction<Prompt[]>>] {
  return useStorage<Prompt[]>('PROMPTS', promptsAtom, 'local')
}
