import {
  FolderTreeItemWrapper,
  SortableTree,
  type TreeItemComponentProps,
  type TreeItems,
} from 'dnd-kit-sortable-tree'
import React from 'react'
import { IoMove } from 'react-icons/io5'
import { type Prompt, usePrompts } from '../../../hooks/usePrompts'
import { AddItemButton } from './AddItemButton'
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

      <div className="cdx-my-8">
        <div className="cdx-flex cdx-gap-2 cdx-justify-center">
          <AddItemButton isCategory />
          <AddItemButton isCategory={false} />
        </div>
        <div className="cdx-text-sm cdx-text-neutral-400 cdx-text-center cdx-mt-3">
          Categories are used to organize your prompts. Once you create a new
          category or prompt, they will go at last in the list. You can drag and
          drop them to reorder them as you wish.
        </div>
      </div>
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
        data-top-level={
          props.depth === 0 && !props.item.prompt ? 'true' : undefined
        }
        className="dark:cdx-bg-neutral-900 cdx-bg-neutral-200 cdx-pr-2 cdx-min-w-[200px] cdx-justify-between cdx-overflow-hidden cdx-whitespace-nowrap cdx-flex cdx-items-center cdx-gap-3 cdx-rounded-sm data-[top-level]:dark:cdx-bg-neutral-700  data-[top-level]:cdx-bg-neutral-300 data-[top-level]:cdx-w-full"
      >
        <div className="cdx-flex cdx-gap-3 cdx-items-center">
          <div
            data-top-level={props.depth === 0 ? 'true' : undefined}
            className="cdx-p-2 cdx-h-full cdx-bg-neutral-300 data-[top-level]:cdx-bg-neutral-300 dark:cdx-bg-neutral-700 cdx-cursor-move"
            {...props.handleProps}
          >
            <IoMove />
          </div>
          <div className="cdx-py-1">{props.item.name}</div>
        </div>

        <div className="cdx-flex cdx-gap-2 cdx-items-center">
          <EditPromptButton
            item={props.item}
            isLeafNode={
              !props.childCount &&
              (props.depth === 0 ? !!props.item.prompt : true)
            }
          />
          <DeletePromptButton id={props.item.id} />
        </div>
      </div>
    </FolderTreeItemWrapper>
  )
})

export default QuickMenuCustomize
