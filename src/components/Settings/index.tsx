import React from 'react'
import Header from '../Layout/Header'
import GeneralSettings from './Sections/GeneralSettings'
import QuickMenuSettings from './Sections/QuickMenuSettings'
import ChatSettings from './Sections/ChatSettings'
import useThemeSync from '../../hooks/useThemeSync'
import PromptSettings from './Sections/PromptSettings'

const Settings = () => {
  useThemeSync()
  return (
    <div className="cdx-container cdx-mx-auto cdx-p-5 cdx-pt-[10vh]">
      <Header />
      <div className="cdx-flex cdx-flex-col xl:cdx-flex-row cdx-justify-between cdx-gap-10 cdx-flex-wrap cdx-mt-10">
        <div className="cdx-flex cdx-flex-1 cdx-flex-col cdx-gap-4 cdx-self-end cdx-sticky cdx-bottom-0">
          <GeneralSettings />
          <QuickMenuSettings />
          <ChatSettings />
        </div>
        <PromptSettings />
      </div>
    </div>
  )
}

export default Settings
