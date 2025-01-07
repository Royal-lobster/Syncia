import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import React, { useEffect } from 'react'
import logo from '../../lib/logo'
import { usePrompts } from '../../hooks/usePrompts'
import useThemeSync from '../../hooks/useThemeSync'
import { generatePromptInSidebar } from '../../lib/generatePromptInSidebar'
import { RecursiveItem } from './RecursiveItem'
import './index.css'

interface QuickMenuProps {
  selectedText: string
  setMenuOpen: (open: boolean) => void
}

export const QuickMenu = ({ selectedText, setMenuOpen }: QuickMenuProps) => {
  useThemeSync()
  const [prompts] = usePrompts()

  useEffect(() => {
    const highlightMenu = document.getElementById(
      'react-highlight-menu-container',
    ) as HTMLDivElement | null
    if (highlightMenu) highlightMenu.style.zIndex = '2147483647'
  }, [])

  const noCategoryPrompts = prompts.filter((i) => !!i.prompt)

  const handleGenerate = (prompt: string) => {
    generatePromptInSidebar(prompt, selectedText)
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
          <div className="cdx-py-1 cdx-px-1.5 cdx-bg-neutral-200 dark:cdx-bg-neutral-700 cdx-flex cdx-items-center">
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMTggMTgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+ZGVlcGNoYXQuc3ZnPC90aXRsZT4KICAgIDxnIGlkPSLpobXpnaItMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IjEiPgogICAgICAgICAgICA8cmVjdCBpZD0iX1RyYW5zcGFyZW50X1JlY3RhbmdsZV8iIGZpbGw9IiM0QzY2QUYiIHg9IjAiIHk9IjAiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PC9yZWN0PgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiB4PSIxLjA4IiB5PSIxLjQ3IiB3aWR0aD0iMTUuODQiIGhlaWdodD0iMTUuMDYiPjwvcmVjdD4KICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgZmlsbD0iI0ZGRkZGRiIgeD0iNS41NDAyNSIgeT0iMTEuNTY5OTA2NSIgd2lkdGg9IjYuOTE4NzUiIGhlaWdodD0iMi4xODY5MTU4OSI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNMTAuNzY0NDQ0NCw2LjAxMzk4OTE0IEMxMC43NjQ0NDQ0LDYuOTQ1OTQ3MjYgMTEuNTE5OTQ1OCw3LjcwMTQ0ODYgMTIuNDUxOTAzOSw3LjcwMTQ0ODYgQzEzLjM4Mzg2Miw3LjcwMTQ0ODYgMTQuMTM5MzYzNCw2Ljk0NTk0NzI2IDE0LjEzOTM2MzQsNi4wMTM5ODkxNCBDMTQuMTQzNzgyMSw1LjU2NTEwNzAyIDEzLjk2NzQxNiw1LjEzMzMyMjkzIDEzLjY0OTk5MzEsNC44MTU4OTk5NyBDMTMuMzMyNTcwMSw0LjQ5ODQ3NyAxMi45MDA3ODYsNC4zMjIxMTA5MSAxMi40NTE5MDM5LDQuMzI2NTI5NjcgQzExLjUxOTk0NTgsNC4zMjY1Mjk2NyAxMC43NjQ0NDQ0LDUuMDgyMDMxMDEgMTAuNzY0NDQ0NCw2LjAxMzk4OTE0IFoiIGlkPSLot6/lvoQiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNNS41NDAzNzYxMyw0LjMyNjUyOTY3IEM0LjYwODQxOCw0LjMyNjUyOTY3IDMuODUyOTE2NjcsNS4wODIwMzEwMSAzLjg1MjkxNjY3LDYuMDEzOTg5MTQgQzMuODUyOTE2NjcsNi45NDU5NDcyNiA0LjYwODQxOCw3LjcwMTQ0ODYgNS41NDAzNzYxMyw3LjcwMTQ0ODYgQzYuNDcyMzM0MjYsNy43MDE0NDg2IDcuMjI3ODM1NTksNi45NDU5NDcyNiA3LjIyNzgzNTU5LDYuMDEzOTg5MTQgQzcuMjMyMjU0MzYsNS41NjUxMDcwMiA3LjA1NTg4ODI3LDUuMTMzMzIyOTMgNi43Mzg0NjUzLDQuODE1ODk5OTcgQzYuNDIxMDQyMzMsNC40OTg0NzcgNS45ODkyNTgyNCw0LjMyMjExMDkxIDUuNTQwMzc2MTMsNC4zMjY1Mjk2NyBMNS41NDAzNzYxMyw0LjMyNjUyOTY3IFoiIGlkPSLot6/lvoQiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+
" className="cdx-w-[18px] cdx-h-[18px] " />
          </div>
          <span className="cdx-py-1 cdx-text-sm !cdx-font-sans cdx-px-1.5 cdx-mt-0.5">
            DeepChat
          </span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          style={{ zIndex: 2147483647 }}
          className="cdx-flex cdx-flex-col cdx-min-w-[150px] cdx-gap-2 cdx-backdrop-blur-sm !cdx-font-sans cdx-m-2 cdx-bg-neutral-50 cdx-shadow-md cdx-p-2 cdx-rounded dark:cdx-bg-neutral-800 cdx-text-neutral-800 dark:cdx-text-neutral-100"
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
                      handleGenerate={handleGenerate}
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
              <RecursiveItem
                item={item}
                key={item.id}
                handleGenerate={handleGenerate}
              />
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
