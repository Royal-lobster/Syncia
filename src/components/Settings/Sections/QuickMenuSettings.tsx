import * as Switch from '@radix-ui/react-switch'
import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useSettings } from '../../../hooks/useSettings'
import FieldWrapper from '../Elements/FieldWrapper'
import SectionHeading from '../Elements/SectionHeading'

const QuickMenuSettings = () => {
  const [settings, setSettings] = useSettings()

  const quickMenuSettings = settings.quickMenu

  const handleEnableQuickMenuChange = (enabled: boolean) => {
    setSettings({
      ...settings,
      quickMenu: {
        ...quickMenuSettings,
        visibleMenu: enabled,
      },
    })
  }

  const handleEnableContextMenuChange = (enabled: boolean) => {
    setSettings({
      ...settings,
      quickMenu: {
        ...quickMenuSettings,
        contextMenu: enabled,
      },
    })
  }

  const handleExcludeSitesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const sites = event.target.value
      .split(',')
      .map((site) => site.trim())
      .filter(Boolean)
    setSettings({
      ...settings,
      quickMenu: {
        ...quickMenuSettings,
        excludedSites: sites,
      },
    })
  }

  return (
    <div className='cdx-w-full cdx-flex-shrink-0 cdx-rounded-md'>
      <SectionHeading title='Quick Menu' />

      {/* =========================
        Enable Visible Quick Menu 
      ===========================*/}
      <FieldWrapper
        title='Enable Quick Menu'
        description='This will enable the quick menu which appears bellow text selection on any webpage.'
        row={true}
      >
        <Switch.Root
          checked={quickMenuSettings.visibleMenu}
          onCheckedChange={handleEnableQuickMenuChange}
          className="cdx-w-[42px] cdx-h-[25px] cdx-bg-neutral-500 cdx-rounded-full cdx-relative data-[state=checked]:cdx-bg-blue-500 cdx-outline-none cdx-cursor-default"
        >
          <Switch.Thumb className="cdx-block cdx-w-[21px] cdx-h-[21px] cdx-bg-white cdx-rounded-full cdx-transition-transform cdx-duration-100 cdx-translate-x-0.5 cdx-will-change-transform data-[state=checked]:cdx-translate-x-[19px]" />
        </Switch.Root>
      </FieldWrapper>

      {/* =========================
          Enable Context Menu 
      ===========================*/}
      <FieldWrapper
        title='Enable Context Menu'
        description='This will enable the context menu which appears when you select text and right click on any webpage. I recommend enabling this and disabling the quick menu if you feel the quick menu is too intrusive. (browser restart needed)'
        row={true}
      >
        <Switch.Root
          checked={quickMenuSettings.contextMenu}
          onCheckedChange={handleEnableContextMenuChange}
          className="cdx-w-[42px] cdx-h-[25px] cdx-bg-neutral-500 cdx-rounded-full cdx-relative data-[state=checked]:cdx-bg-blue-500 cdx-outline-none cdx-cursor-default"
        >
          <Switch.Thumb className="cdx-block cdx-w-[21px] cdx-h-[21px] cdx-bg-white cdx-rounded-full cdx-transition-transform cdx-duration-100 cdx-translate-x-0.5 cdx-will-change-transform data-[state=checked]:cdx-translate-x-[19px]" />
        </Switch.Root>
      </FieldWrapper>

      {/* =========================
              Exclude Sites
      ===========================*/}
      <FieldWrapper
        title="Exclude Sites"
        description="You can exclude sites from the quick menu by adding them here. (separated by comma) supports wildcards."
      >
        <TextareaAutosize
          className='input'
          placeholder='Eg: google.com, youtube.com, twitter.com'
          minRows={2}
          value={quickMenuSettings.excludedSites.join(', ')}
          onChange={handleExcludeSitesChange}
        />
      </FieldWrapper>
    </div>
  )
}

export default QuickMenuSettings
