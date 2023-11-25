import React from 'react'
import { useSettings } from '../../../hooks/useSettings'
import * as Switch from '@radix-ui/react-switch'

const WebPageContentToggle = () => {
  const [settings, setSettings] = useSettings()
  return (
    <div className="cdx-flex cdx-items-center cdx-justify-center cdx-gap-2 cdx-p-2 cdx-rounded">
      <Switch.Root
        checked={settings.general.webpageContext}
        onCheckedChange={(value) =>
          setSettings({
            ...settings,
            general: {
              ...settings.general,
              webpageContext: value,
            },
          })
        }
        className="cdx-w-[28px] cdx-h-[16px] cdx-bg-neutral-500 cdx-rounded-full cdx-relative data-[state=checked]:cdx-bg-blue-500 cdx-outline-none cdx-cursor-default"
      >
        <Switch.Thumb className="cdx-block cdx-w-[14px] cdx-h-[14px] cdx-bg-white cdx-rounded-full cdx-transition-transform cdx-duration-100 cdx-translate-x-0.5 cdx-will-change-transform data-[state=checked]:cdx-translate-x-[14px]" />
      </Switch.Root>
      <label htmlFor="webpage-context" className="cdx-text-neutral-400">
        Add page content
      </label>
    </div>
  )
}

export default WebPageContentToggle
