import { useCallback, useEffect, useState } from 'react'
import { useSettings } from './useSettings'
import axios from 'axios'

type OpenAIModel = {
  id: string
  object: string
  created: number
  owned_by: string
}

export const useChatModels = () => {
  const [settings, setSettings] = useSettings()
  const [models, setModels] = useState<OpenAIModel[]>([])
  const chatSettings = settings.chat
  const activeChatModel = chatSettings.model

  const fetchAvailableModels = useCallback(async () => {
    if (chatSettings.openAIKey) {
      try {
        const baseUrl =
          chatSettings.openAiBaseUrl || 'https://api.openai.com/v1'
        const { data } = await axios.get(`${baseUrl}/models`, {
          headers: {
            Authorization: `Bearer ${chatSettings.openAIKey}`,
          },
        })

        setModels(data.data)
      } catch (error) {
        console.log('Failed to fetch models:', error)
        setModels([])
      }
    }
  }, [chatSettings.openAIKey, chatSettings.openAiBaseUrl])

  useEffect(() => {
    fetchAvailableModels()
  }, [fetchAvailableModels])

  const setActiveChatModel = (modelId: string) => {
    setSettings({
      ...settings,
      chat: {
        ...chatSettings,
        model: modelId,
      },
    })
  }

  return {
    models,
    activeChatModel,
    setActiveChatModel,
    fetchAvailableModels,
  }
}
