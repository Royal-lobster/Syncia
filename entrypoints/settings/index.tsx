import { createRoot } from 'react-dom/client'
import './index.css'
import Settings from '../../components/Settings'
import { DndContext } from '@dnd-kit/core'

function init() {
  const rootContainer = document.querySelector('#__root')
  if (!rootContainer) throw new Error("Can't find Panel root element")
  const root = createRoot(rootContainer)
  root.render(
    <DndContext>
      <Settings />
    </DndContext>,
  )
}

init()
