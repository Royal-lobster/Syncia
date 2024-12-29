import { backgroundLog } from '../../logs'
import {
  createContextMenu,
  createContextMenuOnStorageChange,
} from './quick-menu/createContextMenu'
import { forwardContextMenuClicks } from './quick-menu/forwardContextMenu'
import { captureScreenListener } from './sidebar/captureScreenListener'
import { sendSidebarShortcut } from './sidebar/sendSidebarShortcut'
import { sidebarToggleListeners } from './sidebar/sidebarToggleListeners'

export default defineBackground({
  main() {
    // Initialize logging
    backgroundLog()

    // Sidebar functionality
    sidebarToggleListeners()
    sendSidebarShortcut()
    captureScreenListener()

    // Quick menu functionality
    createContextMenu()
    forwardContextMenuClicks()
    createContextMenuOnStorageChange()
  },
})
