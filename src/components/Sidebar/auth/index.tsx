import React, { useEffect } from 'react'
import { useSettings } from '../../../hooks/useSettings'
import { validateApiKey } from '../../../utils/validApiKey'

const Auth = () => {
  const [, setSettings] = useSettings()
  const [error, setError] = React.useState<string | null>(null)

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }, [error])

  const handleOpenAiKeySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const key = data.get('openAiKey')
    const isVaildApiKey: boolean = await validateApiKey(key as string)

    if (key && isVaildApiKey) {
      setSettings((prev) => ({
        ...prev,
        chat: {
          ...prev.chat,
          openAIKey: key as string,
        },
      }))
    } else {
      setError('Invalid API key. Please try with a valid one.')
    }
  }
  return (
    <form
      onSubmit={handleOpenAiKeySubmit}
      className="cdx-flex cdx-flex-col cdx-p-6 cdx-text-center cdx-justify-center cdx-items-center cdx-h-full"
    >
      <div className="cdx-text-2xl cdx-mt-48">Enter your OpenAI API key</div>
      <div className="cdx-text-sm cdx-text-gray-400 cdx-mt-2">
        You can get one{' '}
        <a
          href="https://beta.openai.com/account/api-keys"
          target="_blank"
          rel="noreferrer"
          className="cdx-text-blue-400"
        >
          here
        </a>
      </div>
      <div className="cdx-text-sm cdx-text-gray-400 cdx-mt-2">
        It should look something like this:
      </div>
      <div className="cdx-text-sm cdx-text-gray-400 cdx-mt-2">
        sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </div>
      <input
        name="openAiKey"
        placeholder="Enter your OpenAI API key"
        data-error={error ? 'true' : undefined}
        className="cdx-mt-4 cdx-text-center cdx-p-2 cdx-w-full cdx-rounded-md cdx-border dark:cdx-border-neutral-600 cdx-border-neutral-200 dark:cdx-bg-neutral-800/90 cdx-bg-neutral-200/90 focus:cdx-outline-none focus:cdx-ring-2 focus:cdx-ring-blue-900 focus:cdx-ring-opacity-50 data-[error]:cdx-text-red-500"
        pattern="sk-[a-zA-Z0-9]{48}"
      />

      {error && (
        <div className="cdx-text-sm cdx-text-red-500 cdx-mt-2">{error}</div>
      )}

      <button
        type="submit"
        className="cdx-mt-4 cdx-p-2 cdx-w-full cdx-rounded-md cdx-border dark:cdx-border-neutral-600 cdx-border-neutral-200 dark:cdx-bg-neutral-800/90 cdx-bg-neutral-200/90 focus:cdx-outline-none focus:cdx-ring-2 focus:cdx-ring-blue-900 focus:cdx-ring-opacity-50"
      >
        Submit
      </button>
      <div className="cdx-text-sm cdx-text-gray-400 cdx-mt-2">
        (Note: we only store your key locally. We do not send it anywhere. You
        can check the{' '}
        <a
          href="https://github.com/Royal-lobster/Syncia"
          className="cdx-text-blue-400"
        >
          source code
        </a>{' '}
        and inspect network tab to verify this.)
      </div>
    </form>
  )
}

export default Auth
