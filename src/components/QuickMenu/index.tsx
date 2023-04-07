import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { BsRobot } from 'react-icons/bs'
import { promptOptions } from '../../prompts/list'
import { HiOutlineChevronRight } from 'react-icons/hi'
import { toggleSidebar } from '../../pages/content-script'
import { useEffect } from 'react'

interface QuickMenuProps {
  selectedText: string
  setMenuOpen: (open: boolean) => void
}

export const QuickMenu = ({ selectedText, setMenuOpen }: QuickMenuProps) => {
  useEffect(() => {
    const highlightMenu = document.getElementById(
      'react-highlight-menu-container',
    ) as HTMLDivElement
    highlightMenu.style.zIndex = '2147483647'
  }, [])

  const generateInDock = (prompt: string) => {
    const fullPrompt = `${prompt}: \n\n ${selectedText}`
    const sideBarIframe = document.getElementById(
      'ChatDockX_Sidebar',
    ) as HTMLIFrameElement
    if (sideBarIframe.style.width === '0px') {
      toggleSidebar(sideBarIframe)
    }
    sideBarIframe.contentWindow?.postMessage(
      {
        action: 'generate',
        prompt: fullPrompt,
      },
      '*',
    )
  }
  return (
    <DropdownMenu.Root
      onOpenChange={(e) => {
        setMenuOpen(e.valueOf())
      }}
    >
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          style={{ zIndex: 2147483647 }}
          className="cdx-flex cdx-items-stretch cdx-rounded cdx-shadow-md cdx-leading-none cdx-cursor-pointer hover:!cdx-brightness-95 cdx-overflow-hidden cdx-p-0 cdx-m-0 cdx-border-none cdx-bg-neutral-50 dark:cdx-bg-neutral-800 cdx-text-neutral-950 dark:cdx-text-neutral-100"
        >
          <div className="cdx-py-1 cdx-px-1.5 cdx-bg-neutral-200 dark:cdx-bg-neutral-700">
            <BsRobot
              size={15}
              className='cdx-mt-0.5 cdx-text-neutral-800 dark:cdx-text-white'
            />
          </div>
          <span className='cdx-py-1 cdx-text-sm !cdx-font-sans cdx-px-1.5 cdx-mt-0.5'>
            ChatDock X
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          style={{ zIndex: 2147483647 }}
          className='!cdx-font-sans cdx-m-2 cdx-bg-neutral-50 cdx-shadow-md cdx-p-1 cdx-rounded dark:cdx-bg-neutral-800 cdx-text-neutral-950 dark:cdx-text-neutral-100'
        >
          {promptOptions.map((prompt) => (
            <DropdownMenu.Group key={prompt.sectionName}>
              <DropdownMenu.Label className='cdx-text-[10px] cdx-font-semibold cdx-mt-2 cdx-my-1 font-bold cdx-text-neutral-500 cdx-uppercase'>
                {prompt.sectionName}
              </DropdownMenu.Label>
              {prompt.items.map((item) => {
                if (item.items)
                  return (
                    <DropdownMenu.Sub key={item.name}>
                      <DropdownMenu.SubTrigger className='cdx-p-1 cdx-rounded cdx-border-0 cdx-select-none cdx-outline-0 cdx-text-sm cdx-flex cdx-items-center cdx-justify-between data-[highlighted]:cdx-bg-neutral-200 data-[highlighted]:dark:cdx-bg-neutral-600'>
                        <span>{item.name}</span>
                        <HiOutlineChevronRight size={10} />
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.SubContent
                          style={{ zIndex: 2147483647 }}
                          className='!cdx-font-sans cdx-my-1 cdx-bg-neutral-50 cdx-shadow-md cdx-p-1 cdx-rounded dark:cdx-bg-neutral-800 cdx-text-neutral-950 dark:cdx-text-neutral-100'
                        >
                          {item.items.map((subItem) => (
                            <DropdownMenu.Item
                              key={subItem.name}
                              onSelect={() => generateInDock(subItem.prompt)}
                              className='cdx-p-1 cdx-border-0 cdx-select-none cdx-outline-0 cdx-rounded cdx-text-sm data-[highlighted]:cdx-bg-neutral-200 data-[highlighted]:dark:cdx-bg-neutral-600'
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
                    onSelect={() => generateInDock(item.prompt)}
                    className='cdx-p-1 cdx-rounded cdx-border-0 cdx-select-none cdx-outline-0 cdx-text-sm data-[highlighted]:cdx-bg-neutral-200 data-[highlighted]:dark:cdx-bg-neutral-600'
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
