import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { HiDocumentSearch } from 'react-icons/hi'

interface QuickMenuProps {
  selectedText: string
  setMenuOpen: (open: boolean) => void
}

export const QuickMenu = ({ selectedText, setMenuOpen }: QuickMenuProps) => {
  console.log(selectedText, setMenuOpen)
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="cdx-flex cdx-overflow-hidden cdx-p-0 cdx-m-0 cdx-items-center cdx-rounded-sm  cdx-border-none cdx-bg-neutral-50 dark:cdx-bg-neutral-800 cdx-text-neutral-950 dark:cdx-text-neutral-100"
        >
          <div className="cdx-py-1 cdx-px-1.5 !cdx-bg-blue-400">
            <HiDocumentSearch size={15} />
          </div>
          <span className='cdx-py-1 cdx-px-1.5'>ChatDock X</span>
        </button>
      </DropdownMenu.Trigger>
    </DropdownMenu.Root>
  )
}
