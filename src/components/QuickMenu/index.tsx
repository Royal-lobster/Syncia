import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { BsRobot } from 'react-icons/bs'
import { promptOptions } from '../../prompts/list'
import { HiOutlineChevronRight } from 'react-icons/hi'

interface QuickMenuProps {
  selectedText: string
  setMenuOpen: (open: boolean) => void
}

export const QuickMenu = ({ selectedText, setMenuOpen }: QuickMenuProps) => {
  console.log(selectedText, setMenuOpen)
  return (
    <DropdownMenu.Root
      onOpenChange={(e) => {
        setMenuOpen(e.valueOf())
      }}
    >
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="cdx-flex cdx-rounded cdx-cursor-pointer hover:!cdx-brightness-95 cdx-overflow-hidden cdx-p-0 cdx-m-0 cdx-items-center cdx-border-none cdx-bg-neutral-50 dark:cdx-bg-neutral-800 cdx-text-neutral-950 dark:cdx-text-neutral-100"
        >
          <div className="cdx-py-1 cdx-px-1.5 cdx-bg-neutral-400 dark:cdx-bg-neutral-700">
            <BsRobot size={15} className='cdx-mt-0.5' />
          </div>
          <span className='cdx-py-1 cdx-px-1.5 cdx-mt-0.5'>ChatDock X</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className='!cdx-font-sans cdx-my-1 cdx-bg-neutral-50 cdx-p-1 cdx-rounded dark:cdx-bg-neutral-800 cdx-text-neutral-950 dark:cdx-text-neutral-100'>
          {promptOptions.map((prompt) => (
            <DropdownMenu.Group key={prompt.sectionName}>
              <DropdownMenu.Label className='cdx-text-[10px] cdx-font-semibold cdx-mt-2 cdx-my-1 font-bold cdx-text-neutral-500 cdx-uppercase'>
                {prompt.sectionName}
              </DropdownMenu.Label>
              {prompt.items.map((item) => {
                if (item.items)
                  return (
                    <DropdownMenu.Sub key={item.name}>
                      <DropdownMenu.SubTrigger className='cdx-p-1 cdx-rounded cdx-border-0 cdx-select-none cdx-outline-0 cdx-text-sm cdx-flex cdx-items-center cdx-justify-between data-[highlighted]:cdx-bg-neutral-600'>
                        <span>{item.name}</span>
                        <HiOutlineChevronRight size={10} />
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.SubContent className='!cdx-font-sans cdx-my-1 cdx-bg-neutral-50 cdx-p-1 cdx-rounded dark:cdx-bg-neutral-800 cdx-text-neutral-950 dark:cdx-text-neutral-100'>
                          {item.items.map((subItem) => (
                            <DropdownMenu.Item
                              key={subItem.name}
                              className='cdx-p-1 cdx-border-0 cdx-select-none cdx-outline-0 cdx-rounded cdx-text-sm data-[highlighted]:cdx-bg-neutral-600'
                            >
                              {subItem.name}
                            </DropdownMenu.Item>
                          ))}
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Sub>
                  )
                return (
                  <DropdownMenu.Item
                    key={item.name}
                    className='cdx-p-1 cdx-rounded cdx-border-0 cdx-select-none cdx-outline-0 cdx-text-sm data-[highlighted]:cdx-bg-neutral-600'
                  >
                    {item.name}
                  </DropdownMenu.Item>
                )
              })}
            </DropdownMenu.Group>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
