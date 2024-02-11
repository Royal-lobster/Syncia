import React, { useCallback, useEffect } from 'react'
import SectionHeading from '../Elements/SectionHeading'
import FieldWrapper from '../Elements/FieldWrapper'
import { useSettings } from '../../../hooks/useSettings'
import { validateApiKey } from '../../../lib/validApiKey'
import { AvailableModels, Mode } from '../../../config/settings'
import { capitalizeText } from '../../../lib/capitalizeText'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import axios from 'axios'

const ChatSettings = () => {
  const [settings, setSettings] = useSettings()
  const [showPassword, setShowPassword] = useState(false)
  const [dynamicModels, setDynamicModels] = useState<string[]>([])
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

  const fetchLocalModels = useCallback(async () => {
    if (chatSettings.showLocalModels) {
      const {
        data: { models },
      } = await axios<{ models: { name: string }[] }>(
        'http://localhost:11434/api/tags',
      )
      if (models) {
        setDynamicModels(models.map((m) => m.name))
      }
    }
  }, [chatSettings.showLocalModels])

  useEffect(() => {
    fetchLocalModels()
  }, [fetchLocalModels])

  const availableModels = [
    ...Object.entries(AvailableModels),
    ...dynamicModels.map((m) => [m, m]),
  ]

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
             Modal Setting
      ===========================*/}

      <FieldWrapper
        title="Show Local Models"
        description="Show local models in the modal selection via ollama (https://ollama.com/) which allows you to use open source models that run on your machine."
        row={true}
      >
        <input
          type="checkbox"
          checked={chatSettings.showLocalModels}
          onChange={(e) =>
            setSettings({
              ...settings,
              chat: {
                ...chatSettings,
                showLocalModels: e.target.checked,
              },
            })
          }
        />
      </FieldWrapper>

      <FieldWrapper
        title="Modal"
        description="Choose between OpenAI Chat Modals. For more information, visit https://platform.openai.com/docs/models/overview"
        row={true}
      >
        <select
          value={chatSettings.modal}
          className="input cdx-w-44"
          onChange={(e) => {
            setSettings({
              ...settings,
              chat: {
                ...chatSettings,
                modal: e.target.value as AvailableModels,
              },
            })
          }}
        >
          {availableModels.map(([modal, value]) => (
            <option key={modal} value={value}>
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
