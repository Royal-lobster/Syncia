import {
  FolderTreeItemWrapper,
  SortableTree,
  TreeItemComponentProps,
  TreeItems,
} from 'dnd-kit-sortable-tree'
import React from 'react'
import { IoMove } from 'react-icons/io5'
import { Prompt, usePrompts } from '../../../hooks/usePrompts'
import { DeletePromptButton } from './DeletePromptButton'
import { EditPromptButton } from './EditPromptButton'

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

const QuickMenuCustomize = () => {
  const [prompts, setPrompts] = usePrompts()

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
          <EditPromptButton item={props.item} isLeafNode={!props.childCount} />
          <DeletePromptButton id={props.item.id} />
        </div>
      </div>
    </FolderTreeItemWrapper>
  )
})

export default QuickMenuCustomize
