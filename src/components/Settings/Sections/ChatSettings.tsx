import * as Switch from '@radix-ui/react-switch'
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useSettings } from '../../../hooks/useSettings'
import { useChatModels } from '../../../hooks/useChatModels'
import { capitalizeText } from '../../../lib/capitalizeText'
import { validateApiKey } from '../../../lib/validApiKey'
import FieldWrapper from '../Elements/FieldWrapper'
import SectionHeading from '../Elements/SectionHeading'
import { type AvailableModels, Mode } from '../../../config/settings'
import { getReadableModelName } from '../../../lib/getReadableModelName'

const ChatSettings = () => {
  const [settings, setSettings] = useSettings()
  const [showPassword, setShowPassword] = useState(false)
  const { availableModels, fetchLocalModels } = useChatModels()
  const OpenAiApiKeyInputRef = React.useRef<HTMLInputElement>(null)

  const chatSettings = settings.chat

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

    if (OpenAiApiKeyInputRef.current) {
      const isOpenAiKeyValid: boolean = await validateApiKey(value)

      const inputStyles = isOpenAiKeyValid
        ? { classname: 'input-success', value: `✅  ${value}` }
        : { classname: 'input-failed', value: `❌  ${value}` }

      OpenAiApiKeyInputRef.current.classList.add(inputStyles.classname)
      OpenAiApiKeyInputRef.current.value = inputStyles.value
      setTimeout(() => {
        if (!OpenAiApiKeyInputRef.current) return
        OpenAiApiKeyInputRef.current?.classList.remove(inputStyles.classname)
        OpenAiApiKeyInputRef.current.value = value
      }, 2000)
    }
  }

  return (
    <div className="cdx-w-full cdx-flex-shrink-0 cdx-rounded-md">
      <SectionHeading title="Chat" />
      <FieldWrapper
        title="Open AI Key"
        description="You can get your Open AI key from https://platform.openai.com/api-keys"
        onSubmit={handleOpenAiKeySubmit}
      >
        <div className="cdx-flex cdx-gap-2 cdx-items-center">
          <div className="cdx-relative cdx-w-full">
            <input
              required
              pattern="^(sk(-proj)?-[a-zA-Z0-9]{48}$"
              ref={OpenAiApiKeyInputRef}
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
             Model Setting
          ===========================*/}
      <FieldWrapper
        title="Show Local Models"
        description="Show local models in the model selection via ollama (https://ollama.com/) which allows you to use open source models that run on your machine."
        row={true}
      >
        <Switch.Root
          checked={chatSettings.showLocalModels}
          onCheckedChange={(value) => {
            setSettings({
              ...settings,
              chat: {
                ...chatSettings,
                showLocalModels: value,
              },
            })
            fetchLocalModels()
          }}
          className="cdx-w-[42px] cdx-h-[25px] cdx-bg-neutral-500 cdx-rounded-full cdx-relative data-[state=checked]:cdx-bg-blue-500 cdx-outline-none cdx-cursor-default"
        >
          <Switch.Thumb className="cdx-block cdx-w-[21px] cdx-h-[21px] cdx-bg-white cdx-rounded-full cdx-transition-transform cdx-duration-100 cdx-translate-x-0.5 cdx-will-change-transform data-[state=checked]:cdx-translate-x-[19px]" />
        </Switch.Root>
      </FieldWrapper>
      {chatSettings.showLocalModels && (
        <div>
          🚧 NOTE: You must run this command for this to work:
          <code className="cdx-block dark:cdx-bg-white/10 cdx-bg-black/10 cdx-rounded cdx-mt-2 cdx-p-2">
            OLLAMA_ORIGINS=
            {window.location.origin} ollama start
          </code>
        </div>
      )}
      <FieldWrapper
        title="Model"
        description="Choose between OpenAI Chat Modals. For more information, visit https://platform.openai.com/docs/models/overview"
        row={true}
      >
        <select
          value={chatSettings.model}
          className="input cdx-w-44"
          onChange={(e) => {
            setSettings({
              ...settings,
              chat: {
                ...chatSettings,
                model: e.target.value as AvailableModels,
              },
            })
          }}
        >
          {availableModels.map(([model, value]) => (
            <option key={model} value={value}>
              {getReadableModelName(model)}
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
          onChange={(e) => {
            setSettings({
              ...settings,
              chat: {
                ...chatSettings,
                mode: e.target.value as unknown as Mode,
              },
            })
          }}
          className="input cdx-w-36"
        >
          {Object.entries(Mode)
            .filter(([, v]) => !Number.isNaN(Number(v)))
            .map(([key, value]) => (
              <option key={key} value={value}>
                {capitalizeText(key.replace('_', ' ').toLowerCase())}
              </option>
            ))}
        </select>
      </FieldWrapper>
    </div>
  )
}

export default ChatSettings
