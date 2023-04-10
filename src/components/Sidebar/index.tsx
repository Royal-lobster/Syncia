import Auth from './auth'
import Chat from './chat'
import Header from './layout/header'
import { useSettings } from '../../hooks/useSettings'

function Sidebar() {
  const [settings] = useSettings()
  return (
    <div className="cdx-flex cdx-backdrop-blur-sm cdx-flex-col cdx-min-h-screen cdx-shadow-md cdx-border-l dark:!cdx-text-white dark:cdx-border-neutral-800 cdx-border-neutral-200 cdx-top-0 cdx-right-0 cdx-w-[400px] cdx-h-full dark:cdx-bg-neutral-950/90 cdx-bg-neutral-100/95">
      <Header />
      {settings.chat.openAIKey ? <Chat settings={settings} /> : <Auth />}
    </div>
  )
}

export default Sidebar
