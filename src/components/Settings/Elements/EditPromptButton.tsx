import * as Dialog from '@radix-ui/react-dialog'
import { HiPencilAlt } from 'react-icons/hi'
import { Prompt, usePrompts } from '../../../hooks/usePrompts'
import DialogPortal from '../../Layout/DialogPortal'
import TextareaAutosize from 'react-textarea-autosize'
import FieldWrapper from './FieldWrapper'
import { useRef, useState } from 'react'

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
    const newPrompt = formData.get('prompt') as string
    const newName = formData.get('name') as string

    const editItem = (items: Prompt[], id: string): Prompt[] => {
      const newItems = items.map((item) => {
        if (item.id === id) {
          item.name = newName
          item.prompt = newPrompt
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
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className='cdx-flex cdx-items-center cdx-gap-2 cdx-rounded-sm cdx-px-1 cdx-bg-blue-500/30'
          type="button"
        >
          <HiPencilAlt /> Edit
        </button>
      </Dialog.Trigger>
      <DialogPortal
        title="Edit"
        primaryAction={() => {
          handleEdit()
          setOpen(false)
        }}
        secondaryAction={() => setOpen(false)}
        primaryText="Save"
        secondaryText='Cancel'
      >
        <form ref={formRef}>
          <FieldWrapper title="Name">
            <input
              name="name"
              className='input'
              type="text"
              required
              defaultValue={item.name}
              placeholder='Enter Name'
            />
          </FieldWrapper>
          {isLeafNode && (
            <FieldWrapper title="Prompt">
              <TextareaAutosize
                name="prompt"
                className='input'
                required
                placeholder='Enter Prompt'
                minRows={2}
                defaultValue={item.prompt}
              />
            </FieldWrapper>
          )}
        </form>
      </DialogPortal>
    </Dialog.Root>
  )
}
