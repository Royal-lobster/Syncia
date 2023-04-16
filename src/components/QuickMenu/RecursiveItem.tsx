import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ContentClassNames, ItemClassNames } from '.'
import { Prompt } from '../../hooks/usePrompts'
import { HiOutlineChevronRight } from 'react-icons/hi'

type RecursiveItemProps = {
  item: Prompt
  handleGenerate: (prompt: string) => void
}

export const RecursiveItem = ({ item, handleGenerate }: RecursiveItemProps) => {
  if (item.prompt && !(item.children as [Prompt] | undefined)?.length) {
    return (
      <DropdownMenu.Item
        className={ItemClassNames}
        onSelect={() => handleGenerate(item.prompt)}
      >
        <span>{item.name}</span>
      </DropdownMenu.Item>
    )
  }

  if (!item.children || item.children?.length === 0) return null

  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger className={ItemClassNames}>
        <span>{item.name}</span>
        <HiOutlineChevronRight size={10} />
      </DropdownMenu.SubTrigger>
      <DropdownMenu.SubContent
        className={ContentClassNames}
        style={{ zIndex: 2147483647 }}
      >
        {item.children.map((item) => (
          <RecursiveItem item={item} handleGenerate={handleGenerate} />
        ))}
      </DropdownMenu.SubContent>
    </DropdownMenu.Sub>
  )
}
