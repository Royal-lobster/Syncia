import React from 'react'
import Header from './Header'
import QuickMenuSettings from './QuickMenuSettings'
import ChatSettings from './ChatSettings'

const Settings = () => {
  return (
    <div className=' cdx-container cdx-mx-auto cdx-mt-[10vh]'>
      <Header />
      <div className='cdx-flex cdx-justify-between cdx-gap-4 cdx-flex-wrap cdx-mt-10'>
        <QuickMenuSettings />
        <ChatSettings />
      </div>
    </div>
  )
}

export default Settings
