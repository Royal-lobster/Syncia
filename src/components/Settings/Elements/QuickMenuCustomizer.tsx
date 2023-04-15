import {
  FolderTreeItemWrapper,
  SortableTree,
  TreeItemComponentProps,
} from 'dnd-kit-sortable-tree'
import React from 'react'
import { HiPencilAlt } from 'react-icons/hi'
import { IoMove } from 'react-icons/io5'
import { Prompt, usePrompts } from '../../../hooks/usePrompts'

const QuickMenuCustomizer = () => {
  const [prompts, setPrompts] = usePrompts()
  return (
    <div>
      <SortableTree
        indentationWidth={10}
        items={prompts}
        onItemsChanged={setPrompts}
        TreeItemComponent={TreeItem}
      />
    </div>
  )
}

const TreeItem = React.forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<Prompt>
>((props, ref) => {
  // const [, setPrompts] = usePrompts()

  return (
    <FolderTreeItemWrapper manualDrag {...props} ref={ref}>
      <div
        data-top-level={!props.item.prompt ? 'true' : undefined}
        className='cdx-bg-neutral-900 cdx-pr-2 cdx-min-w-[200px] cdx-justify-between cdx-overflow-hidden cdx-whitespace-nowrap cdx-flex cdx-items-center cdx-gap-3 cdx-rounded-sm data-[top-level]:cdx-bg-neutral-700'
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

        <button
          onClick={() => {
            props.onCollapse?.()
          }}
          className='cdx-flex cdx-items-center cdx-gap-2 cdx-rounded-sm cdx-px-1 cdx-bg-blue-500/30'
          type="button"
        >
          <HiPencilAlt /> Edit
        </button>
      </div>
    </FolderTreeItemWrapper>
  )
})

export default QuickMenuCustomizer
