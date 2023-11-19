import { backgroundLog } from '~lib/logs'
import {
  createContextMenu,
  createContextMenuOnStorageChange,
} from './quick-menu/createContextMenu'
import { forwardContextMenuClicks } from './quick-menu/forwardContextMenu'
import { sendSidebarShortcut } from './sidebar/sendSidebarShortcut'
import { sidebarToggleListeners } from './sidebar/sidebarToggleListeners'

backgroundLog()

// =========================== //
// Sidebar Scripts
// =========================== //
sidebarToggleListeners()
sendSidebarShortcut()

// =========================== //
// Quick menu Scripts
// =========================== //
createContextMenu()
forwardContextMenuClicks()
createContextMenuOnStorageChange()

export {}