import { QuickMenu } from '../../components/QuickMenu'
import HighlightMenu from 'react-highlight-menu'
import { createRoot } from 'react-dom/client'
import { contentScriptLog } from '../../logs'
import { Settings } from '../../hooks/useSettings'
import Whitelister from 'redirect-whitelister'

const initQuickMenu = () => {
  contentScriptLog('QuickMenu')

  document.body.classList.add('syncia_body')
  const root = createRoot(document.createElement('div'))
  root.render(
    <HighlightMenu
      target=".syncia_body"
      menu={({ selectedText, setMenuOpen }) => (
        <QuickMenu selectedText={selectedText} setMenuOpen={setMenuOpen} />
      )}
      placement="bottom-start"
      styles={{
        borderColor: 'none',
        background: 'transparent',
        boxShadow: 'none',
        zIndex: 2147483647,
        borderRadius: '0',
        padding: '0',
        margin: '10px',
      }}
    />,
  )
}

chrome.storage.sync.get(['SETTINGS'], (result) => {
  const quickMenuSettings = result.SETTINGS?.quickMenu as Settings['quickMenu']
  if (quickMenuSettings) {
    if (quickMenuSettings.enabled) {
      if (quickMenuSettings.excludedSites.length === 0) initQuickMenu()
      else {
        const whitelister = new Whitelister(
          quickMenuSettings.excludedSites || '*',
        )
        const isExcluded = whitelister.verify(window.location.href)
        if (!isExcluded) initQuickMenu()
      }
    }
  } else {
    initQuickMenu()
  }
})
