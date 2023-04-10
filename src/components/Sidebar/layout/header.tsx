import { HiOutlineCog, HiX } from 'react-icons/hi'

const Header = () => {
  const onToggle = () => {
    chrome.runtime.sendMessage({ action: 'close-sidebar' })
  }

  const settingsPage = chrome.runtime.getURL('/src/pages/settings/index.html')

  return (
    <div className="cdx-flex cdx-justify-between cdx-p-3.5 cdx-border-b dark:cdx-border-neutral-800 cdx-border-neutral-200">
      <h1 className="cdx-text-2xl cdx-m-0 cdx-p-0">
        ChatDock{' '}
        <span className="dark:cdx-text-blue-300 cdx-text-blue-500">X</span>
      </h1>
      <div className='cdx-flex cdx-gap-2 cdx-items-center'>
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
