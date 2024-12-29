import { createRoot } from 'react-dom/client'
import Sidebar from '../../components/Sidebar'
import './index.css'

function init() {
  const rootContainer = document.querySelector('#__root')
  if (!rootContainer) throw new Error("Can't find Panel root element")
  const root = createRoot(rootContainer)
  root.render(<Sidebar />)
}

init()
