import { Dispatch, SetStateAction } from 'react'
import { useStorage } from './useStorage'
import { defaultPrompts } from '../prompts/default'

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

export function usePrompts(): [Prompt[], Dispatch<SetStateAction<Prompt[]>>] {
  return useStorage<Prompt[]>('PROMPTS', defaultPrompts, 'local')
}
