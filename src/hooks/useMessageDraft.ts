import { atom, useAtom } from 'jotai'
import { getUUID } from '../lib/getUUID'

interface MessageFile {
  id: string
  blob: Blob
}

interface MessageDraft {
  text: string
  files: MessageFile[]
}

const messageDraftAtom = atom<MessageDraft>({
  text: '',
  files: [],
})

export const useMessageDraft = () => {
  const [messageDraft, setMessageDraft] = useAtom(messageDraftAtom)

  const setMessageDraftText = (text: string) => {
    setMessageDraft((p) => ({ ...p, text }))
  }

  const addMessageDraftFile = (blob: Blob) => {
    const file = {
      id: getUUID(),
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
