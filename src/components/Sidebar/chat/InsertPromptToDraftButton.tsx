import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { RiAddLine } from 'react-icons/ri'
import { ContentClassNames } from '../../QuickMenu'
import { usePrompts } from '../../../hooks/usePrompts'
import { RecursiveItem } from '../../QuickMenu/RecursiveItem'

interface InsertPromptToDraftButtonProps {
  setMessageDraftText: (text: string) => void
}

const InsertPromptToDraftButton = ({
  setMessageDraftText,
}: InsertPromptToDraftButtonProps) => {
  const [prompts] = usePrompts()
  const noCategoryPrompts = prompts.filter((i) => !!i.prompt)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="cdx-bg-neutral-300 cdx-text-neutral-500 dark:cdx-text-neutral-200 dark:cdx-bg-neutral-800 cdx-p-1.5 cdx-rounded"
        >
          <RiAddLine size={18} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          style={{ zIndex: 2147483647 }}
          className={ContentClassNames}
        >
          <DropdownMenu.Group>
            {prompts
              .filter((i) => !i.prompt)
              .map((item) => (
                <React.Fragment key={item.id}>
                  <DropdownMenu.Label className="cdx-text-[10px] cdx-m-1 cdx-text-neutral-500 cdx-uppercase">
                    {item.name}
                  </DropdownMenu.Label>
                  {item.children?.map((item) => (
                    <RecursiveItem
                      key={item.id}
                      item={item}
                      handleGenerate={setMessageDraftText}
                    />
                  ))}
                </React.Fragment>
              ))}

            {noCategoryPrompts.length > 0 && (
              <DropdownMenu.Label className="cdx-text-[10px] cdx-m-1 cdx-text-neutral-500 cdx-uppercase">
                Uncategorized
              </DropdownMenu.Label>
            )}
            {noCategoryPrompts.map((item) => (
              <RecursiveItem item={item} handleGenerate={setMessageDraftText} />
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default InsertPromptToDraftButton
