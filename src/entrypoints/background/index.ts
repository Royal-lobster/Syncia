import { backgroundLog } from '../../logs'
import {
  createContextMenu,
  createContextMenuOnStorageChange,
} from './quick-menu/createContextMenu'
import { forwardContextMenuClicks } from './quick-menu/forwardContextMenu'
import { captureScreenListener } from './sidebar/captureScreenListener'
import { sendSidebarShortcut } from './sidebar/sendSidebarShortcut'
import { sidebarToggleListeners } from './sidebar/sidebarToggleListeners'

backgroundLog()

// =========================== //
// Sidebar Scripts
// =========================== //
sidebarToggleListeners()
sendSidebarShortcut()
captureScreenListener()

// =========================== //
// Quick menu Scripts
// =========================== //
createContextMenu()
forwardContextMenuClicks()
createContextMenuOnStorageChange()
