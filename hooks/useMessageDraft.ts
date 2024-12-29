import { useState } from 'react'
import { getUUID } from '../lib/getUUID'
import { convertBlobToBase64 } from '../lib/convertBlobToBase64'

export interface MessageFile {
  id: string
  type: string
  src: string
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

  const addMessageDraftFile = async (blob: Blob) => {
    const file = {
      id: getUUID(),
      type: blob.type,
      src: await convertBlobToBase64(blob),
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
