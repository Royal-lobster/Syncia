import {
  FolderTreeItemWrapper,
  SortableTree,
  TreeItemComponentProps,
  TreeItems,
} from 'dnd-kit-sortable-tree'
import React from 'react'
import { HiPencilAlt, HiTrash } from 'react-icons/hi'
import { IoMove } from 'react-icons/io5'
import { Prompt, usePrompts } from '../../../hooks/usePrompts'

const QuickMenuCustomizer = () => {
  const [prompts, setPrompts] = usePrompts()

  const selectPromptItems = (items?: TreeItems<Prompt>): Prompt[] | undefined =>
    items?.map(
      (item) =>
        ({
          id: item.id,
          name: item.name,
          children: selectPromptItems(item.children),
          prompt: item.prompt,
        }) as Prompt,
    )

  return (
    <div>
      <SortableTree
        indentationWidth={10}
        items={prompts}
        onItemsChanged={(i) => setPrompts((p) => selectPromptItems(i) ?? p)}
        TreeItemComponent={TreeItem}
      />
    </div>
  )
}

const TreeItem = React.forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<Prompt>
>((props, ref) => {
  const [, setPrompts] = usePrompts()

  const handleDelete = () => {
    props.onCollapse?.()
    const removeItem = (items: Prompt[], id: string): Prompt[] => {
      const newItems = items.filter((item) => item.id !== id)
      newItems.forEach((item) => {
        if (item.children) {
          item.children = removeItem(item.children, id)
        }
      })
      return newItems
    }

    setPrompts((p) => removeItem(p, props.item.id))
  }

  return (
    <FolderTreeItemWrapper manualDrag {...props} ref={ref}>
      <div
        data-top-level={props.depth === 0 ? 'true' : undefined}
        className='cdx-bg-neutral-900 cdx-pr-2 cdx-min-w-[200px] cdx-justify-between cdx-overflow-hidden cdx-whitespace-nowrap cdx-flex cdx-items-center cdx-gap-3 cdx-rounded-sm data-[top-level]:cdx-bg-neutral-700 data-[top-level]:cdx-w-full'
      >
        <div className='cdx-flex cdx-gap-3 cdx-items-center'>
          <div
            className='cdx-p-2 cdx-h-full cdx-bg-blue-500/50 cdx-cursor-move'
            {...props.handleProps}
          >
            <IoMove />
          </div>
          <div className='cdx-py-1'>{props.item.name}</div>
        </div>

        <div className='cdx-flex cdx-gap-2 cdx-items-center'>
          <button
            onClick={() => {
              props.onCollapse?.()
            }}
            className='cdx-flex cdx-items-center cdx-gap-2 cdx-rounded-sm cdx-px-1 cdx-bg-blue-500/30'
            type="button"
          >
            <HiPencilAlt /> Edit
          </button>
          <button
            onClick={handleDelete}
            className='cdx-rounded-sm cdx-p-1 cdx-bg-red-500/30'
            type="button"
          >
            <HiTrash />
          </button>
        </div>
      </div>
    </FolderTreeItemWrapper>
  )
})

export default QuickMenuCustomizer
