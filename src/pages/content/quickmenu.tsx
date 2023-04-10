import { QuickMenu } from '../../components/QuickMenu'
import HighlightMenu from 'react-highlight-menu'
import { createRoot } from 'react-dom/client'
import { contentScriptLog } from '../../logs'
import matchUrl from 'match-url-wildcard'

const initQuickMenu = () => {
  contentScriptLog('QuickMenu')

  document.body.classList.add('ChatDockX_Body')
  const root = createRoot(document.createElement('div'))
  root.render(
    <HighlightMenu
      target=".ChatDockX_Body"
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
  const { SETTINGS } = result
  if (SETTINGS) {
    const { quickMenu } = SETTINGS
    if (quickMenu.enabled) {
      const { excludedSites } = quickMenu
      const currentSite = window.location.href
      const isExcluded = matchUrl(currentSite, excludedSites)
      console.log('isExcluded', isExcluded)
      if (!isExcluded) initQuickMenu()
    }
  }
})
