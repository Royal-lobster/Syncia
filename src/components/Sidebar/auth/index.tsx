import type React from 'react'
import { useEffect, useState } from 'react'
import { useChatModels } from '../../../hooks/useChatModels'
import { useSettings } from '../../../hooks/useSettings'
import { validateApiKey } from '../../../lib/validApiKey'

const Auth = () => {
  const [, setSettings] = useSettings()
  const { models, setActiveChatModel, fetchAvailableModels } = useChatModels()
  const [isLoadingModels, setIsLoadingModels] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1',
  })

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const newFormData = { ...formData, [id]: value }
    setFormData(newFormData)

    if (id === 'apiKey' && value.startsWith('sk-') && value.length > 40) {
      await validateAndUpdateSettings(value, formData.baseUrl)
    } else if (id === 'baseUrl' && formData.apiKey) {
      await validateAndUpdateSettings(formData.apiKey, value)
    }
  }

  const validateAndUpdateSettings = async (key: string, url: string) => {
    setIsLoadingModels(true)
    try {
      if (await validateApiKey(key, url)) {
        setSettings((prev) => ({
          ...prev,
          chat: { ...prev.chat, openAIKey: key, openAiBaseUrl: url },
        }))
        await fetchAvailableModels()
      } else {
        setError('Invalid API key. Please try with a valid one.')
      }
    } finally {
      setIsLoadingModels(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.apiKey || !formData.baseUrl) {
      setError('Please fill in all required fields')
      return
    }
    validateAndUpdateSettings(formData.apiKey, formData.baseUrl)
  }

  return (
    <form
      className="cdx-flex cdx-flex-col cdx-p-6 cdx-justify-center cdx-items-center cdx-h-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="cdx-text-2xl cdx-mt-48">Enter your OpenAI API key</div>
      <div className="cdx-text-sm cdx-text-gray-400 cdx-mt-2">
        You can get one{' '}
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noreferrer"
          className="cdx-text-blue-400"
        >
          here
        </a>
      </div>

      <div className="cdx-w-full cdx-mt-6">
        <input
          id="apiKey"
          value={formData.apiKey}
          onChange={handleInputChange}
          placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          className="cdx-p-2 cdx-w-full cdx-rounded-md cdx-border dark:cdx-border-neutral-600 cdx-border-neutral-200 dark:cdx-bg-neutral-800/90 cdx-bg-neutral-200/90"
        />
      </div>

      <div className="cdx-w-full cdx-mt-4">
        <input
          id="baseUrl"
          value={formData.baseUrl}
          onChange={handleInputChange}
          placeholder="https://api.openai.com/v1"
          className="cdx-p-2 cdx-w-full cdx-rounded-md cdx-border dark:cdx-border-neutral-600 cdx-border-neutral-200 dark:cdx-bg-neutral-800/90 cdx-bg-neutral-200/90"
        />
      </div>

      <div className="cdx-w-full cdx-mt-4">
        <select
          onChange={(e) => setActiveChatModel(e.target.value)}
          disabled={!models.length}
          className="cdx-p-2 cdx-w-full cdx-rounded-md cdx-border dark:cdx-border-neutral-600 cdx-border-neutral-200 dark:cdx-bg-neutral-800/90 cdx-bg-neutral-200/90 disabled:cdx-opacity-50"
        >
          {isLoadingModels ? (
            <option>Loading models...</option>
          ) : models.length ? (
            models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.id}
              </option>
            ))
          ) : (
            <option>Add API key to load models</option>
          )}
        </select>
      </div>

      {error && (
        <div className="cdx-text-sm cdx-text-red-500 cdx-mt-2">{error}</div>
      )}

      <button
        type="button"
        disabled={isLoadingModels}
        onClick={handleSubmit}
        className="cdx-mt-4 cdx-p-2 cdx-w-full cdx-rounded-md cdx-border dark:cdx-border-neutral-600 cdx-border-neutral-200 dark:cdx-bg-neutral-800/90 cdx-bg-neutral-200/90 disabled:cdx-opacity-50"
      >
        {isLoadingModels ? 'Loading...' : 'Submit'}
      </button>

      <div className="cdx-text-sm cdx-text-gray-400 cdx-mt-4">
        Note: we only store your key locally. We do not send it anywhere. You
        can check the{' '}
        <a
          href="https://github.com/Royal-lobster/Syncia"
          className="cdx-text-blue-400"
        >
          source code
        </a>{' '}
        and inspect network tab to verify this.
      </div>
    </form>
  )
}

export default Auth
