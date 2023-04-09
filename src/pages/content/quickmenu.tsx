import { QuickMenu } from '../../components/QuickMenu'
import HighlightMenu from 'react-highlight-menu'
import { createRoot } from 'react-dom/client'
import { contentScriptLog } from '../../logs'

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
