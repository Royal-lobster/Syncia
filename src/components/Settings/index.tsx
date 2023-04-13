import React from 'react'
import Header from '../Layout/Header'
import GeneralSettings from './Sections/GeneralSettings'
import QuickMenuSettings from './Sections/QuickMenuSettings'
import ChatSettings from './Sections/ChatSettings'
import useThemeSync from '../../hooks/useThemeSync'

const Settings = () => {
  useThemeSync()
  return (
    <div className='cdx-container cdx-mx-auto cdx-p-5 cdx-pt-[10vh]'>
      <Header />
      <div className='cdx-flex cdx-flex-col xl:cdx-flex-row cdx-justify-between cdx-gap-10 cdx-flex-wrap cdx-mt-10'>
        <QuickMenuSettings />
        <div className="cdx-flex cdx-flex-1 cdx-flex-col cdx-gap-4">
          <GeneralSettings />
          <ChatSettings />
        </div>
      </div>
    </div>
  )
}

export default Settings
