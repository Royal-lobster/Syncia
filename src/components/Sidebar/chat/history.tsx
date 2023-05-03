import React from 'react'
import { TbClockHour4 } from 'react-icons/tb'
import { RiArrowDownSLine } from 'react-icons/ri'
import { ChatHistory } from '../../../hooks/useOpenAI'
import { TiTick } from 'react-icons/ti'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
// import {
//   HamburgerMenuIcon,
//   DotFilledIcon,
//   CheckIcon,
//   ChevronRightIcon,
// } from '@radix-ui/react-icons';
interface HistoryProps {
  chatHistory: ChatHistory[]
  setCurrentId: (chatID: string) => void
  currentUrl: string
  currentId: string
}

export const History = ({
  chatHistory,
  setCurrentId,
  currentUrl,
  currentId,
}: HistoryProps) => {
  const [showHistoryTab, setShowHistoryTab] = React.useState(false)
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true)
  const [urlsChecked, setUrlsChecked] = React.useState(false)
  const [person, setPerson] = React.useState('pedro')

  return (
    <div className="cdx-mx-3 cdx-my-2 cdx-w-[70%] cdx-relative">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div
            className=" cdx-rounded-full  cdx-w-[100%] cdx-h-8 cdx-px-3 cdx-flex cdx-items-center cdx-justify-between cdx-gap-2   cdx-shadow-[0_2px_10px] cdx-shadow-black cdx-focus:shadow-[0_0_0_2px] focus:cdx-shadow-black  cdx-text-md
          cdx-bg-[#9c9c9c] cdx-text-white   
       dark:cdx-border-neutral-800 cdx-border-neutral-300 dark:cdx-bg-neutral-900/90 cdx-bg-neutral-200/90  cdx-cursor-pointer
          "
          >
            <TbClockHour4 className='cdx-w-[30%] cdx-h-[100%]' />
            <button
              className="cdx-w-[40%] cdx-h-[70%]"
              aria-label="Customise options"
            >
              History
            </button>
            <RiArrowDownSLine className='cdx-w-[30%] cdx-h-[100%]' />
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className=" cdx-min-w-[220px] dark:cdx-bg-neutral-900/90 cdx-bg-neutral-200/90 dark:cdx-text-white cdx-text-black cdx-my-1.5 cdx-rounded-md cdx-p-[5px] cdx-shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] cdx-will-change-[opacity,transform]  data-[side=top]:animate-slideDownAndFade  data-[side=right]:animate-slideLeftAndFade  data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <DropdownMenu.RadioGroup
              value={currentId}
              onValueChange={setCurrentId}
            >
              {chatHistory.length > 1 ? (
                chatHistory?.splice(1).map((chat, i) => {
                  return (
                    <DropdownMenu.RadioItem
                      className=" cdx-text-[13px] cdx-leading-none cdx-text-violet11 cdx-rounded-[3px] cdx-flex cdx-items-center cdx-h-[25px] cdx-px-[5px] cdx-relative cdx-pl-[25px] cdx-select-none cdx-outline-none data-[disabled]:cdx-text-slate-500 data-[disabled]:cdx-pointer-events-none data-[highlighted]:cdx-bg-violet-900 data-[highlighted]:cdx-text-violet-100"
                      value={chat.id}
                      key={i}
                    >
                      <DropdownMenu.ItemIndicator className=" cdx-absolute cdx-left-0 cdx-w-[25px] cdx-inline-flex cdx-items-center cdx-justify-center">
                        <TiTick />
                      </DropdownMenu.ItemIndicator>
                      {chat.url}
                    </DropdownMenu.RadioItem>
                  )
                })
              ) : (
                <DropdownMenu.RadioItem
                  className=" cdx-text-[13px] cdx-leading-none cdx-text-violet11 cdx-rounded-[3px] cdx-flex cdx-items-center cdx-h-[25px] cdx-px-[5px] cdx-relative cdx-pl-[25px] cdx-select-none cdx-outline-none data-[disabled]:cdx-text-slate-500 data-[disabled]:cdx-pointer-events-none data-[highlighted]:cdx-bg-violet-900 data-[highlighted]:cdx-text-violet-100"
                  value="noHistory"
                  disabled
                >
                  <DropdownMenu.ItemIndicator className=" cdx-absolute cdx-left-0 cdx-w-[25px] cdx-inline-flex cdx-items-center cdx-justify-center">
                    <TiTick />
                  </DropdownMenu.ItemIndicator>
                  {'No history yet'}
                </DropdownMenu.RadioItem>
              )}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
