import React from 'react'
import SectionHeading from '../Elements/SectionHeading'
import FieldWrapper from '../Elements/FieldWrapper'
import { useSettings } from '../../../hooks/useSettings'
import { validateApiKey } from '../../../lib/validApiKey'
import { AvailableModels, Mode } from '../../../config/settings'
import { capitalizeText } from '../../../lib/capitalizeText'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const ChatSettings = () => {
  const [settings, setSettings] = useSettings()
  const [showPassword, setShowPassword] = useState(false)

  const chatSettings = settings.chat

  const apiKeyInputRef = React.useRef<HTMLInputElement>(null)

  const handleOpenAiKeySubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    const target = event.target as HTMLFormElement
    const input = target.querySelector('input') as HTMLInputElement
    const value = input.value
    setSettings({
      ...settings,
      chat: {
        ...chatSettings,
        openAIKey: value,
      },
    })

    // checking the user open api key
    const isValid: boolean = await validateApiKey(value)

    // assign  the input styles
    const inputStyles = isValid
      ? { classname: 'input-success', value: `✅  ${value}` }
      : { classname: 'input-failed', value: `❌  ${value}` }

    if (apiKeyInputRef.current) {
      apiKeyInputRef.current.classList.add(inputStyles.classname)
      apiKeyInputRef.current.value = inputStyles.value
      setTimeout(() => {
        if (!apiKeyInputRef.current) return
        apiKeyInputRef.current?.classList.remove(inputStyles.classname)
        apiKeyInputRef.current.value = value
      }, 2000)
    }
  }

  const handleModalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSettings({
      ...settings,
      chat: {
        ...chatSettings,
        modal: value as AvailableModels,
      },
    })
  }

  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSettings({
      ...settings,
      chat: {
        ...chatSettings,
        mode: value as unknown as Mode,
      },
    })
  }

  return (
    <div className="cdx-w-full cdx-flex-shrink-0 cdx-rounded-md">
      <SectionHeading title="Chat" />

      {/* =========================
              OPEN AI KEY 
      ===========================*/}

      <FieldWrapper
        title="Open AI Key"
        description="You can get your Open AI key from https://beta.openai.com/account/api-keys"
        onSubmit={handleOpenAiKeySubmit}
      >
        <div className="cdx-flex cdx-gap-2 cdx-items-center">
          <div className="cdx-relative cdx-w-full">
            <input
              required
              pattern="sk-[a-zA-Z0-9]{48}"
              ref={apiKeyInputRef}
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              defaultValue={chatSettings.openAIKey || ''}
              type={showPassword ? 'text' : 'password'}
              className="input"
            />

            <button
              type="button"
              className="cdx-absolute cdx-right-4 cdx-top-1/2 cdx-transform cdx--translate-y-1/2 cdx-text-neutral-500 dark:cdx-text-neutral-200 cdx-bg-transparent cdx-outline-none cdx-cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={18} />
              ) : (
                <AiOutlineEye size={18} />
              )}
            </button>
          </div>
          <button type="submit" className="btn">
            Update
          </button>
        </div>
      </FieldWrapper>

      {/* =========================
             Modal Setting 
      ===========================*/}

      <FieldWrapper
        title="Modal"
        description="Choose between OpenAI Chat Modals. For more information, visit https://platform.openai.com/docs/models/overview"
        row={true}
      >
        <select
          value={chatSettings.modal}
          className="input cdx-w-44"
          onChange={handleModalChange}
        >
          {Object.keys(AvailableModels).map((modal) => (
            <option key={modal} value={modal}>
              {capitalizeText(
                modal
                  .toLowerCase()
                  .replace('gpt', 'GPT')
                  .replace('3_5', '3.5')
                  .replaceAll('_', ' '),
              )}
            </option>
          ))}
        </select>
      </FieldWrapper>

      {/* =========================
              Mode Setting 
      ===========================*/}

      <FieldWrapper
        title="Mode"
        description="Tweak temperature of response. Creative will generate more non deterministic responses, Precise will generate more deterministic responses."
        row={true}
      >
        <select
          value={chatSettings.mode}
          onChange={handleModeChange}
          className="input cdx-w-36"
        >
          {Object.keys(Mode)
            .filter((v) => Number.isNaN(Number(v)))
            .map((value) => (
              <option key={value} value={value}>
                {capitalizeText(value.replace('_', ' ').toLowerCase())}
              </option>
            ))}
        </select>
      </FieldWrapper>
    </div>
  )
}

export default ChatSettings
