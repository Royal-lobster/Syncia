import { backgroundLog } from '../../logs'
import { CreateContextMenu } from './quick-menu/createContextMenu'
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
CreateContextMenu()
