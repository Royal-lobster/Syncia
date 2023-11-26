import { useState } from 'react'
import { getUUID } from '../lib/getUUID'

export interface MessageFile {
  id: string
  type: string
  blob: Blob
}

export interface MessageDraft {
  text: string
  files: MessageFile[]
}

export const useMessageDraft = () => {
  const [messageDraft, setMessageDraft] = useState<MessageDraft>({
    text: '',
    files: [],
  })

  const setMessageDraftText = (text: string) => {
    setMessageDraft((p) => ({ ...p, text }))
  }

  const addMessageDraftFile = (blob: Blob) => {
    const file = {
      id: getUUID(),
      type: blob.type,
      blob,
    }
    setMessageDraft((p) => ({ ...p, files: [...p.files, file] }))
  }

  const removeMessageDraftFile = (id: string) => {
    setMessageDraft((p) => ({
      ...p,
      files: p.files.filter((f) => f.id !== id),
    }))
  }

  const resetMessageDraft = () => {
    setMessageDraft({
      text: '',
      files: [],
    })
  }

  return {
    messageDraft,
    setMessageDraftText,
    addMessageDraftFile,
    removeMessageDraftFile,
    resetMessageDraft,
  }
}
