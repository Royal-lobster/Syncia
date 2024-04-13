import * as Dialog from '@radix-ui/react-dialog'
import { useRef, useState } from 'react'
import { HiPencilAlt } from 'react-icons/hi'
import TextareaAutosize from 'react-textarea-autosize'
import { type Prompt, usePrompts } from '../../../hooks/usePrompts'
import DialogPortal from '../../Layout/DialogPortal'

export const EditPromptButton = ({
  item,
  isLeafNode,
}: { item: Prompt; isLeafNode: boolean }) => {
  const [open, setOpen] = useState(false)
  const [, setPrompts] = usePrompts()
  const formRef = useRef<HTMLFormElement>(null)

  const handleEdit = () => {
    if (!formRef.current || !formRef.current.reportValidity()) return

    const formData = new FormData(formRef.current)

    const newName = formData.get('promptName') as string
    const newPrompt = formData.get('prompt') as string

    const editItem = (items: Prompt[], id: string): Prompt[] => {
      const newItems = items.map((item) => {
        if (item.id === id) {
          item.name = newName
          if (isLeafNode) item.prompt = newPrompt
        }
        if (item.children) {
          item.children = editItem(item.children, id)
        }
        return item
      })
      return newItems
    }

    setPrompts([])
    setPrompts((p) => editItem(p, item.id))
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="cdx-flex cdx-items-center cdx-gap-2 cdx-rounded-sm cdx-px-1 cdx-bg-blue-300/50 dark:cdx-bg-blue-500/50"
          type="button"
        >
          <HiPencilAlt /> Edit
        </button>
      </Dialog.Trigger>
      <DialogPortal
        title={isLeafNode ? 'Edit Prompt' : 'Edit Category'}
        primaryAction={handleEdit}
        secondaryAction={() => setOpen(false)}
        primaryText="Save"
        secondaryText="Cancel"
      >
        <form className="cdx-flex cdx-flex-col cdx-gap-2" ref={formRef}>
          <label htmlFor="promptName">Name</label>
          <input
            name="promptName"
            className="input"
            type="text"
            required
            defaultValue={item.name}
            placeholder="Enter Name"
          />
          {isLeafNode && (
            <>
              <label htmlFor="prompt">Prompt</label>
              <TextareaAutosize
                name="prompt"
                className="input"
                required
                placeholder="Enter Prompt"
                minRows={2}
                maxRows={15}
                defaultValue={item.prompt}
              />
            </>
          )}
        </form>
      </DialogPortal>
    </Dialog.Root>
  )
}
