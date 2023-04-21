import { useEffect, useState } from 'react'
import { BsRobot } from 'react-icons/bs'
import { HiOutlineCog, HiX } from 'react-icons/hi'

const Header = () => {
  const [shortcut, setShortcut] = useState<string | null>(null)
  const onToggle = () => {
    chrome.runtime.sendMessage({ action: 'close-sidebar' })
  }

  const settingsPage = chrome.runtime.getURL('/src/pages/settings/index.html')

  const handleModifyShortcut = () => {
    chrome.tabs.update({ url: 'chrome://extensions/shortcuts' })
  }

  useEffect(() => {
    chrome.commands.getAll((commands) => {
      const command = commands.find(
        (command) => command.name === 'open-sidebar',
      )
      if (command) setShortcut(command.shortcut || null)
    })
  }, [])

  return (
    <div className="cdx-flex cdx-justify-between cdx-p-3.5 cdx-border-b dark:cdx-border-neutral-700/50 cdx-border-neutral-200">
      <h1 className="cdx-text-2xl cdx-flex cdx-items-center cdx-gap-2 cdx-m-0 cdx-p-0">
        <BsRobot className='cdx-text-blue-400' />
        Syncia
      </h1>

      <div className='cdx-flex cdx-text-neutral-500 cdx-gap-2 cdx-items-center'>
        <button
          onClick={handleModifyShortcut}
          className="cdx-flex cdx-items-center cdx-gap-2"
        >
          <span className="cdx-text-xs cdx-text-neutral-500  dark:cdx-bg-black/20 cdx-bg-black/10 cdx-border cdx-rounded-full cdx-border-neutral-400/30 dark:cdx-border-neutral-500/50 cdx-px-2 cdx-py-0.5">
            {shortcut ? `Shortcut: ${shortcut}` : 'No shortcut'}
          </span>
        </button>
        <a
          target='_blank'
          rel="noreferrer"
          className="cdx-text-xl"
          href={settingsPage}
        >
          <HiOutlineCog />
        </a>
        <button className="cdx-text-xl" onClick={onToggle}>
          <HiX />
        </button>
      </div>
    </div>
  )
}

export default Header
