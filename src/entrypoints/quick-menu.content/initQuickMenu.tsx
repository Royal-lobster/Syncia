import { QuickMenu } from '../../components/QuickMenu'
import HighlightMenu from 'react-highlight-menu'
import { createRoot } from 'react-dom/client'
import { contentScriptLog } from '../../logs'

/**
 * Initializes the visual quick menu. (when the user selects text)
 * It is only initialized if the user has enabled it in the settings.
 * If the user has excluded the current site, it is not initialized.
 */
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

export default initQuickMenu
