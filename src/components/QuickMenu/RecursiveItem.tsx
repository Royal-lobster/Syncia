import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import type { Prompt } from '../../hooks/usePrompts'
import { HiOutlineChevronRight } from 'react-icons/hi'

type RecursiveItemProps = {
  item: Prompt
  handleGenerate: (prompt: string) => void
}

export const RecursiveItem = ({ item, handleGenerate }: RecursiveItemProps) => {
  if (item.prompt && !(item.children as [Prompt] | undefined)?.length) {
    return (
      <DropdownMenu.Item
        className="cdx-p-1 cdx-rounded cdx-border-0 cdx-select-none cdx-outline-0 cdx-text-sm cdx-flex cdx-items-center cdx-justify-between data-[highlighted]:cdx-bg-neutral-200 data-[highlighted]:dark:cdx-bg-neutral-600"
        onSelect={() => handleGenerate(item.prompt)}
      >
        <span>{item.name}</span>
      </DropdownMenu.Item>
    )
  }

  if (!item.children || item.children?.length === 0) return null

  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger className="cdx-p-1 cdx-rounded cdx-border-0 cdx-select-none cdx-outline-0 cdx-text-sm cdx-flex cdx-items-center cdx-justify-between data-[highlighted]:cdx-bg-neutral-200 data-[highlighted]:dark:cdx-bg-neutral-600">
        <span>{item.name}</span>
        <HiOutlineChevronRight size={10} />
      </DropdownMenu.SubTrigger>
      <DropdownMenu.SubContent
        className="cdx-flex cdx-flex-col cdx-min-w-[150px] cdx-gap-2 cdx-backdrop-blur-sm !cdx-font-sans cdx-m-2 cdx-bg-neutral-50 cdx-shadow-md cdx-p-2 cdx-rounded dark:cdx-bg-neutral-800 cdx-text-neutral-800 dark:cdx-text-neutral-100"
        style={{ zIndex: 2147483647 }}
      >
        {item.children.map((item) => (
          <RecursiveItem
            key={item.id}
            item={item}
            handleGenerate={handleGenerate}
          />
        ))}
      </DropdownMenu.SubContent>
    </DropdownMenu.Sub>
  )
}
