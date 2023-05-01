import React from 'react'
import { TbClockHour4 } from 'react-icons/tb'
import { RiArrowDownSLine } from 'react-icons/ri'
import { ChatHistory } from '../../../hooks/useOpenAI'
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
  console.log(chatHistory, 'component chat history')

  return (
    <div className="cdx-mx-3 cdx-my-2 cdx-w-[70%] cdx-relative">
      {showHistoryTab && (
        <div className="box-animation cdx-absolute cdx-py-4 cdx-bottom-[130%] cdx-right-[-22%] cdx-min-w-[200px] cdx-rounded-lg cdx-border-2 cdx-border-gray-400 dark:cdx-border-gray-500 cdx-bg-neutral-300  dark:cdx-bg-black">
          <div className="cdx-px-3 cdx-pb-2">
            <p className='cdx-text-lg cdx-font-bold'>History</p>
          </div>
          <div className="cdx-flex cdx-flex-col">
            <>
              {chatHistory.length > 1 ? (
                chatHistory?.slice(1).map((chatMessage, i) => {
                  return (
                    <div
                      className=" border-1 cdx-border-gray-400"
                      key={chatMessage.id}
                      onClick={() => {
                        setCurrentId(chatMessage.id)
                        setShowHistoryTab(false)
                      }}
                    >
                      <div className="cdx-px-4 cdx-py-1 cdx-border-l-2 cdx-border-blue-400 cdx-font-bold cdx-text-md">
                        <button>{chatMessage.url}</button>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div
                  className=" border-1 cdx-border-gray-400"
                  onClick={() => {
                    setShowHistoryTab(false)
                  }}
                >
                  <div className="cdx-px-4 cdx-py-1 cdx-border-l-2 cdx-border-blue-400 cdx-font-bold cdx-text-md">
                    <span>No history found</span>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      )}
      <div
        data-active={showHistoryTab ? 'active' : undefined}
        onClick={() => setShowHistoryTab(!showHistoryTab)}
        className="cdx-cursor-pointer markdown cdx-rounded-xl cdx-px-2 cdx-py-1 cdx-border-2 data-[active]:cdx-border-blue-400 cdx-border-gray-400 cdx-max-w-[400px] cdx-flex cdx-items-center cdx-justify-between cdx-gap-1 cdx-min-w-[150px] cdx-w-[100%] "
      >
        <TbClockHour4 fontSize={'24'} className='cdx-text-gray-400' />
        <span>
          {' '}
          {currentUrl === chatHistory[0].url ? 'History' : currentUrl}
        </span>
        <RiArrowDownSLine fontSize={'24'} />
      </div>
    </div>
  )
}